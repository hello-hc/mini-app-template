import Taro from "@tarojs/taro";

/**
 * 位置信息相关工具函数
 */
class LocationUtils {
  /**
   * 获取当前位置信息
   * @param {Function} success
   * @param {Function} fail
   */
  static getCurrentLocation(success, fail) {
    Taro.getSetting({
      success(res) {
        const getLocationFunction = function () {
          Taro.showLoading({ mask: true });
          Taro.getLocation({
            type: "gcj02",
            success: function (locationRes) {
              Taro.hideLoading();
              let baiduLocation = LocationUtils.gcj2bd(locationRes);
              success(baiduLocation);
            },
            fail: function () {
              Taro.hideLoading();
              fail();
            },
          });
        };

        if (res.authSetting["scope.userLocation"]) {
          getLocationFunction();
        } else {
          Taro.authorize({
            scope: "scope.userLocation",
            success: getLocationFunction,
            fail() {
              Taro.showModal({
                title: "您必须为小程序开启位置权限",
                showCancel: false,
                success() {
                  Taro.openSetting();
                },
              });
            },
          });
        }
      },
    });
  }

  /**
   * 打开位置信息实时获取开关
   * uploadLocations: action (即请求)
   */
  static checkToStartBackgroundLocationUpdate(uploadLocations) {
    Taro.getSetting({
      success(res) {
        if (res.authSetting["scope.userLocationBackground"]) {
          LocationUtils.startLocationMonitorFunction(uploadLocations);
        } else {
          Taro.authorize({
            scope: "scope.userLocationBackground",
            success() {
              LocationUtils.startLocationMonitorFunction(uploadLocations);
            },
            complete() {
              Taro.showModal({
                title:
                  "请您为小程序把“位置信息”权限修改为“使用小程序期间和离开小程序后”",
                showCancel: false,
                success() {
                  Taro.openSetting();
                },
              });
            },
          });
        }
      },
    });
  }

  /**
   * 开始位置信息实时获取上报
   * uploadLocations: action (即请求)
   */
  static startLocationMonitorFunction(uploadLocations) {
    // uploadLocations 表示请求，在这里即为 action
    Taro.startLocationUpdateBackground();
    Taro.onLocationChange(function (locationRes) {
      const storedLocations = Taro.getStorageSync("BackgroundLocations") || [];
      const lastPoint = storedLocations[storedLocations.length - 1];
      const currentTime = new Date();

      // 如果想在开启位置信息实时上报的一开始，就上报一次位置信息，可在外部调用时，先设置此值
      // 即一开始不等60秒再上报
      if (Taro.getStorageSync("isFirst")) {
        uploadLocations({
          latitude: locationRes.latitude,
          longitude: locationRes.longitude,
          date: currentTime,
          showLoading: false,
        });
        Taro.removeStorageSync("isFirst");
      }

      /**
       * 微信自己的取点频率太高了，这里必须限制一下频率. 每30秒存一次位置，存两次（60秒）即发送位置信息给后台
       * 这里采用先存储到本地存储（且格式为数组）的原因是为了兼容两种需求。
       * 1. 如果有需求需要报点（即显示轨迹的需求），可将下方请求时的参数值更改为 storedLocations
       * 2. 只需要实时上报位置信息的，也可使用，无需修改（时间可根据项目需求自行调整）
       */
      if (!lastPoint || currentTime - new Date(lastPoint?.date) >= 30000) {
        storedLocations.push({
          latitude: locationRes.latitude,
          longitude: locationRes.longitude,
          date: currentTime,
        });
        // 实时存储位置信息（有需要可以自行开启）
        // Taro.setStorageSync('CurrentBackgroundLocation', {
        //   latitude: locationRes.latitude,
        //   longitude: locationRes.longitude,
        //   date: currentTime
        // });
      } else {
        return;
      }

      if (storedLocations.length > 2) {
        uploadLocations({
          latitude: locationRes.latitude,
          longitude: locationRes.longitude,
          date: currentTime,
          showLoading: false,
        });
        Taro.removeStorageSync("BackgroundLocations");
      } else {
        Taro.setStorageSync("BackgroundLocations", storedLocations);
      }
    });
  }

  /**
   * @param {Object} poi
   */
  static gcj2bd(poi) {
    let xPi = (3.14159265358979324 * 3000.0) / 180.0;
    var poi2 = {};
    var x = poi.longitude;
    let y = poi.latitude;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * xPi);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * xPi);
    poi2.longitude = z * Math.cos(theta) + 0.0065;
    poi2.latitude = z * Math.sin(theta) + 0.006;

    return poi2;
  }
}

export default LocationUtils;

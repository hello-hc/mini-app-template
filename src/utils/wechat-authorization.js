import Taro from "@tarojs/taro";

/**
 * 微信授权相关工具函数
 */
class WechatAuthorization {
  /**
   * 授权
   * @param {Object} data
   * login: action (即请求)
   * @param {Boolean} isPhoneLogin (是否为验证码登录)
   */
  static authorization(data, login, isPhoneLogin = true) {
    const loginToOurServer = () => {
      const code = Taro.getStorageSync("WxLoginCode");
      let params;
      if (isPhoneLogin) {
        params = {
          code,
          mobile: data.mobile,
          smsCode: data.activeCode,
        };
      } else {
        params = {
          code,
          iv: data.iv,
          encryptedData: data.encryptedData,
        };
      }
      login({
        ...params,
        callback: (result) => {
          const { token, type, mobile } = result;
          if (token && type && mobile) {
            Taro.setStorageSync("token", token);
            Taro.setStorageSync("userType", type);
            Taro.setStorageSync("mobile", mobile);

            // 获取到用户信息后跳转到首页
            Taro.reLaunch({ url: "/pages/index/index" });
          } else {
            Taro.showToast({ title: "登录失败", icon: "none" });
          }
        },
      });
    };

    Taro.clearStorageSync();
    this.checkSessionAndLogin(loginToOurServer);
  }

  /**
   * 检查会话和登录
   * @param {Function} callback
   */
  static checkSessionAndLogin(callback) {
    const wxLogin = function () {
      Taro.showLoading({ title: "登录中" });
      Taro.login({
        success: function (res) {
          Taro.hideLoading();
          Taro.setStorageSync("WxLoginCode", res.code);
          if (typeof callback === "function") {
            callback();
          }
        },
        fail: function () {
          Taro.hideLoading();
          Taro.showToast({ title: "登录失败", icon: "none" });
        },
      });
    };

    Taro.checkSession({
      success() {
        if (Taro.getStorageSync("WxLoginCode")) {
          if (typeof callback === "function") {
            callback();
          }
        } else {
          wxLogin();
        }
      },
      fail() {
        wxLogin();
      },
    });
  }
}

export default WechatAuthorization;

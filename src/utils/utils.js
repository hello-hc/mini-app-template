import Taro from "@tarojs/taro";

/**
 * 其他工具函数
 */
class Utils {
  /**
   * 轮询获取数据
   * @param {Function} fn
   * @param {Number} time
   */
  static setTimeoutGetData(fn, time) {
    const timer = setTimeout(async function timerFn() {
      const data = await fn();

      if (!data) {
        timer = setTimeout(timerFn, time);
      } else {
        clearTimeout(timer);
      }
    }, time);
  }

  /**
   * 获取当前元素距离顶部的高度（可包括状态栏和标题高度）
   * @param {Object} _this (this)
   * @param {String} id (DOM节点)
   * @param {String} heightName (自定义的高度属性名 -- 这里指的是当前DOM节点距离底部的剩余高度)
   * 注意：获取的高度单位均为px
   */
  static async getInfoOrRect(_this, id, heightName) {
    return await Taro.getSystemInfo()
      .then(async function(res) {
        const headerH = Taro.getMenuButtonBoundingClientRect();
        _this.statusBarHeight = res.statusBarHeight; // 状态栏高度
        _this.titleBarHeight =
          headerH.bottom + headerH.top - res.statusBarHeight * 2; // 标题高度

        const rect = Taro.createSelectorQuery()
          .select(id)
          .boundingClientRect();

        if (rect) {
          const domRect = await new Promise(function(resolve) {
            rect.exec(function(response) {
              const domData = response[0];
              if (domData) {
                resolve(domData);
                _this.setState({
                  [heightName]:
                    res.windowHeight -
                    domData.top -
                    res.statusBarHeight -
                    _this.titleBarHeight
                });
              } else {
                resolve();
              }
            });
          });

          return domRect;
        } else {
          return null;
        }
      })
      .catch(() => {
        return null;
      });
  }

  /**
   * 抽离的公共提示函数
   * @param {String} title
   * @param {Function} complete
   */
  static showToastFn(title = "请求错误", complete = () => {}) {
    Taro.showToast({
      title,
      icon: "none",
      duration: 2000,
      mask: true,
      complete
    });
  }
}

export default Utils;

import Taro from "@tarojs/taro";

/**
 * 数据持久化处理器（存: 异步处理, 取: 同步处理）
 */
class DataProcessorUtils {
  /**
   * 存储缓存 支持同时多个存储
   * @param {Object | String} key
   * @param {any} data
   */
  static set(key, data) {
    if (typeof key === "object") {
      Object.keys(key).forEach(item => {
        Taro.setStorage({ key: item, data: key[item] });
      });
    } else {
      Taro.setStorage({ key, data });
    }
  }

  /**
   * 读取缓存 key: 获取缓存的键, _default: 缓存中不存在返回默认值
   * @param {String} key
   * @param {any} _default
   */
  static get(key, _default = null) {
    return Taro.getStorageSync(key) ? Taro.getStorageSync(key) : _default;
  }

  /**
   * 删除缓存
   * data可选类型:
   * @param {String | Array | Object} data
   * @param {Function} successCallback
   */
  static remove(data, successCallback = () => {}) {
    if (data instanceof Array) {
      data.forEach(item => Taro.removeStorage(item));
    } else if (data instanceof Object) {
      Taro.removeStorage(data);
    } else {
      Taro.removeStorage({ key: data, success: successCallback });
    }
  }

  /**
   * 清空缓存
   */
  static clear() {
    Taro.clearStorage();
  }
}

export default DataProcessorUtils;

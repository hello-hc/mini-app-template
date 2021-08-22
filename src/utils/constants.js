/**
 * 常量定义文件
 */
class Constants {
  static get USER_TYPE() {
    return {
      CLIENT: "CLIENT",
      DEVELOPMENT: "DEVELOPMENT",
    };
  }

  static get INDEX_TABS_KEY() {
    return {
      CONFIRMED: 'CONFIRMED',
      UNCONFIRMED: 'UNCONFIRMED'
    };
  }

  static get INDEX_TABS_MSG() {
    return {
      [this.INDEX_TABS_KEY.CONFIRMED]: '已确认',
      [this.INDEX_TABS_KEY.UNCONFIRMED]: '未确认'
    };
  }
}

export default Constants;

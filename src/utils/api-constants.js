class APIConstants {
  static get COMMON_RESPONSE_STATUS() {
    return {
      SUCCESS: 200,
      SYSTEM_ABNORMAL_ERROR: 2000,
      TOKEN_INVALID: 3000,
    };
  }

  static COMMON_ERRORS_MSG_KEY(status) {
    const COMMON_RESPONSE_STATUS = this.COMMON_RESPONSE_STATUS;

    if (!status) {
      return '系统异常，请稍后再试!';
    }

    switch(status) {
      case COMMON_RESPONSE_STATUS.SYSTEM_ABNORMAL_ERROR:
        return '系统异常，请稍后再试!';
      case COMMON_RESPONSE_STATUS.TOKEN_INVALID:
        return 'Token失效!';
    }

    return '请求错误，请重试';
  }

}

export default APIConstants;

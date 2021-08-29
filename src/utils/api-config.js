class ApiConfig {
  static get API_INFO() {
    return {
      login: {
        path: "/user/login"
      },
      sendActiveCode: {
        path: "/user/sendActiveCode"
      },
      requestList: {
        path: "/index/list"
      }
    };
  }
}

export default ApiConfig;

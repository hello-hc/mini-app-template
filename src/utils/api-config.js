class ApiConfig {
  static get API_INFO() {
    return {
      login: {
        path: '/user/login',
      },
      getList: {
        path: '/user/list'
      }
    };
  }
};

export default ApiConfig;

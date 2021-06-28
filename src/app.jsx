import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import store from '@/store';
import ApiRequest from '@/utils/api-request';

import './app.scss';

const App  = () => {
  useEffect(() => {
    // 挂载后
    ApiRequest.setBaseUrl('http://localhost:3000');
  });

  return (
    <Provider store={store}>
      {this.props.children}
    </Provider>
  );
};

export default App;

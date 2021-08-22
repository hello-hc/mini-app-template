import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import store from '@/store';
import ApiRequest from '@/utils/api-request';

import './app.scss';

const App = (props) => {
  const {children} = props;

  useEffect(() => {
    // 挂载后
    ApiRequest.setBaseUrl('http://localhost:3000/mini/app');
  }, []);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default App;

import Taro from '@tarojs/taro';
import {axios} from 'taro-axios';
import {compile} from 'path-to-regexp';
import _ from 'lodash';

import APIConstants from '@/utils/api-constants';
import Utils from '@/utils/utils';

const {
  COMMON_RESPONSE_STATUS,
} = APIConstants;

let isShowToast = false;

// 配置代理服务器信息
const proxy = {
  protocol: 'http',
  host: "localhost", // 代理服务器地址
  port: 3000, // 端口
  // auth: { // auth认证信息，阿布云那边有，squid 的话不需要
  //     username: '',password: ''
  // }
};
// const _apiHost = 'localhost';
// const _apiPort = 3000;
let _baseUrlDic = {
  baseUrl: ''
};

function _setBaseUrl(url) {
  _baseUrlDic.baseUrl = url;
}

function _getBaseUrl() {
  return _baseUrlDic.baseUrl;
}

/**
 * 请求头
 */
const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  // Fixed IE cache request
  'pragma': 'no-cache',
  'cache-control': 'no-cache',
  //version: 1.1
};

/**
* example
* pathInfo: {path: '/user/:id', moduleType: 'xx'}
* keys: {id: '122'}
* queryParams: {key: value}
*
* return {path: '/user/122?key=value', moduleType}
*
* @param {*} path
* @param {*} keys
* @param {*} queryParams
*/
function _assemblePath(pathInfo, keys, queryParams) {
  const {path, ...others} = pathInfo;

  let result = path;

  try {
    const toPath = compile(path);
    result = toPath(keys);

    if (queryParams && _.isObject(queryParams)) {
      const query = Object.keys(queryParams)
       .filter(key => queryParams[key])
       .map(key => `${key}=${queryParams[key]}`)
       .join('&');

      result = `${result}?${query}`;
    }
  } catch (error) {
     console.error(`path: '${path}'`, error);
  }

  return {
    path: result,
    ...others
  };
}

function _getHeaders() {
  return {
    token: Taro.getStorageSync('token'),
    ...defaultHeaders,
    // moduleType: moduleType,
    // locale: CommonUtil.getLocale()
  };
}

/**
 * 供外部 post 请求调用
 */
function _post(url, params, ...rest) {
  console.log('请求方式：', 'POST');
  return _request(url, params, 'POST', ...rest);
}

/**
 * 供外部 get 请求调用
 */
function _get(url, params, ...rest) {
  console.log('请求方式：', 'GET');
  return _request(url, params, 'GET', ...rest);
}

/**
 * 供外部 put 请求调用
 */
function _put(url, params, ...rest) {
  console.log('请求方式：', 'PUT');
  return _request(url, params, 'PUT', ...rest);
}

/**
 * 供外部 delete 请求调用
 */
function _delete(url, params, ...rest) {
  console.log('请求方式：', 'DELETE');
  return _request(url, params, 'DELETE', ...rest);
}

/**
 * function: 封装网络请求
 * @url URL地址
 * @params 请求参数
 * @method 请求方式：GET/POST
 * @onSuccess 成功回调
 * @onFailed  失败回调
 * axios请求配置项: http://www.axios-js.com/zh-cn/docs/#%E8%AF%B7%E6%B1%82%E9%85%8D%E7%BD%AE
 */
function _request({path: url}, params = {}, method, {headers = null} = {}) {
  return new Promise(function(resolve, reject) {
    console.log('请求url：' + _baseUrlDic.baseUrl + url);
    console.log('请求头：', _getHeaders());
    console.log('请求参数：', params);
    let isShowLoading;

    if (!_.isArray(params)) {
      const {
        showLoading,
        ...otherParams
      } = params;

      // 默认显示，只有明确说不显示，才不显示。
      if (showLoading !== false && !isShowToast) {
        Taro.showLoading({
          title: '正在加载中...',
          mask: true
        });
      }
      params = otherParams;
      isShowLoading = showLoading;
    }

    axios({
      url: url,
      method,
      baseURL: _baseUrlDic.baseUrl,
      headers: {..._getHeaders(), ...headers},
      data: params,
      proxy: proxy,
      timeout: 60000, // 请求超时时长
    }).then(res => {
      if (isShowLoading !== false) {
        Taro.hideLoading();
      }
      console.log('响应：', res.data);
      if (
        res.status === 200
        && res.data
        && res.data.status === COMMON_RESPONSE_STATUS.SUCCESS
      ) {
        /**
         * status: 1000
         * data: 返回的数据
         */
        resolve(res.data);
      } else {
        /**
         * status: 错误码
         * message: 错误信息
         */
        handleCommonError(res.data, {resolve, reject});
      }
    }).catch(err => {
      Taro.hideLoading();
      reject(err);
    });
  });
}

/**
 * API错误处理
 */
function handleCommonError(errInfo, {resolve, reject}) {
  const {status, message} = errInfo;

  if (status) {
    if (status === COMMON_RESPONSE_STATUS.TOKEN_INVALID) {
      Taro.removeStorageSync('token');
      Taro.removeStorageSync('TaroLoginCode');
      Taro.redirectTo({ url: '/pages/sign-in/index' });
    } else {
      const msg = APIConstants.COMMON_ERRORS_MSG_KEY(status);
      isShowToast = true;

      Utils.showToastFn(msg ?? message, handleToastComplete);
    }
    resolve();
  } else {
    reject(errInfo);
  }
}

function handleToastComplete() {
  const time = setTimeout(() => {
    isShowToast = false;
    clearTimeout(time);
  }, 2000);
}

export default class ApiRequest {
  static get defaultHeaders() {
    return defaultHeaders;
  }

  static get getHeaders() {
    return _getHeaders();
  }

  static get baseUrlDic() {
    return _baseUrlDic;
  }

  static get getBaseUrl() {
    return _getBaseUrl();
  }

  static set setBaseUrl(url) {
    _setBaseUrl(url);
  }

  static assemblePath(pathInfo, keys, queryParams) {
    return _assemblePath(pathInfo, keys, queryParams);
  }

  static post(url, params, ...rest) {
    return _post(url, params, ...rest);
  }

  static get(url, params, ...rest) {
    return _get(url, params, ...rest);
  }

  static put(url, params, ...rest) {
    return _put(url, params, ...rest);
  }

  static delete(url, params, ...rest) {
    return _delete(url, params, ...rest);
  }
}

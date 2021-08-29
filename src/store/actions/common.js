import {
  USER_LOGOUT,
  LOADING_START,
  LOADING_END,
  SET_USER_INFO,
  SEND_ACTIVE_CODE,
  LOGIN,
  LOGIN_SUCCESS,
  GET_LIST,
  GET_LIST_SUCCESS
} from "../constants";

export const loadingStart = () => {
  return {
    type: LOADING_START
  };
};

export const loadingEnd = () => {
  return {
    type: LOADING_END
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT
  };
};

export const login = data => {
  return {
    type: LOGIN,
    data
  };
};

export const loginSuccess = data => {
  return {
    type: LOGIN_SUCCESS,
    data
  };
};

export const sendActiveCode = data => {
  return {
    type: SEND_ACTIVE_CODE,
    data
  };
};

export const setUserInfo = data => {
  return {
    type: SET_USER_INFO,
    data
  };
};

/** 首页 */
export const getList = data => {
  return {
    type: GET_LIST,
    data
  };
};

export const getListSuccess = data => {
  return {
    type: GET_LIST_SUCCESS,
    data
  };
};

import {
  REQUEST_LIST,
  REQUEST_LIST_SUCCESS,

  USER_LOGOUT,

  LOADING_START,
  LOADING_END,

  SET_USER_INFO,

  SEND_ACTIVE_CODE,
  LOGIN,
} from '../constants';

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

export const requestList = (data) => {
	return {
    type: REQUEST_LIST,
    data
	};
};

export const requestListSuccess = (data) => {
	return {
		type: REQUEST_LIST_SUCCESS,
		data
	};
};

export const userLogout = () => {
	return {
		type: USER_LOGOUT
	};
};

export const login = (data) => {
	return {
		type: LOGIN,
    data
	};
};

export const sendActiveCode = (data) => {
	return {
		type: SEND_ACTIVE_CODE,
    data
	};
};

export const setUserInfo = (data) => {
	return {
		type: SET_USER_INFO,
    data
	};
};

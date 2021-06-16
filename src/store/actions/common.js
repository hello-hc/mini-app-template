import {
  REQUEST_LIST,
  REQUEST_LIST_SUCCESS,
} from '../constants';

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

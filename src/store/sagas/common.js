import { call, put, take, actionChannel } from "redux-saga/effects";

import Utils from "@/utils/utils";
import { handleCommonError } from "@/utils/api-request";
import * as actions from "../actions";
import { REQUEST_LIST, SEND_ACTIVE_CODE, LOGIN } from "../constants";
import { CommonServices } from "../services";

export function* login() {
  const channel = yield actionChannel(LOGIN);

  while (true) {
    const action = yield take(channel);
    const {callback, ...params} = action.data;

    try {
      yield put(actions.loadingStart());
      const response = yield call(CommonServices.login, params);

      yield put(actions.loginSuccess(response.data));
      callback ? callback(response.data) : null;
    } catch (error) {
      handleCommonError(error, {title: "登录失败"});
    } finally {
      yield put(actions.loadingEnd());
    }
  }
}

export function* sendActiveCode() {
  const channel = yield actionChannel(SEND_ACTIVE_CODE);

  while (true) {
    const action = yield take(channel);

    try {
      yield call(CommonServices.sendActiveCode, action.data);

    } catch (error) {
      handleCommonError(error, {title: "获取验证码失败"});
    }
  }
}

export function* requestList() {
  const channel = yield actionChannel(REQUEST_LIST);

  while (true) {
    let action = yield take(channel);

    try {
      const { isClient, keyWord, ...params } = action.data;
      let response;
      yield put(actions.loadingStart());

      if (isClient) {
        response = yield call(CommonServices.requestDriverList, params);

        if (!response?.data?.curPage) {
          response.data.curPage = params.page;
        }
      } else {
        response = yield call(CommonServices.getTruckList, {
          keyWord,
          ...params,
        });
      }

      yield put(actions.requestListSuccess(response.data));
    } catch (error) {
      Utils.showToastFn("列表数据获取失败");
    } finally {
      yield put(actions.loadingEnd());
    }
  }
}

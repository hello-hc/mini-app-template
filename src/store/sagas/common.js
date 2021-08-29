import { call, put, take, actionChannel } from "redux-saga/effects";

// import Utils from "@/utils/utils";
import { handleCommonError } from "@/utils/api-request";
import * as actions from "../actions";
import { SEND_ACTIVE_CODE, LOGIN, GET_LIST } from "../constants";
import { CommonServices } from "../services";

export function* login() {
  const channel = yield actionChannel(LOGIN);

  while (true) {
    const action = yield take(channel);
    const { callback, ...params } = action.data;

    try {
      yield put(actions.loadingStart());
      const response = yield call(CommonServices.login, params);

      yield put(actions.loginSuccess(response.data));
      callback ? callback(response.data) : null;
    } catch (error) {
      handleCommonError(error, { title: "登录失败" });
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
      handleCommonError(error, { title: "获取验证码失败" });
    }
  }
}

export function* requestList() {
  const channel = yield actionChannel(GET_LIST);

  while (true) {
    const action = yield take(channel);

    try {
      yield put(actions.loadingStart());
      const response = yield call(CommonServices.requestList, action.data);

      yield put(actions.getListSuccess(response.data));
    } catch (error) {
      handleCommonError(error, { title: "获取列表数据失败" });
    } finally {
      yield put(actions.loadingEnd());
    }
  }
}

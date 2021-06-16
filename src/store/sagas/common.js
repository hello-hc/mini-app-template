import { call, put, take, actionChannel } from "redux-saga/effects";

import Utils from "@/utils/utils";
import * as actions from "../actions";
import { REQUEST_LIST } from "../constants";
import { CommonServices } from "../services";

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

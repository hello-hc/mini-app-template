import { all, fork } from "redux-saga/effects";

import { login, sendActiveCode, requestList } from "./common";

export default function* rootSaga() {
  yield all([
    fork(login),
    fork(sendActiveCode),
    fork(requestList),
  ]);
}

import { all, fork } from "redux-saga/effects";

import { requestList, login, sendActiveCode } from "./common";

export default function* rootSaga() {
  yield all([
    fork(requestList),
    fork(login),
    fork(sendActiveCode),
  ]);
}

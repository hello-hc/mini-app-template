import { all, fork } from "redux-saga/effects";

import { login, sendActiveCode } from "./common";

export default function* rootSaga() {
  yield all([
    fork(login),
    fork(sendActiveCode),
  ]);
}

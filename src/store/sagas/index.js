import { all, fork } from "redux-saga/effects";

import { requestList } from "./common";

export default function* rootSaga() {
  yield all([fork(requestList)]);
}

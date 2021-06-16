import { combineReducers } from "redux";

import * as commonReducer from "./common";
import { USER_LOGOUT } from "../constants";

const appReducer = combineReducers({
  common: combineReducers(commonReducer),
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = action.data;
  }

  return appReducer(state, action);
};

export default rootReducer;

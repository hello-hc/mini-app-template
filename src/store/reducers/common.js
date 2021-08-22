import {
  LOGIN_SUCCESS,
  SET_USER_INFO,
  LOADING_START,
  LOADING_END,
} from "@/store/constants";

export function loginResult(state = null, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.data;
    default:
      return state;
  }
}

export function userInfo(state = null, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return action.data;
    default:
      return state;
  }
}

export function loading(state = false, action) {
  switch (action.type) {
    case LOADING_START:
      return true;
    case LOADING_END:
      return false;
    default:
      return state;
  }
}

import {
  LOGIN_SUCCESS,
  SET_USER_INFO,
  LOADING_START,
  LOADING_END,
  GET_LIST_SUCCESS
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

export function listData(
  state = { list: [], pageSize: 1, hasMore: false },
  action
) {
  switch (action.type) {
    case GET_LIST_SUCCESS:
      const { list, hasMore, pageCount, pageSize, ...rest } = action.data;
      let allList = list || [];

      if (pageSize > 1) {
        allList = state.list?.concat(list) || [];
      }

      state = {
        pageCount,
        pageSize,
        list: allList,
        hasMore,
        ...rest
      };

      return state;
    default:
      return state;
  }
}

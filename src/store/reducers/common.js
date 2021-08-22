import {
  LOGIN_SUCCESS,
  SET_USER_INFO,
  LOADING_START,
  LOADING_END,
  REQUEST_LIST_SUCCESS,
} from "@/store/constants";

export function loginResult (state = null, action) {
	switch (action.type) {
		case LOGIN_SUCCESS:
      return action.data;
		default:
			return state;
	}
}


export function userInfo (state = null, action) {
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

export function requestListData(state = {}, action) {
  switch (action.type) {
    case REQUEST_LIST_SUCCESS:
      const {
        list,
        hasMore,
        count,
        curPage,
        totalTrucks,
        associatedDriverCounts,
        ...rest
      } = action.data;
      let allList = list || [];

      if (curPage > 1) {
        allList = state.list?.concat(list) || [];
      }

      state = {
        count: count || 0,
        page: curPage,
        list: allList,
        hasMore: hasMore,
        totalTrucks: totalTrucks || 0,
        totalDrivers: associatedDriverCounts || 0,
        loading: false,
        ...rest,
      };

      return state;
    default:
      return state;
  }
}

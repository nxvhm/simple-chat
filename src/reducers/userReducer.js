import types from './../actions/types';


export default function userReducer(state = false, action) {
  switch(action.type) {
    case types.GET_USER:
      return state;
    case types.GET_USER_SUCCESS:
      return action.user;
    case types.GET_USER_FAILURE:
      return false;
    default:
      return state;
  }
}

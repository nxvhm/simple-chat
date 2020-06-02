import types from './../actions/types';



export default function chatRoomReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_CHATROOM:
      console.log(action);
      return [...state, Object.assign({}, action)];
    case types.CREATE_CHATROOM_SUCCESS:
      return [...state, Object.assign({}, action.room)];
    case types.GET_CHATROOMS_LIST:
      return [...state, Object.assign({}, action.chatrooms)];
    case types.GET_CHATROOMS_SUCCESS:
      return action.chatrooms;
    default:
      return state;
  }
}

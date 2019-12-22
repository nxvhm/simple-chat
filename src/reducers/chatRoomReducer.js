import types from './../actions/types';

const initialState = [
  {id: 1221, name: 'test room 1'},
  {id: 432423, name: 'test room 2'}
];

export default function chatRoomReducer(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_CHATROOM:
      return [...state, Object.assign({}, action.chatRoom)]
      break;
    case types.GET_CHATROOMS_SUCCESS:
      return action.chatrooms;
      break;
    default:
      return state;
      break;
  }
}

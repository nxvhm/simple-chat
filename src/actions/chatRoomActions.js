import types from './types';
import api from './../services/Api/ChatRooms';

export function createChatRoom(chatRoom) {
  return (dispatch) => {
    return api.createChatRoom(chatRoom).then(room => {
      return dispatch(createChatRoomSuccess(room));
    }).catch(err => {
      throw err;
    });
  }
  // return {type: types.CREATE_CHATROOM, chatRoom};
}

export function createChatRoomSuccess(room) {
  return {type: types.CREATE_CHATROOM_SUCCESS, room};
}

export function getChatRooms(data = null) {
    return (dispatch) => {
      api.getChatRooms(data).then(chatrooms => {
        return dispatch(getChatRoomsSuccess(chatrooms));
      }).catch(err => {
        return dispatch(getChatRoomsFailure(err));
      });
    }
}

export function getChatRoomsSuccess(chatrooms) {
    return {type: types.GET_CHATROOMS_SUCCESS, chatrooms};
}

export function getChatRoomsFailure(err) {
  return {type: types.GET_CHATROOMS_FAILURE, err};
}

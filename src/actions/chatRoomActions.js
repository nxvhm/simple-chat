import types from './types';
import api from './../services/Api/ChatRooms';

export function createChatRoom(chatRoom) {
  return {type: types.CREATE_CHATROOM, chatRoom};
}

export function getChatRooms(data = null) {
    return (dispatch) => {
      return api.getChatRooms(data).then(chatrooms => {
        return dispatch(getChatRoomsSuccess(chatrooms));
      }).catch(err => {
        throw err;
      });
    }
}

export function getChatRoomsSuccess(chatrooms) {
    return {type: types.GET_CHATROOMS_SUCCESS, chatrooms};
}


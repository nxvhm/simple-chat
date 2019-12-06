import {combineReducers} from 'redux';
import chatRooms from './chatRoomReducer';
import user from './userReducer';

const RootReducer = combineReducers({
  chatRooms, user
});

export default RootReducer

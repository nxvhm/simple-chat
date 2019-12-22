import types from './types';
import Auth from './../services/Auth';

export function getUser() {
  return (dispatch) => {
    Auth.check().then(user => {
      return user
        ? dispatch(getUserSuccess(user))
        : dispatch(getUserFailure());
    });
  }
}

export function getUserSuccess(user) {
  return {type: types.GET_USER_SUCCESS, user};
}

export function getUserFailure() {
  return {type: types.GET_USER_FAILURE};
}

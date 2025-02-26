import * as actionTypes from '../constants';

export function setLoggedIn() {
  return { type: actionTypes.SET_LOGGED_IN };
}

export function setLoggedOut() {
  return { type: actionTypes.SET_LOGGED_OUT };
}

export function setUser(user) {
  return {
    type: actionTypes.SET_USER,
    payload: user,
  };
}

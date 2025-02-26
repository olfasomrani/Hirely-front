import * as actionTypes from '../constants';

export default function auth(state = { isLoggedIn: false, user: { type: 'ANONYMOUS' } }, action) {
  switch (action.type) {
    case actionTypes.SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case actionTypes.SET_LOGGED_OUT:
      return {
        user: { type: 'ANONYMOUS' },
        isLoggedIn: false,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

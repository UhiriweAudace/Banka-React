import {SIGNIN_SUCCESS,SIGNIN_FAIL} from '../types';
const initialState ={
  login:{},
  isLoggedIn: false,
  errors:{}
}
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        login: payload,
        isLoggedIn: true
      }
    case SIGNIN_FAIL:
      return {
        ...state,
        errors: payload
      }
    default:
      return state;
  }
}

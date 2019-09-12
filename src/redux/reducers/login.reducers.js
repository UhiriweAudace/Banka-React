import {SIGNIN_SUCCESS,SIGNIN_FAIL, SET_CURRENT_USER} from '../types';
import isEmpty from '../../utils/isEmpty';
const initialState ={
  login:{},
  isLoggedIn: false,
  isAuthenticated: false,
  user: {},
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
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(payload),
        user: payload
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

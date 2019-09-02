import {SIGNUP_SUCCESS,SIGNUP_FAIL} from '../types';
const initialState ={
  signup:{},
  errors:{}
}
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signup: payload
      }
    case SIGNUP_FAIL:
      return {
        ...state,
        errors: payload
      }
    default:
      return state;
  }
}

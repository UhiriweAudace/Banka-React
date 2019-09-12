import {CREATE_ACCOUNT_FAIL, CREATE_ACCOUNT_SUCCESS, GET_ACCOUNT_FAIL,GET_ACCOUNT_SUCCESS} from '../types';
const initialState ={
  accountData:{},
  accounts: [],
  errors:{}
}
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        accountData: payload
      }
    case CREATE_ACCOUNT_FAIL:
      return {
        ...state,
        errors: payload
      }
    case GET_ACCOUNT_SUCCESS:
      return {
        ...state,
        accounts: payload
      }
    case GET_ACCOUNT_FAIL:
      return {
        ...state,
        errors: payload,
      }
    default:
      return state;
  }
}

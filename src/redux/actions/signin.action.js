import axios from 'axios';
import JWT from 'jwt-decode';
import { SIGNIN_FAIL, SIGNIN_SUCCESS, SET_CURRENT_USER} from '../types';
import {toast} from 'react-toastify';

export const signin = (data) => async dispatch =>{

  const headers ={
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':'Origin,X-Requested-With,Content,Accepted,Content-Type,Authorization',
    'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, PATCH ,OPTIONS'
  };
  await axios.post('https://api-banka-app.herokuapp.com/api/v1/auth/signin', data, {headers})
    .then(result =>{
      dispatch({
        type: SIGNIN_SUCCESS,
        payload:result.data
      })
      // save Token to SESS Storage
      sessionStorage.setItem('token',result.data.data.token);
      /* istanbul ignore next */
      toast.success(`::::: ${result.data.message} :::::`);
      /* istanbul ignore next */
      const decoded =JWT(result.data.data.token);
      /* istanbul ignore next */
      dispatch( setCurrentUser(decoded));
    })
    .catch(error =>{
      dispatch({
        type: SIGNIN_FAIL,
        payload: error.response
      })
    });
};

export const setCurrentUser = (decodedUser) =>{
  return {
    type: SET_CURRENT_USER,
    payload: decodedUser
  }
}

/* istanbul ignore next */
export const logOutUser = ()=> dispatch =>{
  /* istanbul ignore next */
  sessionStorage.removeItem('token');
  /* istanbul ignore next */
  dispatch(setCurrentUser({}));
}
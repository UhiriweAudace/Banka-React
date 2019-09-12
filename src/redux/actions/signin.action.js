import axios from 'axios';
import JWT from 'jwt-decode';
import { SIGNIN_FAIL, SIGNIN_SUCCESS, SET_CURRENT_USER} from '../types';
import {toast} from 'react-toastify';
import setAuthToken from '../../utils/setAuthToken';

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
      // display a success LOGIN Message
      toast.success(`::::: ${result.data.message} :::::`);
      // set Auth Header to request
      setAuthToken(result.data.data.token);
      // decode the token for getting user data
      const decoded =JWT(result.data.data.token);
      // set Current User
      dispatch( setCurrentUser(decoded));
    })
    .catch(error =>{
      dispatch({
        type: SIGNIN_FAIL,
        payload: error.response.data
      })
    });
};

export const setCurrentUser = (decodedUser) =>{
  return {
    type: SET_CURRENT_USER,
    payload: decodedUser
  }
}

export const logOutUser = ()=> dispatch =>{
  sessionStorage.removeItem('token');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
}
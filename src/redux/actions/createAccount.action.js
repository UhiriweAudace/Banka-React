import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {toast} from 'react-toastify';

import { CREATE_ACCOUNT_FAIL, CREATE_ACCOUNT_SUCCESS} from '../types';

export const createAccount = (data,history) => async dispatch =>{
  // set Auth Header to request
  setAuthToken(sessionStorage.getItem('token'));
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':'Origin,X-Requested-With,Content,Accepted,Content-Type,Authorization',
    'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, PATCH ,OPTIONS',
    'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
  }
  await axios.post('https://api-banka-app.herokuapp.com/api/v1/accounts', data, {headers})
    .then(result =>{
      dispatch({
        type: CREATE_ACCOUNT_SUCCESS,
        payload:result.data
      })
      toast.success('   Account created Successfully!');
      window.location.href='/accounts';
    })
    .catch(error =>{
      dispatch({
        type: CREATE_ACCOUNT_FAIL,
        payload: error.response
      })
    });
};
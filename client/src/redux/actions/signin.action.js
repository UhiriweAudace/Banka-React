import axios from 'axios';
import { SIGNIN_FAIL, SIGNIN_SUCCESS} from '../types';
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
      toast.success(`::::: ${result.data.message} :::::`)
    })
    .catch(error =>{
      dispatch({
        type: SIGNIN_FAIL,
        payload: error.response.data
      })
    });
};
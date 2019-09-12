import axios from 'axios';
// import {toast} from 'react-toastify';

import { SIGNUP_FAIL, SIGNUP_SUCCESS} from '../types';

export const signup = (data) => async dispatch =>{

  await axios.post('https://api-banka-app.herokuapp.com/api/v1/auth/signup', data)
    .then(result =>{
      dispatch({
        type: SIGNUP_SUCCESS,
        payload:result.data
      })
      window.location.href='/auth/signin';
      // toast.success(`::::: ${result.data.message} :::::`)
    })
    .catch(error =>{
      dispatch({
        type: SIGNUP_FAIL,
        payload: error.response
      })
    });
};
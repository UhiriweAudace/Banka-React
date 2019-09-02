import axios from 'axios';
import { SIGNUP_FAIL, SIGNUP_SUCCESS} from '../types';

export const signup = (data) => async dispatch =>{

  await axios.post('https://api-banka-app.herokuapp.com/api/v1/auth/signup', data)
    .then(result =>{
      dispatch({
        type: SIGNUP_SUCCESS,
        payload:result.data
      })
    })
    .catch(error =>{
      dispatch({
        type: SIGNUP_FAIL,
        payload: error.response
      })
    });
};
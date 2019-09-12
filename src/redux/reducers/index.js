import { combineReducers } from 'redux';
import loginReducer from './login.reducers';
import signupReducer from './signup.reducer';
import accountReducer from './account.reducer';

export default combineReducers({
  login: loginReducer,
  signup: signupReducer,
  account: accountReducer,
});
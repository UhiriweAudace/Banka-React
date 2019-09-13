import { SIGNIN_FAIL, SIGNIN_SUCCESS } from '../../../src/redux/types';
import loginReducer from '../../../src/redux/reducers/login.reducers';

describe('SIGNIN Reducers', () => {
  test('should return an object once received a type of SIGNIN_FAIL', () => {
    const data = {
      status: 400,
      message: 'email is not yet registered!'
    };
    const response = {
      login: {},
      isLoggedIn: false,
      isAuthenticated: false,
      user: {},
      errors: { status: 400, message: 'email is not yet registered!' }
    };
    const newState = loginReducer(undefined, {
      type: SIGNIN_FAIL,
      payload: data
    });
    expect(newState).toEqual(response);
  });
});

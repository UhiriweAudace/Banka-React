import {
  SIGNIN_FAIL,
  SIGNIN_SUCCESS,
  SET_CURRENT_USER
} from '../../../src/redux/types';
import loginReducer from '../../../src/redux/reducers/login.reducers';

describe('SIGNIN Reducers', () => {
  test('should return initial State', () => {
    const response = {
      login: {},
      isLoggedIn: false,
      isAuthenticated: false,
      user: {},
      errors: {}
    };
    const newState = loginReducer(undefined, {});
    expect(newState).toEqual(response);
  });

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

  test('should return an object once received a type of SIGNIN_SUCCESS', () => {
    const data = {
      status: 200,
      data: {
        status: 200,
        message: 'User login successed!',
        data: {
          token: 'fafasfdas',
          id: 1,
          firstname: 'Uhiriwe'
        }
      }
    };
    const response = {
      login: {
        status: 200,
        data: {
          status: 200,
          message: 'User login successed!',
          data: {
            token: 'fafasfdas',
            id: 1,
            firstname: 'Uhiriwe'
          }
        }
      },
      isLoggedIn: true,
      isAuthenticated: false,
      user: {},
      errors: {}
    };
    const newState = loginReducer(undefined, {
      type: SIGNIN_SUCCESS,
      payload: data
    });
    expect(newState).toEqual(response);
  });
  test('should return an object once received a type of SET_CURRENT_USER', () => {
    const data = {
      status: 200,
      data: {
        id: 1,
        firstname: 'Uhiriwe'
      }
    };
    const response = {
      login: {},
      isLoggedIn: false,
      isAuthenticated: true,
      user: { status: 200, data: { id: 1, firstname: 'Uhiriwe' } },
      errors: {}
    };
    const newState = loginReducer(undefined, {
      type: SET_CURRENT_USER,
      payload: data
    });
    expect(newState).toEqual(response);
  });
});

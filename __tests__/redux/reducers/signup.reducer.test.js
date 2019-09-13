import { SIGNUP_FAIL, SIGNUP_SUCCESS } from '../../../src/redux/types';
import signupReducer from '../../../src/redux/reducers/signup.reducer';

describe('SIGNUP Reducers', () => {
  test('should return initial State', () => {
    const response = {
      signup: {},
      errors: {}
    };
    const newState = signupReducer(undefined, {});
    expect(newState).toEqual(response);
  });

  test('should return an object once received a type of SIGNUP_FAIL', () => {
    const data = {
      status: 400,
      message: 'email already exist!'
    };
    const response = {
      signup:{},
      errors: { status: 400, message: 'email already exist!' }
    };
    const newState = signupReducer(undefined, {
      type: SIGNUP_FAIL,
      payload: data
    });
    expect(newState).toEqual(response);
  });

  test('should return an object once received a type of SIGNUP_SUCCESS', () => {
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
      signup: {
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
      errors: {}
    };
    const newState = signupReducer(undefined, {
      type: SIGNUP_SUCCESS,
      payload: data
    });
    expect(newState).toEqual(response);
  });
  
});

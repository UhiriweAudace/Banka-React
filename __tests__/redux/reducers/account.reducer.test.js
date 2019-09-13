import {
  CREATE_ACCOUNT_FAIL,
  CREATE_ACCOUNT_SUCCESS,
  GET_ACCOUNT_FAIL,
  GET_ACCOUNT_SUCCESS
} from '../../../src/redux/types';
import accountReducer from '../../../src/redux/reducers/account.reducer';
describe('ACCOUNT Reducers', () => {
  test('should return initial State', () => {
    const response = {
      accountData: {},
      accounts: [],
      errors: {}
    };
    const newState = accountReducer(undefined, {});
    expect(newState).toEqual(response);
  });

  test('should return an object once received a type of CREATE_ACCOUNT_FAIL', () => {
    const data = {
      status: 400,
      message: 'account already exist!'
    };
    const response = {
      accountData: {},
      accounts: [],
      errors: { status: 400, message: 'account already exist!' }
    };
    const newState = accountReducer(undefined, {
      type: CREATE_ACCOUNT_FAIL,
      payload: data
    });
    expect(newState).toEqual(response);
  });

  test('should return an object once received a type of CREATE_ACCOUNT_SUCCESS', () => {
    const data = {
      data: {
        status: 201,
        message: 'account created  successfully!',
        account: {}
      }
    };
    const response = {
      accountData: {
        data: {
          status: 201,
          message: 'account created  successfully!',
          account: {}
        }
      },
      accounts: [],
      errors: {}
    };
    const newState = accountReducer(undefined, {
      type: CREATE_ACCOUNT_SUCCESS,
      payload: data
    });
    expect(newState).toEqual(response);
  });
});

describe('GET ACCOUNT Reducers', () => {
  
  test('should return an object once received a type of GET_ACCOUNT_FAIL', () => {
    const data = {
      status: 400,
      message: 'account not found!'
    };
    const response = { accountData: {},
    accounts: [],
    errors: { status: 400, message: 'account not found!' } }
    const newState = accountReducer(undefined, {
      type: GET_ACCOUNT_FAIL,
      payload: data
    });
    expect(newState).toEqual(response);
  });

  test('should return an object once received a type of GET_ACCOUNT_SUCCESS', () => {
    const data = {
      data: {
        status: 200,
        message: 'account created  successfully!',
        accounts: []
      }
    };
    const response = { accountData: {},
    accounts:
     { data:
        { status: 200,
          message: 'account created  successfully!',
          accounts: [] } },
    errors: {} }
    const newState = accountReducer(undefined, {
      type: GET_ACCOUNT_SUCCESS,
      payload: data
    });
    expect(newState).toEqual(response);
  });
});

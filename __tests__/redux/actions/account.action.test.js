import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  createAccount,
  getAllAccounts
} from '../../../src/redux/actions/account.action';
import {
  CREATE_ACCOUNT_FAIL,
  CREATE_ACCOUNT_SUCCESS,
  GET_ACCOUNT_FAIL,
  GET_ACCOUNT_SUCCESS
} from '../../../src/redux/types';
import { toast } from 'react-toastify';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const store = mockStore({});
describe('ACCOUNT ACTIONS', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('should create a bank account', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          message: 'account created successfully'
        }
      });
    });
    const data = {
      type: 'saving'
    };

    expect(toast.success('Account created Successfully!').length).toEqual(10);
    return store.dispatch(createAccount(data)).then(() => {
      expect(store.getActions()[0].type).toEqual(CREATE_ACCOUNT_SUCCESS);
    });
  });

  test('should return an error once you provide the wrong information', async () => {
    moxios.stubRequest('https://api-banka-app.herokuapp.com/api/v1/accounts', {
      status: 400,
      response: {
        status: 400,
        data: {
          error: 'wrong account type!'
        }
      }
    });
    return store.dispatch(createAccount({})).then(() => {
      expect(store.getActions()[1].type).toEqual(CREATE_ACCOUNT_FAIL);
    });
  });
});

describe('GET ACCOUNTS ACTIONS', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });


  test('should return an array which holds the accounts data owned by a certain user', async () => {

    moxios.stubRequest('https://api-banka-app.herokuapp.com/api/v1/accounts', {
      status: 200,
      response: {
        status: 200,
        data: []
      }
    });
    return store.dispatch(getAllAccounts()).then(() => {
      expect(store.getActions()[2].type).toEqual(GET_ACCOUNT_SUCCESS);
    });
  });

  test('should return an error once No accounts found', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          status: 404,
          data: {
            error: 'No account found!'
          }
        }
      });
    });
    return store.dispatch(getAllAccounts()).then(() => {
      expect(store.getActions()[3].type).toEqual(GET_ACCOUNT_FAIL);
    });
  });

});

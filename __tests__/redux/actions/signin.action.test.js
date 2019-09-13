import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { toast } from 'react-toastify';
import {
  SIGNIN_FAIL,
  SIGNIN_SUCCESS,
  SET_CURRENT_USER
} from '../../../src/redux/types';
import {
  signin,
  setCurrentUser,
  logOutUser
} from '../../../src/redux/actions/signin.action';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const store = mockStore({});

describe('SIGNIN Actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('should redirect you once login succeeded', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          message: 'Login Succeeded'
        }
      });
    });
    const data = {
      email: 'u.audace@gmail.com',
      password: 'Uhiriwe@p2222'
    };

    store.dispatch(setCurrentUser(data));
    expect(toast.success('login successfully').length).toEqual(10);
    return store.dispatch(signin(data)).then(() => {
      expect(store.getActions()[0].type).toEqual(SET_CURRENT_USER);
      expect(store.getActions()[1].type).toEqual(SIGNIN_SUCCESS);
    });
  });

  test('should set the current logged in USER', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          message: 'Login Succeeded'
        }
      });
    });
    const data = {
      id: 1,
      email: 'u.audace@gmail.com'
    };
    const response = {
      type: 'SET_CURRENT_USER',
      payload: { id: 1, email: 'u.audace@gmail.com' }
    };
    const setCurrentUser1 = store.dispatch(setCurrentUser(data));
    expect(setCurrentUser1).toEqual(response);
  });
  test('should return an error once you provided the wrong credential', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          message: 'Login Succeeded'
        }
      });
    });
    moxios.stubRequest(
      'https://api-banka-app.herokuapp.com/api/v1/auth/signin',
      {
        status: 400,
        response: {
          status: 400,
          //message: 'email is not yet registered!',
          data: {
            error: 'email is not yet registered!'
          }
        }
      }
    );
    return store.dispatch(signin({})).then(() => {
      expect(store.getActions()[2].type).toEqual(SIGNIN_FAIL);
    });
  });
});

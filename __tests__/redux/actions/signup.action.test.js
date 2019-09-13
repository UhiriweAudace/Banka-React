import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { toast } from 'react-toastify';
import { SIGNUP_FAIL, SIGNUP_SUCCESS } from '../../../src/redux/types';
import {signup} from '../../../src/redux/actions/signup.action';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const store = mockStore({});

describe('SIGNUP Actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('should redirect to login once signup succeeded', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          message: 'signup Succeeded'
        }
      });
    });
    const data = {
      email: 'u.audace@gmail.com',
      password: 'Uhiriwe@p2222',
      firstname: 'Uhiriwe',
      lastname:'Audace'
    };

    expect(toast.success('signup successfully').length).toEqual(10);
    return store.dispatch(signup(data)).then(() => {
      expect(store.getActions()[0].type).toEqual(SIGNUP_SUCCESS);
    });
  });

  
  test('should return an error once an already email registered', async () => {
 
    moxios.stubRequest(
      'https://api-banka-app.herokuapp.com/api/v1/auth/signup',
      {
        status: 400,
        response: {
          status: 400,
          data: {
            error: 'email already exist!'
          }
        }
      }
    );
    return store.dispatch(signup({})).then(() => {
      expect(store.getActions()[1].type).toEqual(SIGNUP_FAIL);
    });
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Signin } from '../../src/components/Signin';

let wrapper;
describe('Signin Page', () => {
  test('It should render the Login Page', () => {
    const props = {
      login: {
        errors: { message: 'successfully login' }
      },
      history: {
        push: jest.fn()
      },
      signin: jest.fn()
    };
    wrapper = shallow(<Signin {...props} />);
    expect(wrapper.length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });

  test('It should allow users to enter their email and their password', () => {
    const email = wrapper.find('input[type="text"]');
    const password = wrapper.find('input[type="password"]');
    email.simulate('change', {
      target: { value: 'u.audace@gmail.com', name: 'email' }
    });
    password.simulate('change', {
      target: { value: 'Uhiriwe@2222', name: 'password' }
    });
    expect(wrapper.state('email')).toEqual('u.audace@gmail.com');
    expect(wrapper.state('password')).toEqual('Uhiriwe@2222');
  });
});
describe('submit button test...', () => {
  test('User will be able to click on submit button and send an action', () => {
    let submitButton;
    const preventDefault = jest.fn();
    submitButton = wrapper.find('button[type="submit"]');
    submitButton.simulate('click', { preventDefault });
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(preventDefault).toBeCalled();
  });
});

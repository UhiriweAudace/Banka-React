import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Signup } from '../../src/components/Signup';

let wrapper;
describe('Signup Page', () => {
  test('It should render the Signup Page', () => {
    const props = {
      signup: {
        errors: { message: 'Signup successfully' }
      },
      history: {
        push: jest.fn()
      },
      signup: jest.fn()
    };
    wrapper = shallow(<Signup {...props} />);
    expect(wrapper.length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });

  test('It should allow users to enter his/her information', () => {
    const email = wrapper.find('#email');
    const password = wrapper.find('#password');
    const firstName = wrapper.find('#firstname');
    const lastName = wrapper.find('#lastname');
    const address = wrapper.find('#address');
    
    email.simulate('change', {
      target: { value: 'u.audace@gmail.com', name: 'email' }
    });
    password.simulate('change', {
      target: { value: 'Uhiriwe@2222', name: 'password' }
    });
    firstName.simulate('change', {
      target: { value: 'Audace', name: 'firstname' }
    });
    lastName.simulate('change', {
      target: { value: 'Uhiriwe', name: 'lastname' }
    });
    address.simulate('change', {
      target: { value: 'Kigali', name: 'address' }
    });
    expect(wrapper.state('email')).toEqual('u.audace@gmail.com');
    expect(wrapper.state('password')).toEqual('Uhiriwe@2222');
    expect(wrapper.state('firstname')).toEqual('Audace');
    expect(wrapper.state('lastname')).toEqual('Uhiriwe');
    expect(wrapper.state('address')).toEqual('Kigali');
  });
});
describe('submit button test...', () => {
  test('User will be able to click on submit button and send an action', () => {
    let submitButton;
    const preventDefault = jest.fn();
    submitButton = wrapper.find('#register');
    submitButton.simulate('click', { preventDefault });
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(preventDefault).toBeCalled();
  });
});

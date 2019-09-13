import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { CreateAccount } from '../../src/components/CreateAccount';

let wrapper;
describe('Signup Page', () => {
  test('It should render the CreateAccount Page', () => {
    const props = {
      login: {
        isAuthenticated: true
      },
      account: {
        message: 'account created successfully' 
      },
      history: {
        push: jest.fn()
      },
      createAccount: jest.fn()
    };
    wrapper = shallow(<CreateAccount {...props} />);
    expect(wrapper.length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });

  test('It should allow users to enter his/her information', () => {
    const id = wrapper.find('#id');
    const countryResidence = wrapper.find('#country-residence');
    const countryBirth = wrapper.find('#countryBirth');
    const DateOfBirth = wrapper.find('#DateOfBirth');
    const currency = wrapper.find('#currency');
    const phone = wrapper.find('#phone');
    const accountType = wrapper.find('#account-type');
    
    id.simulate('change', {
      target: { value: '42352', name: 'nationalId' }
    });
    countryResidence.simulate('change', {
      target: { value: 'Rwanda', name: 'countryResidence' }
    });
    countryBirth.simulate('change', {
      target: { value: 'Rwanda', name: 'countryBirth' }
    });
    DateOfBirth.simulate('change', {
      target: { value: '12-09-1888', name: 'DateOfBirth' }
    });
    currency.simulate('change', {
      target: { value: 'RWf', name: 'currency' }
    });
    phone.simulate('change', {
      target: { value: '6543463', name: 'phone' }
    });
    accountType.simulate('change', {
      target: { value: '00986543463', name: 'accountType' }
    });
    expect(wrapper.state('nationalId')).toEqual('42352');
    expect(wrapper.state('countryResidence')).toEqual('Rwanda');
    expect(wrapper.state('countryBirth')).toEqual('Rwanda');
    expect(wrapper.state('DateOfBirth')).toEqual('12-09-1888');
    expect(wrapper.state('currency')).toEqual('RWf');
    expect(wrapper.state('phone')).toEqual('6543463');
    expect(wrapper.state('accountType')).toEqual('00986543463');
  });
});
describe('submit button test...', () => {
  test('User will be able to click on submit button and send an action', () => {
    let submitButton;
    const preventDefault = jest.fn();
    submitButton = wrapper.find('#create');
    submitButton.simulate('click', { preventDefault });
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(preventDefault).toBeCalled();
  });
});

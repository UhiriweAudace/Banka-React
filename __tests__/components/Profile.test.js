import React from 'react';
import { shallow } from 'enzyme';
import { Profile } from '../../src/components/Profile';
import {capitalize} from '../../src/utils/capitalize';

let wrapper;
describe('PROFILE Page', () => {
  test('It should render the Profile Page', () => {
    const props = {
      login: { 
        message: 'login successfully',
        user: {firstname: 'kate', lastname: 'joshua'}
       },
      history: {
        push: jest.fn()
      },
      signup: jest.fn()
    };
    wrapper = shallow(<Profile {...props} />);
    expect(wrapper.length).toEqual(1);
    expect(capitalize('audace')).toEqual('Audace');
    expect(wrapper).toMatchSnapshot();
  });
});

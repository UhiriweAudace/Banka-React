import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../src/components/Home';

let wrapper;
describe('Home Page', () => {
  test('It should render the Home Page', () => {
    const props = {
      login: { message: 'user is not logged in' },
      history: {
        push: jest.fn()
      },
      signup: jest.fn()
    };
    wrapper = shallow(<Home {...props} />);
    expect(wrapper.length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
})

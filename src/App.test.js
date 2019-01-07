import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App /> component', () => {
  const wrapper = shallow(<App />);

  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});

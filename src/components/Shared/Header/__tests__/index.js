import React from 'react';
import { shallow } from 'enzyme';
import Header from '../index';

describe('<Header /> component', () => {
  const wrapper = shallow(<Header />);

  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with the correct class', () => {
    expect(wrapper.hasClass('header')).toBe(true);
  });
});

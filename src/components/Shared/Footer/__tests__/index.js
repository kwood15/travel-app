import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../index';

describe('<Footer /> component', () => {
  const wrapper = shallow(<Footer />);

  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with the correct class', () => {
    expect(wrapper.hasClass('footer')).toBe(true);
  });
});

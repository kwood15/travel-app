import React from 'react';
import { mount } from 'enzyme';
import { Badge } from '../index';

describe('<Badge /> component', () => {
  const wrapper = mount(<Badge className="testClass">test</Badge>);

  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with the default class', () => {
    expect(wrapper.find('span').hasClass('badge')).toBe(true);
  });

  it('should accept a {className} prop that receives a string value', () => {
    expect(wrapper.find('.badge').hasClass('testClass')).toBe(true);
  });

  it('should render with children', () => {
    expect(wrapper.prop('children')).toEqual('test');
  });
});

import React from 'react';
import { mount } from 'enzyme';
import SearchWidgetList from '../SearchWidgetList';
import { Badge } from '../../Shared/Badge';

describe('<SearchWidgetList /> component', () => {
  const locations = [
    {
      country: 'Spain',
      city: 'Málaga',
      bookingId: 'airport-31896',
      placeType: 'C',
      placeKey: '1472052',
      iata: 'AGP',
      name: 'Malaga Airport',
      region: 'Andalucía'
    },
    {
      placeType: 'A',
      placeKey: '1472053'
    },
    {
      placeType: 'Z',
      placeKey: '1472058'
    },
    {
      placeType: 'T',
      placeKey: '1472054'
    },
    {
      placeType: 'D',
      placeKey: '1472057'
    },
    {
      placeType: 'P',
      placeKey: '1472051'
    }
  ];

  const wrapper = mount(
    <SearchWidgetList locations={locations} locationsVisible />
  );

  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render a <Badge /> component with the correct {className} and {children} prop values passed in', () => {
    expect(
      wrapper
        .find(Badge)
        .at(0)
        .prop('children')
    ).toEqual('City');
    expect(
      wrapper
        .find(Badge)
        .at(0)
        .prop('className')
    ).toEqual('badge--city');

    expect(
      wrapper
        .find(Badge)
        .at(1)
        .prop('children')
    ).toEqual('Airport');
    expect(
      wrapper
        .find(Badge)
        .at(1)
        .prop('className')
    ).toEqual('badge--airport');
    expect(
      wrapper
        .find(Badge)
        .at(2)
        .prop('children')
    ).toEqual('Place');
    expect(
      wrapper
        .find(Badge)
        .at(2)
        .prop('className')
    ).toEqual('badge--place');
    expect(
      wrapper
        .find(Badge)
        .at(3)
        .prop('children')
    ).toEqual('Station');
    expect(
      wrapper
        .find(Badge)
        .at(3)
        .prop('className')
    ).toEqual('badge--station');
    expect(
      wrapper
        .find(Badge)
        .at(4)
        .prop('children')
    ).toEqual('District');
    expect(
      wrapper
        .find(Badge)
        .at(4)
        .prop('className')
    ).toEqual('badge--district');

    expect(
      wrapper
        .find(Badge)
        .at(5)
        .prop('children')
    ).toEqual('Region');
    expect(
      wrapper
        .find(Badge)
        .at(5)
        .prop('className')
    ).toEqual('badge--region');
  });

  it('should not render a badge if a place type is set to null', () => {
    expect(
      wrapper
        .find(Badge)
        .at(6)
        .exists()
    ).toBe(false);
  });
});

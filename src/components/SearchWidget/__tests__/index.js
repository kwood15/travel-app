import React from 'react';
import { shallow } from 'enzyme';
import { debounce } from '../../../helpers/debounce';
import SearchWidget from '../index';
import SearchWidgetList from '../SearchWidgetList';

describe('<SearchWidget /> component', () => {
  describe('A successful request to the api', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.useFakeTimers();
    });

    fetch.mockResponseOnce(
      JSON.stringify({
        results: {
          docs: [
            {
              country: 'Spain',
              city: 'Málaga',
              bookingId: 'airport-31896',
              placeType: 'A',
              placeKey: '1472052',
              iata: 'AGP',
              name: 'Malaga Airport',
              region: 'Andalucía'
            },
            {
              country: 'Spain',
              city: 'Palma de Mallorca',
              bookingId: 'airport-30471',
              placeType: 'A',
              placeKey: '1472056',
              iata: 'PMI',
              name: 'Palma de Mallorca Airport',
              region: 'Balearic Islands'
            },
            {
              country: 'Spain',
              city: 'Madrid',
              bookingId: 'airport-31836',
              placeType: 'A',
              placeKey: '1472051',
              iata: 'MAD',
              name: 'Madrid Airport',
              region: 'Community of Madrid'
            },
            {
              country: 'Italy',
              city: 'Milan',
              bookingId: 'airport-21386',
              placeType: 'A',
              placeKey: '1472302',
              iata: 'MXP',
              name: 'Milan Malpensa Airport',
              region: 'Lombardy'
            },
            {
              country: 'France',
              city: 'Nice',
              bookingId: 'airport-10566',
              placeType: 'A',
              placeKey: '1472133',
              iata: 'NCE',
              name: 'Nice Airport',
              region: "Provence-Alpes-Côte d'Azur"
            },
            {
              country: 'United Kingdom',
              city: 'Manchester',
              bookingId: 'airport-38566',
              placeType: 'A',
              placeKey: '1472187',
              iata: 'MAN',
              name: 'Manchester Airport',
              region: 'Greater Manchester'
            }
          ],
          numFound: 155751
        }
      })
    );

    const wrapper = shallow(<SearchWidget />);

    const mockFn = jest.fn();
    debounce(mockFn, 800);

    it('should not call the api when typing 1 character in the search box', () => {
      wrapper
        .find('.search-fields__input')
        .simulate('change', { target: { value: 'P' } });
      expect(fetch.mock.calls.length).toEqual(0);
      expect(wrapper.state('isLoading')).toBe(false);
    });

    it('should call the api when typing 2 or more characters in the search box', () => {
      wrapper
        .find('.search-fields__input')
        .simulate('change', { target: { value: 'Pa' } });
      jest.runAllTimers();
      expect(fetch.mock.calls.length).toEqual(1);
      expect(wrapper.state('isLoading')).toBe(true);
    });

    it('should render a list of results with locations', () => {
      wrapper.setState({
        locations: [
          {
            country: 'Italy',
            city: 'Milan',
            bookingId: 'airport-21386',
            placeType: 'A',
            placeKey: '1472302',
            iata: 'MXP',
            name: 'Milan Malpensa Airport',
            region: 'Lombardy'
          },
          {
            country: 'France',
            city: 'Nice',
            bookingId: 'airport-10566',
            placeType: 'A',
            placeKey: '1472133',
            iata: 'NCE',
            name: 'Nice Airport',
            region: "Provence-Alpes-Côte d'Azur"
          }
        ]
      });
      expect(wrapper.find(SearchWidgetList)).toHaveLength(1);
      expect(wrapper.state('isLoading')).toBe(false);
      expect(wrapper.state('locations')).toHaveLength(2);
    });

    it('should render with the correct classes', () => {
      expect(wrapper.hasClass('search')).toBe(true);
      expect(wrapper.hasClass('search-widget')).toBe(true);
    });

    it('should close the locations list results when clicking outside of the search box', () => {
      wrapper.find('.search-fields__input').simulate('blur');
      expect(wrapper.find(SearchWidgetList).prop('locationsVisible')).toBe(
        false
      );
    });

    it('should open the locations list results when clicking on the search box', () => {
      wrapper.find('.search-fields__input').simulate('focus');
      expect(wrapper.find(SearchWidgetList).prop('locationsVisible')).toBe(
        true
      );
    });

    it('should show the message `No results found` when entering a search term that returns no matched results', () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          results: {
            docs: [
              {
                name: 'No results found'
              }
            ],
            numFound: 0
          }
        })
      );

      wrapper
        .find('.search-fields__input')
        .simulate('change', { target: { value: 'www' } });
      jest.runAllTimers();
      expect(fetch.mock.calls.length).toEqual(1);
      wrapper.setState({
        locationsVisible: true,
        locations: [
          {
            name: 'No results found'
          }
        ]
      });
      expect(wrapper.find('.search-results').html()).toEqual(
        '<div class="search-results"><section class="locations"><div class="location-results"><ul class="location-results__list"><li class="location-results__item"><a href="/" title="Select a location" class="location-results__link"><div class="location-results__details"><p class="location-results__text location-results__text--color"><strong>No results found </strong><span></span></p><p class="location-results__text">  </p></div></a></li></ul></div></section></div>'
      );
    });
  });

  describe('A failed response from the api', () => {
    beforeAll(() => {
      jest.clearAllMocks();
      jest.useFakeTimers();
    });

    fetch.mockRejectOnce(new Error('Error has been thrown'));

    const wrapper = shallow(<SearchWidget />);

    const mockFn = jest.fn();
    debounce(mockFn, 800);

    it('should make a call to the api', () => {
      wrapper
        .find('.search-fields__input')
        .simulate('change', { target: { value: 'Pal' } });
      jest.runAllTimers();
      expect(fetch.mock.calls.length).toEqual(1);
    });

    it('should not render a results list', () => {
      expect(
        wrapper.find(SearchWidgetList).at('.location-results')
      ).toHaveLength(0);
    });
  });
});

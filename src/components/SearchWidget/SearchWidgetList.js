import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '../Shared/Badge';

const SearchWidgetList = ({ locations, locationsVisible }) => (
  <section className="locations">
    {locationsVisible ? (
      <div className="location-results">
        <ul className="location-results__list">
          {locations.map(location => (
            <li
              key={
                location.placeKey
                  ? location.placeKey + location.name
                  : location.name
              }
              id={location.bookingId}
              className="location-results__item"
            >
              <a
                href="/"
                title="Select a location"
                className="location-results__link"
              >
                {location.placeType ? (
                  <div className="location-results__type">
                    {(() => {
                      switch (location.placeType) {
                        case 'C':
                          return <Badge className="badge--city">City</Badge>;
                        case 'A':
                          return (
                            <Badge className="badge--airport">Airport</Badge>
                          );
                        case 'Z':
                          return <Badge className="badge--place">Place</Badge>;
                        case 'T':
                          return (
                            <Badge className="badge--station">Station</Badge>
                          );
                        case 'D':
                          return (
                            <Badge className="badge--district">District</Badge>
                          );
                        case 'P':
                          return (
                            <Badge className="badge--region">Region</Badge>
                          );
                        default:
                          return null;
                      }
                    })()}
                  </div>
                ) : null}
                <div className="location-results__details">
                  <p className="location-results__text location-results__text--color">
                    <strong>{location.name} </strong>
                    <span>
                      {location.iata ? (
                        <i className="iata-name">({location.iata})</i>
                      ) : null}
                    </span>
                  </p>
                  <p className="location-results__text">
                    {location.city} {location.region} {location.country}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    ) : null}
  </section>
);

SearchWidgetList.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      key: PropTypes.string
    })
  ),
  locationsVisible: PropTypes.bool
};

export default SearchWidgetList;

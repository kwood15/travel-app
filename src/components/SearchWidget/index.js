import React, { Component } from 'react';
import 'whatwg-fetch';
import { debounce } from '../../helpers/debounce';
import SearchWidgetList from './SearchWidgetList';
import spinner from './spinner.svg';

class SearchWidget extends Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      locationsVisible: false,
      searchTerm: '',
      isLoading: false,
      error: null
    };
    this.getData = debounce(this.getData, 800);
  }

  getData = (searchTerm, pageSize = 6) => {
    fetch(`/api/destinations?size=${pageSize}&search=${searchTerm}`)
      .then(response => response.json())
      .then(data => this.saveData(data))
      .catch(error => this.setState({ error }));
  };

  handleChange = ({ target: { value } }) => {
    const searchTerm = value;
    this.setState({
      searchTerm
    });
    if (searchTerm.length > 1) {
      this.setState({
        isLoading: true
      });
      this.getData(searchTerm);
    } else {
      this.setState({
        isLoading: false,
        locations: []
      });
    }
  };

  handleClose = () => {
    this.setState({
      locationsVisible: false
    });
  };

  handleFocus = () => {
    this.setState({
      locationsVisible: true
    });
  };

  saveData(response) {
    this.setState({
      locations: response,
      locationsVisible: true,
      isLoading: false
    });
  }

  render() {
    const { isLoading, locations, locationsVisible, error } = this.state;
    return (
      <section className="search search-widget">
        <form className="search-form">
          <h1 className="search-form__heading">Where are you going?</h1>
          <fieldset id="location" className="search-fields">
            <label
              className="search-fields__label"
              htmlFor="pickup-location"
              aria-labelledby="Pick Up Location"
            >
              Pick-up Location
            </label>
            <div className="spinner-wrapper">
              <input
                className="search-fields__input"
                id="pickup-location"
                type="text"
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleClose}
                autoComplete="off"
                placeholder="city, airport, station, region and district..."
              />
              {isLoading && (
                <img src={spinner} alt="loading results" className="spinner" />
              )}
            </div>
          </fieldset>
        </form>
        <div className="search-results">
          {error ? (
            <div className="error-message">
              <p>Sorry there has been a problem with your request</p>
            </div>
          ) : (
            <SearchWidgetList
              locations={locations}
              locationsVisible={locationsVisible}
            />
          )}
        </div>
      </section>
    );
  }
}

export default SearchWidget;

import React from 'react';
import logo from './logo.svg';

const Header = () => (
  <header className="header">
    <a className="logo" href="/">
      <img src={logo} alt="travel app logo" className="logo__image" />
      <span className="logo__text">Travel co</span>
    </a>
  </header>
);

export default Header;

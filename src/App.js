import React, { Fragment } from 'react';
import Header from './components/Shared/Header';
import Footer from './components/Shared/Footer';
import SearchWidget from './components/SearchWidget';

const App = () => (
  <Fragment>
    <Header />
    <div className="container">
      <main role="main">
        <SearchWidget />
      </main>
    </div>
    <Footer />
  </Fragment>
);

export default App;

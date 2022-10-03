import React from 'react';
import Header from './Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <p>TrybeTunes</p>
      </div>
    );
  }
}

export default Search;

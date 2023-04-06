import React from 'react';
import ReactLoading from 'react-loading';

class Carregando extends React.Component {
  render() {
    return (
      <div className="loading">
        <ReactLoading type="bars" color="white" height="667px" width="250px" />
      </div>
    );
  }
}

export default Carregando;

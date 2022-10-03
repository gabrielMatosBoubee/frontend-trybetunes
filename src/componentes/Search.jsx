import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      disabled: true,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validaButton());
  };

  validaButton = () => {
    const { nome } = this.state;
    const dois = 2;
    const valida = nome.length >= dois;
    if (valida) {
      this.setState({ disabled: false });
    }
  };

  render() {
    const { nome, disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          name="nome"
          value={ nome }
          onChange={ this.onInputChange }
        />
        <button
          type="button"
          disabled={ disabled }
          data-testid="search-artist-button"
        >
          Pesquisar

        </button>
      </div>
    );
  }
}

export default Search;

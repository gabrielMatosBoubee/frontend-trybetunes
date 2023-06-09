import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      disabled: true,
      Button: true,
      obj: {},
      nomeSalvo: false,
      primeiroButton: false,
      nomeDigitado: '',
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

  onClickButton = async () => {
    const { nome } = this.state;
    this.setState({ Button: false });
    const resultado = await searchAlbumsAPI(nome);
    this.setState((prevState) => ({
      nomeDigitado: prevState.nome,
      nomeSalvo: true,
      primeiroButton: true,
      nome: '',
      Button: true,
      obj: resultado }));
  };

  render() {
    const {
      nome,
      disabled,
      Button,
      obj,
      nomeSalvo,
      primeiroButton, nomeDigitado } = this.state;
    return (
      <div data-testid="page-search" className="search">
        <Header />
        <div className="searchAll">

          <div className="searchInput">

            <input
              id="id"
              type="text"
              data-testid="search-artist-input"
              name="nome"
              value={ nome }
              onChange={ this.onInputChange }
            />
            {Button ? (
              <button
                type="button"
                disabled={ disabled }
                data-testid="search-artist-button"
                onClick={ () => this.onClickButton() }
              >
                Pesquisar
              </button>
            ) : <Carregando />}
          </div>
          <div className="searchAlbum">
            {primeiroButton && (obj.length === 0
              ? <p>Nenhum álbum foi encontrado</p>
              : (
                <p>
                  Resultado de álbuns de:
                  {` ${nomeDigitado}`}
                </p>
              ))}
            <div className="searchResults">

              {nomeSalvo && obj.map((ele) => (
                <div key={ `div ${ele.collectionName}` }>
                  <Link
                    to={ `/album/${ele.collectionId}` }
                    data-testid={ `link-to-album-${ele.collectionId}` }
                    className="searchResult"
                  >
                    <p>{ele.artistName}</p>
                    <p>{ele.collectionName}</p>
                    <img src={ ele.artworkUrl100 } alt="img" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;

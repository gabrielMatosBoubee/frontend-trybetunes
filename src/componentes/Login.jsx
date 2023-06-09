import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      disabled: true,
      button: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validaButton());
  };

  validaButton = () => {
    const { nome } = this.state;
    const tres = 3;
    const valida = nome.length >= tres;
    if (valida) {
      this.setState({ disabled: false });
    }
    // this.setState({ disabled: true });
  };

  setButton = () => {
    this.setState({ button: true });
  };

  render() {
    const { nome, disabled, button } = this.state;
    const { history } = this.props;
    return (
      <div data-testid="page-login" className="login">
        <p>Entrar No BoubeeTunes</p>
        <div className="loginInput">
          {!button ? (
            <>
              <label htmlFor="loginInput" className="loginInputLabel">
                Nome de usuario:
                <input
                  data-testid="login-name-input"
                  name="nome"
                  value={ nome }
                  onChange={ this.onInputChange }
                  id="loginInput"
                />
              </label>
              <button
                type="submit"
                disabled={ disabled }
                data-testid="login-submit-button"
                onClick={ async () => {
                  this.setButton();
                  await createUser({ name: nome });
                  history.push('/search');
                } }
                id="loginButton"
              >
                Entrar
              </button>
            </>
          ) : <div className="loginInputLabels"><Carregando /></div>}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;

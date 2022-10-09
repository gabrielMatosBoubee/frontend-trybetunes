import React from 'react';
import propTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Header from './Header';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      dataOfUser: {},
      name: '',
      email: '',
      description: '',
      image: '',
      button: true,
    };
  }

  async componentDidMount() {
    const data = await getUser();
    this.setState({
      // dataOfUser: [data],
      loading: false,
      name: data.name,
      email: data.email,
      description: data.description,
      image: data.image,
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validaButton());
  };

  validaButton = () => {
    const {
      name,
      email,
      description,
      image } = this.state;
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const nameValid = name.length > 0;
    const emailValid = email.length > 0 && regexEmail.test(email);
    const descriptionValid = description.length > 0;
    const imagemValid = image.length > 0;
    const valido = nameValid && emailValid && descriptionValid && imagemValid;
    if (valido) {
      const data = { name, email, description, image };
      this.setState({ button: false, dataOfUser: data });
    }
  };

  clickButton = async () => {
    const { dataOfUser } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await updateUser(dataOfUser);
    history.push('/profile');
  };

  render() {
    const { name, email, description, image, loading, button } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <p>Carregando...</p> : (
          <div>
            <label htmlFor="nome">
              Nome
              <input
                type="text"
                name="name"
                value={ name }
                onChange={ this.onInputChange }
                id="nome"
                data-testid="edit-input-name"
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="text"
                name="email"
                value={ email }
                onChange={ this.onInputChange }
                id="email"
                data-testid="edit-input-email"
              />
            </label>
            <label htmlFor="description">
              Descrição
              <input
                type="text"
                name="description"
                value={ description }
                onChange={ this.onInputChange }
                id="description"
                data-testid="edit-input-description"
              />
            </label>
            <label htmlFor="imagem">
              Imagem
              <input
                type="text"
                name="image"
                value={ image }
                onChange={ this.onInputChange }
                id="imagem"
                data-testid="edit-input-image"
              />
            </label>
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ button }
              onClick={ this.clickButton }
            >
              Editar perfil
            </button>
          </div>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default ProfileEdit;

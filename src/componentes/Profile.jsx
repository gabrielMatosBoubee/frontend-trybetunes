import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      dateOfUser: [],
    };
  }

  async componentDidMount() {
    const data = await getUser();
    this.setState({ dateOfUser: [data], loading: false });
  }

  render() {
    const { dateOfUser, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <p>Carregando...</p> : (
          <div>
            { dateOfUser.map((element) => (
              <>
                <Link to="/profile/edit">Editar perfil</Link>
                <p>{element.name}</p>
                <p>{element.email}</p>
                <p>{element.description}</p>
                <img
                  data-testid="profile-image"
                  src={ element.image }
                  alt={ `Imagem do ${element.name}` }
                />
              </>
            ))}
          </div>
        ) }
      </div>
    );
  }
}

export default Profile;

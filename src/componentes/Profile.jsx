import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Header from './Header';
import { getUser } from '../services/userAPI';
import logo from './logoBoubeeTunes.png';
import Carregando from './Carregando';

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
        <img src={ logo } alt="foto" className="logo" />
        {loading ? <Carregando /> : (
          <div>
            { dateOfUser.map((element, index) => (
              <div key={ index } className="profileAll">
                <div className="profileImg">
                  <img
                    data-testid="profile-image"
                    src={ element.image }
                    alt=" "
                    className="profileImgLink"
                  />
                  <FaUserCircle className="profileIcon" />
                </div>
                <div className="profile">
                  <Link to="/profile/edit">Editar perfil</Link>
                  <div>
                    <p className="profileTitulo"><strong>NOME</strong></p>
                    <p className="userName">{element.name}</p>
                  </div>
                  <div>
                    <p className="profileTitulo"><strong>EMAIL</strong></p>
                    <p>{element.email}</p>
                  </div>
                  <div className="profileDescribe">
                    <p className="profileTitulo"><strong>DESCRIÇÃO</strong></p>
                    <p className="describe1">{element.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) }
      </div>
    );
  }
}

export default Profile;

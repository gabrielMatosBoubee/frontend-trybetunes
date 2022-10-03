import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      obj: {},
    };
  }

  componentDidMount() {
    this.load();
    // this.setState({ objeto: true });
  }

  load = async () => {
    const user = await getUser();
    this.setState({ loading: true, obj: user });
  };

  render() {
    const { loading, obj } = this.state;
    return (
      <div data-testid="header-component">
        {loading
          ? (
            <>
              <p data-testid="header-user-name">
                {obj.name}
              </p>
              <Link to="/search" data-testid="link-to-search">Search</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
            </>
          )
          : <Carregando />}

      </div>
    );
  }
}

export default Header;

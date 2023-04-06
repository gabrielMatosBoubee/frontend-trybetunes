import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsSearch, BsFillStarFill, BsPersonCircle, BsPersonFill } from 'react-icons/bs';
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
      <div data-testid="header-component" className="header">
        {loading
          ? (
            <>
              <p data-testid="header-user-name" id="usuario">
                <BsPersonFill />
                {obj.name}
              </p>
              <NavLink
                to="/search"
                className="searchLink"
                data-testid="link-to-search"
                activeClassName="linkAtivo"
              >
                <BsSearch />
                Search
              </NavLink>
              <NavLink
                to="/favorites"
                data-testid="link-to-favorites"
                activeClassName="linkAtivo"
                className="searchLink"
              >
                <BsFillStarFill />
                Favorites
              </NavLink>
              <NavLink
                to="/profile"
                data-testid="link-to-profile"
                activeClassName="linkAtivo"
                className="searchLink"
              >
                <BsPersonCircle />
                Profile
              </NavLink>
            </>
          )
          : <Carregando className="headerLoading" />}

      </div>
    );
  }
}

export default Header;

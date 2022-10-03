import React from 'react';
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
            <p data-testid="header-user-name">
              {obj.name}
            </p>
          )
          : <Carregando />}

      </div>
    );
  }
}

export default Header;

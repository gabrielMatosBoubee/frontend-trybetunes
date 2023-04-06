import React from 'react';
import Header from './Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';
import Carregando from './Carregando';
import logo from './logoBoubeeTunes.png';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteMusic: [],
      loading: false,
      checked: true,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const favSong = await getFavoriteSongs();
    this.setState({ favoriteMusic: favSong, loading: false, checked: true });
  }

  async componentDidUpdate() {
    const { checked } = this.state;
    if (!checked) {
      this.setState({ loading: true, checked: true });
      const favSong = await getFavoriteSongs();
      this.setState({ favoriteMusic: favSong, loading: false, checked: true });
    }
  }

  childToParent = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(
      { loading: !value, checked: value },
      () => this.setState({ loading: false, checked: true }),
    );
  };

  render() {
    const { favoriteMusic, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <img src={ logo } alt="logo" className="logo" />
        <div className="favoritesMusic">
          <h2 className="favoritesTitle">Musicas favoritas</h2>
          {!loading ? favoriteMusic.map((element) => (
            <div key={ element.trackId }>
              <MusicCard
                previewUrl={ element.previewUrl }
                trackName={ element.trackName }
                trackId={ element.trackId }
                idMusic={ element }
                ok={ this.childToParent }
              />
            </div>
          ))
            : <Carregando />}
        </div>
      </div>
    );
  }
}

export default Favorites;

import React from 'react';
import Header from './Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

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

  // removeMusicFav = async () => {
  //   const { checked, favoriteMusic, name } = this.state;
  //   if (!checked) {
  //     console.log(name);
  //     const musicaUnFav = favoriteMusic
  //       .filter((element) => element.trackName === name);
  //     const musicaFav = favoriteMusic
  //       .filter((element) => element.trackName !== name);
  //     const [musicaUnFavInObj] = musicaUnFav;
  //     console.log(musicaUnFavInObj);
  //     await removeSong(musicaUnFavInObj);
  //     this.setState({ checked: true, favoriteMusic: musicaFav });
  //   }
  // };

  // shouldComponentUpdate() {
  //   const { mudança } = this.state;
  //   return !mudança;
  // }

  async componentDidUpdate() {
    const { checked } = this.state;
    if (!checked) {
      this.setState({ loading: true, checked: true });
      const favSong = await getFavoriteSongs();
      this.setState({ favoriteMusic: favSong, loading: false, checked: true });
    }
  }

  // async componentWillUnmount() {
  //   this.setState({ loading: true });
  //   const favSong = await getFavoriteSongs();
  //   this.setState({ favoriteMusic: favSong, loading: false, checked: true });
  // }

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
        {loading ? <p>Carregando...</p>
          : favoriteMusic.map((element) => (
            <div key={ element.trackId }>
              <MusicCard
                previewUrl={ element.previewUrl }
                trackName={ element.trackName }
                trackId={ element.trackId }
                idMusic={ element }
                ok={ this.childToParent }
              />
            </div>
          ))}
      </div>
    );
  }
}

export default Favorites;

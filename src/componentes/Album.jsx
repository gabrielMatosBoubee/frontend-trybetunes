import React from 'react';
import propTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
// import { addSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      idMusic: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const idMusica = await getMusics(id);
    this.setState({ idMusic: idMusica });
  }

  render() {
    const { idMusic } = this.state;
    const tudoMenosOPrimeiro = idMusic
      .filter((element) => element !== idMusic[0]);
    const priemeiroItem = idMusic
      .filter((element) => element === idMusic[0]);

    return (
      <div data-testid="page-album">
        <Header />
        {priemeiroItem.map((element) => (
          <div key={ 0 }>
            <p data-testid="album-name">{element.collectionName}</p>
            <p data-testid="artist-name">{element.artistName}</p>
            <img src={ element.artworkUrl100 } alt="img" />
          </div>
        ))}
        {tudoMenosOPrimeiro.map((element, i) => (
          <div key={ (i + 1) }>
            <MusicCard
              previewUrl={ element.previewUrl }
              trackName={ element.trackName }
              trackId={ element.trackId }
              idMusic={ idMusic }
            />
          </div>
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;

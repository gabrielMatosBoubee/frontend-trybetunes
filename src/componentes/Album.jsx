import React from 'react';
import propTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import logo from './logoBoubeeTunes.png';

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
      <div data-testid="page-album" className="album">
        <Header />
        <img src={ logo } alt="logo" className="logo" />
        <div className="albumMusics">
          {/* <div className='image'><p className="logo">BOUBEETUNES</p></div> */}
          {priemeiroItem.map((element) => (
            <div key={ 0 } className="albumCapa">
              <div className="albumName">
                <p
                  data-testid="album-name"
                  style={ { color: 'black' } }
                >
                  {element.collectionName}
                </p>
                <p data-testid="artist-name">{element.artistName}</p>
              </div>
              <img src={ element.artworkUrl100 } alt="img" className="albumImg" />
            </div>
          ))}
          <div className="albumSong">
            {tudoMenosOPrimeiro.map((element, index) => (
              <div key={ (index + 1) }>
                <MusicCard
                  previewUrl={ element.previewUrl }
                  trackName={ element.trackName }
                  trackId={ element.trackId }
                  idMusic={ element }
                />
              </div>
            ))}
          </div>
        </div>
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

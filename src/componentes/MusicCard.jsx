import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      favSong: true,
    };
  }

  componentDidMount() {
    this.test1();
  }

  test1 = async () => {
    const { trackId } = this.props;
    this.setState({ favSong: false });
    const favoritMusic = await getFavoriteSongs();
    this.setState({
      checked: favoritMusic.some((ele) => ele.trackId === trackId),
      favSong: true });
  };

  salvaMusicFav = async () => {
    const { checked } = this.state;
    const { idMusic, trackName } = this.props;
    if (checked) {
      this.setState({ favSong: false });
      const musicaFav = idMusic.filter((element) => element.trackName === trackName);
      const [musicFavInObj] = musicaFav;
      await addSong(musicFavInObj);
      this.setState({ favSong: true });
    }
  };

  removeMusicFav = async () => {
    const { checked } = this.state;
    const { idMusic, trackName } = this.props;
    if (!checked) {
      this.setState({ favSong: false });
      const musicaUnFav = idMusic.filter((element) => element.trackName === trackName);
      const [musicaUnFavInObj] = musicaUnFav;
      await removeSong(musicaUnFavInObj);
      this.setState({ favSong: true });
    }
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => {
      this.salvaMusicFav();
      this.removeMusicFav();
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { checked, favSong } = this.state;
    return (
      <div>
        {favSong ? (
          <>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              { trackName }
              <code>audio</code>
              .
            </audio>
            <label htmlFor="fav">
              Favorita
              <input
                type="checkbox"
                name="checked"
                checked={ checked }
                onChange={ this.onInputChange }
                id="id"
                data-testid={ `checkbox-music-${trackId}` }
              />
            </label>
          </>
        ) : <p>Carregando...</p>}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  idMusic: PropTypes.shape.isRequired,
};

export default MusicCard;

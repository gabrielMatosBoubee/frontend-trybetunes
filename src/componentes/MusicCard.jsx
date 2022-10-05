import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      favSong: true,
    };
  }

  async componentDidMount() {
    const { trackId } = this.props;
    this.setState({ favSong: false });
    const favoritMusic = await getFavoriteSongs();
    this.setState({
      checked: favoritMusic.some((ele) => ele.trackId === trackId),
      favSong: true });
  }

  test = async () => {
    const { checked } = this.state;
    const { idMusic, trackName } = this.props;
    if (checked) {
      this.setState({ favSong: false });
      await addSong(idMusic.filter((element) => element === trackName));
      this.setState({ favSong: true });
    }
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => this.test());
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

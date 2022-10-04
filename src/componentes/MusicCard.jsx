import React from 'react';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl } = this.props;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          { trackName }
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

export default MusicCard;

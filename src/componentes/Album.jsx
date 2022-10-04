import React from 'react';
import Header from './Header';
// import getMusics from '../services/musicsAPI';
// import MusicCard from './MusicCard';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        {/* <p data-testid="artist-name">{artistName}</p> */}
        {/* <p data-testid="album-name">{albumName}</p> */}
        {/* <MusicCard trackName={ } /> */}
      </div>
    );
  }
}

export default Album;

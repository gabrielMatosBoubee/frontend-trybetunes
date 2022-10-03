import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from '../componentes/Login';
import Search from '../componentes/Search';
import Album from '../componentes/Album';
import Favorites from '../componentes/Favorites';
import Profile from '../componentes/Profile';
import ProfileEdit from '../componentes/ProfileEdit';
import NotFound from '../componentes/NotFound';

class Pages extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ Login } />
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile" component={ Profile } />
        <Route
          path="/profile/edit"
          component={ ProfileEdit }
        />
        <Route path="*" component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default Pages;

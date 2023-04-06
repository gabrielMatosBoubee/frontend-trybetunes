import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Pages;

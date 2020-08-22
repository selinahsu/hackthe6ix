import React from 'react';
import {
  Router,
  Route
} from 'react-router-dom';
import App from 'App';
import Result from 'Result';
import history from './history';

const createRoutes = () => (
  <Router history={history}>
    <Route exact path="/" component={App}/>
    <Route path="/result" component={Result}/>
  </Router>
);

export default createRoutes;
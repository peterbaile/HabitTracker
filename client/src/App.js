import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Login from './components/Login';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

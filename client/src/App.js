import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Login from './components/Login';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route path="*" component={NotFound} />
        </Switch>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;

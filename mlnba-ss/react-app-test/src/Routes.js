import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import NotFound from './NotFound';
import teamList from './containers/TeamList';
import memberList from './containers/MemberList';
import teamDetails from './containers/TeamDetails';

class Unauthorized extends Component {
  render () {
    return <div className="Home">
    <div className="lander">
      <h1>Erreur!!!</h1>
      <p>Vous n'êtes pas autorisé à accéder à cette page</p>
    </div>
  </div>;
  }
}
export default () =>
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/teams' exact={true} component={teamList} />
    <Route path='/teams/:id' exact={true} component={teamDetails} />
    <Route path='/members' exact={true} component={memberList} />
    <Route path='/login' component={Login} />
    <Route path='/unauthorized' component={Unauthorized} />
    <Route component={NotFound} />
  </Switch>;
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import NotFound from './NotFound';
import teamList from './containers/TeamList';
import memberList from './containers/MemberList';

export default () =>
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/teams' exact={true} component={teamList}/>
    <Route path='/members' exact={true} component={memberList}/>
    <Route path='/login' component={Login} />
    <Route component={NotFound} />
  </Switch>;
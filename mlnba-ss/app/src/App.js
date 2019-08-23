import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import teamList from './TeamList';
import TeamEdit from './TeamEdit';
import Login from './login';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/teams' exact={true} component={teamList}/>
          <Route path='/teams/:id' component={TeamEdit}/>
          <Route path='/login' component={Login}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
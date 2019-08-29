import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import './App.css';
import Routes from './Routes';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isconnected: false,
      isconnected: false
    };
    //this.handleClick = this.handleClick.bind(this);
    this.sendStatus = this.sendStatus.bind(this);
  }

  sendStatus(connected, connecting) {
    console.log('sendStatus');
    this.setState({ 
      isconnected: connected,
      isconnecting: connecting
    });
  }

  handleClick = () => {
    console.log('handleClick');
    //this.sendStatus(false, true);
    //this.setState({ isconnected: !this.state.isconnected });
  }

  render() {
    return (
      <div className="App container">

      <Navbar bg="light" expand="lg">
            <Navbar.Brand>
              <Link to="/">Home</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Link to="/">Home</Link>
              </Navbar.Collapse>

            <NavDropdown title="Le club" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={this.handleClick}>Action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/teams">Les équipes</NavDropdown.Item>

              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/members">Les membres</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Entrainements" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <LoginLink />
            </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>
    );
  }
}
/*
{ !(this.state.connected || this.state.isconnecting) && <LoginLink statusCallback={this.sendStatus}/> }
*/
class LoginLink extends Component {
  constructor(props) {
    super(props);
    this.sendStatus = this.sendStatus.bind(this);
  }
  sendStatus(){
    console.log('sendStatus in LoginLink');
  }
  render() {
    return <NavItem as={Link} to={{
      pathname: '/login',
      state: {
        msg: () => this.sendStatus()
      }
    }}>Se connecter</NavItem>
  }
}

export default App;
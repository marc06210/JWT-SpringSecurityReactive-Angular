import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import './App.css';
import Routes from './Routes';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLoginButton: true
    };
  }

  setLoginButtonVisibility = (value) => {
    this.setState({
      showLoginButton: value
    });
  }

  handleClick = () => {
    console.log('handleClick');
  }

  disconnect = () => {
    console.log('here');
    window.sessionStorage.removeItem("jwt");
    this.setState({ showLoginButton: true });
  }

  render() {
    return (
      <div className="App container">

        <Navbar bg="light" expand="lg">
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Link to="/">Home</Link>
          </Navbar.Collapse>

          <NavDropdown title="Le club" id="collasible-nav-dropdown">
            <NavDropdown.Item onClick={this.handleClick}><i className="fa fa-envelope fa-fw"></i>Action</NavDropdown.Item>
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
            <LoginLink show={this.state.showLoginButton} sendStatus={this.setLoginButtonVisibility} />
            {!this.state.showLoginButton &&
              <NavItem as={Link} to="/" onClick={this.disconnect}>Se déconnecter</NavItem>}
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>
    );
  }
}

class LoginLink extends Component {
  constructor(props) {
    super(props);
    this.sendStatus = this.props.sendStatus.bind(this);
    this.show = this.props.showLogin;
  }

  render() {
    if (this.props.show) {
      return <NavItem as={Link} to={{
        pathname: '/login',
        showLoginButton: this.sendStatus
      }}>Se connecter</NavItem>
    } else {

      return null;

    }

  }
}

export default App;
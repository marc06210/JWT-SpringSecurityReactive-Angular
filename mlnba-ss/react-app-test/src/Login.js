import React, { Component } from 'react';
import './Home.css';
import { Alert, 
  Button, 
  Container, 
  FormGroup, 
  Form, 
  FormControl, 
  InputGroup } from 'react-bootstrap';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        error: false
      };
  }

  componentDidMount () {
   // console.log('cdm -> ' + )
    if(this.props.location.showLoginButton===undefined) {
      this.props.history.push('/')
      return;
    }
    this.showLoginButton = this.props.location.showLoginButton.bind(this);
    this.showLoginButton(false);
  }

  componentWillUnmount() {
    if(!this.state.connected && this.showLoginButton!=undefined) {
      this.showLoginButton(true);
    }
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    // get our form data out of state
    const item = this.state;
    
    fetch('/process_login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
      }).then((res) => {
        if(res.ok) {
          return res.json();
        } else {
          return null;
        }
      }).then((data)=>{
        if(data!=null) {
            window.sessionStorage.setItem("jwt", data.token);
            this.setState({connected: true});
            this.props.history.goBack();
        } else {
          this.setState({error: true});
        }
      });
  }

  render() {
    return (
        <div>
          <Container>
          <Alert show={this.state.error} variant={'danger'}>Une erreur est survenue!!</Alert>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup >
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing">Utilisateur</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                value={this.state.username}
                name="username"
                onChange={this.changeHandler}/>
            </InputGroup>
            
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">Mot de passe</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                value={this.state.password}
                name="password"
                onChange={this.changeHandler}
                type="password" aria-label="password" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>
            </FormGroup>
            <Button block disabled={!this.validateForm()} type="submit">Login</Button>
          </Form>
        </Container>
      </div>
    );
  }
}
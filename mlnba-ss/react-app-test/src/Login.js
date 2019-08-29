import React, { Component } from 'react';
import './Home.css';
import { Alert, Button, Container, FormGroup, Form, FormControl, InputGroup, Label } from "react-bootstrap";
import { thisExpression } from '@babel/types';


export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        message: 'empty',
        error: false
      };
      //console.log('->' + this.props.location.state.customData);
  }

  componentDidMount () {
    console.log('componentDidMount()');
    //console.log('->' + this.props.location.state.customData);
    //const { fromNotifications } = this.props.location.state
    //this.setState({message: fromNotifications});
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
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
          console.log('token: ' + data.token);

            /*if(this.props.callbackForLogin!=null) {
              this.props.callbackForLogin(true);
            } else {
              console.log('no callback');
            }*/

            window.sessionStorage.setItem("jwt", data.token);
            this.props.history.goBack();
            this.setState({error: false});
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
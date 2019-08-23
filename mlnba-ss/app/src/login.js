import React, { Component } from "react";
import { Container, Button, FormGroup, Form, Input, Label } from "reactstrap";
import AppNavbar from './AppNavbar';

export default class Login extends Component {

    emptyItem = {
        username: '',
        password: '',
      };
  constructor(props) {
    super(props);

    this.state = {
        item: this.emptyItem
      };
  }

  validateForm() {
    return true;//this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

handleSubmit = event => {
    event.preventDefault();
    console.log('handleSubmit')

    // get our form data out of state
    const {item} = this.state;
    console.log('handleSubmit: ' + this.state.username)
    fetch('/process_login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
      }).then(function (res) {
        if(res.ok) 
            return res.json();
        throw Error(res.statusText);
        }).then(data => {
            console.log('data: ' + data.token);
            window.sessionStorage.setItem("jwt", data.token);
            this.props.history.goBack();
        })
      ;
  }

  render() {
    return (
        <div>
        <AppNavbar/>
        <Container>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup >
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
                name="password"
            id="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </Form>
        </Container>
      </div>
    );
  }
}
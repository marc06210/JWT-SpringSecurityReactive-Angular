import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import unregister from './Interceptor'

class TeamEdit extends Component {

  emptyItem = {
    name: '',
    season: '',
    descirption: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    console.log('here');
    if (this.props.match.params.id !== 'new') {
      let response = await fetch(`/api/team/${this.props.match.params.id}`);
      if(response.ok && !response.url.endsWith('/login')) {
        const team = await response.json();
        this.setState({item: team});
      } else {
        console.log('ko received' + response)
        this.props.history.push("/login");
      }

    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    await fetch((item.id) ? '/api/team/'+item.id : '/api/team', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/teams');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Team' : 'Add Team'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={item.name || ''}
                   onChange={this.handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="season">Season</Label>
            <Input type="text" name="season" id="season" value={item.season || ''}
                   onChange={this.handleChange} autoComplete="season-level1"/>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="text" name="description" id="city" value={item.description || ''}
                   onChange={this.handleChange} autoComplete="description-level1"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/teams">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(TeamEdit);
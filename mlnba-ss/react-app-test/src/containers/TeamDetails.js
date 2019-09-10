import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, FormGroup, 
  Form, 
  FormControl, 
  InputGroup } from 'react-bootstrap';
import unregister from '../Interceptor'

class TeamDetails extends Component {

  emptyItem = {
    name: '',
    season: '',
    description: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    //this.handleChange = this.handleChange.bind(this);
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

  handleChange = (event) => {
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
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing">Nom</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                  value={item.name}
                  name="name"
                  onChange={this.handleChange}/>
            </InputGroup>
            <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing">Saison</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                  value={item.season}
                  name="season"
                  onChange={this.handleChange}/>
            </InputGroup>
            <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing">Description</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                  value={item.description}
                  name="description"
                  onChange={this.handleChange}/>
            </InputGroup>
            <FormGroup>
              <Button variant="primary" type="submit">Save</Button>{' '}
              <Button variant="secondary" as={Link} to="/teams">Cancel</Button>
            </FormGroup>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(TeamDetails);
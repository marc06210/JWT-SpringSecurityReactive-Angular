import React, { Component } from 'react';
import { Button, ButtonGroup, Container,Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import unregister from '../Interceptor'

export default class MemberList extends Component {

  constructor(props) {
    super(props);
    this.state = {members: [], isLoading: true, hasError: false};
    //this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/member')
      .then(response => response.json())
      .then(data => {
        console.log("then in memberlist");
        this.setState({members: data, isLoading: false});
        console.log('members -> ' + this.members);  
      });
      //.catch(error => this.setState({ hasError: true }))
  }

/*
  async remove(id) {
    await fetch(`/api/member/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedMembers = [...this.state.members].filter(i => i.id !== id);
      this.setState({members: updatedMembers});
    });
  }*/

  render() {

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    } else {
      const {members, isLoading} = this.state;

      if (isLoading) {
        return <p>Loading...</p>;
      }

      const memberList = members.map(member => {
        return <tr key={member.id}>
          <td style={{whiteSpace: 'nowrap'}}>{member.username}</td>
          <td>{member.lastname}</td>
          <td>{member.firstname}</td>
          <td>
            <ButtonGroup>
              <Button variant='info' as={Link} to={"/member/" + member.id}>Edit</Button>
              <Button variant="danger" onClick={() => this.remove(member.id)}>Delete</Button>
            </ButtonGroup>
          </td>
        </tr>
      });

      return (
        <div>
          <Container fluid>
            <div className="float-right">
              <Button variant="success" as={Link} to="/member/new">+</Button>
            </div>
            <h3>Equipes</h3>
            <Table className="mt-4">
              <thead>
              <tr>
                <th width="20%">Nom utilisateur</th>
                <th width="20%">Nom</th>
                <th>Prénom</th>
                <th width="10%">Actions</th>
              </tr>
              </thead>
              <tbody>
              {memberList}
              </tbody>
            </Table>
          </Container>
        </div>
      );
    }
  }
}

import React, { Component } from 'react';
//import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

import { Button, ButtonGroup, Table } from 'react-bootstrap';

class TeamList extends Component {

  constructor(props) {
    super(props);
    this.state = {teams: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/team')
      .then(response => response.json())
      .then(data => this.setState({teams: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/team/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedTeams = [...this.state.teams].filter(i => i.id !== id);
      this.setState({teams: updatedTeams});
    });
  }

  render() {
    const {teams, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const teamList = teams.map(team => {
      //const address = `${group.address || ''} ${group.city || ''} ${group.stateOrProvince || ''}`;
      return <tr key={team.id}>
        <td style={{whiteSpace: 'nowrap'}}>{team.name}</td>
        <td>{team.season}</td>
        <td>{team.description}</td>
        <td>
          <ButtonGroup>
            <Button variant="info" as={Link} to={"/teams/" + team.id}>Edit</Button>
            <Button variant="danger" onClick={() => this.remove(team.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
          <div className="float-right">
            <Button variant="success" as={Link} to="/teams/new">+</Button>
          </div>
          <h3>Equipes</h3>
          <Table striped bordered responsive>
            <thead>
            <tr>
              <th>Nom</th>
              <th>Saison</th>
              <th>Description</th>
              <th width='5%'>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            {teamList}
            </tbody>
          </Table>
      </div>
    );
  }
}

export default TeamList;
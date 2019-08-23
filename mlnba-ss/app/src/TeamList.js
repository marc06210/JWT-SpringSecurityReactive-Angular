import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

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
            <Button size="sm" color="primary" tag={Link} to={"/teams/" + team.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(team.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/teams/new">Add Group</Button>
          </div>
          <h3>Equipes</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Nom</th>
              <th width="20%">Saison</th>
              <th>Description</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {teamList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default TeamList;
import React, { Component, useState } from 'react';
import { Button, ButtonGroup, Container, FormGroup, 
  Form, 
  FormControl, 
  InputGroup, Modal, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MemberDetails from './MemberDetails'
import unregister from '../Interceptor';




function MyVerticallyCenteredModal(props) {
  return (
    

    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={props.handleSubmit}>
            <FormGroup>
              <InputGroup>
              <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing">Nom</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    value={props.item.lastname}
                    name="name"/>
              </InputGroup>
              <InputGroup>
              <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing">Prénom</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                    value={props.item.firstname}
                    name="firstname"/>
              </InputGroup>
              
              <FormGroup>
                <Button variant="primary" type="submit">Save</Button>{' '}
                <Button variant="secondary" onClick={props.onHide}>Cancel</Button>
              </FormGroup>
            </FormGroup>
          </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default class MemberList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      members: [], 
      isLoading: true, 
      hasError: false,
      showModal: false,
      selectedItem: {} };

    /*this.selectedItem = {
      id: '',
      lastname: 'a',
      firstname: 'a'
    };*/
    this.selectedItem = {};
    //this.showHideModal = this.showHideModal.bind(this);
    //this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/member')
      .then(res => {
        if(res.status === 200) return res.json();
        else return { error: 'there was an error with response' }
      })
      .then(data => {
        if(data.error) {
          this.props.history.push('/unauthorized')
        } else {
          console.log("then in memberlist");
          this.setState({members: data, isLoading: false});
          console.log('members -> ' + this.state.members);  
        }
      });
      //.catch(error => this.setState({ hasError: true }))
  }

  componentWillUnmount() {
    this.setState({members: []});
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

  showModal = (sMember) => {
    this.setState({showModal: true, selectedItem: sMember});
  }

  hideModal = () => {
    this.setState({showModal: false});
  }

  handleChange = (event) => {
     // this.setState({ [event.target.name]: event.target.value });

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({selectedItem: item});
    console.log("blablaa");
  }

  handleSubmit = (event) => { 
    event.preventDefault();
   console.log("submit: " + this.state.selectedItem.lastname);
   this.hideModal();
  }

  render() {
    //const [modalShow, setModalShow] = useState(false);

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
          <td><ul>{member.roles.map(role => (<li>{role}</li>))}</ul></td>
          <td>
            <ButtonGroup>
              <Button variant='info' as={Link} member={member} to={"/members/" + member.id}>Edit</Button>
              <Button variant="danger" onClick={() => this.remove(member.id)}>Delete</Button>
            </ButtonGroup>
          </td>
        </tr>
      });

      return (
        <div>


          <Container fluid>
            <div className="float-right">
              <Button variant="success" as={Link} to={"/members/new"}>+</Button>
            </div>
            <h3>Membres</h3>
            <Table className="mt-4">
              <thead>
              <tr>
                <th width="20%">Nom utilisateur</th>
                <th width="20%">Nom</th>
                <th>Prénom</th>
                <th>Rôles</th>
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

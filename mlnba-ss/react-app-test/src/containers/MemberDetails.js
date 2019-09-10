import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, FormGroup, 
  Form, 
  FormControl, 
  InputGroup } from 'react-bootstrap';

class MemberDetails extends Component {

  emptyItem = {
    username: '',
    lastname: '',
    firstname: '',
    roles: []
  }
  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      roles: []
    };

  }
  retrieveProfiles = () => {
    console.log('retrieveProfiles()');
    fetch('/api/admin/role')
      .then(response => response.json())
      .then(data => this.setState({roles: data}));
  }
  async componentDidMount() {
    console.log('here: ' + this.props.match.params.id);
this.retrieveProfiles();
    /*this._asyncRequest = this.retrieveProfiles().then(
      externalData => {
        console.log('ext data:' + externalData);
        //this._asyncRequest = null;
        //this.setState({externalData});
      }
    );*/
    if (this.props.match.params.id !== 'new') {
      let response = await fetch(`/api/member/${this.props.match.params.id}`);
      if(response.ok && !response.url.endsWith('/login')) {
        const member = await response.json();
        console.log('member -> ' + member.roles);
        this.setState({item: member});
      } else {
        console.log('ko received' + response)
        this.props.history.push("/login");
      }
    }
  }

  

  handleSubmit  = (event) => {
    event.preventDefault();
    const {item} = this.state;
    fetch((item.id) ? '/api/member/'+item.id : '/api/member', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.handleCancel();
  } 

  handleChange  = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});  
  } 

  handleCancel = () => {
    this.props.history.push('/members');
  }

  handleChangeCB = (e) => {
    if(e.target.checked) {
      this.state.item.roles.push(e.target.name);
    } else {
      this.state.item.roles.pop(e.target.name);
    }
    this.setState({item: this.state.item});
  }

  validateCheck = (item) => {
    console.log('vc: ' + item);
    return true;
  }

  render() {

    const {roles} = this.state;
    const title = <h2>{(this.item!==undefined && this.item.id!=='new') ? 'Editer Membre' : 'Ajouter Membre'}</h2>;
    
    return  <div>{title}<br/><Form onSubmit={this.handleSubmit}>
              <FormGroup>
              <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing">Alias</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl 
                      show={(this.state.item.id==='new').toString()}
                      value={this.state.item.username}
                      name="username-ro"
                      readOnly/>
                  <FormControl 
                      show={(this.state.item.id!=='new').toString()}
                      value={this.state.item.username}
                      name="username"
                      onChange={this.handleChange}/>
                </InputGroup>
                <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing">Nom</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl 
                      value={this.state.item.lastname}
                      name="lastname"
                      onChange={this.handleChange}/>
                </InputGroup>
                <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing">Prénom</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl 
                      value={this.state.item.firstname}
                      name="firstname"
                      onChange={this.handleChange}/>
                </InputGroup>
                
                <div key={`inline-roles`} className="mb-3">
                  {roles.map(item => (
                    <Form.Check  
                        label={item.authority} 
                        type='checkbox' 
                        name={item.id}
                        id={`inline-${item.id}-1`} 
                        onChange={this.handleChangeCB}
                        checked={this.state.item.roles.indexOf(item.id)>-1}/>
                          ))
                  }
                </div>

                
                <FormGroup>
                  <Button variant="primary" type="submit">Save</Button>{' '}
                  <Button variant="secondary" as={Link} to="/members">Cancel</Button>
                </FormGroup>
              </FormGroup>
            </Form>
            
            </div>

    
  }
}

export default MemberDetails;
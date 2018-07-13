import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './components/Users'
import Newuser from './components/newUser'

//old url
const apiURL = 'http://localhost:3000/'

//Newrl
// const apiURL = 'http://guarded-sea-93372.herokuapp.com'

class App extends Component {

  constructor(props) {
  super(props)
  this.state = {
    users: []
  }
}

async componentDidMount() {
  const response = await fetch(`${apiURL}/users`)
  // fetch(`${process.env.REACT_APP_API_URL}/users`)

  console.log(response);

  if(response.status === 200){
    let json = response.json()
    console.log(json);
    this.setState({users: json})
  } else {
    console.log("Failed to fetch data");
  }
}

///////
// Add a user
////

async composeUser (e){
  // console.log(this.state);
  e.preventDefault()
  let name = document.getElementById('subject').value
  let body = document.getElementById('body').value
  let newuser = {
      // "id": this.state.users.length + 1,
      "name": name,
      "user": body
  }
  const response = await fetch(apiURL, {
    method: 'POST',
    body: JSON.stringify(newuser),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })

  const users = await this.state.users

  if(response.status === 200){
    const resp = await response.json()
  } else {
    console.log(response.status);
  }
  this.setState({users: users})
}

///////
// Delete a user
////
deleteUser = async (e, id) => {
  e.preventDefault()
  const users = this.state.users.filter(user => user.id !== id)

  const response = await fetch(`${apiURL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: id
  })
  if(response.status === 200){
    const resp = await response.json()
  } else {
    console.log(response.status);
  }
  this.setState({users: users})
}

///////
// Edit a user
////

async editUser(e, name, user, id){
  e.preventDefault()

  let newName = document.getElementById(`${id}name`).value
  let newuser = document.getElementById(`${id}user`).value
  let newMess = {
      "name": newName,
      "user": newuser
  }
  const response = await fetch(`${apiURL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(newMess),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
  if(response.status === 200){
    const resp = await response.json()
    let users = await [...this.state.users]
    const idx = this.state.users.map(user => user.id).indexOf(resp.id)
    users[idx] = resp
    this.setState({...this.state,
      users
    })
  }
}

  render() {
    return (
      <div className="App">
        <Newuser
          composeUser={this.composeUser}
        />
        {/* <Users users={this.state.users}
          deleteUser={this.deleteUser}
          editUser={this.editUser} */}

         Hello world
         <br></br>
      </div>
    );
  }
}

export default App;

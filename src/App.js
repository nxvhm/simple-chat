import React, { Component } from 'react';

import {Route} from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import Topbar from './components/Topbar/Topbar';
import ChatScreen from './chat/ChatScreen';
import LoginScreen from './components/Auth/LoginScreen';
import SignupScreen from './components/Auth/SignupScreen';
import HomeScreen from './components/HomeScreen/HomeScreen';
import Auth from './services/Auth';
import AvatarsModal from './components/Modals/Avatars'

import './App.css';
const axios = require('axios');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userListIsHidden: false,
      showAvatarsModal: false,
      user: false
    };

    this.toggleUserList = this.toggleUserList.bind(this);
  }

  componentWillMount() {
    let user = Auth.check();
    let showAvatarsModal = user && user.avatar === ""
      ? true
      : false;
    if (user) {
      axios.defaults.headers.common = {'Authorization': `Bearer ${Auth.getToken()}`}
    }
    this.setState({user, showAvatarsModal});
  }

  toggleUserList (e) {
    let userListState = !this.state.userListIsHidden;
    this.setState({userListIsHidden: userListState});
  }


  render() {
    let {user, showAvatarsModal} = this.state;
    return (
      <div className="App">
        {/* Call avatar modal if no avatar available for the user */}
        <AvatarsModal user={user} isOpen={showAvatarsModal}></AvatarsModal>

        <Grid.Row>
          <Topbar toggleUserList={this.toggleUserList} user={user}></Topbar>
        </Grid.Row>
          <Route exact path="/" render={(props) => <HomeScreen user={user}/>}/>
          <Route path="/chat" render={(props) => <ChatScreen userListIsHidden={this.state.userListIsHidden} />} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/signup" component={SignupScreen} />
      </div>
    );
  }
}

export default App;

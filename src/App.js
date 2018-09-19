import React, { Component } from 'react';

import {Route} from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import Topbar from './topbar/topbar';
import ChatScreen from './chat/ChatScreen';
import LoginScreen from './auth/LoginScreen';
import SignupScreen from './auth/SignupScreen';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      'userListIsHidden': true
    };
    
    this.toggleUserList = this.toggleUserList.bind(this);
  }

  toggleUserList (e) {
    let userListState = !this.state.userListIsHidden;
    this.setState({userListIsHidden: userListState});
  }


  render() {
    return (
      <div className="App">
        <Grid.Row>
          <Topbar toggleUserList = {this.toggleUserList}></Topbar>
        </Grid.Row>
        <section id="content">
          <Route exact path="/" render={(props) => <ChatScreen userListIsHidden={this.state.userListIsHidden} />} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/signup" component={SignupScreen} />
        </section>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';

import {Route} from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import Topbar from './topbar/topbar';
import ChatScreen from './chat/ChatScreen';
import LoginScreen from './auth/LoginScreen';
import SignupScreen from './auth/SignupScreen';
import HomeScreen from './components/HomeScreen/HomeScreen';
import Auth from './services/Auth';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userListIsHidden: false,
      user: false
    };
    this.toggleUserList = this.toggleUserList.bind(this);
  }

  componentWillMount() {
    this.setState({user: Auth.check()});
  }

  toggleUserList (e) {
    let userListState = !this.state.userListIsHidden;
    this.setState({userListIsHidden: userListState});
  }


  render() {
    let {user} = this.state;
    return (
      <div className="App">
        <Grid.Row>
          <Topbar toggleUserList={this.toggleUserList} user={user}></Topbar>
        </Grid.Row>
        <section id="content">
          <Route exact path="/" render={(props) => <HomeScreen user={user}/>}/>
          <Route path="/chat" render={(props) => <ChatScreen userListIsHidden={this.state.userListIsHidden} />} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/signup" component={SignupScreen} />
        </section>
      </div>
    );
  }
}

export default App;

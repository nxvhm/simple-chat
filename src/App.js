import React, { Component } from 'react';

import {Route} from 'react-router-dom';

import ChatScreen from './components/chat/ChatScreen';
import LoginScreen from './components/Auth/LoginScreen';
import SignupScreen from './components/Auth/SignupScreen';
import HomeScreen from './components/HomeScreen/HomeScreen';
import Auth from './services/Auth';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userListIsHidden: true,
      showAvatarsModal: false,
      user: false,
      connectedToServer: false,
    };

    this.toggleUserList = this.toggleUserList.bind(this);

  }

  /**
   * Update User data
   * @param   {String}  token  JWT Token
   */
  updateUserToken(token) {
    Auth.setToken(token);

    let user = Auth.check();

    if (user) {
      this.setState({user});
    }
  }

  toggleUserList () {
    let userListState = !this.state.userListIsHidden;
    this.setState({userListIsHidden: userListState});
  }

  componentDidMount() {
    Auth.emitExpirationEvent(5);
  }

  render() {
    let {user, connectedToServer} = this.state;
    return (
      <div className="App">
        <Route exact path="/" component={LoginScreen} />
        <Route path="/signup" component={SignupScreen} />

        <Route path="/homescreen" render={(props) =>
          <HomeScreen
            user={user}
            connectedToServer={connectedToServer}
            toggleServerConnection={this.toggleServerConnection}
            />}
        />

        <Route path="/chat/:userId" render={(props) =>
          <ChatScreen
            userListIsHidden={this.state.userListIsHidden}
            userId={props.match.params.userId}
          />
        }/>

      </div>
    );
  }
}

export default App;

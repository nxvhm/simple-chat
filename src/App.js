import React, { Component } from 'react';

import {Route} from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import Topbar from './components/Topbar/Topbar';
import ChatScreen from './chat/ChatScreen';
import LoginScreen from './components/Auth/LoginScreen';
import SignupScreen from './components/Auth/SignupScreen';
import HomeScreen from './components/HomeScreen/HomeScreen';
import Auth from './services/Auth';
import SocketClient from './services/Socket/Client';
import AvatarsModal from './components/Modals/Avatars'

import './App.css';
const axios = require('axios');

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userListIsHidden: false,
      showAvatarsModal: false,
      user: false,
      connectedToServer: false,
    };

    this.toggleUserList = this.toggleUserList.bind(this);
    this.toggleAvatarsModal = this.toggleAvatarsModal.bind(this);
    this.updateUserToken = this.updateUserToken.bind(this);
    this.connectToServer = this.connectToServer.bind(this);
    this.toggleServerConnection = this.toggleServerConnection.bind(this);

  }

  /**
   * Initialize Connection to the WebSocket server
   * @return  {void}
   */
  connectToServer() {
    //Initialize socket connection
    let user = this.state.user;

    if (user && !SocketClient.isConnected()) {

      SocketClient.connect(
        process.env.REACT_APP_SOCKET_URL,
        process.env.REACT_APP_SOCKET_PORT,
        user._id
      , () => {
        let connectedToServer = SocketClient.isConnected()
        this.setState({connectedToServer});
      });
      // setTimeout(() => {
      //   console.log(SocketClient.getConnection());
      // }, 1000);
    } else {
      this.setState({connectedToServer: false })
    }
  }

  /**
   * Connect/Disconnet from ws server
   * @return  {void}
   */
  toggleServerConnection() {
    if (this.state.connectedToServer) {
      SocketClient.getConnection().close(1000);
      this.setState({connectedToServer: false})
    } else {
      this.connectToServer();
    }
  }

  componentDidMount() {

    let user = Auth.check();

    if (user) {

      let showAvatarsModal = user && user.avatar === ""
        ? true
        : false;

      axios.defaults.headers.common = {'Authorization': `Bearer ${Auth.getToken()}`}

      this.setState({user: user, showAvatarsModal: showAvatarsModal}, () => {
        //Initialize socket connection after user is set in state
        this.connectToServer();
      });

    }
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
  /**
   * Toggle show avatars modal flag
   */
  toggleAvatarsModal() {
    this.setState({showAvatarsModal: !this.state.showAvatarsModal});
    console.log(this.state);
  }

  render() {
    let {user, showAvatarsModal, connectedToServer} = this.state;
    return (
      <div className="App">

        {/* Call avatar modal if no avatar available for the user */}
        <AvatarsModal user={user}
          toggleAvatarsModal={this.toggleAvatarsModal}
          isOpen={showAvatarsModal}
          updateUserToken={this.updateUserToken}>
        </AvatarsModal>

        <Grid.Row>

          <Topbar
            toggleUserList={this.toggleUserList}
            toggleAvatarsModal={this.toggleAvatarsModal}
            connectedToServer={connectedToServer}
            toggleServerConnection={this.toggleServerConnection}
            user={user}>
          </Topbar>

        </Grid.Row>

        <Route exact path="/" render={(props) => <HomeScreen user={user} connectedToServer={this.state.connectedToServer}/>}/>
        <Route path="/chat" render={(props) => <ChatScreen userListIsHidden={this.state.userListIsHidden} />} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/signup" component={SignupScreen} />

      </div>
    );
  }
}

export default App;

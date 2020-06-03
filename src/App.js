import React, { Component } from 'react';

import {Route} from 'react-router-dom';

import ChatScreen from './components/Chat/ChatScreen';
import LoginScreen from './components/Auth/LoginScreen';
import SignupScreen from './components/Auth/SignupScreen';
import HomeScreen from './components/HomeScreen/HomeScreen';
import Auth from './services/Auth';
import {connect} from 'react-redux';
import * as userActions from './actions/userActions';
import * as chatRoomActions from './actions/chatRoomActions';
import {withRouter} from 'react-router-dom'

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

  componentWillMount() {

  }

  render() {
    let {connectedToServer} = this.state;
    return (
      <div className="App">
        <Route exact path="/"
          render={(props) =>
          <LoginScreen user={this.props.user} />}
        />

        <Route path="/signup" component={SignupScreen} />

        <Route path="/homescreen" render={(props) =>
          <HomeScreen
            user={this.props.user}
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
function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    chatRooms: state.chatrooms
  };
}

const mapDispatchToProps = dispatch => ({
  getUserProfile: () => dispatch(userActions.getUser()),
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

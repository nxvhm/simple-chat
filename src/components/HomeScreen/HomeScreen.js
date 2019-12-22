import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Segment, Grid, Card, Divider, Dimmer, Loader } from 'semantic-ui-react'
import OnlineUsers from '../Widgets/OnlineUsers';
import Auth from './../../services/Auth';
import Topbar from './../Topbar/Topbar';
import AvatarsModal from './../Modals/Avatars'
import SocketClient from './../../services/Socket/Client';
import * as actions from './../../actions/chatRoomActions';
import * as userActions from './../../actions/userActions';
import CreateChatRoomModal from './../Chat/Room/CreateModal';
import ChatRoomItem from './../Chat/Room/Item';
const axios = require('axios');

class HomeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: false,
      connectedToServer: false,
      chatRoomsLoading: false,
      modals: {
        selectAvatar: false,
        createChatRoom: false
      }
    }

    this.toggleServerConnection = this.toggleServerConnection.bind(this);
    this.connectToServer = this.connectToServer.bind(this);
    this.toggleAvatarsModal = this.toggleAvatarsModal.bind(this);
    this.toggleChatRoomsModal = this.toggleChatRoomsModal.bind(this);
    this.updateUserToken = this.updateUserToken.bind(this);
    this.addRoom = this.addRoom.bind(this);

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

      SocketClient.onClose((event) => {
        // Connection error or interupted, try again
        this.setState({connectedToServer: false});
        console.log("WS Server connection closedlost, try again in 5 sec");
        setTimeout(() => {
          this.connectToServer();
        }, 5000);
      });

      SocketClient.onError((event) => {
        // Connection error or interupted, try again
        this.setState({connectedToServer: false});
        console.log("WS Server connection interrupted");
      });

    } else if(SocketClient.isConnected()) {
      this.setState({connectedToServer: true })
    }
  }

  /**
   * Update User data
   * @param   {String}  token  JWT Token
   */
  updateUserToken(token) {
    Auth.setToken(token);

    Auth.check().then(user => {
      if (user) {
        this.setState({user});
      }
    }).catch(err => {
      console.log(err.message);
    });

  }

  /**
   * Toggle show avatars modal flag
   */
  toggleAvatarsModal() {
    let modals = this.state.modals;
    modals.selectAvatar = !modals.selectAvatar;
    this.setState({modals});
  }

  /**
   * Toggle Create Chat Room Modal
   */
  toggleChatRoomsModal() {
    let modals = this.state.modals;
    modals.createChatRoom = !modals.createChatRoom;
    this.setState(modals);
  }

  addRoom(data) {
    console.log('addRoom', data);
    data = {id:Math.random()};
    this.props.actions.createChatRoom(data);
  }

  componentDidMount() {
    let self = this;
    console.log(this.props.user);

    Auth.check().then(function(res) {
      let user = res;

      if (user) {
        axios.defaults.headers.common = {'Authorization': `Bearer ${Auth.getToken()}`}
      } else {
        window.location = '/';
      }
      self.setState({user});

      if (self.state.connectedToServer === false) {
        self.connectToServer();
      }

    });
  }

  render() {

    let {connectedToServer, modals} = this.state;
    let user = this.props.user;
    /* Call avatar modal if no avatar available for the user */

    return(
      <div>
        <AvatarsModal user={user}
          toggleAvatarsModal={this.toggleAvatarsModal}
          isOpen={user.avatar === "" || modals.selectAvatar}
          updateUserToken={this.updateUserToken}>
        </AvatarsModal>

    <Grid.Row>

      <Topbar
        toggleUserList={this.toggleUserList}
        toggleAvatarsModal={this.toggleAvatarsModal}
        connectedToServer={connectedToServer}
        toggleServerConnection={this.toggleServerConnection}
        showHomeBtn={false}
        user={user}>
      </Topbar>

    </Grid.Row>
      <Grid container stackable>

        <Grid.Row className="mt40">
          {/* Online User Column */}
          <Grid.Column mobile={16} tablet={8} computer={6}>
            <OnlineUsers user={user} connectedToServer={connectedToServer}></OnlineUsers>
          </Grid.Column>

          {/* Chat rooms Column */}
          <Grid.Column mobile={16} tablet={8} computer={10}>
            <Segment>
            <Dimmer active={this.state.chatRoomsLoading}>
                <Loader>Loading</Loader>
            </Dimmer>
            <h3>
              Chat Rooms Available
              <CreateChatRoomModal
                isOpen={this.state.modals.createChatRoom}
                toggleModal={this.toggleChatRoomsModal}
                addRoom={this.addRoom}>
              </CreateChatRoomModal>
            </h3>

            <Divider />

            <Grid.Row>
              <Card.Group >
                {this.props.chatRooms.map((chatRoom, index) => {
                  // return this.chatRoom(chatRoom, index);
                  return <ChatRoomItem key={chatRoom.id} {...chatRoom}></ChatRoomItem>
                })}
              </Card.Group>
            </Grid.Row>

            </Segment>
          </Grid.Column>

        </Grid.Row>
      </Grid>
      </div>

    )
  }
}

function mapStateToProps(state, ownProps) {
  console.log(ownProps);
  return {
    chatRooms: state.chatRooms,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, actions, userActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

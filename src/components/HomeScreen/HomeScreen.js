import React, {Component} from 'react';
import { Button, Segment, Grid, Card, Image, Icon, Divider } from 'semantic-ui-react'
import OnlineUsers from '../Widgets/OnlineUsers';
import Auth from './../../services/Auth';
import Topbar from './../Topbar/Topbar';
import AvatarsModal from './../Modals/Avatars'
import SocketClient from './../../services/Socket/Client';

const axios = require('axios');

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: false,
      showAvatarsModal: false,
      connectedToServer: false
    }

    this.toggleServerConnection = this.toggleServerConnection.bind(this);
    this.connectToServer = this.connectToServer.bind(this);
    this.toggleAvatarsModal = this.toggleAvatarsModal.bind(this);
    this.updateUserToken = this.updateUserToken.bind(this);

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

    } else {
      this.setState({connectedToServer: false })
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

  /**
   * Toggle show avatars modal flag
   */
  toggleAvatarsModal() {
    this.setState({showAvatarsModal: !this.state.showAvatarsModal});
    console.log(this.state);
  }

  componentDidMount() {
    let self = this;
    Auth.check().then(function(res) {
      let user = res;
      let showAvatarsModal = false;

      if (user) {
        axios.defaults.headers.common = {'Authorization': `Bearer ${Auth.getToken()}`}
        showAvatarsModal = user && user.avatar === ""
        ? true
        : false;
      } else {
        window.location = '/login';
      }
      self.setState({user, showAvatarsModal});

      if (self.state.connectedToServer === false) {
        self.connectToServer();
      }

    });
  }

  render() {

    let {user, showAvatarsModal, connectedToServer} = this.state;

    /* Call avatar modal if no avatar available for the user */

    const TestCard = (props) => (
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
          <Card.Header>Steve Sanders</Card.Header>
          <Card.Meta>Friends of Elliot</Card.Meta>
          <Card.Description>
            Steve wants to add you to the group <strong>best friends</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>Join</Button>
          </div>
        </Card.Content>
      </Card>
    );

    return(
      <div>
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

              <h3>
                Chat Rooms Available
                <Button basic color='violet' floated='right' size='tiny'>
                  <Icon name='hashtag' />
                  Create new Room
                </Button>
              </h3>

              <Divider />

              <Grid.Row>
                <Card.Group >
                  { Array.apply(null, {length: 5}).map(Number.call, Number).map(card =>
                    <TestCard key={Math.random()} />
                  )}
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

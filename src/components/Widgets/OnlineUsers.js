import React, { Component } from 'react';
import { Button, Segment, Item, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Users from '../../services/Users'
import SocketClient from '../../services/Socket/Client'

export default class OnlineUsers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      onlineUsers: []
    }

    this.getOnlineUsers = this.getOnlineUsers.bind(this);

  }


  componentDidMount() {
    this.getOnlineUsers();
  }

  attachOnlineUserHandler() {
    if (this.props.connectedToServer) {
      SocketClient.getConnection().addEventListener('new-user-online', this.getOnlineUsers);
    }
  }

  detachOnlineUserHandler() {
    if (this.props.connectedToServer) {
      SocketClient.getConnection().removeEventListener('new-user-online', this.getOnlineUsers);
    }
  }

  componentWillUnmount() {
    this.detachOnlineUserHandler();
  }


  getOnlineUsers() {
    Users.getOnlineUsers().then(onlineUsers => {
      this.setState({onlineUsers});
    })
  }


  render() {
    this.attachOnlineUserHandler();

    const currentUser = this.props.user;

    const UserItem = (props) => (
      <Item>
        <Item.Image size='mini' verticalAlign='middle' src={props.user.avatar} />
        <Item.Content>
          <Item.Header>
            <Icon name='favorite' />{props.user.username}</Item.Header>
            <Link to={{
              pathname: `/chat/${props.user._id}`,
              state: {
                showHomeBtn: true
              }
            }}>
              <Button basic size='mini' floated='right' color='green' >CHAT</Button>
            </Link>
        </Item.Content>
      </Item>
    )

    return <Segment>
    <h3>Users Online</h3>
    <Item.Group>
      {this.state.onlineUsers.map(user => currentUser._id !== user._id ? <UserItem user={user} key={user._id} /> : false)}

    </Item.Group>
  </Segment>
  }
}

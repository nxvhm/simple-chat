import React, { Component } from 'react';
import { Button, Segment, Item, Icon } from 'semantic-ui-react'
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
    this.attachOnlineUserHandler()

    const UserItem = (props) => (
      <Item>
        <Item.Image size='mini' verticalAlign='middle' src={props.user.avatar} />
        <Item.Content>
          <Item.Header>
            <Icon name='favorite' />{props.user.username}</Item.Header>
          <Button basic size='mini' floated='right' color='green' >CHAT</Button>
        </Item.Content>
      </Item>
    )

    return <Segment>
    <h3>Users Online</h3>
    <Item.Group>
      {this.state.onlineUsers.map(user => <UserItem user={user} key={user._id} />)}

    </Item.Group>
  </Segment>
  }
}

import React, { Component } from 'react'
import ChatPane from './ChatPane';
import UserList from './../user-list/user-list';
import { Container, Grid } from 'semantic-ui-react'

/**
 * Chat Screen Component with ChatPane for messages
 * and Sidebar with users list available for chat
 */
class ChatScreen extends Component {
    constructor(props) {
      super(props);
      console.log('ChatScreen props', props);
    }

    render() {
      return(

        <Grid columns={2} stretched>
          <Grid.Column width={14} className="chat-pane-container">
            <ChatPane></ChatPane>
          </Grid.Column>

          <Grid.Column width={2} stretched>
          <Container>
            <UserList isHidden={this.props.userListIsHidden}></UserList>
          </Container>
          </Grid.Column>
        </Grid>
      )
    }
}

export default ChatScreen
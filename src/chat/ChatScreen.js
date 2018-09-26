import React, { Component } from 'react'
import ChatPane from './ChatPane';
import UserList from './../user-list/user-list';
import { Grid } from 'semantic-ui-react'

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
        <div className="chat-screen-container">
        <Grid stretched>
          <Grid.Column width={16} className="chat-pane-container">
            <ChatPane></ChatPane>
          </Grid.Column>
        </Grid>

        <div className="user-list-container">
          <UserList isHidden={this.props.userListIsHidden}></UserList>
        </div>
        </div>        
      )
    }
}

export default ChatScreen
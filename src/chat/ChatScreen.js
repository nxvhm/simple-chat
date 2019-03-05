import React, { Component } from 'react'
import ChatPane from './ChatPane';
import UserList from './../user-list/user-list';

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
        <section id="content">

        <div className="chat-screen-container">

          <ChatPane></ChatPane>

          <div className="user-list-container">
            <UserList isHidden={this.props.userListIsHidden}></UserList>
          </div>
        </div>
        </section>
      )
    }
}

export default ChatScreen

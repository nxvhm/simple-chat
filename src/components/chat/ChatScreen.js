import React, { Component } from 'react'
import ChatPane from './ChatPane';
import UserList from './../UserList/UserList';
import Users from './../../services/Users';

/**
 * Chat Screen Component with ChatPane for messages
 * and Sidebar with users list available for chat
 */
class ChatScreen extends Component {
    constructor(props) {
      super(props);

      this.state = {
        receivingUserData: null //Data about the user we chat with (who will receive our messages)
      }
    }

    componentDidMount() {
      let userId = this.props.userId;

      // Get data about the user we want to chat with
      // and update the state with it. If error flag provided
      // redirect to home page
      Users.getUserData(userId).then(data => {
        if (!data.error) {
          console.log(data);
          this.setState({receivingUserData: data});
        } else {
          window.location.href = '/';
        }
      });

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

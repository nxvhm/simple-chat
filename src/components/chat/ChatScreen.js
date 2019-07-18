import React, { Component } from 'react'
import ChatPane from './ChatPane';
import UserList from './../UserList/UserList';
import Users from './../../services/Users';
import {Image, Button, Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

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
          this.setState({receivingUserData: data});
        } else {
          window.location.href = '/';
        }

      });

    }

    render() {

      let UserBar = (props) => {

        if (props.user) {

          return <div className='chat-user-bar bg-black'>

            <Image size='mini' src={props.user.avatarUrl} className="float-left"/>

            {props.user.username}

            <Link to='/'>
              <Button className="float-right" icon>
                <Icon name="home"></Icon>
              </Button>
            </Link>

         </div>
        }
        return false;
      }

      return(
        <section id="content">

          <UserBar user={this.state.receivingUserData}></UserBar>

          <div className="chat-screen-container">

            <ChatPane receiver={this.state.receivingUserData}></ChatPane>

            <div className="user-list-container">
              <UserList isHidden={this.props.userListIsHidden}></UserList>
            </div>

          </div>

        </section>
      )
    }
}

export default ChatScreen

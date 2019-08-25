import React, { Component } from 'react'
import ChatPane from './ChatPane';
import UserList from './../UserList/UserList';
import Users from './../../services/Users';
import {Image, Menu} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import { Link } from 'react-router-dom';
import Auth from './../../services/Auth';

/**
 * Chat Screen Component with ChatPane for messages
 * and Sidebar with users list available for chat
 */
class ChatScreen extends Component {
    constructor(props) {
      super(props);

      this.state = {
        receiver: null, //Data about the user we chat with (who will receive our messages)
        sender: null
      }

      this.handleItemClick = this.handleItemClick.bind(this);
    }

    componentDidMount() {
      let userId = this.props.userId;

      // Get data about the user we want to chat with
      // and update the state with it. If error flag provided
      // redirect to home page
      Users.getUserData(userId).then(data => {

        if (!data.error) {
          this.setState({receiver: data});
        } else {
          window.location.href = '/';
        }
      });

      let self = this;

      Auth.check().then(function(res) {
        if (res) {
          self.setState({sender: res});
        }
      });
    }
    handleItemClick(e) {
      console.log(e.target.getAttribute('name'));
      if (e.target.getAttribute('name') === 'home') {
        this.props.history.push('/homescreen');
      }
    }

    render() {

      let SenderMenu = (props) => {
        if (!props.sender) {
          return false;
        }
        return(
        <Menu.Item color='blue' name='sender' active={true} onClick={null}>
         <Image src={props.sender.avatar} size='mini' circular />
         &nbsp;Profile
        </Menu.Item>
        );
      };

      let UserBar = (props) => {
        if (!props.user) return false;

        if (props.user) {
          return <Menu>

          <Menu.Item header onClick={this.handleItemClick}>
            <h1 name="home">Chatty</h1>
          </Menu.Item>

          <Menu.Item color='blue' active={false}  onClick={this.handleItemClick}>
             <Image src={props.user.avatarUrl} size='mini' circular />
             &nbsp;{props.user.username}
          </Menu.Item>

          <Menu.Menu position='right'>
            <SenderMenu sender={props.sender}></SenderMenu>
          </Menu.Menu>

        </Menu>

        }
        return false;
      }

      return(
        <section id="content">

          <UserBar user={this.state.receiver} sender={this.state.sender}></UserBar>

          <div className="chat-screen-container">

            <ChatPane receiver={this.state.receiver} sender={this.state.sender}></ChatPane>

            <div className="user-list-container">
              <UserList isHidden={this.props.userListIsHidden}></UserList>
            </div>

          </div>

        </section>
      )
    }
}

export default withRouter(ChatScreen)

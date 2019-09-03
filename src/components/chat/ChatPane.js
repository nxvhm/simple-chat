import React, { Component } from 'react'
import { Input, Grid, Button, Icon, Comment, Container} from 'semantic-ui-react'
import Auth from './../../services/Auth';
import axios from 'axios';
import SocketClient from './../../services/Socket/Client';

class ChatPane extends Component {

  constructor(props) {
    super(props);

    this.state = {
      msg: "",
      sendAvailable: false,
      apiUrl: process.env.REACT_APP_API_URI,
      messages: [
        {
          type: 'send', avatar: 'https://react.semantic-ui.com/images/avatar/small/stevie.jpg',
          body: '111111s a free online encyclopedia, created and edited by volunte',
        },
        {
          type: 'receive', avatar: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
          body: 'Wikipedia is dsadas free online encyclopedia, created and edited by volunte',
        },
        {
          type: 'send', avatar: 'https://react.semantic-ui.com/images/avatar/small/stevie.jpg',
          body: 'Wikipedia is a free online encyclopedia, created and edited by volunte',
        },
        {
          type: 'receive', avatar: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
          body: 'Wikipedia is dsadas free online encyclopedia, created and edited by volunte',
        },
      ]
    }

    this.onMessageType = this.onMessageType.bind(this);
    this.onMessageSend = this.onMessageSend.bind(this);
  }

  MessageItem = (props) => {
    return(
    <Grid.Row verticalAlign='middle'>
      <Comment.Group>

    <Comment className={`chat-msg ${props.type}` + (props.type === 'send' ? ' float-right' : ' float-left')}>
    <Comment.Avatar src={props.avatar} />
    <Comment.Content>
      <Comment.Metadata>
        5 days ago
        <Icon name='star' />5 Faves
      </Comment.Metadata>
      <Comment.Text>{props.body}</Comment.Text>
    </Comment.Content>
    </Comment>
      </Comment.Group>
    </Grid.Row>
    );
  }

  /**
   * OnMessageType Input Handler
   *
   * @param   {Object}
   */
  onMessageType(e) {
    this.setState({'msg': e.target.value});
    // If some/no chars. are entered toggle send
    this.setState({sendAvailable: (e.target.value.length && e.target.value.trim()) });
  }

  onMessageSend() {
    let {msg, apiUrl} = this.state;


    if (!msg || !msg.length) {
      return false;
    }
    // Do some ajax stuff

    // Append Msg to Chat Messages List
    let payload = {
      sender_id: Auth.user()._id,
      receiver_id: this.props.receiver._id,
      msg: msg
    };

    let self = this;

    axios.post(`${apiUrl}/message/send`, payload).then(res => {

      let newMsgItem = {
        type: 'send',
        body: payload.msg,
        avatar: self.props.sender.avatar
      };

      let messages = self.state.messages;
      messages.push(newMsgItem);
      self.setState({messages, msg: ''});

      console.log('Payload ', res.data, payload);

      if (res.data.success && SocketClient.isConnected()) {
        // If message successfully send and saved in db, then
        // send new message to chat server to notify receiver
        SocketClient.getConnection().send(JSON.stringify({
          type: 'new-pm',
          receiver_id: payload.receiver_id,
          sender_id: payload.sender_id,
          body: {contents: payload.msg, avatar: self.props.sender.avatar}
        }));
      }

    }).catch(err => {
      console.log('send error', err);

    })
  }

  render() {
    const MsgItem = this.MessageItem;
    let {sender, receiver} = this.props;
    return(
      <div>
        <div className='bg-gray-light chat-messages' >
        <Grid divided='vertically' textAlign='center'>
          {this.state.messages.map((msg, index) => {
              return <MsgItem key={'msg-'+index} type={msg.type} body={msg.body} avatar={msg.avatar}></MsgItem>
            }
          )}
        </Grid>
        </div>

        <div className="msg-input-container">
          <Grid>
          <Grid.Row>

            <Grid.Column width={15}>
              <Input name="msg" value={this.state.msg} onChange={e=>this.onMessageType(e)} fluid placeholder="Type your message..." />
            </Grid.Column>

            <Grid.Column width={1}>
              <Button onClick={this.onMessageSend} id="sendMsgBtn" icon  color="blue" disabled={!this.state.sendAvailable}>
                <Icon name='send'/> SEND
              </Button>
            </Grid.Column>

          </Grid.Row>
          </Grid>
        </div>
      </div>
    )
  };
}

export default ChatPane

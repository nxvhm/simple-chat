import React, { Component } from 'react'
import { Input, Grid, Button, Icon, Comment, Container} from 'semantic-ui-react'
import Auth from './../../services/Auth';

class ChatPane extends Component {

  constructor(props) {
    super(props);

    this.state = {
      msg: "",
      sendAvailable: false,
    }

    this.onMessageType = this.onMessageType.bind(this);
    this.onMessageSend = this.onMessageSend.bind(this);
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
    let msg = this.state.msg;

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

    console.log('Payload ', payload);
  }

  render() {

    let MsgItem = (props) => {
      return <Comment className={`chat-msg ${props.type}` + (props.type === 'send' ? ' float-right' : ' float-left')}>
        <Comment.Avatar src={props.avatar} />
        <Comment.Content>
          <Comment.Metadata>
            <span>5 days ago</span>
          </Comment.Metadata>
          <Comment.Text>{props.body}</Comment.Text>
        </Comment.Content>
      </Comment>
    }

    return(
      <div>
        <div className='bg-gray-light chat-messages' >
        <Container text>

          <Comment.Group>
            <MsgItem type="receive" body="Msg goes here mate" avatar="https://react.semantic-ui.com/images/avatar/small/stevie.jpg"></MsgItem>
            <MsgItem type="receive" body="Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation." avatar="https://react.semantic-ui.com/images/avatar/small/stevie.jpg"></MsgItem>
            <MsgItem type="receive" body="BRING THE LOUD BUDDY" avatar="https://react.semantic-ui.com/images/avatar/small/stevie.jpg"></MsgItem>
          </Comment.Group>

          <Comment.Group>
            <MsgItem type="send" body="Msg goes here mate" avatar='https://react.semantic-ui.com/images/avatar/small/elliot.jpg'></MsgItem>
            <MsgItem type="send" body="Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation." avatar='https://react.semantic-ui.com/images/avatar/small/elliot.jpg'></MsgItem>
            <MsgItem type="send" body="BRING THE LOUD BUDDY" avatar='https://react.semantic-ui.com/images/avatar/small/elliot.jpg'></MsgItem>
          </Comment.Group>

        </Container>
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

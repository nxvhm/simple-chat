import React, { Component } from 'react'
import { Input, Grid, Button, Icon, Item, Comment, Image} from 'semantic-ui-react'

class ChatPane extends Component {

  constructor(props) {
    super(props);

    this.state = {
      msg: "",
      sendAvailable: false
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
    console.log(this.state.msg);
  }

  render() {

    let MsgItem = (props) => {
      return <Comment className={`chat-msg ${props.type}`}>
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

        <div className='bg-gray-light chat-messages' style={{border: "3px solid red"}}>
        <Item.Group>
          <Item>
            <Item.Image size='mini' src='https://react.semantic-ui.com/images/avatar/small/stevie.jpg' />
            <Item.Content verticalAlign='middle'>
              <Item.Header>Joe Henderson </Item.Header>
            </Item.Content>
          </Item>

          <Comment.Group>
            <MsgItem type="receive" body="Msg goes here mate"></MsgItem>
            <MsgItem type="receive" body="Very important msg brooo"></MsgItem>
            <MsgItem type="receive" body="BRING THE LOUD BUDDY"></MsgItem>
          </Comment.Group>
        </Item.Group>

        <Item.Group>
          <Item>
            <Item.Image size='mini' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
            <Item.Content verticalAlign='middle'>
              <Item.Header>Joe Henderson </Item.Header>
            </Item.Content>
          </Item>

          <Comment.Group>
            <MsgItem type="send" body="Msg goes here mate"></MsgItem>
            <MsgItem type="send" body="Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation."></MsgItem>
            <MsgItem type="send" body="BRING THE LOUD BUDDY"></MsgItem>
          </Comment.Group>
        </Item.Group>

        <p>Chat Msg Goes here</p>
        <p>Chat Msg Goes here</p>
        <p>Chat Msg Goes here</p>
        <p>Chat Msg Goes here</p>
        <p>Chat Msg Goes here</p>
        <p>Chat Msg Goes here</p>
        <p>Chat Msg Goes here</p>
        <p>Chat Msg Goes here</p>
        <p>Chat Msg Goes here</p>


        </div>
        <div className="msg-input-container">
          <Grid>
          <Grid.Row>

            <Grid.Column width={15}>
              <Input name="msg" value={this.state.msg} onChange={e=>this.onMessageType(e)} fluid placeholder="Type your message..." />
            </Grid.Column>

            <Grid.Column width={1}>
              <Button onClick={this.onMessageSend} icon  color="blue" disabled={!this.state.sendAvailable}>
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

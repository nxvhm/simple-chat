import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'

class ChatPane extends Component {
  render() {
    return(
      <span>

      <div className='bg-gray-light chat-messages'>
        <p>Chat Msg Goes here</p>
        <p>Chat Msg Goes here</p>
        <p>Chat Msg Goes here</p>
        <p>Chat Msg Goes here</p>
        <p>Chat Msg Goes here</p>
        <p>Chat Msg Goes here</p>

      </div>
        <div className="msg-input-container">
          <Input name="msg" fluid placeholder="Type your message..." />
        </div>
      </span>
    )
  };
}

export default ChatPane
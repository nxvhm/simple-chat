import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'

class ChatPane extends Component {
  render() {
    return(
      <div className='bg-grey-light'>
        <p>
          Chat Pane Goes here
        </p>

      <div className="msg-input-container">
        <Input name="msg" placeholder="Type your message..." />
      </div>
      </div>
    )
  };
}

export default ChatPane
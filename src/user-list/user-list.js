import React, {Component} from 'react'
import { List, Image } from 'semantic-ui-react'

class UserList extends Component {
  render() {
    return(
      <div className='user-list-container bg-black'>
        <List>
          <List.Item className="chat-user-item">
            <List.Content>
              
              <List.Header as='a'><Image avatar src='/images/avatar/small/rachel.png' />&nbsp;Rachel</List.Header>
              <List.Description>
                Last seen watching{' '}
                <a>
                  <b>Arrested Development</b>
                </a>{' '}
                just now.
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item className="chat-user-item">
            <List.Content>
              <List.Header as='a'>
                <Image avatar src='/images/avatar/small/lindsay.png' />
                &nbsp;
                Lindsay
              </List.Header>
              <List.Description>
                Last seen watching{' '}
                <a>
                  <b>Bob's Burgers</b>
                </a>{' '}
                10 hours ago.
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item className="chat-user-item">
            <List.Content>
              <List.Header as='a'>
                <Image avatar src='/images/avatar/small/matthew.png' />
                &nbsp;
                Matthew
              </List.Header>
              <List.Description>
                Last seen watching{' '}
                <a>
                  <b>The Godfather Part 2</b>
                </a>{' '}
                yesterday.
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item className="chat-user-item">
            <List.Content>
              <List.Header as='a'>
              <Image avatar src='/images/avatar/small/jenny.jpg' />
              &nbsp;Jenny Hess
              </List.Header>
              <List.Description>
                Last seen watching{' '}
                <a>
                  <b>Twin Peaks</b>
                </a>{' '}
                3 days ago.
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item className="chat-user-item">
            <List.Content>
              <List.Header as='a'>
              <Image avatar src='/images/avatar/small/veronika.jpg' />
              &nbsp;Veronika Ossi
              </List.Header>
              <List.Description>Has not watched anything recently</List.Description>
            </List.Content>
          </List.Item>
          </List>
      </div>
    )
  }
}

export default UserList
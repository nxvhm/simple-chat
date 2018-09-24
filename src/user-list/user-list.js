import React, {Component} from 'react'
import { List, Image } from 'semantic-ui-react'

class UserList extends Component {

  constructor(props) {
    super(props);
    console.log('UserList::props ', props);
  }

  render() {
    let userList = [
      {name: 'Rachel', 'avatar': '/images/avatar/small/rachel.png'},
      {name: 'Lindsay', 'avatar': '/images/avatar/small/lindsay.png'},
      {name: 'Matthew', 'avatar': '/images/avatar/small/matthew.png'},
      {name: 'Jenny Hess', 'avatar': '/images/avatar/small/jenny.png'},
      {name: 'Veronika Ossi', 'avatar': '/images/avatar/small/veronika.png'}
    ];

    const ListItem = (props) => (
      <List.Item className="chat-user-item">
        <List.Content>
        <List.Header as='a'><Image avatar src={props.user.avatar} />{props.user.name}</List.Header>
        </List.Content>
      </List.Item>
    );

    return(
      <div className={'user-list-container bg-black '  + (this.props.isHidden === true ? 'hidden' : 'dasdasdas')}>
        <List>
          {userList.map(user => <ListItem user={user} key={user.name}></ListItem>)}
        </List>
      </div>
    )
  }
}

export default UserList
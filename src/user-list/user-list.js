import React, {Component} from 'react'
import { List, Image } from 'semantic-ui-react'
import 'simplebar';
import 'simplebar/dist/simplebar.css';

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
      {name: 'Jenny Hess', 'avatar': '/images/avatar/small/jenny.jpg'},
      {name: 'Veronika Ossi', 'avatar': '/images/avatar/small/veronika.jpg'},
      {name: 'Rachel', 'avatar': '/images/avatar/small/rachel.png'},
      {name: 'Lindsay', 'avatar': '/images/avatar/small/lindsay.png'},
      {name: 'Matthew', 'avatar': '/images/avatar/small/matthew.png'},
      {name: 'Jenny Hess', 'avatar': '/images/avatar/small/jenny.jpg'},
      {name: 'Veronika Ossi', 'avatar': '/images/avatar/small/veronika.jpg'},
      {name: 'Rachel', 'avatar': '/images/avatar/small/rachel.png'},
      {name: 'Lindsay', 'avatar': '/images/avatar/small/lindsay.png'},
      {name: 'Matthew', 'avatar': '/images/avatar/small/matthew.png'},
      {name: 'Jenny Hess', 'avatar': '/images/avatar/small/jenny.jpg'},
      {name: 'Veronika Ossi', 'avatar': '/images/avatar/small/veronika.jpg'},
      {name: 'Rachel', 'avatar': '/images/avatar/small/rachel.png'},
      {name: 'Lindsay', 'avatar': '/images/avatar/small/lindsay.png'},
      {name: 'Matthew2', 'avatar': '/images/avatar/small/matthew.png'},
      {name: 'Jenny Hess2', 'avatar': '/images/avatar/small/jenny.jpg'},
      {name: 'Veronika Ossi2', 'avatar': '/images/avatar/small/veronika.jpg'}                        
    ];

    const ListItem = (props) => (
      <List.Item className="chat-user-item">
        <List.Content>
        <List.Header as='a'><Image avatar src={props.user.avatar} />{props.user.name}</List.Header>
        </List.Content>
      </List.Item>
    );

    return(
      <div className={'user-list bg-black '  + (this.props.isHidden === true ? 'hidden-list' : '')} data-simplebar>
        <List>
          {userList.map(user => <ListItem user={user} key={Math.random()+user.name}></ListItem>)}
        </List>
      </div>
    )
  }
}

export default UserList
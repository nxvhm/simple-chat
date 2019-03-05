import React, {Component} from 'react'
import axios from 'axios';
import { List, Image } from 'semantic-ui-react'
import 'simplebar';
import 'simplebar/dist/simplebar.css';
class UserList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      usersList: []
    }
  }

  componentDidMount() {
    let url = process.env.REACT_APP_API_URI;

    axios.get(`${url}/users/active`)
      .then(res => {
        const usersList = res.data;
        this.setState({ usersList });
      })
  }

  render() {
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
          {this.state.usersList.map(user => <ListItem user={user} key={Math.random()+user.name} />)}
        </List>
      </div>
    )
  }
}

export default UserList

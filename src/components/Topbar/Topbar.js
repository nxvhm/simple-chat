import React, {Component} from 'react';
import {Button, Dropdown, Menu, Icon} from 'semantic-ui-react';
import Auth from './../../services/Auth';

class Topbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user || false
    }

    this.logout = this.logout.bind(this);
    this.callAvatarsModal = this.callAvatarsModal.bind(this);
  }
  /**
   * Call avatar modal
   */
  callAvatarsModal() {

  }
  /**
   * Genearte user dropdown markup
   * @param {Object} Current logged in used
   */
  userDropDown(user){
    if (user) {

      const profileBtn = (
        <Button icon="user"></Button>
      )

      return <Menu.Item>
      <Dropdown trigger={profileBtn} icon={null} className="float-left">
      <Dropdown.Menu>
        <Dropdown.Item disabled={true}>User Profile</Dropdown.Item>

        <Dropdown.Item> <Icon name="user"></Icon> {user.username}</Dropdown.Item>
        <Dropdown.Item> <Icon name="mail"></Icon> {user.email}</Dropdown.Item>
        <Dropdown.Item> <Icon name="image"></Icon> Avatar </Dropdown.Item>
        <Dropdown.Item onClick={this.callAvatarsModal}> <Icon name="setting"></Icon> Settings</Dropdown.Item>
        <Dropdown.Item> <Icon name="connectdevelop" color="green"></Icon> Online</Dropdown.Item>
        <Dropdown.Item onClick={this.logout}> <Icon name="power off"></Icon> Sign Out</Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
    }
  }

  /**
   * Delete jwt token from local storage and redirect to login
   */
  logout() {
    Auth.logout();
    window.location.href ='/login';
  }

  render(){
    let user = this.state.user;
    return(
      <Menu className='bg-blue topnav'>

        {this.userDropDown(user)}

        <Menu.Item className="brand">
            <h1>Chatty</h1>
        </Menu.Item>

        <Menu.Item>
          <Button icon="align justify" className="float-right" onClick={this.props.toggleUserList} />
        </Menu.Item>

      </Menu>

    );
  }
}

export default Topbar

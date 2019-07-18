import React, {Component} from 'react';
import {Button, Dropdown, Menu, Icon, Image} from 'semantic-ui-react';
import Auth from './../../services/Auth';

class Topbar extends Component {

  constructor(props) {
    super(props);

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
        user.avatar
        ? <Image src={user.avatar} size='mini' circular />
        : <Button icon="user"></Button>
      )

      return <Menu.Item>
      <Dropdown trigger={profileBtn} icon={null} className="float-left">
      <Dropdown.Menu>
        <Dropdown.Item disabled={true}>User Profile</Dropdown.Item>

        <Dropdown.Item>
          <Icon name="user"></Icon> {user.username}
        </Dropdown.Item>

        <Dropdown.Item>
          <Icon name="mail"></Icon> {user.email}
        </Dropdown.Item>

        <Dropdown.Item
          onClick={this.props.toggleAvatarsModal}>
            <Icon name="image" ></Icon>
            Select Avatar
        </Dropdown.Item>

        <Dropdown.Item> <Icon name="setting"></Icon> Settings</Dropdown.Item>
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
    const HomeBtn = (props) => {
      return <Button.Content hidden={!props.showHomeBtn}>
        <Button icon><Icon name="home"></Icon></Button>
      </Button.Content>;
    }

    return(
      <Menu className='bg-blue topnav'>

        {this.userDropDown(this.props.user)}

        <Menu.Item>
          <HomeBtn showHomeBtn={this.props.showHomeBtn}></HomeBtn>
          &nbsp;
          <Button toggle active={this.props.connectedToServer} onClick={this.props.toggleServerConnection}>
            {this.props.connectedToServer ? "ONLINE" : "OFFLINE"}
          </Button>
        </Menu.Item>

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

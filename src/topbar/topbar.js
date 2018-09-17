import React, {Component} from 'react';
import {Button, Dropdown, Menu, Icon} from 'semantic-ui-react';

class Topbar extends Component {
  render(){

    const profileBtn = (
      <Button icon="user"></Button>
    )

    return(
      <Menu  className='bg-purple'>
        <Menu.Item>
          <Dropdown trigger={profileBtn} icon={null} className="float-left">
          <Dropdown.Menu>
            <Dropdown.Item disabled={true}>User Profile</Dropdown.Item>

            <Dropdown.Item> <Icon name="user"></Icon> Profile</Dropdown.Item>
            <Dropdown.Item> <Icon name="setting"></Icon> Settings</Dropdown.Item>
            <Dropdown.Item> <Icon name="connectdevelop" color="green"></Icon> Online</Dropdown.Item>
            <Dropdown.Item> <Icon name="power off"></Icon> Sign Out</Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>
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
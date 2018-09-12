import React, {Component} from 'react';
import {Button, Dropdown, Menu, Icon} from 'semantic-ui-react';

class Topbar extends Component {
  render(){

    const chatRoomsBtn = (
      <Button icon="align justify" color="white"/> 
    )

    const profileBtn = (
      <Button icon="user" color="white"></Button>
    )

    const options = [
      {
        key: 'user',
        text: (
          <span>
            Signed in as Bob Smith
          </span>
        ),
        disabled: true,
      },
      { key: 'profile', text: 'Your Profile' },
      { key: 'status', text: 'Status' },
      { key: 'explore', text: 'Explore' },
      { key: 'integrations', text: 'Integrations' },
      { key: 'help', text: 'Help' },
      { key: 'settings', text: 'Settings' },
      { key: 'sign-out', text: 'Sign Out' },
    ]

    return(
      <Menu fixed='top' className='bg-purple'>
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
          <Dropdown 
            trigger={chatRoomsBtn} 
            options={options} 
            icon={null} 
            className="float-right" 
            pointing="right top"/>  
        </Menu.Item>

      </Menu>


    );
  }
}

export default Topbar
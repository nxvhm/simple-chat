import React, {Component} from 'react';
import {Button, Dropdown, Menu} from 'semantic-ui-react';

class Topbar extends Component {
  render(){

    const chatRoomsBtn = (
      <Button icon="align justify" color="black"/> 
    )

    const profileBtn = (
      <Button icon="user" color="black"></Button>
    )

    const options = [
      {
        key: 'user',
        text: (
          <span>
            Signed in as <strong>Bob Smith</strong>
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
          <Dropdown trigger={profileBtn} options={options} icon={null} className="float-left" />
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
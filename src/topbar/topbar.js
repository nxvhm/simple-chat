import React, {Component} from 'react';
import {Button, Grid, Dropdown} from 'semantic-ui-react';

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
      <header className="header topbar bg-purple">
      <Grid.Row>
        <Grid columns={3}>

          <Grid.Column>
            <Dropdown trigger={profileBtn} options={options} icon={null} className="float-left" />
          </Grid.Column>

          <Grid.Column>
          <div class="brand">
            <h1>Simple Chat</h1>
          </div> 
          </Grid.Column>

          <Grid.Column>
            <Dropdown trigger={chatRoomsBtn} options={options} icon={null} 
              className="float-right" pointing="right top"/>
          </Grid.Column>
        </Grid>
      </Grid.Row>
      </header>
    );
  }
}

export default Topbar
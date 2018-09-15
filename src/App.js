import React, { Component } from 'react';

import './App.css';
import { Container, Grid } from 'semantic-ui-react'
import Topbar from './topbar/topbar';
import ChatPane from './chat-panel/ChatPane';
import UserList from './user-list/user-list';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid.Row>
          <Topbar></Topbar>
        </Grid.Row>

        <Grid columns={2} stretched>
          <Grid.Column width={13} className="chat-pane-container">
            <ChatPane></ChatPane>
          </Grid.Column>

          <Grid.Column width={3} stretched>
          <Container>
            <UserList></UserList>
          </Container>
          </Grid.Column>
        </Grid>
        
      </div>
    );
  }
}

export default App;

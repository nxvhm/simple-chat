import React, { Component } from 'react';
import './App.css';
import { Container, Grid } from 'semantic-ui-react'
import Topbar from './topbar/topbar';
import ChatPane from './chat-panel/ChatPane';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid.Row>
          <Topbar></Topbar>
        </Grid.Row>

        <Grid columns={2}>
          <Grid.Column width={12} className="chat-pane-container">
            <ChatPane></ChatPane>
          </Grid.Column>

          <Grid.Column width={4}>
          <Container>
            <p>
              Sidebar goes here
            </p>
          </Container>
          </Grid.Column>
        </Grid>
        
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';

import './App.css';
import { Container, Grid } from 'semantic-ui-react'
import Topbar from './topbar/topbar';
import ChatPane from './chat-panel/ChatPane';
import UserList from './user-list/user-list';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      'userListIsHidden': true
    };
    
    this.toggleUserList = this.toggleUserList.bind(this);
  }

  toggleUserList (e) {
    let userListState = !this.state.userListIsHidden;
    this.setState({userListIsHidden: userListState});
  }


  render() {
    return (
      <div className="App">
        <Grid.Row>
          <Topbar toggleUserList = {this.toggleUserList}></Topbar>
        </Grid.Row>
        <section id="content">
          <Grid columns={2} stretched>
            <Grid.Column width={14} className="chat-pane-container no-padding">
              <ChatPane></ChatPane>
            </Grid.Column>

            <Grid.Column width={2} stretched className="no-padding">
            <Container>
              <UserList isHidden={this.state.userListIsHidden}></UserList>
            </Container>
            </Grid.Column>
          </Grid>
        </section>
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import { Button, Segment, Grid, Card, Image, Icon, Divider } from 'semantic-ui-react'
import OnlineUsers from '../Widgets/OnlineUsers';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let user = this.props.user;
    if (!user)
      return <Redirect to='/login'></Redirect>

    const TestCard = (props) => (
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
          <Card.Header>Steve Sanders</Card.Header>
          <Card.Meta>Friends of Elliot</Card.Meta>
          <Card.Description>
            Steve wants to add you to the group <strong>best friends</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>Join</Button>
          </div>
        </Card.Content>
      </Card>
    );

    return(
      <Grid container stackable>

        <Grid.Row className="mt40">
          {/* Online User Column */}
          <Grid.Column mobile={16} tablet={8} computer={6}>
            <OnlineUsers connectedToServer={this.props.connectedToServer}></OnlineUsers>
          </Grid.Column>

          {/* Chat rooms Column */}
          <Grid.Column mobile={16} tablet={8} computer={10}>
            <Segment>

              <h3>
                Chat Rooms Available
                <Button basic color='violet' floated='right' size='tiny'>
                  <Icon name='hashtag' />
                  Create new Room
                </Button>
              </h3>

              <Divider />

              <Grid.Row>
                <Card.Group >
                  { Array.apply(null, {length: 5}).map(Number.call, Number).map(card =>
                    <TestCard key={Math.random()} />
                  )}
                </Card.Group>
              </Grid.Row>

            </Segment>
          </Grid.Column>

        </Grid.Row>
      </Grid>
    )
  }
}

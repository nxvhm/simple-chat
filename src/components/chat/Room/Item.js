import React, {Component} from 'react';
import { Button, Card, Image } from 'semantic-ui-react'

/**
 * Card Item Representing ChatRoom
 */
export default class Item extends Component {
  construct(props) {
    this.super(props);
  }

  render() {
    return <Card>
      <Card.Content>
        <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
        <Card.Header>Chat Room Id {this.props.id}</Card.Header>
        <Card.Meta>{this.props.name}</Card.Meta>
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
  }
}

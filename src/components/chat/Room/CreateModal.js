import React, {Component} from 'react'
import { Button, Form, Icon, Modal } from 'semantic-ui-react'

class CreateChatroomModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // isOpen: false,
      room: {
        name: "",
        desc: ""
      }
    };

    this.closeModal = this.closeModal.bind(this);
    this.saveRoom = this.saveRoom.bind(this);
  }

  onActionClick(event, data) {
    console.log(event);
    console.log(data);
  }


  closeModal() {
    // console.log('close', this.state.isOpen);
    // this.setState({isOpen: false});
  }

  saveRoom() {
    // validate

    // call parent save
    this.props.addRoom(this.state.room);
  }

  triggerButton() {
    return <Button basic
      color='violet'
      floated='right'
      onClick={this.props.toggleModal}
      size='tiny'>
        <Icon name='hashtag' />
        Create new Room
    </Button>
  }

  render() {
    return <Modal open={this.props.isOpen} trigger={this.triggerButton()}>
    <Modal.Header icon='archive' content='Create New Chatroom' />
      <Modal.Content>
        <Form>

        <Form.Field required>
          <label>Chatroom Name</label>
          <Form.Input placeholder='Room Name' name='name' />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input placeholder='Description' />
        </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button basic onClick={this.props.toggleModal}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='green' onClick={this.saveRoom}>
          <Icon name='checkmark' /> Create
        </Button>
      </Modal.Actions>
    </Modal>
  }


}

export default CreateChatroomModal

import React, { Component } from 'react';
import { Button, Image, Modal, Icon  } from 'semantic-ui-react'
import axios from 'axios';

export default class Avatars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatars: [],
      selectedAvatar: null
    }

    this.selectAvatar = this.selectAvatar.bind(this);
    this.saveSelected = this.saveSelected.bind(this);
  }
  /**
   * Fetch available avatars from server and bind to state
   */
  componentWillMount() {
    let apiUrl = process.env.REACT_APP_API_URI;

    axios.get(`${apiUrl}/avatars`).then(result => {
      this.setState({avatars: result.data});
    }).catch(err => {
      this.setState({isOpen: false});
    });

  }

  /**
   * Save selected avatar in state
   */
  selectAvatar(src, e) {
    console.log(src);
    this.setState({selectedAvatar: src});
  }

  /**
   * Save Selected avatar to db
   */
  saveSelected() {

    let apiUrl = process.env.REACT_APP_API_URI;
    let user = this.props.user;
    let selectedAvatar = this.state.selectedAvatar;

    if (!selectedAvatar || !user) return false;

    axios.post(`${apiUrl}/user/save-avatar`, {
      userId: user._id,
      avatar: selectedAvatar
    }).then(res => {
      this.props.toggleAvatarsModal();
    }).catch(err => {
      this.props.toggleAvatarsModal();
    });
  }

  render() {

    let {avatars} = this.state;

    return (
      <Modal open={this.props.isOpen}>
      <Modal.Header>
        Select Avatar Image
        <Button color='green' floated="right" onClick={this.saveSelected}>
          <Icon name='checkmark' /> Save
        </Button>
        <Button basic color='green' floated="right" onClick={this.props.toggleAvatarsModal}>
          <Icon name='remove'/> Cancel
        </Button>
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {avatars.slice(0, 80).map(src =>
            <Image className={this.state.selectedAvatar === src ? 'avatar-option selected' : 'avatar-option'} onClick={(e) => this.selectAvatar(src, e)} size='tiny' floated='left' src={src} key={src} />
          )}
        </Modal.Description>
      </Modal.Content>
    </Modal>
    );
  }


}

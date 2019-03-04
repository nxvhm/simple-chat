import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    console.log('homescreen props', props);
    this.state = {
      user: props.user || false
    }
  }

  componentDidMount() {
  }

  render() {

    let user = this.state.user;
    console.log(user);
    // if (!user)
      // return <Redirect to='/login'></Redirect>

    return(
      <div><h3>HomeScreen {user.email}</h3></div>
    )
  }
}

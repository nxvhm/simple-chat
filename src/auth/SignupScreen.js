import React, { Component } from 'react'
import { Container, Form, Input, Select, Button } from 'semantic-ui-react'
import validator from 'validator';

class SignupScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      validEmail: false,
      password: '',
      validPassword: false,
      password_confirm: '',
      validUsername: false,
      username: '',
      gender: '',
    };

    this.handleSubmit     = this.handleSubmit.bind(this);
    this.handleUserInput  = this.handleUserInput.bind(this);
  }

  // Update state when user inputs data
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  // On submit listener
  handleSubmit(e) {
    e.preventDefault();
    this.setState({validEmail: validator.isEmail(this.state.email)});
    this.setState({validPassword:  !validator.isEmpty(this.state.password) &&  validator.equals(this.state.password_confirm, this.state.password)});
    this.setState({validUsername: !validator.isEmpty(this.state.username)});

    console.log(validator.isEmail(this.state.email));
    console.log(validator.equals(this.state.password_confirm, this.state.password));
  }

  render() {
    let options = [
        {key:1,text: 'Male', value: 'male'},
        {key:2,text: 'Female', value: 'female'}
    ];

    return(
      <Container>
        <h1 className="text-center">Create  Account</h1>
        <Form onSubmit={this.handleSubmit}>
            <Form.Field control={Input} name='username' label='Username' placeholder='Your Username' value={this.state.username} onChange={(event) => this.handleUserInput(event)} />
            <Form.Field control={Input} name='password' label='Password' placeholder='Your Password' value={this.state.password} onChange={(event) => this.handleUserInput(event)}  />
            <Form.Field control={Input} name='password' label='Repeat Password' placeholder='Repeat your Password' value={this.state.password_confirm} onChange={(event) => this.handleUserInput(event)}  />
            <Form.Field control={Input} name='email' label='Email Address' placeholder='Your Email' type='email' value={this.state.email}  onChange={(event) => this.handleUserInput(event)} />
            <Form.Field control={Select} label='Gender' options={options} placeholder='Gender' />
            <Button size="huge" type="submit" primary>Sign Up</Button>
        </Form>
      </Container>
    )
  }
}

export default SignupScreen
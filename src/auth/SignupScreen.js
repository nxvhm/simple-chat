import React, { Component } from 'react'
import { Container, Form, Button } from 'semantic-ui-react'
import validator from 'validator';

class SignupScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      username: '',
      gender: '',
      
      // Validation
      emailValid: false,
      passwordValid: false,
      usernameValid: false,
      passwordConfirmValid: false,
      formErrors: {email: '', password: '', passwordConfirm: '', username: ''},
      formValid: false,
    };

    this.handleSubmit     = this.handleSubmit.bind(this);
    this.handleUserInput  = this.handleUserInput.bind(this);
  }

  // Update state when user inputs data
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, () => {this.validateField(name, value)});
  }
  
  // On submit listener
  handleSubmit(e) {
    e.preventDefault();
  }

  validateField(field, value) {
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let usernameValid = this.state.usernameValid;
    let passwordConfirmValid = this.state.passwordConfirmValid;
    let formErrors    = this.state.formErrors;

    switch (field) {
      case 'email':
        emailValid = validator.isEmail(value);
        formErrors.email = emailValid ? '' : 'Invalid email address';
        break;

      case 'password':
        passwordValid = !validator.isEmpty(value) && (value.length >= 6);
        formErrors.password = passwordValid ? '' : 'Min. Length 6 characters';
        break;

      case 'username':
        usernameValid = !validator.isEmpty(value) && (value.length >= 6);
        formErrors.username = usernameValid ? '' : 'Min. length is 6 chars.';
        break;

      case 'passwordConfirm':
        passwordConfirmValid = validator.equals(value, this.state.password);
        formErrors.passwordConfirm = passwordConfirmValid ? '' : 'Passwords does not match';
      break;
    }

    this.setState({formErrors: formErrors,
      emailValid: emailValid,
      passwordValid: passwordValid,
      usernameValid: usernameValid,
      passwordConfirmValid: passwordConfirmValid
    }, this.valdateForm);

  }

  validateForm() {
    this.setState({formValid: this.state.emailValid 
      && this.state.passwordValid && this.state.usernameValid});
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

          <Form.Input type="text" 
            name='username' 
            label={'Username '+this.state.formErrors.username} 
            placeholder='Your Username' 
            value={this.state.username} 
            onChange={(event) => this.handleUserInput(event)}
            error={!this.state.usernameValid}
          />

          <Form.Input type='email' 
            name='email' 
            label={'Email Address '+ this.state.formErrors.email} 
            placeholder='Your Email' 
            value={this.state.email}  
            onChange={(event) => this.handleUserInput(event)}
            error={!this.state.emailValid}
          />

          <Form.Input type='password'
            name='password' 
            label={'Password '+ this.state.formErrors.password} 
            placeholder='Your Password' 
            value={this.state.password} 
            onChange={(event) => this.handleUserInput(event)}
            error={!this.state.passwordValid}              
          />

          {/* Repeat Password */}
          <Form.Input type='password'
            name='passwordConfirm' 
            label={'Repeat Password ' + this.state.formErrors.passwordConfirm} 
            placeholder='Repeat your Password' 
            value={this.state.passwordConfirm} 
            onChange={(event) => this.handleUserInput(event)}
            error={!this.state.passwordConfirmValid}
          />

          <Form.Select 
            label='Gender' 
            options={options} 
            placeholder='Gender' 
          />

          <Button size="huge" primary>Sign Up</Button>
        </Form>
      </Container>
    )
  }
}

export default SignupScreen
import React, { Component } from 'react'
import { Button, Form, Message, Container } from 'semantic-ui-react'
import validator from 'validator';
import axios from 'axios';

class LoginScreen extends Component {
    constructor(props) {
      super(props);

      this.state = {
          email: '',
          password: '',

          emailValid: false,
          passwordValid: false,

          requestError: false,

          formErrors: {email: '', password: ''}
      }

      this.handleSubmit     = this.handleSubmit.bind(this);
      this.handleUserInput  = this.handleUserInput.bind(this);      
    }
    // Update state when user inputs data
    handleUserInput(e) {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value}, () => {this.validateField(name, value)});
    }

    // Validate User Input
    validateField(field, value) {
      let emailValid = this.state.emailValid;
      let passwordValid = this.state.passwordValid;
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
        default:
          break;
      }

      // Update state with validation results
      this.setState({formErrors: formErrors, 
        emailValid: emailValid, 
        passwordValid: passwordValid
      });
    }

    isFormValid() {
      return (this.state.emailValid) && (this.state.passwordValid);
    }

    // Send signup request if form is valid
    handleSubmit() {

      if (!this.isFormValid()) {
        return false;
      }

      let apiUrl = process.env.REACT_APP_API_URI; 

      axios.post(`${apiUrl}/login`, {
        email: this.state.email,
        password: this.state.password
      }).then(function(response){
        console.log(response);
      });

    }

    render() {
      return(
        <Container>
          <h1 className="text-center">Login</h1>
            <Message
              warning
              header='You must register before you can do that!'
              content='Visit our registration page, then try again.'
            />          
            <Form onSubmit={this.handleSubmit}>

                <Form.Input type="email"
                  name='email' 
                  label='Email' 
                  placeholder='Your Email'
                  value={this.state.email}
                  onChange={(event) => this.handleUserInput(event)}
                  error={!this.state.emailValid}
                />

                <Form.Input type="password"
                  name='password' 
                  label='Your Password' 
                  placeholder='Enter Your Password'
                  value={this.state.password}
                  onChange={(event) => this.handleUserInput(event)}
                  error={!this.state.passwordValid} 
                />

                <Button size="huge" type="submit" primary>Login</Button>
            </Form>
        </Container>
      )
    }
}

export default LoginScreen
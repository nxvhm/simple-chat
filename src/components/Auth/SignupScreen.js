import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Button, Segment, Grid } from 'semantic-ui-react'
import validator from 'validator';
import axios from 'axios';

class SignupScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {

      // User Input States
      email: '',
      password: '',
      passwordConfirm: '',
      username: '',
      gender: 1,

      // Input Validation States
      emailValid: false,
      passwordValid: false,
      usernameValid: false,
      passwordConfirmValid: false,
      formErrors: {email: '', password: '', passwordConfirm: '', username: ''},
      loginRedirectSuccess: false,
      loginRedirect: false,
      formValid: false,
    };

    this.handleSubmit     = this.handleSubmit.bind(this);
    this.handleUserInput  = this.handleUserInput.bind(this);
    this.setLoginRedirect = this.setLoginRedirect.bind(this);
  }

  // Update state when user inputs data
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, () => {this.validateField(name, value)});
  }

  // Validate single field value
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
        usernameValid = !validator.isEmpty(value) && (value.length >= 4);
        formErrors.username = usernameValid ? '' : 'Min. length is 4 chars.';
        break;

      case 'passwordConfirm':
        passwordConfirmValid = validator.equals(value, this.state.password);
        formErrors.passwordConfirm = passwordConfirmValid ? '' : 'Passwords does not match';
      break;

      default:
        break;
    }

    this.setState({formErrors: formErrors,
      emailValid: emailValid,
      passwordValid: passwordValid,
      usernameValid: usernameValid,
      passwordConfirmValid: passwordConfirmValid
    });
  }

  // Send signup request if form is valid
  handleSubmit() {

    // e.preventDefault();

    let apiUrl = process.env.REACT_APP_API_URI;
    if (this.isFormValid()) {
      var self = this;
      axios.post(`${apiUrl}/signup`, {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        gender: this.state.gender,
      }).then(function(response) {
        if (response.data.errors) {
          let errors = response.data.errors;

          Object.keys(errors).map(key => {

            let field = key+'Valid';

            let formErrors = self.state.formErrors;
            formErrors[key] = errors[key].message;

            return self.setState({
              [field]: false,
             formErrors
            });

          });
        } else if (response.data.success) {
          self.setState({loginRedirectSuccess: true});
        }
      })
    }
  }

  isFormValid() {
    return (this.state.emailValid) && (this.state.passwordValid) && (this.state.usernameValid) && (this.state.passwordConfirmValid);
  }

  setLoginRedirect() {
    this.setState({
      loginRedirect: true
    });
  }

  renderLoginForm() {
    return (
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

        <Form.Field label="Gender" name="gender" control='select'>
          <option value='1'>Male</option>
          <option value='2'>Female</option>
        </Form.Field>
          <Button disabled={!this.isFormValid()} primary fluid>Sign Up</Button>
            <br />
          <Button color='purple' fluid onClick={this.setLoginRedirect}>Login</Button>
      </Form>

    );
  }

  render() {

    if (this.state.loginRedirectSuccess) {
      return <Redirect to={{
        pathname: '/',
        state: {successMsg: true, successMsgContent: 'Your registration was successfull, you can login in your account now'}
      }} />;
    }

    if (this.state.loginRedirect) {
      return <Redirect to='/' />;
    }

    return(
      <Grid container centered>
        <Grid.Row className="mt40">
        <Grid.Column mobile={16} tablet={8} computer={6}>
          <Segment raised color='violet'>
            <h1 className="text-center">Create  Account</h1>
            {this.renderLoginForm()}
          </Segment>
        </Grid.Column>
        </Grid.Row>

      </Grid>
    )
  }
}

export default SignupScreen

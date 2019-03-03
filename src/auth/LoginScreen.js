import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Form, Message, Container } from 'semantic-ui-react'
import validator from 'validator';
import Auth from './../services/Auth';

class LoginScreen extends Component {
    constructor(props) {
      super(props);

      this.state = {
          email: '',
          password: '',

          emailValid: false,
          passwordValid: false,
          requestError: false,
          warning: false,
          warningMsgContent: '',
          successMsg: false,
          successMsgContent: '',
          formErrors: {email: '', password: ''},
          redirect: false
      }
      this.handleSubmit     = this.handleSubmit.bind(this);
      this.handleUserInput  = this.handleUserInput.bind(this);
      this.handleDismiss  = this.handleDismiss.bind(this);

    }
    componentWillMount() {
      // Location Props
      let locProps = this.props.location;

      let successMsg = locProps.state && locProps.state.successMsg
        ? true : false;

      let successMsgContent = locProps.state && locProps.state.successMsgContent
      ? locProps.state.successMsgContent : '';

      this.setState({successMsg, successMsgContent});
    }

    componentDidMount() {
      if (Auth.check()) {
        this.setState({redirect: true});
        console.log(Auth.check(), this.state.redirect);
      }
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

      this.setState({warning: false});
      this.setState({warningMsgContent: null});

      Auth.login(`${apiUrl}/login`, {
        email: this.state.email,
        password: this.state.password
      }).then(loginResult => {
        if (loginResult.error) {
          // Unsuccessfull Login attemp
          this.setState({warning: true});
          this.setState({warningMsgContent: loginResult.msg});
        } else {
          this.setState({successMsg: true});
          this.setState({successMsgContent: "GG WP"});
          setTimeout(() => {
            this.props.history.replace("/");
          }, 1000)
        }
      });

    }

    handleDismiss(e) {
      let target = e.target.parentNode.attributes.name.value;
      let state = this.state;
      state[target] = !state[target];
      this.setState({state})
    }

    render() {
      const { redirect } = this.state;
      if (redirect)
        return <Redirect to='/'></Redirect>
      // this.props.location.state.successMsgContent;
      return(
        <Container>
          <h1 className="text-center">Login</h1>

            <Message name="successMsg" hidden={!this.state.successMsg}
              onDismiss={this.handleDismiss}
              success
              header='Success !'
              content={this.state.successMsgContent}
            />

            <Message name="warningMsg" hidden={!this.state.warning}
              onDismiss={this.handleDismiss}
              warning
              header={this.state.warningMsgContent}
              content='If you dont have an account, you can register from here!'
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

                <Button size="huge" type="submit" disabled={!this.isFormValid()} primary>Login</Button>
            </Form>
        </Container>
      )
    }
}

export default LoginScreen

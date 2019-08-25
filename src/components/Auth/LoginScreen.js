import React, { Component } from 'react'
import { Button, Form, Message, Segment, Grid } from 'semantic-ui-react'
import validator from 'validator';
import Topbar from './../Topbar/Topbar';
import Auth from './../../services/Auth';

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
          redirect: false,
          homescreen: '/homescreen',
      }
      this.handleSubmit     = this.handleSubmit.bind(this);
      this.handleUserInput  = this.handleUserInput.bind(this);
      this.handleDismiss  = this.handleDismiss.bind(this);
      this.goToSignup = this.goToSignup.bind(this);

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
      let self = this;
      Auth.check().then(user => {
        if (user) {
          window.location = self.state.homescreen;
        }
      });
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
            window.location.href =this.state.homescreen;
          }, 500);
        }
      });

    }

    handleDismiss(e) {
      let target = e.target.parentNode.attributes.name.value;
      let state = this.state;
      state[target] = !state[target];
      this.setState({state})
    }

    renderLoginForm() {
      return (
      <Segment raised color='violet'>
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
          <div className='text-center'>
            <Button basic color='green' type="submit" disabled={!this.isFormValid()}>Login</Button>
            <Button basic color='purple' onClick={this.goToSignup}>Signup</Button>
          </div>
        </Form>
      </Segment>
      )
    }

    goToSignup(event) {
      event.preventDefault();
      this.props.history.push('/signup');
    }

    render() {
      // const { redirect } = this.state;
      // if (redirect)
        // return <Redirect to='/'></Redirect>
      // this.props.location.state.successMsgContent;
      return(
      <div>
      <Topbar
        toggleUserList=""
        toggleAvatarsModal=""
        connectedToServer={false}
        toggleServerConnection={null}
        showHomeBtn={false}
        user={null}>
      </Topbar>
      <Grid container centered>
        <Grid.Row className="mt40">
        <Grid.Column  mobile={16} tablet={8} computer={6}>
          {this.renderLoginForm()}
        </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
      )
    }
}

export default LoginScreen

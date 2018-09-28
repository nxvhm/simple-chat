import React, { Component } from 'react'
import { Container, Form, Input, Select } from 'semantic-ui-react'

class SignupScreen extends Component {
    render() {
        let options = [
            {key:1,text: 'Male', value: 'male'},
            {key:2,text: 'Female', value: 'female'}
        ];

        return(
            <Container>
                <h1 className="text-center">Create  Account</h1>
                <Form>
                    <Form.Field control={Input} label='Username' placeholder='Your Username' />
                    <Form.Field control={Input} label='Password' placeholder='Your Password' />
                    <Form.Field control={Input} label='Email Address' placeholder='Your Email' type='email' />
                    <Form.Field control={Select} label='Gender' options={options} placeholder='Gender' />
                </Form>
            </Container>
        )
    }
}

export default SignupScreen
import React, { Component } from 'react'
import {Container} from 'semantic-ui-react';
import { Button, Form, Input, Select } from 'semantic-ui-react'

class LoginScreen extends Component {
    render() {
        let options = [
            {key:1,text: 'Male', value: 'male'},
            {key:2,text: 'Female', value: 'female'}
        ];
        return(
            <Container>
                <h1 className="text-center">Login</h1>
                <Form>
                    <Form.Field control={Input} label='Your username' placeholder='username' />
                    <Form.Field control={Input} label='Last name' placeholder='Last name' />
                    <Form.Field control={Select} label='Gender' options={options} placeholder='Gender' />
                </Form>
            </Container>
        )
    }
}

export default LoginScreen
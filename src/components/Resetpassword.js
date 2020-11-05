import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Form, } from 'react-bootstrap';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

class Resetpassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            new_password: ''
        }
    }
    
    handlePassword = (event) => {
        this.setState({
            new_password: event.target.value
        });    
    };
    
    handleSubmit = (event) => {
        event.preventDefault();
        document.getElementById("myBtn").disabled = true;
        api.post('/resetpassword',{token: this.props.match.params.token, new_password: this.state.new_password})
        .then(() => {
            console.log('Data sent!');
            document.getElementById("myBtn").disabled = false;
        })
        .catch(() => {
            console.log('Not sent');
        });
    };
    
    render() {
        return (
            <div>
                <Container>
                    <Form>
                        <Form.Group controlId = "formPassword">
                        <Form.Label>Enter New Password</Form.Label>
                        <Form.Control 
                            type = "password"
                            placeholder = "Enter new password"
                            name = "new_password"
                            onChange = {this.handlePassword}
                            value = {this.state.new_password}
                        />
                        </Form.Group>
                        <Button 
                            onClick = {this.handleSubmit}
                            id = "myBtn"
                            variant = "Secondary" 
                            type = "submit" 
                            style = {{color: "white", background: "cyan"}}
                        >
                        Reset password
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default Resetpassword;
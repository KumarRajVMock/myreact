import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Form, Row,Card } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux'
import { createUser } from "../redux/actions";

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

class AddUser extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handleFname = this.handleFname.bind(this);
        this.handleLname = this.handleLname.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);         
    }
    handleEmail = (event) => {
        this.setState({
            email: event.target.value 
        });    
    };
    handleFname = (event) => {
        this.setState({
            first_name: event.target.value 
        });    
    };
    handleLname = (event) => {
        this.setState({
            last_name: event.target.value
        });    
    };
    
    handleSubmit = (event) => {       
        event.preventDefault();
        document.getElementById("myBtn").disabled = true;

        api.post('/adduser', {
            name: this.state.first_name + ' ' + this.state.last_name,email: this.state.email,},{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })        
        .then((res) => {
            this.props.createUser(res.data.user);
            document.getElementById("myBtn").disabled = false;
        })        
        .catch((err) => {
            console.log(err.response);
            if (err.response === 401) {
                console.log("Please enter a valid username and password")
            }
            if (err.response === 403) {
                console.log("Please verify the verification email sent to your email-id")
            }
        });
    };
    
    render() {
        return (
            <Container>
                <Card style={{borderWidth:"0.5rem", marginTop:"15px"}}>
                    <Container>
                        <h3 style={{marginTop: "10px", marginLeft: "25px"}}>Add User</h3>
                        <Form>
                            <Row>
                                <Col md>
                                    <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control 
                                        type = "text"
                                        name = "name"
                                        onChange = {this.handleFname}
                                        value = {this.state.first_name}
                                    />
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control 
                                        type = "text"
                                        name = "name"
                                        onChange = {this.handleLname}
                                        value = {this.state.last_name}
                                    />
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group controlId = "formEmail">
                                    <Form.Label> Email Address</Form.Label>
                                    <Form.Control 
                                        type = "email" 
                                        placeholder = "Example@email.com" 
                                        name = "email"
                                        onChange = {this.handleEmail}
                                        value = {this.state.email}
                                    />
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Button
                                        id = "myBtn"
                                        onClick = {this.handleSubmit} 
                                        variant = "Secondary" 
                                        type = "submit" 
                                        style = {{color: "white", background: "blue", marginTop: "32px"}}
                                        >
                                        Add user
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>           
                </Card>
            </Container>          
        );
    }
}

export default connect(null, { createUser })(AddUser);
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Form, Row ,Card} from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux'

import { createTask } from "../redux/actions";


const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

class AddTask extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            description: '',
            assignee: JSON.parse(localStorage.getItem("user")).email,
            due_date: '',
        }
        this.handleTItle = this.handleTItle.bind(this);
        this.handleAssignee = this.handleAssignee.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleDuedate = this.handleDuedate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);         
    }
    handleTItle = (event) => {
        this.setState({
            title: event.target.value 
        });    
    };
    
    handleAssignee = (event) => {
        this.setState({
            assignee: event.target.value 
        });    
    };
    
    handleDescription = (event) => {
        this.setState({
            description: event.target.value
        });    
    };
    
    handleDuedate = (event) => {
        this.setState({
            due_date: event.target.value
        });    
    };
    
    handleSubmit = (event) => {       
        event.preventDefault();
        
        const newTask = {
            title: this.state.title,
            assignee: this.state.assignee,
            description: this.state.description,
            due_date: this.state.due_date,
        };
        
        api.post('/addtask', newTask,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((res) => {
            console.log(res.data);
            this.props.createTask(res.data.task);
        })        
        .catch((err) => {
            console.log(err.response);
        });
    };
    
    render() {
        const is_admin = (
            <Row>
                <Col md>
                    <Form.Group controlId = "formEmail">
                    <Form.Label>Assignee</Form.Label>
                    <Form.Control 
                        type = "text"
                        name = "email"
                        placeholder = "Example@email.com"
                        onChange = {this.handleAssignee}
                        value = {this.state.assignee}
                    />
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type = "text"
                        name = "name"
                        onChange = {this.handleTItle}
                        value = {this.state.title}
                    />
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group>
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control 
                        type = "date"
                        name = "date"
                        onChange = {this.handleDuedate}
                        value = {this.state.due_date}
                    />
                    </Form.Group>
                </Col>
            </Row>
        )
        const is_normal = (
            <Row>
                <Col md>
                    <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type = "text"
                        name = "name"
                        onChange = {this.handleTItle}
                        value = {this.state.title}
                    />
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group>
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control 
                        type = "date" 
                        name = "email"
                        onChange = {this.handleDuedate}
                        value = {this.state.due_date}
                    />
                    </Form.Group>
                </Col>
            </Row>
        )
        return (
            <Container>
                <Card style={{borderWidth:"0.5rem", marginTop:"15px"}}>
                    <Container>
                    <h3 style={{marginTop: "10px", marginLeft: "25px"}}>Add Task</h3>
                    <Form>
                        {(localStorage.getItem("role") === "Admin") ? is_admin : is_normal}
                        <Row>
                            <Col md>
                                <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control 
                                    type = "text" 
                                    name = "description"
                                    onChange = {this.handleDescription}
                                    value = {this.state.description}
                                />
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Button
                                    onClick = {this.handleSubmit} 
                                    variant = "Secondary" 
                                    type = "submit" 
                                    style = {{color: "white",background: "blue", marginTop: "32px"}}
                                    >
                                    Add Task
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

export default connect(null, { createTask })(AddTask);

// export default AddTask;
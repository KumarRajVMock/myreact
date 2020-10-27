import axios from "axios";
import React, { Component } from "react";
import {Button, Col, Container, Form, Row , } from 'react-bootstrap';
import Pusher from 'pusher-js';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: this.props.task.status,
            description: this.props.task.description,
            due_date: this.props.task.due_date
        }
        this.handleStatus = this.handleStatus.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleDuedate = this.handleDuedate.bind(this);
        this.handleTaskUpdate = this.handleTaskUpdate.bind(this);
    }
    onClickHandler = (e) => {
        const hiddenElement = e.currentTarget.nextSibling;
        hiddenElement.className.indexOf("collapse show") > -1 ? hiddenElement.classList.remove("show") : hiddenElement.classList.add("show");
    };
    
    handleStatus = (event) =>  {
        
        var pusher = new Pusher('891c7f6c06b720face3c', {cluster: 'ap2'});
        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
            alert(JSON.stringify(data));
        });
        
        this.setState({
            status: event.target.value
        });
        
        api.post('/updatestatus', {
            id:this.props.task.id, status:event.target.value}, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })        
        .then((res) => {
            console.log(res.data);
        })       
        .catch((err) => {
            console.log(err.response);
            
        });
    }
    
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
    
    handleTaskUpdate = (event) =>  {
        event.preventDefault();
        console.log(event.target.name)
        const data = {
            id: event.target.name, 
            description: this.state.description, 
            due_date: this.state.due_date
        }
        api.post('/updatetask', data, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })        
        .then((res) => {
            console.log(res.data);
        })       
        .catch((err) => {
            console.log(err.response);
            
        });
    }

    render() {
        const { task } = this.props;
        return (

            <tbody>
                <tr className="tablerow" onClick={this.onClickHandler}>
                        <td style={{ paddingLeft: "10px",  paddingTop: "10px"  }}>{task.assignee}</td>
                        <td style={{ paddingTop: "10px"  }}>{task.title}</td>
                        <td style={{ paddingTop: "10px", }}>
                            {JSON.parse(localStorage.getItem("user")).email === task.assignee ?
                                (
                                    <select 
                                    className="selectpicker"
                                    data-style="btn-primary"
                                    name={task.id}
                                    onChange={this.handleStatus}
                                    value={this.state.status}
                                    // title={task.status}                
                                    // defaultValue={task.status}
                                    >
                                        <option>Assigned</option>
                                        <option>In Progress</option>
                                        <option>Completed</option>
                                        <option>Deleted</option>
                                    </select>
                                )
                                :
                                (
                                    task.status
                                )
                            }
                        </td>
                </tr>
                <tr
                className="collapse"
                style={{
                    justifyContent: "space-between",
                    background: "#00bfff",
                    borderBottom: "1px solid rgb(225,225,225)",
                    borderLeft: "1px solid rgb(225,225,225)",
                    borderRight: "1px solid rgb(225,225,225)",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                    }}
                >
                    <td>
                        <div className="card">
                            <Container>
                                <h4>Assignor: {task.creator}</h4>
                                <Form>
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
                                        <Col md>
                                            <Button
                                                onClick = {this.handleTaskUpdate} 
                                                variant = "Secondary" 
                                                type = "submit"
                                                name = {task.id}
                                                style = {{color: "white",background: "blue", marginTop: "32px"}}
                                                >
                                                Update Task
                                            </Button>
                                        </Col>                                   
                                    </Row>
                                </Form>
                            </Container>                            
                        </div>
                    </td>
                </tr>
            </tbody>
        );
    }
}
export default Task;

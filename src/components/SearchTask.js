import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Form, Row,Card } from 'react-bootstrap';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

class SearchTask extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            assignee: '',
            creator: '',
            due_date: '',
            search_val: [],
        }
        this.handleTitle = this.handleTitle.bind(this);
        this.handleAssignee = this.handleAssignee.bind(this);
        this.handleCreator = this.handleCreator.bind(this);
        this.handleDuedate = this.handleDuedate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);         
    }
    
    handleTitle = (event) => {
        this.setState({
            title: event.target.value 
        });    
    };
    handleAssignee = (event) => {
        this.setState({
            assignee: event.target.value 
        });    
    };
    
    handleCreator = (event) => {
        this.setState({
            creator: event.target.value 
        });    
    };
    
    handleDuedate = (event) => {
        this.setState({
            due_date: event.target.value
        });    
    };
    
    handleSubmit = (event) => {       
        event.preventDefault();
        
        let data = {
            title: this.state.title === "" ? undefined : this.state.title,
            assignee: this.state.assignee === "" ? undefined : this.state.assignee,
            creator: this.state.creator === "" ? undefined : this.state.creator,
            due_date: this.state.due_date === "" ? undefined : this.state.due_date,
        };
        console.log(data)
        api.post('/searchtask', data,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((res) => {
            console.log(res.data);
            this.setState({
                search_val: res.data
            })
        })        
        .catch((err) => {
            console.log(err.response);
        });
    };
    
    render() {
        return (
        <div>
            <Container>
                <Card style={{borderWidth:"0.5rem", marginTop:"15px"}}>
                    <Container>
                        <Form>
                            <Row>
                                <Col md>
                                    <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control 
                                        type = "text"
                                        name = "title"
                                        onChange = {this.handleTitle}
                                        value = {this.state.title}
                                    />
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group controlId = "formEmail">
                                    <Form.Label>Assignee</Form.Label>
                                    <Form.Control 
                                        type = "email"
                                        name = "email"
                                        placeholder = "Example@email.com"
                                        onChange = {this.handleAssignee}
                                        value = {this.state.assignee}
                                    />
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group>
                                    <Form.Label> Assignor</Form.Label>
                                    <Form.Control 
                                        type = "email" 
                                        name = "creator"
                                        placeholder = "Example@email.com"
                                        onChange = {this.handleCreator}
                                        value = {this.state.creator}
                                    />
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group>
                                    <Form.Label>Due Date</Form.Label>
                                    <Form.Control 
                                        type = "date" 
                                        name = "duedate"
                                        onChange = {this.handleDuedate}
                                        value = {this.state.due_date}
                                    />
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Button 
                                        onClick = {this.handleSubmit} 
                                        variant = "Secondary" 
                                        type = "submit" 
                                        style = {{color: "white", background: "blue", marginTop: "32px"}}
                                        >
                                        Search
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </Card>
            </Container>         
            <div
                className="container"
                style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                marginTop: "30px",
                }}
            >
                <div
                    style={{
                        paddingTop: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "#00bfff",
                        border: "1px solid grey",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                        borderBottomLeftRadius: "10px",
                        borderBottomRightRadius: "10px",
                        color: "black",
                    }}
                    >
                    <h3 style={{ paddingLeft: "15px" }}>Title</h3>
                    <h3>Assignee</h3>
                    <h3>Assignor</h3>
                    <h3 style={{ paddingRight: "15px" }}>Due Date</h3>
                </div>
                {this.state.search_val.map((task) => {
                    return (
                        <div
                            style={{
                            padding: "5px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "right",
                            background: "silver",
                            borderBottom: "1px solid rgb(225,225,225)",
                            borderLeft: "1px solid rgb(225,225,225)",
                            borderRight: "1px solid rgb(225,225,225)",
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px",
                            borderBottomLeftRadius: "10px",
                            borderBottomRightRadius: "10px",
                            }}
                        >
                            <h5 style={{ paddingLeft: "10px", paddingTop: "10px", }}>{task.title}</h5>
                            <h5 style={{ paddingTop: "10px"  }}>{task.assignee}</h5>
                            <h5 style={{ paddingTop: "10px", }}>{task.creator}</h5>
                            <h5 style={{ paddingTop: "10px", }}>{task.due_date}</h5>
                        </div>
                    )
                })}
            </div>
        </div>
        );
    }
}

export default SearchTask;

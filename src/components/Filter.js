import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Form, Row , Card} from 'react-bootstrap';
import axios from 'axios';

import FilterResult from "./FilterResult";

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

class Filter extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            created_by: '',
            role: '',
            search_val: [],
        }
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleRole = this.handleRole.bind(this);
        this.handleCreator = this.handleCreator.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);         
    }
    
    handleName = (event) => {
        this.setState({
            name: event.target.value 
        });    
    };
    handleEmail = (event) => {
        this.setState({
            email: event.target.value 
        });    
    };
    
    handleRole = (event) => {
        this.setState({
            role: event.target.value 
        });    
    };
    
    handleCreator = (event) => {
        this.setState({
            created_by: event.target.value
        });    
    };
    
    handleSubmit = (event) => {       
        event.preventDefault();
        
        let data = {
            name: this.state.name === "" ? undefined : this.state.name,
            email: this.state.email === "" ? undefined : this.state.email,
            role: this.state.role === "" ? undefined : this.state.role,
            created_by: this.state.created_by === "" ? undefined : this.state.created_by,
        };
        console.log(data)
        api.post('/search', data,{
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
        // this.state = {  search_val: [] };
        return (
        <div>

            <Container>
                <Card style={{borderWidth:"0.5rem", marginTop:"15px"}}>
                    <Container>
                        <Form>
                            <Row>
                                <Col md>
                                    <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control 
                                        type = "text"
                                        name = "name"
                                        onChange = {this.handleName}
                                        value = {this.state.name}
                                    />
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group controlId = "formEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control 
                                        type = "email"
                                        name = "email"
                                        placeholder = "Example@email.com"
                                        onChange = {this.handleEmail}
                                        value = {this.state.email}
                                    />
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group>
                                    <Form.Label> Role</Form.Label>
                                    <Form.Control 
                                        type = "text" 
                                        placeholder = "Admin or Normal" 
                                        name = "role"
                                        onChange = {this.handleRole}
                                        value = {this.state.role}
                                    />
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group>
                                    <Form.Label> Created By</Form.Label>
                                    <Form.Control 
                                        type = "text" 
                                        name = "creator"
                                        onChange = {this.handleCreator}
                                        value = {this.state.created_by}
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
                    <h3 style={{ paddingLeft: "15px" }}>Name</h3>
                    <h3>Email</h3>
                    <h3>Role</h3>
                    <h3 style={{ paddingRight: "15px" }}>Created By</h3>
                </div>
                {this.state.search_val.map((user) => {
                    return <FilterResult key={user.id} user={user} />
                })}
            </div>
        </div>
        );
    }
}

export default Filter;

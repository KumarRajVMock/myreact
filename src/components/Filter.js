import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Form, Row , Card, Table} from 'react-bootstrap';
import axios from 'axios';

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
    
    handleSubmit(event){       
        event.preventDefault();
        document.getElementById("myBtn").disabled = true;
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
            this.setState({
                search_val: res.data
            })
            document.getElementById("myBtn").disabled = false;
        })        
        .catch((err) => {
            console.log(err.response);
        });
    };
    
    render() {
        // this.state = {  search_val: [] };
        return (
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
                                        id = "myBtn"
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
            
                <Table className="container tablecontainer" style={{widht: "100%"}}>
                    <thead className="tablehead">
                        <tr>
                            <th style={{ paddingLeft: "15px" }}>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th style={{ paddingLeft: "15px" }}>Created By</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.search_val.map((user) => {
                        return (
                            <tr key={user.id} className="tablerow">
                                <td style={{ paddingLeft: "10px", paddingTop: "10px", }}>{user.name}</td>
                                <td style={{ paddingTop: "10px"  }}>{user.email}</td>
                                <td style={{ paddingTop: "10px", }}>{user.role}</td>
                                <td style={{ paddingTop: "10px", }}>{user.created_by? user.created_by: "Self"}</td>
                            </tr>
                        )
                    })}
                    </tbody> 
                </Table>
            </Container>
        );
    }
}

export default Filter;

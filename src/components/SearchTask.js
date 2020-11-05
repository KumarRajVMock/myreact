import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Form, Row, Table, Card } from 'react-bootstrap';
import axios from 'axios';
import Pagination from 'react-js-pagination';

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
            current_page: 0,
            per_page: 0,
            total: 0,
        }
        this.handleTitle = this.handleTitle.bind(this);
        this.handleAssignee = this.handleAssignee.bind(this);
        this.handleCreator = this.handleCreator.bind(this);
        this.handleDuedate = this.handleDuedate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);         
        this.handlepages = this.handlepages.bind(this);         
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
    handleSubmit = (event) =>{       
        event.preventDefault();
        document.getElementById("myBtn").disabled = true;
        let data = {
            title: this.state.title === "" ? undefined : this.state.title,
            assignee: this.state.assignee === "" ? undefined : this.state.assignee,
            creator: this.state.creator === "" ? undefined : this.state.creator,
            due_date: this.state.due_date === "" ? undefined : this.state.due_date,
        };
        api.post(`/searchtask?page=${1}`, data,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((res) => {
            this.setState({
                search_val: res.data.data,
                current_page: res.data.current_page, 
                per_page: res.data.per_page, 
                total: res.data.total,
            })
            console.log(res.data.data)
            document.getElementById("myBtn").disabled = false;
        })        
        .catch((err) => {
            console.log(err.response);
            document.getElementById("myBtn").disabled = false;
        });
    };
    
    handlepages = (pageNumber) => {
        let data = {
            title: this.state.title === "" ? undefined : this.state.title,
            assignee: this.state.assignee === "" ? undefined : this.state.assignee,
            creator: this.state.creator === "" ? undefined : this.state.creator,
            due_date: this.state.due_date === "" ? undefined : this.state.due_date,
        };
        api.post(`/searchtask?page=${pageNumber}`, data,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((res) => {
            this.setState({
                search_val: res.data.data,
                current_page: res.data.current_page, 
                per_page: res.data.per_page, 
                total: res.data.total,
            })
        })        
        .catch((err) => {
            console.log(err.response);
        });
    }
    
    render() {
        return (
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
                                        id = "myBtn"
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
                            <th style={{ paddingLeft: "15px" }}>Title</th>
                            <th>Assignee</th>
                            <th>Assignor</th>
                            <th style={{ paddingLeft: "15px" }}>Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.search_val.map((task) => {
                            return (
                                <tr key={task.id} className="tablerow">
                                    <td style={{ paddingLeft: "10px", paddingTop: "10px", }}>{task.title}</td>
                                    <td style={{ paddingTop: "10px"  }}>{task.assignee}</td>
                                    <td style={{ paddingTop: "10px", }}>{task.creator}</td>
                                    <td style={{ paddingTop: "10px", }}>{task.due_date}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <div className="mt-3">
                    <Pagination
                        activePage={this.state.current_page}
                        totalItemsCount={this.state.total}
                        itemsCountPerPage={this.state.per_page}
                        onChange={(pageNumber) => this.handlepages(pageNumber)}
                        itemClass="page-item"
                        linkClass="page-link"
                        firstPageText="First"
                        lastPageText="Last"
                    />
                </div>
            </Container>
        );
    }
}

export default SearchTask;

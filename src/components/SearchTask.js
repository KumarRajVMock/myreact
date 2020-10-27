import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Form, Row,Card } from 'react-bootstrap';
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
        })        
        .catch((err) => {
            console.log(err.response);
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
            <div className="container tablecontainer">
                <div className="tablehead">
                    <h3 style={{ paddingLeft: "15px" }}>Title</h3>
                    <h3>Assignee</h3>
                    <h3>Assignor</h3>
                    <h3 style={{ paddingRight: "15px" }}>Due Date</h3>
                </div>
                {this.state.search_val.map((task) => {
                    return (
                        <div
                            key={task.id}
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
            </div>
        </div>
        );
    }
}

export default SearchTask;

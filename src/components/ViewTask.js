import React, { Component } from "react";
import { connect } from 'react-redux'
import axios from "axios";
import AddTask from "./AddTask";
import Task from "./Task";
import { getTasks } from "../redux/actions";
import {Table, Container } from 'react-bootstrap';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

class ViewTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errorResp: '',
        }
    }
    
    componentDidMount() {
        api.get('/viewtask',{
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then(res => {
            this.props.getTasks(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    render() {
        return (
            <div>
                <AddTask />
                <Tasks tasks={this.props.tasks} />
            </div>
        );
    }
    
}
function Tasks(props) {
    return (
        <Container>
            <Table className="container tablecontainer" style={{widht: "100%"}}>
                <thead className="tablehead">
                    <tr>
                        <th style={{ paddingLeft: "15px" }}>Assignee</th>
                        <th>Title</th>
                        <th style={{ paddingLeft: "15px" }}>Status</th>
                    </tr>
                </thead>
                {props.tasks.tasks.map((task) => {
                    return <Task key={task.id} task={task} />;
                })}
            </Table>
        </Container>
    );
}

const mapStatetoProps = (state, ownProps) => {
    return {
        tasks: state.tasks
    }
};

export default connect(mapStatetoProps, { getTasks })(ViewTask);
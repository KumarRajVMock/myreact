import React, { Component } from "react";
import { connect } from 'react-redux'
import axios from "axios";
import AddTask from "./AddTask";
import Task from "./Task";
import { getTasks } from "../redux/actions";
import {Table } from 'react-bootstrap';


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
        console.log(this.props.tasks)
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
        <div className="container tablecontainer">
            <div className="tablehead">
            <h3 style={{ paddingLeft: "15px" }}>Assignee</h3>
            <h3>Title</h3>
            <h3 style={{ paddingRight: "15px" }}>Status</h3>
            </div>
            <Table style={{widht: "100%"}}>
                {props.tasks.tasks.map((task) => {
                return <Task key={task.id} task={task} />;
                })}
            </Table>
        </div>
    );
}

const mapStatetoProps = (state, ownProps) => {
    return {
        tasks: state.tasks
    }
};

export default connect(mapStatetoProps, { getTasks })(ViewTask);

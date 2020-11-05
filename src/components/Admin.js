import React, { Component } from "react";
import { connect } from 'react-redux'
import axios from "axios";
import AddUser from "./AddUser";
import User from "./User";
import "./Admin.css"
import { getUsers, deleteUser } from "../redux/actions";
import { Table, Container } from 'react-bootstrap';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cur_user: [],
            errorResp: '',
        }
    }
    
    componentDidMount() {
        api.get('/profile',{
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },})
        .then(res => {
            this.setState({
                cur_user: res.data.user
            })
        })
        .catch(err => {
            console.log(err)
        })
        
        api.get('/allusers',{
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then(res => {
            // store.dispatch(getUsers(res.data))
            this.props.getUsers(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    render() {
        return (
            <div>
                <AddUser />
                <Users users={this.props.users} />
            </div>
        );
    }    
}

function Users(props) {
    return (
        <Container>
            <Table className="container tablecontainer" style={{widht: "100%"}}>
                <thead className="tablehead">
                    <tr>
                        <th style={{ paddingLeft: "15px" }}>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th style={{ paddingLeft: "15px" }}>Delete</th>
                    </tr>                    
                </thead>
                <tbody>
                    {props.users.users.map((user) => {
                        return <User key={user.id} user={user} />;
                    })}
                </tbody>
            </Table>
        </Container>
    );
}

const mapStatetoProps = (state, ownProps) => {
    return {
        users: state.users
    }
};

export default connect(mapStatetoProps, { getUsers, deleteUser })(Admin);

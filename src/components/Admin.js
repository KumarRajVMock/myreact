import React, { Component } from "react";
import { connect } from 'react-redux'
import axios from "axios";
// import store from "../redux/store"
import AddUser from "./AddUser";
import User from "./User";
import "./Admin.css"
import { getUsers, deleteUser } from "../redux/actions";
import {Table } from 'react-bootstrap';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cur_user: [],
            errorResp: '',
            // all_user: [],
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
            // this.setState({
            //     all_user: res.data.users
            // })
            // store.dispatch(getUsers(res.data))
            this.props.getUsers(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    render() {
        console.log(this.props.users)
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
            <h3 style={{ paddingRight: "15px" }}>Delete</h3>
            </div>
            <Table style={{widht: "100%"}}>
                {props.users.users.map((user) => {
                    return <User key={user.id} user={user} />;
                })}
            </Table>
            
        </div>
    );
}

const mapStatetoProps = (state, ownProps) => {
    return {
        users: state.users
    }
};

export default connect(mapStatetoProps, { getUsers, deleteUser })(Admin);

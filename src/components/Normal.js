import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import { connect } from 'react-redux'
import axios from "axios";
import { getUsers} from "../redux/actions";
import {Table } from 'react-bootstrap';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

class Normal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cur_user: [],
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
            this.props.getUsers(res.data)
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    render() {
        return (
        <div>
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
                    <h3 style={{ paddingRight: "15px" }}>Role</h3>
                    </div>
                    <Table style={{widht: "100%"}}>
                        {this.props.users.users.map((user) => {
                            return (
                                <tbody>
                                    <tr key={user.id}
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
                                        <td style={{ paddingLeft: "10px", paddingTop: "10px", }}>{user.name}</td>
                                        <td style={{ paddingTop: "10px"  }}>{user.email}</td>
                                        <td style={{ paddingTop: "10px", }}>{user.role}</td>
                                    </tr>
                                </tbody>
                                
                            )
                        })}
                    </Table>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = (state, ownProps) => {
    return {
        users: state.users
    }
};

export default connect(mapStatetoProps, { getUsers })(Normal);

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
            <div className="container tablecontainer">
                <div className="tablehead">
                    <h3 style={{ paddingLeft: "15px" }}>Name</h3>
                    <h3>Email</h3>
                    <h3 style={{ paddingRight: "15px" }}>Role</h3>
                    </div>
                    <Table style={{widht: "100%"}}>
                        {this.props.users.users.map((user) => {
                            return (
                                <tbody>
                                    <tr key={user.id} className="tablerow">
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

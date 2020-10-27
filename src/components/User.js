import axios from "axios";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { deleteUser } from "../redux/actions";

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

class User extends Component {
    state = {};
    handleDelete = (id) =>  {
        api.delete(`/deleteuser/${id}`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })        
        .then((res) => {
            console.log(res.data);
            this.props.deleteUser(id)
        })       
        .catch((err) => {
            console.log(err.response);
            if (err.response === 401) {
                this.setState({
                    errorResp: "Unauthorised",
                });
            }
            if (err.response === 403) {
                this.setState({
                    errorResp:"Invalid Email",
                });
            }
        });
    }
    render() {
        const { user } = this.props;
        // const user = this.props.user;
        return (
            <tbody>
                <tr className="tablerow">
                    <td style={{ paddingLeft: "10px", paddingTop: "10px", }}>{user.name}</td>
                    <td style={{ paddingTop: "10px"  }}>{user.email}</td>
                    <td style={{ paddingTop: "10px", }}>{user.role}</td>
                    <td style={{ paddingTop: "10px", }}>
                    <Button variant="danger" onClick={this.handleDelete.bind(this, user.id)}>
                        Delete
                    </Button>
                    </td>
                    
                </tr>
            </tbody>
        
        );
    }
}

export default connect(null, { deleteUser })(User);
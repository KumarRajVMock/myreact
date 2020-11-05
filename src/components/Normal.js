import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import { connect } from 'react-redux'
import axios from "axios";
import { getUsers} from "../redux/actions";
import { Container, Table } from 'react-bootstrap';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

class Normal extends Component {
    state = {};
    
    componentDidMount() {
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
            <Container>
                <Table className="container tablecontainer" style={{widht: "100%"}}>
                    <thead className="tablehead">
                        <tr>
                            <th style={{ paddingLeft: "15px" }}>Name</th>
                            <th>Email</th>
                            <th style={{ paddingLeft: "15px" }}>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users.users.map((user) => {
                            return (
                                <tr key={user.id} className="tablerow">
                                    <td style={{ paddingLeft: "10px", paddingTop: "10px", }}>{user.name}</td>
                                    <td style={{ paddingTop: "10px"  }}>{user.email}</td>
                                    <td style={{ paddingTop: "10px", }}>{user.role}</td>
                                </tr>
                            )
                        })}
                    </tbody> 
                </Table>
            </Container>
            
        );
    }
}

const mapStatetoProps = (state, ownProps) => {
    return {
        users: state.users
    }
};

export default connect(mapStatetoProps, { getUsers })(Normal);

import React, { Component } from 'react'
import axios from "axios";
import { Redirect } from "react-router-dom";

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

class SignupVerify extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_token: false,
            errorResp: '',
        }
    }
    
    componentDidMount() {
        api.post(`/verify/${this.props.match.params.token}`)
        .then(res => {
            this.setState({is_token: true,});
        })
        .catch((err) => {
            if(err.response.status === 401) {
                this.setState({errResp: "Please try again with the correct token.",});
            }
            if(err.response.status === 403) {
                this.setState({errResp: "Already Verified",});
            }
        });
    }
    
    render() {
        if (this.state.is_token) 
            return <Redirect to= {'/login'} />;
        return (
            <div style={{ textAlign: "center", padding: "30px" }}>
                {this.state.errorResp}
            </div>
        );
    }
}

export default SignupVerify
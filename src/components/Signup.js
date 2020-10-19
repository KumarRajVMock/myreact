    import React, { Component } from 'react'
    import axios from "axios";
    import { Redirect } from "react-router-dom";

    const api = axios.create({
        baseURL: 'http://localhost:8000/api/'
    })

    class Signup extends Component {

    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            status: '',
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handleFname = this.handleFname.bind(this);
        this.handleLname = this.handleLname.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleEmail = (event) => {
        this.setState({
            email: event.target.value 
        });    
    };
    
    handlePassword = (event) => {
        this.setState({
            password: event.target.value
        });    
    };
    
    handleFname = (event) => {
        this.setState({
            first_name: event.target.value 
        });    
    };
    
    handleLname = (event) => {
        this.setState({
            last_name: event.target.value
        });    
    };
    
    handleSubmit = (event) => {
        event.preventDefault();
        
        const newUser = {
            name: this.state.first_name + ' ' + this.state.last_name,
            email: this.state.email,
            password: this.state.password
        };
        
        api.post('/signup', newUser)
        .then( res => {
            console.log(res.data);
            this.setState({status: "done"})
            // <div className="alert alert-success" role="alert">
            //     Verify your Email!
            // </div>
            // return <Redirect to= {'/login'} />;
        })
        .catch(err => {
            console.log(err)
        })
    };
    
    render() {
        if(this.state.status === 'done')
            return <Redirect to= {'/login'} />;
        return (
            <div className="bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mt-5 mx-auto">
                            <form noValidate onSubmit={this.handleSubmit}>
                                <h1 className="h3 mb-3 font-weight-normal">
                                    Signup!
                                </h1>
                                <div className="form-group">
                                    <label htmlFor="name">First name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="first_name"
                                        placeholder="Enter your first name"
                                        value={this.state.first_name}
                                        onChange={this.handleFname}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Last name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="last_name"
                                        placeholder="Enter your lastname name"
                                        value={this.state.last_name}
                                        onChange={this.handleLname}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter email"
                                        value={this.state.email}
                                        onChange={this.handleEmail}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handlePassword}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-primary btn-block"
                                >
                                    Register!
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

    export default Signup;
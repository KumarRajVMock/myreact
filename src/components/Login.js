import React, { Component } from 'react'
import axios from "axios";
import { Redirect } from "react-router-dom";
// import Cookies from 'js-cookie'
import { connect } from "react-redux";
import { login } from "../redux/actions";

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            redirect: '',
            errorResp: '',
        }
            this.handleEmail = this.handleEmail.bind(this);
            this.handlePassword = this.handlePassword.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);         
    }

    componentDidMount() {
        if (localStorage.getItem("token")) 
        {
            if (JSON.parse(localStorage.getItem("user")).role === "admin")
            {
                this.setState({ redirect:"Admin"});
            } 
            else 
            {
                this.setState({ redirect:"Normal"});
            }
        }
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
    
    handleSubmit = (event) => {       
        event.preventDefault();
        api.post('/login',{email: this.state.email, password: this.state.password})
        .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            // Cookies.set("token", res.data.token);
            // console.log(Cookies.get("token"))            
            this.props.login(res.data.user);
            console.log(res.data);

            if(res.data.user.role === "Admin"){
                this.setState({ redirect:"Admin"});
                localStorage.setItem("role", res.data.user.role);
            }
            else{
                this.setState({ redirect:"Normal"});
                localStorage.setItem("role", res.data.user.role);
            }
        })
        .catch((err) => {
            if (err.response === 401) {
                this.setState({
                    errorResp: "Please enter a valid username and password",
                });
            }
            if (err.response === 403) {
                this.setState({
                    errorResp:"Please verify the verification email sent to your email-id",
                });
            }
        });
    };
    
    render() {
        if (this.state.redirect === "Admin"){
            return <Redirect to= {'/self'} />;
            // return this.props.history.push(`/admin`)
            // return <Redirect to= {'/admin'} />;
            // return push('/admin');
        }
        if(this.state.redirect === "Normal"){
            return <Redirect to= {'/self'} />;
        }
        return (

            <div className="container bg-light">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form 
                            onSubmit={this.handleSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">
                                Please sign in
                            </h1>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.handleEmail}
                                    required
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
                                Sign in
                            </button>
                            <div className="errResp">
                                {this.state.errorResp}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStatetoProps = (state, ownProps) => {
    return {
        user: state.user
    }
};

export default connect(mapStatetoProps, { login })(Login);

// export default Login
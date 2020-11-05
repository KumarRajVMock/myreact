import React, { Component } from 'react'
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

class Forgotpassword extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            status: '',
        }    
    }
    handleEmail = (event) => {
        this.setState({
            email: event.target.value 
        });    
    }
    handleSubmit = (event) => {       
        event.preventDefault();
        document.getElementById("myBtn").disabled = true;
        api.post('/forgotpassword',{email: this.state.email,})
        .then((res) => {        
            this.setState({
                status: "done"
            });
            document.getElementById("myBtn").disabled = false;
        })
        .catch((err) => {
            console.log(err)
        });
    };
    
    render() {
        if(this.state.status === 'done')
        {
            return (
                <div>
                    <div className="alert alert-success" role="alert" style={{display:"inline-block", textAlign:"center", marginTop:"50px"}}>
                        Check your Mail!
                    </div>
                </div>
            )
        }
        return (
            <div className="container bg-light">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.handleSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">
                                Enter Email address
                            </h1>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.handleEmail}
                                />
                            </div>
                            <button
                                id = "myBtn"
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )    
    }
}

export default Forgotpassword;
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { HiUserCircle } from "react-icons/hi";
import Pusher from 'pusher-js';
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

class Navbar extends Component {
    state = {
        cur_user: '',
    }
    
    logOut(e) {
        e.preventDefault()
        localStorage.clear();
        this.props.history.push(`/`)
    }
    
    componentDidMount() {
        // Pusher.logToConsole = true;
        var pusher = new Pusher('891c7f6c06b720face3c', {cluster: 'ap2'} );        
        var channel = pusher.subscribe("my-channel");
        
        channel.bind("updateStatus", (data) => {
            alert(JSON.stringify(data.messageHead));
        });
        channel.bind("updateTask", (data) => {
            alert(JSON.stringify(data.messageHead));
        });
        channel.bind("taskAdded", (data) => {
            alert(JSON.stringify(data.messageHead));
        });
        
        if(localStorage.getItem("token"))
        {
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
        }
    }
    
    render() {
        const beforetop = (
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link to="/login" className="nav-link">
                    Login
                </Link>
                </li>
                <li className="nav-item">
                <Link to="/signup" className="nav-link">
                    Signup
                </Link>
                </li>
                <li className="nav-item ml-auto">
                <Link to="/forgotpassword" className="nav-link">
                    Forgot Password
                </Link>
                </li>
            </ul>
        )
        
        const aftertop = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="/self">Dashboard</a>
                </li>
                <li className="nav-item">
                {(this.state.cur_user.role === "Admin") ?
                    <a className="nav-link" href="/admin">Users</a>
                :
                    <a className="nav-link" href="/normal">Users</a>
                }
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/viewtask">Tasks</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/search">Search Users</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/searchtask">Search Tasks</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/" onClick={this.logOut.bind(this)}>
                        Logout
                    </a>
                </li>
            </ul>
        )
        
        const afterside = (
            <div 
            className="col sidenav bg-dark"
            style={{top: "3.4rem", height: "calc(200vh - 3.4rem)", position:"absolute",}}
            >
                <HiUserCircle size="7em" color="silver" style={{marginLeft:"10px"}}/>
                <h4 className= "text-white" style={{textAlign:"center"}}>
                    {this.state.cur_user.name}
                </h4>
            </div>
        )
        
        const beforeside = (
            <div></div>
        )
        
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                    <Link to="/" className="navbar-brand">
                        Lumen React App
                    </Link>
                    <div className="justify-content">
                        {localStorage.token ? aftertop : beforetop}
                    </div>
                </nav>
                <div className="justify-content">
                    {localStorage.token ? afterside : beforeside}
                </div>
            </div>            
        )
    }
}
export default withRouter(Navbar)
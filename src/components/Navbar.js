import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { HiUserCircle } from "react-icons/hi";

class Navbar extends Component {
    logOut(e) {
        e.preventDefault()
        // localStorage.removeItem("token", "role")
        localStorage.clear();
        this.props.history.push(`/`)
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
                    <Link to="/self" className="nav-link">
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                {(localStorage.getItem("role") === "Admin") ?
                    (
                        <Link to="/admin" className="nav-link">
                            Users
                        </Link>
                    )
                    :
                    (
                        <Link to="/normal" className="nav-link">
                            Users
                        </Link>
                    )
                }
                </li>
                <li className="nav-item">
                    <Link to="/viewtask" className="nav-link">
                        Tasks
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/search" className="nav-link">
                        Search Users
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/searchtask" className="nav-link">
                        Search Tasks
                    </Link>
                </li>
                <li className="nav-item">
                <a href="#a" onClick={this.logOut.bind(this)} className="nav-link">
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
                <HiUserCircle size="7em" color="silver" />
                <h4 className= "text-white">
                    {JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).name: ""}
                </h4>
            </div>
        )
        
        const beforeside = (
            <div></div>
        )
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                    <a className="navbar-brand" href="#aa">Lumen React App</a>
                    <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExample10"
                    aria-controls="navbarsExample10"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                    className="collapse navbar-collapse justify-content"
                    id="navbarsExample10"
                    >
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    Home
                                </Link>
                            </li>                        
                        </ul>
                    {localStorage.token ? aftertop : beforetop}
                    </div>
                </nav>
                <div>
                {localStorage.token ? afterside : beforeside}
                </div>
            </div>
            
        )
    }
}
export default withRouter(Navbar)
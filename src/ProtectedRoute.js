import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import axios from "axios";

const api = axios.create({
        baseURL: 'http://localhost:8000/api/'
        })

class ProtectedRoute extends Component {
        state = {
                cond: true,
        };
        
        async componentDidMount() 
        {
                if (localStorage.getItem("user") === null) 
                {
                        this.setState({ cond: false });
                } 
                else
                {
                        const id = JSON.parse(localStorage.getItem("user")).id;
                        const res = await api.get('/profile',{
                                        headers: {
                                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                                        },
                                })
                        if(res.data.user.id === id)
                        {
                                this.setState({
                                        cond: true
                                })
                                if(window.location.pathname === "/admin" && res.data.user.role === "Normal")
                                {
                                        this.setState({
                                                cond: false
                                        })
                                }
                                if(window.location.pathname === "/normal" && res.data.user.role === "Admin")
                                {
                                        this.setState({
                                                cond: false
                                        })
                                }
                        }
                }
        }
        render() {
                const Component = this.props.component;
                const Path = this.props.path;
                if(this.state.cond === false)
                {
                        return <Redirect to={{ pathname: "/" }} />;
                }
                else{
                        return this.props.isAllowed ? (
                                <Route exact path={Path} component={Component} />
                                ) : (
                                <Redirect to={{ pathname: "/" }} />
                        );
                }
        }
}


export default ProtectedRoute;
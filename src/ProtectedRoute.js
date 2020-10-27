import React from "react";
import { Redirect, Route } from "react-router-dom";
import axios from "axios";

const api = axios.create({
        baseURL: 'http://localhost:8000/api/'
        })

// export const ProtectedRoute = ({ isAllowed, ...props }) =>
// {
//         return (
//         isAllowed 
//         ? (<Route {...props}/> )
//         : (<Redirect to="/"/>)
//         )
// }

class ProtectedRoute extends React.Component {
        state = {
                cond: true,
        };
        
        componentDidMount() 
        {
                if (localStorage.getItem("user") === null) 
                {
                        this.setState({ cond: false });
                } 
                else 
                {
                        const id = JSON.parse(localStorage.getItem("user")).id;
                        api.get('/profile',{
                                headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                                },
                        })
                        .then(res => {
                                if(res.data.user.id === id)
                                {
                                console.log("successful");
                                this.setState({
                                        cond: true
                                })
                                }
                        })
                        .catch(err => {
                                console.log(err)
                                this.setState({
                                        cond: false
                                })
                                localStorage.clear();
                        })
                }
        }
        render() {
                const Component = this.props.component;
                const path = this.props.path;
                if(this.state.cond === false)
                {
                        return <Redirect to={{ pathname: "/" }} />;
                }
                return this.props.isAllowed ? (
                        <Route exact path={path} component={Component} />
                        // <Component />
                        ) : (
                        <Redirect to={{ pathname: "/" }} />
                );
                
        }
}


export default ProtectedRoute;
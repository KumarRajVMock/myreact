import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import { connect } from 'react-redux'
import axios from "axios";
import {Toast} from 'react-bootstrap';
import { getTasks } from "../redux/actions";

import Highcharts from 'highcharts';
import PieChart from 'highcharts-react-official';
import HighchartsReact from "highcharts-react-official";
import Pusher from 'pusher-js';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cur_user: '',
            toast: false,
            toastHead: '',
            toastBody: '',
        }
    }
    
    componentDidMount() {
        // Pusher.logToConsole = true;
        var pusher = new Pusher('891c7f6c06b720face3c', {cluster: 'ap2'} );        
        var channel = pusher.subscribe("my-channel");
        
        channel.bind("updateStatus", (data) => {
            if (data.assignee === JSON.parse(localStorage.getItem("user")).id)
            {
                this.setState({ toast: true, toastBody: data.message, toastHead: data.messageHead });
            }
            console.log(data.assignee, this.state.toastBody, this.state.toastHead, this.state.toast)
        });
        
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
        
        api.get('/viewtask',{
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then(res => {
            this.props.getTasks(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-1">
                    </div>
                    <div className="col-5">
                        {/* <h4>My Performance</h4> */}
                        <div className="card">
                            <div className="card-body">
                                <Performance tasks={this.props.tasks} />
                            </div>
                        </div>
                    </div>
                    <div className="col-1">
                    </div>
                    <div className="col-5">
                        <h4>Notifications</h4>
                        <div className="card">
                            <div className="card-body">
                                <Notifications 
                                    toastBody={this.state.toastBody}
                                    toastHead={this.state.toastHead}
                                    toast={this.state.toast}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1">
                    </div>
                    <div className="col-11">
                        {/* <h4>My Tasks Overview</h4> */}
                        <div className="card">
                            <div className="card-body">
                                <Overview tasks={this.props.tasks} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function Performance(props) {
    const tasks = props.tasks.tasks;
    const user  = JSON.parse(localStorage.getItem("user"));
    let countComp = 0, countAss = 0, countProg = 0;

    for(let i = 0; i < tasks.length; i++)
    {
        if(tasks[i].assignee === user.email)
        {
            if(tasks[i].status === "Assigned")
                countAss++;
            if(tasks[i].status ==="Completed")
                countComp++;
            if(tasks[i].status ==="In Progress")
                countProg++;
        }
        
    }
    // console.log(countAss, countComp, countProg)
    const options = {
        chart: {
            type: "pie",
        },
        title: {
            text: 'My Performance',
            style: {
                fontSize: 25,
            }
            
        },
        series: [
            {
                data: [
                    {y: countAss,  name: 'Assigned',},
                    {y: countProg, name: 'In Progress',},
                    {y: countComp, name: 'Completed',},
                ],
            }
        ]
    } 
    return (
        <div>
            <PieChart highcharts={Highcharts} options={options} />
        </div>
    )
}

function Notifications(props){
    return(
        <div>
            <Toast>
                <Toast.Header>
                    <strong className="mr-auto">props.toastHead</strong>
                </Toast.Header>
                <Toast.Body>props.toastBody</Toast.Body>
            </Toast>
        </div>
    )
    
}

function Overview(props) {
    const user  = JSON.parse(localStorage.getItem("user"));
    const tasks = props.tasks.tasks;
    let mytasks = [];
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].assignee === user.email)        {
            mytasks.push(tasks[i]);
        }        
    }
    let dueDate = [];    
    let countComp = [0], countAss = [0], countProg = [0];
    if(mytasks.length > 0)
    {
        let j = 0;
        dueDate.push(mytasks[0].due_date);
        if(mytasks[0].status === "Completed")
            countComp[j]++;
        if(mytasks[0].status === "In Progress")
            countProg[j]++;
        if(mytasks[0].status === "Assigned")
            countAss[j]++;
        for(let i = 1; i < mytasks.length; i++)
        {
            if(mytasks[i].due_date === mytasks[i-1].due_date)
            {
                if(mytasks[i-1].status === "Completed")
                    countComp[j]++;
                if(mytasks[i-1].status === "In Progress")
                    countProg[j]++;
                if(mytasks[i-1].status === "Assigned")
                    countAss[j]++;
            }
            else
            {
                j++;
                dueDate.push(mytasks[i].due_date);
                countAss.push(0);
                countProg.push(0);
                countComp.push(0);
                if(mytasks[i].status === "Completed")
                    countComp[j]++;
                if(mytasks[i].status === "In Progress")
                    countProg[j]++;
                if(mytasks[i].status === "Assigned")
                    countAss[j]++;
            }
        }
    }
    console.log(countProg,countAss,countComp, dueDate)
    const options = {
        chart: {
            type: "column",
        },
        title: {
            text: 'My Tasks Overview',
            style: {
                fontSize: 25
            }
            
        },
        xAxis: {
            categories: dueDate,
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Number of Tasks'
                
            }
        },
        series: [
            {
                data: countAss,
                stack: 'Assigned',
                name: 'Assigned'
            },
            {
                data: countProg,
                stack: 'In Progress',
                name: 'In Progress'
            },
            {
                data: countComp,
                stack: 'completed',
                name: 'Completed'
            },
            
            
        ]
    } 
    
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

const mapStatetoProps = (state, ownProps) => {
    return {
        tasks: state.tasks
    }
};

export default connect(mapStatetoProps, { getTasks })(Dashboard);
import React, { Component } from "react";
import { connect } from 'react-redux'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Toast, Card} from 'react-bootstrap';
import { getTasks, getNotes, deleteNote } from "../redux/actions";
import Highcharts from 'highcharts';
import PieChart from 'highcharts-react-official';
import HighchartsReact from "highcharts-react-official";

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toast: [],
        }
        this.deleteNotification = this.deleteNotification.bind(this);
    }
    deleteNotification = (id) => {
        api.delete(`/deletenotification/${id}`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })        
        .then((res) => {
            console.log(res.data);
            this.props.deleteNote(id)
            this.props.getNotes(res.data.notifications)
            
        })       
        .catch((err) => {
            console.log(err.response);
        });
    };
    
    componentDidMount() {
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
        
        api.get('/notification',{
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then(res => {
            this.setState({
                toast: res.data.notifications,
            })
            this.props.getNotes(res.data.notifications)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    render() {
        return (
            <div className="container">
                <div className="row" style={{marginTop:"10px", marginBottom:"10px"}}>
                    <div className="col-1">
                    </div>
                    <div className="col-5">
                        <Card className="h-100">
                            <div className="card-body">
                                <Performance tasks={this.props.tasks} />
                            </div>
                        </Card>
                    </div>
                    <div className="col-1">
                    </div>
                    <div className="col-5">
                        <Card className="h-100">
                            <div className="card-body">
                                <Notifications 
                                notes={this.props.notes} 
                                deleteNotification={this.deleteNotification}
                                />
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1">
                    </div>
                    <div className="col-11">
                        <Card>
                            <div className="card-body">
                                <Overview tasks={this.props.tasks} />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

function Performance(props) {
    const tasks = props.tasks.tasks;
    const user  = JSON.parse(localStorage.getItem("user"));
    let countComp = 0, countAss = 0, countProg = 0,countTotal = 0;

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
    countTotal = countAss + countComp + countProg;
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
            {countTotal 
            ? 
                <PieChart highcharts={Highcharts} options={options} /> 
            : 
                <div>
                    <h3 style={{textAlign:"center"}}>
                        My Performance
                    </h3>
                    <h4 style={{textAlign:"center", marginTop:"50px"}}>No tasks assigned!</h4>
                </div>
            }
        </div>
    )
}

function Notifications(props){
    return(
        <div>
            <h3 style={{textAlign:"center",}}>Notifications</h3>
            {props.notes.notes.length? 
                <div></div> 
            : 
                <h4 style={{textAlign:"center", marginTop:"50px"}}>No New Notifications!</h4>
            }
            {props.notes.notes.map((note) => {
                return (
                    <Toast
                    key={note.id}
                    onClose={props.deleteNotification.bind(this, note.id)}
                    >
                        <Toast.Header>
                            <strong className="mr-auto">{note.messageHead}</strong>
                        </Toast.Header>
                        <Toast.Body>{note.message}</Toast.Body>
                    </Toast>
                )
            })}
        </div>
    )    
}

function Overview(props) {
    const user  = JSON.parse(localStorage.getItem("user"));
    const tasks = props.tasks.tasks;
    let mytasks = [];
    for(let i = 0; i < tasks.length; i++)
    {
        if(tasks[i].assignee === user.email)
        {
            mytasks.push(tasks[i]);
        }
    }
    let dueDate = [];    
    let countComp = [0], countAss = [0], countProg = [0],countTotal = 0;
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
    countTotal = mytasks.length;
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
            }
        ]
    } 
    
    return (
        <div>
            {countTotal 
            ? 
                <HighchartsReact highcharts={Highcharts} options={options} /> 
            : 
                <div>
                    <h3 style={{textAlign:"center"}}>
                        My Tasks Overview
                    </h3>
                    <h4 style={{textAlign:"center", marginTop:"50px"}}>No tasks assigned!</h4>
                </div>
            }
        </div>
    )
}

const mapStatetoProps = (state, ownProps) => {
    return {
        tasks: state.tasks,
        notes: state.notes,
    }
};

export default connect(mapStatetoProps, { getTasks, getNotes, deleteNote })(Dashboard);
import React, { Component } from "react";

class FilterResult extends Component {
    state = {};
    
    render() {
        const { user } = this.props;
        return (
            <div
                style={{
                padding: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "right",
                background: "silver",
                borderBottom: "1px solid rgb(225,225,225)",
                borderLeft: "1px solid rgb(225,225,225)",
                borderRight: "1px solid rgb(225,225,225)",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                }}
            >
                <h5 style={{ paddingLeft: "10px", paddingTop: "10px", }}>{user.name}</h5>
                <h5 style={{ paddingTop: "10px"  }}>{user.email}</h5>
                <h5 style={{ paddingTop: "10px", }}>{user.role}</h5>
                <h5 style={{ paddingTop: "10px", }}>{user.created_by}</h5>
            </div>
        );
    }
}

export default FilterResult
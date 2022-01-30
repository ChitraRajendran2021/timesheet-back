import React, { Component } from 'react'
import TimesheetService from '../services/TimesheetService'

class ViewTimesheetComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            timesheet: {}
        }
    }

    componentDidMount(){
        TimesheetService.getTimesheetById(this.state.id).then( res => {
            this.setState({timesheet: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Timesheet Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Date: </label>
                            <div> { this.state.timesheet.emailId }</div>
                        </div>
                        <div className = "row">
                            <label> Punch In Time: </label>
                            <div> { this.state.timesheet.loginTime }</div>
                        </div>
                        <div className = "row">
                            <label> Punch Out Time: </label>
                            <div> { this.state.timesheet.logoutTime }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewTimesheetComponent

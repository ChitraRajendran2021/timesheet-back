import React, { Component } from 'react'
import TimesheetService from '../services/TimesheetService'
import moment from 'moment'

class ListTimesheetComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                timesheets: []
        }
        this.addTimesheet = this.addTimesheet.bind(this);
        this.editTimesheet = this.editTimesheet.bind(this);
        this.deleteTimesheet = this.deleteTimesheet.bind(this);
    }

    deleteTimesheet(id){
        TimesheetService.deleteTimesheet(id).then( res => {
            this.setState({timesheets: this.state.timesheets.filter(timesheet => timesheet.id !== id)});
        });
    }
    viewTimesheet(id){
        this.props.history.push(`/view-timesheet/${id}`);
    }
    editTimesheet(id){
        this.props.history.push(`/add-timesheet/${id}`);
    }

    componentDidMount(){
        var overTime = 0;
        TimesheetService.getTimesheets().then((res) => {
            this.setState({ timesheets: res.data});
            var beginningTime = moment(moment(moment.utc(res.data.loginTime).toDate()).local().format('hh:mm A'), 'hh:mm A');
            var endTime = moment(moment(moment.utc(res.data.logoutTime).toDate()).local().format('hh:mm A'), 'hh:mm A');
            var duration = moment.duration(endTime.diff(beginningTime));
            overTime=overTime+ duration.asHours();
        });

    }

    addTimesheet(){
        this.props.history.push('/add-timesheet/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Timesheets List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addTimesheet}> Add Timesheet</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Date </th>
                                    <th> Punch In Time </th>
                                    <th> Punch Out Time</th>
                                    <th> Over Time</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.timesheets.map(
                                        timesheet => 
                                        <tr key = {timesheet.id}>
                                             <td> {timesheet.currDate}</td>
                                             <td> {
                                             
                                            moment(moment.utc(timesheet.loginTime).toDate()).local().format('hh:mm A')
                                             
                                             }</td>   
                                             <td> {moment(moment.utc(timesheet.logoutTime).toDate()).local().format('hh:mm A')}</td>
                                             <td> {timesheet.overTime}</td>
                                             <td>
                                                 <button onClick={ () => this.editTimesheet(timesheet.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteTimesheet(timesheet.id)} className="btn btn-danger">Delete </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListTimesheetComponent

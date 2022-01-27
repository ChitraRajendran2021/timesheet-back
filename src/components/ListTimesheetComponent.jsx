import React, { Component } from 'react'
import TimesheetService from '../services/TimesheetService'

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
        TimesheetService.getTimesheets().then((res) => {
            this.setState({ timesheets: res.data});
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
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.timesheets.map(
                                        timesheet => 
                                        <tr key = {timesheet.id}>
                                             <td> {timesheet.emailId}</td>
                                             <td> { timesheet.firstName} </td>   
                                             <td> {timesheet.lastName}</td>
                                             <td>
                                                 <button onClick={ () => this.editTimesheet(timesheet.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteTimesheet(timesheet.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewTimesheet(timesheet.id)} className="btn btn-info">View </button>
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

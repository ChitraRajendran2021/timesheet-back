import React, { Component } from 'react'
import TimesheetService from '../services/TimesheetService'
import moment from 'moment'

class ListTimesheetComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            timesheets: [],
            errorMessage: '',
            overTime: 0
        }
        this.addTimesheet = this.addTimesheet.bind(this);
        this.editTimesheet = this.editTimesheet.bind(this);
        this.deleteTimesheet = this.deleteTimesheet.bind(this);
        this.changeErrorMessageHandler = this.changeErrorMessageHandler.bind(this);


    }

    deleteTimesheet(id) {
        TimesheetService.deleteTimesheet(id).then(res => {
            this.setState({ timesheets: this.state.timesheets.filter(timesheet => timesheet.id !== id) });
        });
    }
    changeErrorMessageHandler = (event) => {
        this.setState({ errorMessage: event });
    }
    viewTimesheet(id) {
        this.props.history.push(`/view-timesheet/${id}`);
    }
    editTimesheet(id) {
        this.props.history.push(`/add-timesheet/${id}`);
    }

    componentDidMount() {

        TimesheetService.getTimesheets().then((res) => {
            this.setState({ timesheets: res.data });

        });

        TimesheetService.getOverTime().then((res) => {
            this.setState({
                overTime: res.data
            });
            if (this.state.overTime > 176) {
                this.changeErrorMessageHandler('Monthly average working hours is 176 , your overtime for this month : ' + (this.state.overTime - 176));
            }
        });


    }


    addTimesheet() {
        this.props.history.push('/add-timesheet/_add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Timesheets List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addTimesheet}> Add Timesheet</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th> Date </th>
                                <th> Punch In Time </th>
                                <th> Punch Out Time</th>
                                <th> Hours</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.timesheets.map(
                                    timesheet =>
                                        <tr key={timesheet.id}>
                                            <td> {timesheet.currDate}</td>
                                            <td> {

                                                moment(moment.utc(timesheet.loginTime).toDate()).local().format('hh:mm A')

                                            }</td>
                                            <td> {moment(moment.utc(timesheet.logoutTime).toDate()).local().format('hh:mm A')}</td>
                                            <td> {timesheet.overTime}</td>
                                            <td>
                                                <button onClick={() => this.editTimesheet(timesheet.id)} className="btn btn-info">Update </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteTimesheet(timesheet.id)} className="btn btn-danger">Delete </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <p style={{ color: "red", fontWeight: "bold" }}>{this.state.errorMessage}</p>

                </div>

            </div>
        )
    }
}

export default ListTimesheetComponent

import React, { Component } from 'react'
import TimesheetService from '../services/TimesheetService';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TimePicker from '@mui/lab/TimePicker';


class CreateTimesheetComponent extends Component {
       
    constructor(props) {
        super(props)
       

        this.state = {
            // step 2
            id: this.props.match.params.id,
            currDate: new Date().toLocaleString().split(',')[0],
            login:null,
            logout:null
        }
  
        this.saveOrUpdateTimesheet = this.saveOrUpdateTimesheet.bind(this);
        this.changeLoginHandler = this.changeLoginHandler.bind(this);
        this.changeLogoutHandler = this.changeLogoutHandler.bind(this);
        this.changeCurrDateHandler = this.changeCurrDateHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            TimesheetService.getTimesheetById(this.state.id).then( (res) =>{
                let timesheet = res.data;
                this.setState({login: timesheet.loginTime,
                    logout: timesheet.logoutTime,
                    currDate : timesheet.currDate
             
                });
            });
        }        
    }
    saveOrUpdateTimesheet = (e) => {
        e.preventDefault();
        let timesheet = {loginTime: this.state.login, logoutTime: this.state.logout, currDate: this.state.currDate.split(',')[0]};
        console.log('timesheet => ' + JSON.stringify(timesheet));

        // step 5
        if(this.state.id === '_add'){
            TimesheetService.createTimesheet(timesheet).then(res =>{
                this.props.history.push('/timesheets');
            });
        }else{
            TimesheetService.updateTimesheet(timesheet, this.state.id).then( res => {
                this.props.history.push('/timesheets');
            });
        }
    }
    
 
    changeLoginHandler= (event) => {
        this.setState({login: event});
    }
    changeLogoutHandler= (event) => {
        this.setState({logout: event});
    }
    changeCurrDateHandler= (event) => {
        this.setState({currDate: event});
    }
    
    cancel(){
        this.props.history.push('/timesheets');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Timesheet</h3>
        }else{
            return <h3 className="text-center">Update Timesheet</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                    

                                    <div className = "form-group">
                                            <label> Date: </label>
                                            <input placeholder="Date" name="currDate" className="form-control" 
                                                value={this.state.currDate} />
                                        </div>
                                        <div className = "form-group">
                                            <label> Punch In Time: </label>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label="Enter Login Time"
        value={this.state.login} name="login"
        onChange={this.changeLoginHandler}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
                                        </div>
                                        <div className = "form-group">
                                            <label> Punch Out Time: </label>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label="Enter Logout Time"
        value={this.state.logout} name="logout"
        onChange={this.changeLogoutHandler}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
                                        </div>

                                        
                                        <button className="btn btn-success" onClick={this.saveOrUpdateTimesheet}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateTimesheetComponent

import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/timesheets";

class TimesheetService {

    getTimesheets(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createTimesheet(timesheet){
        return axios.post(EMPLOYEE_API_BASE_URL, timesheet);
    }

    getTimesheetById(timesheetId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + timesheetId);
    }

    updateTimesheet(timesheet, timesheetId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + timesheetId, timesheet);
    }

    deleteTimesheet(timesheetId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + timesheetId);
    }
}

export default new TimesheetService()
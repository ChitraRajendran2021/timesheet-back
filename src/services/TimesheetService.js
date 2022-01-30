import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "https://hello-cloud-run-2ia6hqkrja-uc.a.run.app";
class TimesheetService {

    getTimesheets(){
        return axios.get(EMPLOYEE_API_BASE_URL+ '/getTimes' );
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
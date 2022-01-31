import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "https://hello-cloud-run-2ia6hqkrja-uc.a.run.app";
//const EMPLOYEE_API_BASE_URL = "http://localhost:8080";
class TimesheetService {

    getTimesheets() {
        return axios.get(EMPLOYEE_API_BASE_URL + '/getTimes', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },

        });
    }
    getOverTime() {
        return axios.get(EMPLOYEE_API_BASE_URL + '/overTime', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
        });
    }

    createTimesheet(timesheet) {
        return axios.post(EMPLOYEE_API_BASE_URL + '/timesheets', timesheet, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },

        });
    }

    getTimesheetById(timesheetId) {
        return axios.get(EMPLOYEE_API_BASE_URL + '/timesheets/' + timesheetId, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
            },

        });
    }

    updateTimesheet(timesheet, timesheetId) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/timesheets/' + timesheetId, timesheet, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },

        });
    }

    deleteTimesheet(timesheetId) {
        return axios.delete(EMPLOYEE_API_BASE_URL + '/timesheets/' + timesheetId, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },

        });
    }
}

export default new TimesheetService()
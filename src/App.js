import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListTimesheetComponent from './components/ListTimesheetComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateTimesheetComponent from './components/CreateTimesheetComponent';
import ViewTimesheetComponent from './components/ViewTimesheetComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListTimesheetComponent}></Route>
                          <Route path = "/timesheets" component = {ListTimesheetComponent}></Route>
                          <Route path = "/add-timesheet/:id" component = {CreateTimesheetComponent}></Route>
                          <Route path = "/view-timesheet/:id" component = {ViewTimesheetComponent}></Route>
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;

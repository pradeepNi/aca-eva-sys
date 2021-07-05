import React from 'react';
import Sidebar from './Components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Subject from './Pages/Subject';
import Subject1 from './Pages/Subject1';
import Subject2 from './Pages/Subject2';
import Subject3 from './Pages/Subject3';
import Add from './Pages/Add';
import AddSubject from './Pages/AddSubject';
import AddStudent from './Pages/AddStudent';
import Support from './Pages/Support';
import "./App.css"

const App = () => {
  return (
    <>
      <Router>
        <Sidebar />
        <Switch>
          <Route path="/home" exact component = {Home}/>
          <Route path="/subject" exact component = {Subject}/>
          <Route path="/subject/subject1" exact component = {Subject1}/>
          <Route path="/subject/subject2" exact component = {Subject2}/>
          <Route path="/subject/subject3" exact component = {Subject3}/>
          <Route path="/add" exact component = {Add}/>
          <Route path="/add/add_subject" exact component = {AddSubject}/>
          <Route path="/add/add_student" exact component = {AddStudent}/>
          <Route path="/support" exact component = {Support}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
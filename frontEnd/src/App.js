import React, { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components';
import Home from './Pages/Home';
import Subjects from './Pages/Subjects';
import Evaluation from './Pages/Evaluation';
import Support from './Pages/Support';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import OpenSidebarIcon from '@material-ui/icons/Dehaze';
import CloseSidebarIcon from '@material-ui/icons/Close';
import Sidebar from './Pages/Sidebar/Sidebar';
import AddSubject from './Pages/AddSubject'
import Students from './Pages/Students'
import AddStudent from './Pages/AddStudent';
import EditSubject from './Pages/EditSubject';
import EditStudent from './Pages/EditStudent';
import Attendence from './Pages/Attendence';
import TakeAttendence from "./Pages/TakeAttendence";
import EvaluationList from "./Pages/EvaluationList";
import {val} from "./Pages/Login";
import PageNotFound from './Pages/PageNotFound';
const Navbar = styled.div`
  width: 100%;
  height: 85px;
  background-color: #007BFE;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
`;

const AcadEval = styled.div`
  margin-left: 15px;
  width: 380px;
  background-color: #007BFE;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const LogoutBtn = styled(Link)`
  background: #364547;
  color: white;
  width: 120px;
  height: 40px;
  text-decoration: none;
  display: flex ;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 2px 4px 2px white;
  border-radius: 5px;
  margin-right: 30px;

  &:hover {
    opacity: .7;
  }
`;

function App() {

  const [sidebar, setSidebar] = useState(false);
  function changeSidebar() {
    setSidebar(!sidebar);
  }
  return (

    <div className="App">
      <Router>
        <div>
          {sidebar && <Sidebar />}
        </div>
        <div className="contentPage" >
          <Navbar>
            <AcadEval>
              {
                sidebar 
                ? <CloseSidebarIcon onClick={changeSidebar} style = {{cursor : "pointer"}} />
                : <OpenSidebarIcon onClick={changeSidebar} style = {{cursor : "pointer"}} /> 
              }
              <h2>Academic Evaluation System</h2>
            </AcadEval>
            {(window.location.pathname !== '/Login' && window.location.pathname !== '/Signup') && <LogoutBtn to = {val ? "/Login" : "/SignUp"}>{val ? "Logout" : "Login/SignUp"}</LogoutBtn>}
          </Navbar>

          <Switch>
            <Route exact path="/Signup" component={SignUp}></Route>
            <Route exact path="/Login"  component={Login}></Route>
            <Route exact path="/"  component={Home}></Route>
            <Route exact path="/subjects"  component={Subjects}></Route>
            <Route exact path="/attendence"  component={Attendence}></Route>
            <Route exact path="/attendence/:id"  component={TakeAttendence}></Route>
            <Route exact path="/evaluation"  component={Evaluation}></Route>
            <Route exact path="/evaluation/:id"  component={EvaluationList}></Route>
            <Route exact path="/support"  component={Support}></Route>
            <Route exact path="/subjects/:id/edit"  component={EditSubject}></Route>
            <Route exact path="/subjects/:id/students"  component={Students}></Route>
            <Route exact path="/subjects/:id/AddStudent"  component={AddStudent}></Route>
            <Route exact path="/:id/:stu_id/edit"  component={EditStudent}></Route>
            <Route exact path="/AddSubject"  component={AddSubject}></Route>
            <Route exact path="*"  component={PageNotFound}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
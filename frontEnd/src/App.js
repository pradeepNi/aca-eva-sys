import React, { useState, useReducer, useContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import styled from "styled-components";
import Home from "./Pages/Home";
import Subjects from "./Pages/Subjects";
import Evaluation from "./Pages/Evaluation";
import Support from "./Pages/Support";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import OpenSidebarIcon from "@material-ui/icons/Dehaze";
import CloseSidebarIcon from "@material-ui/icons/Close";
import Sidebar from "./Pages/Sidebar/Sidebar";
import AddSubject from "./Pages/AddSubject";
import Students from "./Pages/Students";
import AddStudent from "./Pages/AddStudent";
import EditSubject from "./Pages/EditSubject";
import EditStudent from "./Pages/EditStudent";
import Attendence from "./Pages/Attendence";
import TakeAttendence from "./Pages/TakeAttendence";
import EvaluationList from "./Pages/EvaluationList";
import Profile from "./Components/Profile";
import { Typography } from "@material-ui/core";
import PageNotFound from "./Pages/PageNotFound";
import Context, { Provider } from "./Store/Context";
import { reducer, intialState } from "./Store/useReduce";
import ForgetPass from "./Pages/ForgetPass";

const Navbar = styled.div`
  width: 100%;
  height: 75px;
  background-color: #007bfe;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  justify-content: flex-end;
  border-radius: 5px;
  /* width: 100vw; */
  background: #fff;

  /* @media screen and (max-width: 768px) {
    display: none;
  } */
`;

const AcadEval = styled.div`
  margin-left: 20px;
  /* width: 100vw; */
  background-color: #007bfe;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  color: white;
`;

const LogoutBtn = styled.button`
  background: #364547;
  color: white;
  width: 70px;
  height: 30px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 2px 4px 2px white;
  border-radius: 5px;
  margin-right: 30px;

  &:hover {
    opacity: 0.7;
  }
`;

const NavHideComponent = (props) => {
  const { location } = props;
  const { dispatch, state } = useContext(Context);
  const [sidebar, setSidebar] = useState(false);
  function changeSidebar() {
    setSidebar(!sidebar);
    dispatch({ type: "SIDEBAR_TOGGLE", payload: { toggle: !sidebar } });
  }

  return location.pathname.match(
    /^\/(Login|Signup|forget-password|login|signup)$/
  ) ? (
    <> </>
  ) : (
    <>
      <Navbar>
        <AcadEval>
          {sidebar ? (
            <CloseSidebarIcon
              onClick={changeSidebar}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <OpenSidebarIcon
              onClick={changeSidebar}
              style={{ cursor: "pointer" }}
            />
          )}
          <div style={{ marginLeft: "30px" }}>
            <Typography variant="h5" textcolor="#272a2b">
              Academic Evaluation System
            </Typography>
          </div>
        </AcadEval>
        <NavBtn>
          <Profile />
        </NavBtn>
      </Navbar>
    </>
  );
};

const NavHide = withRouter(NavHideComponent);

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);
  // const { state } = useContext(Context);

  return (
    <Provider value={{ state, dispatch }}>
      <div className="App">
        <Router>
          <div>{state.toggle && <Sidebar />}</div>
          <div className="contentPage">
            {" "}
            {/*----*/}
            <NavHide />
            <Switch>
              <Route exact path="/Signup" component={SignUp}></Route>
              <Route exact path="/Login" component={Login}></Route>
              <Route
                exact
                path="/forget-password"
                component={ForgetPass}
              ></Route>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/subjects" component={Subjects}></Route>
              <Route exact path="/attendence" component={Attendence}></Route>
              <Route
                exact
                path="/attendence/:id"
                component={TakeAttendence}
              ></Route>
              <Route exact path="/evaluation" component={Evaluation}></Route>
              <Route
                exact
                path="/evaluation/:id"
                component={EvaluationList}
              ></Route>
              <Route exact path="/support" component={Support}></Route>
              <Route
                exact
                path="/subjects/:id/edit"
                component={EditSubject}
              ></Route>
              <Route
                exact
                path="/subjects/:id/students"
                component={Students}
              ></Route>
              <Route
                exact
                path="/subjects/:id/AddStudent"
                component={AddStudent}
              ></Route>
              <Route
                exact
                path="/:id/:stu_id/edit"
                component={EditStudent}
              ></Route>
              <Route exact path="/AddSubject" component={AddSubject}></Route>
              <Route exact path="*" component={PageNotFound}></Route>
            </Switch>
          </div>{" "}
          {/*----*/}
        </Router>
      </div>
    </Provider>
  );
}

export default App;

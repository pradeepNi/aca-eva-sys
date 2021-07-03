import React, { useState } from "react";
import styled from "styled-components";
// import { BrowserRouter, Router } from "react-router-dom";
// function Login() {
//   return (<Div>
//   {/* <h3>Hello World!</h3>
//   <h4>Goodbye</h4> */}
//   <Folder name='my_folder'/>
//   <Folder name='application'/>
//   </Div>
//   )
// }

// const Folder = (props) => {
//   // default name = 'my_folder'; 
//   return <h4>{props.name}</h4>
// }

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmits = (event) => {

    event.preventDefault();

  };

  const inputEvent = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const inputEventTwo = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };
  const Wrapper = styled.section`
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  background: red;
  font-family: "Josefin Sans";
  `;
  const Div = styled.div`
  width: 100%;
  height:100vh;
  background: #8e44ad;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `;
  const Input = styled.input`
  width: 50%;
  padding: 10px 20px;
  border: none;
  outline: none;
  margin: 20px 0;
  `;
  const Buttons = styled.button`
  line-height: 24px;
  padding: 0 20px;
  background: #9b59b6;
  color: blue;
  border: 2px solid #ecf0f1;
  outline: none;
  border-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;
  `;
  return (
    // <Router>

      <Wrapper>

        <Div className="main_div">
          <form onSubmit={onSubmits}>
            <Div >
              <Input
                type="text"
                placeholder="Enter your mail"
                onChange={inputEvent}
                value={name}
              />
              <br />
              <Input
                type="password"
                placeholder="Enter your password"
                onChange={inputEventTwo}
                value={password}
              />
              <Buttons type="submit">Log in</Buttons>
            </Div>
          </form>
        </Div>
      </Wrapper>
    // </Router>
  );


};

export default Login;
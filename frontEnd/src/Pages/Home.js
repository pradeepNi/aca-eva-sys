import React from 'react'
import "./Header.css";
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Btn = styled(Link)`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 25%;
   height: 100px;
   border-radius: 5px;
   background: #AFB9C8;
   text-decoration: none;
   font-size: 1.3rem;
   margin: 20px 4.15%;
   box-shadow: 2px 8px 15px 9px white;
   z-index: 3;
   color: white;
`;
const Headdiv = styled.div`
   display: flex;
   flex-flow: column wrap;
   justify-content: space-around;
   align-items: center;
   width: 93%;
   height: 100%;
   border-radius: 5px;
   background: #AFB9C8;
   text-decoration: none;
   font-size: 1.7rem;
   margin: 20px 4.15%;
   box-shadow: 2px 8px 15px 9px white;
   z-index: 3;
   color: white;
`;
function Home() {
    return (
        <div className = "pageHead">
            <div className = "divHead">
               <Headdiv>
                    <h3>Academic Year: 2021-2022</h3>
                    <h3>NIT HAMIRPUR</h3>
               </Headdiv>
            </div>
            <hr />
            <div className = "divHome">
                <Btn to = {'/attendence'}>Attendence</Btn>
                <Btn to = {'/attendence'}>Mid-Sem</Btn>
                <Btn to = {'/attendence'}>End-Sem</Btn>
                <Btn to = {'/attendence'}>Assignment</Btn>
                <Btn to = {'/attendence'}>Test</Btn>
            </div>
        </div>
    )
}

export default Home;

import React from 'react'
import "./Sidebar.css"
import styled from 'styled-components'
import AdminPanelIcon from '@material-ui/icons/SupervisorAccount';
import SidebarMenu from './SidebarMenu';
import SidebarData from './SidebarData';

const AdminPanel = styled.div`
   width: 100%;
   height: 83px;
   background-color: #364547;
   display: flex;
   justify-content: space-around;
   align-items: center;
   color: white;
   border-bottom: 1px solid black;
`;
const SubMenuCont = styled.div`
  width: 100%;
  height: calc(100% - 85px);
  box-shadow: 1px 9px 9px 2px #282a35;
  background-color: #364547;
`;

function Sidebar() {
    return (
        <div className="sideBar">
            <AdminPanel>
                <AdminPanelIcon style = {{flex:"30% 1"}}/>
                <h3 style = {{flex:"70% 1",fontSize:"1.35rem"}}>Admin Panel</h3>
            </AdminPanel>
            <SubMenuCont>
                {SidebarData.map((val, index) => {
                    return <SidebarMenu className = "sidebarMenu" item={val} key={index} />
                })}
            </SubMenuCont>
        </div>
    )
}

export default Sidebar
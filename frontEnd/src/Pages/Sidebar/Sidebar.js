import React from "react";
import "./Sidebar.css";
import styled from "styled-components";
import SidebarMenu from "./SidebarMenu";
import SidebarData from "./SidebarData";
import CloseIcon from "@material-ui/icons/Close";

const AdminPanel = styled.div`
  /* width: 100%; */

  height: 83px;
  background-color: #364547;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: white;
  border-bottom: 1px solid black;
  padding-left: 20px;
`;
const CustomCloseIcon = styled(CloseIcon)`
  cursor: pointer;
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
        <CustomCloseIcon />
      </AdminPanel>
      <SubMenuCont>
        {SidebarData.map((val, index) => {
          return <SidebarMenu className="sidebarMenu" item={val} key={index} />;
        })}
      </SubMenuCont>
    </div>
  );
}

export default Sidebar;

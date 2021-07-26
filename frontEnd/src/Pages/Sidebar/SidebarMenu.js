import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const SidebarLink = styled(Link)`
    background: #364547;
    height: 60px;
    list-style-type: none;
    margin: 0;
    display: flex;
    flex-direction: row;
    color: white;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

    &:hover{
        background: #1976D2;
        cursor: pointer;
    }
`;

const SidebarMenu = ({item}) => {
    return (
        <SidebarLink 
            to = {item.path}
            className = "row"
        >
            <div id = "icon">{item.icon}</div>
            <div id = "title">{item.name}</div>
        </SidebarLink>
    )
}

export default SidebarMenu

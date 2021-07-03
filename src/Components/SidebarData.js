import React from 'react'
import * as AiIcons from 'react-icons/ai'
import * as BsIcons from 'react-icons/bs'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'

export const SidebarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome/>,
    },

    {
        title: 'Subject',
        path: '/subject',
        icon: <IoIcons.IoIosPaper/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpend: <RiIcons.RiArrowUpSFill/>,
        subNav: [
            {
                title: 'Subject 1',
                path: '/subject/subject1',
                icon: <IoIcons.IoIosPaper/>
            },

            {
                title: 'Subject 2',
                path: '/subject/subject2',
                icon: <IoIcons.IoIosPaper/>,
            },

            {
                title: 'Subject 3',
                path: '/subject/subject3',
                icon: <IoIcons.IoIosPaper/>,
            }
        ]
    },

    {
        title: 'Add',
        path: '/add',
        icon: <BsIcons.BsPlusCircle/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpend: <RiIcons.RiArrowUpSFill/>,
        subNav: [
            {
                title: 'Add Subject',
                path: '/add/add_subject',
                icon: <IoIcons.IoIosPaper/>
            },

            {
                title: 'Add Student',
                path: '/add/add_student',
                icon: <BsIcons.BsPersonPlus/>,
            }

        ]
    },

    {
        title: 'Support',
        path: '/support',
        icon: <IoIcons.IoMdHelpCircle/>
    }

];
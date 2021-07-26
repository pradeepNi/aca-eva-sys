import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import SubjectsIcon from '@material-ui/icons/LibraryBooks';
import EvalIcon from '@material-ui/icons/Functions';

const SidebarData = [
    {
        name : "Home",
        icon : <HomeIcon />,
        path : "/"
    },
    {
        name : "Subjects",
        icon : <SubjectsIcon />,
        path : "/subjects"
    },
    {
        name : "Evaluation",
        icon : <EvalIcon />,
        path : "/evaluation"
    }
]
export default SidebarData
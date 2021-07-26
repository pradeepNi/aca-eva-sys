import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

function AddDel () {
    return (
        <div>
            <div><AddIcon /></div>
            <div><DeleteIcon /></div>
        </div>
    )
}

const SubjectData = [
    {
        goto: <OpenInNewIcon />,
        code : "MED-311",
        name : "Thermal Engineering",
        Action : <AddDel /> 
    },
    {
        goto: <OpenInNewIcon />,
        code : "MED-311",
        name : "Thermal Engineering",
        Action : <AddDel /> 
    },
    {
        goto: <OpenInNewIcon />,
        code : "MED-311",
        name : "Thermal Engineering",
        Action : <AddDel /> 
    }
]

export default SubjectData;
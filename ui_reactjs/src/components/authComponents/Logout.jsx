import React from 'react';
import { logout } from '../../redux/actions/authUserAction';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';

const Logout = () => {
    const dispatch = useDispatch()
    return(
        <div>
            <Avatar variant="circle" onClick={()=>dispatch(logout())}>
                <LogoutIcon />
            </Avatar>
        </div>
    )
}

export default Logout;
import React from 'react';
import { logout } from '../../redux/actions/authUserAction';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

const Logout = () => {
    const dispatch = useDispatch()
    return (
        <div>
            <Typography sx={{ cursor: 'pointer' }} onClick={() => dispatch(logout())}>
                Logout
            </Typography>
        </div>
    )
}

export default Logout;
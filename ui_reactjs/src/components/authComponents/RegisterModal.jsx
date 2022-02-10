import React from "react";
import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import {useSelector, useDispatch} from "react-redux";
import { register } from "../../redux/actions/authUserAction";
import {clearErrors} from "../../redux/actions/errorActions";

import {Button, Modal, Typography, Avatar} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { Textfield } from "../../styledComponents/textfield.style";
import { StyledButton } from "../../styledComponents/styledButton.style";
import { FormStyled, ModalBox } from "../../styledComponents/modalBox.style";
import LoginModal from "./LoginModal";

const RegisterModal = () => {

    const {isAuthenticated} = useSelector(state=>{
        console.log(state.authReducer)
        return state.authReducer});

    const error = useSelector(state=>state.errorReducer);

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        name:'',
        emailID:'',
        password:''
    });
    const [msg, setMsg] = useState(null);

    const toggle = () => {
        dispatch(clearErrors())
        setOpen((open)=>!open);
    }

    useEffect(()=>{
        if(error.id==='REGISTER_FAIL')
            setMsg(error.msg)
        else{
            setMsg(null)
        }

        if(open){
            if(isAuthenticated){
                toggle();
            }
        }
    },[isAuthenticated, error])

    const onChangeHandler = (event) =>{
        setState({...state,[event.target.name]: event.target.value});
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();
        console.log(state)
        const {name, emailID, password} = state;
        dispatch(register({name, emailID, password}))
    }

    return(
    <div>
      <Button onClick={toggle}>Register</Button>
      <Modal
        open={open}
        onClose={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox> 
        <Avatar variant="circle">
          <LockIcon />
        </Avatar>

        <Typography component="h1" variant="h6">
          Register
        </Typography>
            <FormStyled onSubmit={onSubmitHandler} className="modal-container">
                <Textfield
                id="name"
                label="Name"
                type="text"
                name="name"
                placeholder="Name"
                onChange={onChangeHandler}
                />
                <Textfield
                id="email"
                label="E-Mail"
                type="email"
                name="emailID"
                placeholder="Email-Id"
                onChange={onChangeHandler}
                />
                <Textfield
                id="password"
                label="Password"
                type="password"
                name="password"
                placeholder="Password"
                onChange={onChangeHandler}
                />
                <StyledButton type="submit">Submit</StyledButton>
            </FormStyled>
        </ModalBox>
      </Modal>
    </div>
  );
}

RegisterModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

export default RegisterModal;
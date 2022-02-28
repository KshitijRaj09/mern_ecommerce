import React from "react";
import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/actions/authUserAction";
import { clearErrors } from "../../redux/actions/errorActions";

import { Button, Modal, Typography, Avatar } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { StyledButton } from "../../styledComponents/styledButton.style";
import { Textfield } from "../../styledComponents/textfield.style";
import { FormStyled, ModalBox } from "../../styledComponents/modalBox.style";
import RegisterModal from "./RegisterModal";
import { localStorageCartToDB } from "../../redux/actions/cartAction";

const LoginModal = () => {

  const { isAuthenticated, user } = useSelector(state => {

    return state.authReducer
  });

  const error = useSelector(state => state.errorReducer);

  const dispatch = useDispatch();

  const [registerSelected, setRegisterSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    emailID: '',
    password: ''
  });
  const [msg, setMsg] = useState(null);

  const toggle = () => {
    dispatch(clearErrors());
    setOpen((open) => !open);
  }

  const registerHandler = () => {
    toggle();
    setRegisterSelected(true)
  }
  useEffect(() => {
    if (error.id === 'LOGIN_FAIL')
      setMsg(error.msg)
    else {
      setMsg(null)
    }

    if (open) {
      if (isAuthenticated) {
        toggle();
      }
    }
  }, [isAuthenticated, error])

  const onChangeHandler = (event) => setState({ ...state, [event.target.name]: event.target.value });

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const { emailID, password } = state;
    dispatch(login({ emailID, password }))
  }


  return (
    <div>
      <StyledButton onClick={toggle} color='#456268'>Login</StyledButton>
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
            Sign in
          </Typography>
          {error.msg && <p>{error.msg.message}</p>}
          <FormStyled onSubmit={onSubmitHandler}>
            <Textfield
              id="email"
              label="E-Mail"
              type="email"
              variant="filled"
              name="emailID"
              placeholder="Email-Id"
              onChange={onChangeHandler}
            />
            <Textfield
              id="password"
              label="Password"
              type="password"
              variant="filled"
              name="password"
              placeholder="Password"
              onChange={onChangeHandler}
            />
            <StyledButton type="Submit">Login</StyledButton>
          </FormStyled>
          <div style={{ textAlign: "center" }}>
            Don't have an account?
            <StyledButton onClick={registerHandler}>Register</StyledButton>
          </div>
        </ModalBox>
      </Modal>
      {registerSelected && <RegisterModal registerSelected={registerSelected} setRegisterSelected={setRegisterSelected} />}
    </div>
  );
}

LoginModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}


export default LoginModal;
import {loginApi} from "../../api";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_CART,
} from "../actionTypes";
import {showError} from "./errorActions";
import {axiosInstance} from "../../api/axiosInstance";

//To load the userData
export const loadUser = () => async (dispatch, getState) => {
  dispatch({type: USER_LOADING});

  try {
    const {data} = await axiosInstance.get("/api/user", tokenConfig(getState));
    dispatch({
      type: USER_LOADED,
      payload: data,
    });
  } catch ({response}) {
    dispatch(showError(response.data, response.status));
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//To register the user
export const register =
  ({name, password, emailID}) =>
  async (dispatch) => {
    const body = JSON.stringify({name, password, emailID});
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const {data} = await axiosInstance.post("/api/register", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });
    } catch ({response}) {
      dispatch(showError(response.data, response.status, REGISTER_FAIL));
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const login =
  ({emailID, password}) =>
  async (dispatch, getState) => {
    try {
      const data = await loginApi({emailID, password});
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    } catch ({response}) {
      dispatch(showError(response.data, response.status, LOGIN_FAIL));
      dispatch({type: LOGIN_FAIL});
    }
  };

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({type: LOGOUT_SUCCESS});
  dispatch({type: CLEAR_CART});
};

export const tokenConfig = (getState) => {
  const token = getState().auth.error;
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-type"] = token;
  }

  return config;
};

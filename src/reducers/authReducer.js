import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED_FAIL,
  USER_LOADED_SUCCESS,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAIL,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  SIGNUP_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT,
} from "../actions/types";

const initialState = {
  refresh: localStorage.getItem("refresh"),
  access: localStorage.getItem("access"),
  user: null,
  accountCreated: false,
  isAuthenticated: false,
  loginErrors: null,
  signupErrors: null,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      //console.log("The reducer is run");
      localStorage.setItem("access", payload.access);
      localStorage.setItem("refresh", payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
        loginErrors: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        signupErrors: null,
        accountCreated: true,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        refresh: null,
        access: null,
        signupErrors: null,
        loginErrors: payload,
      };
    case LOGOUT:
      //console.log("LOGIN FAIL reducer is run");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        isAuthenticated: false,
        access: null,
        refresh: null,
        user: null,
        signupErrors: null,
        loginErrors: null,
      };
    case SIGNUP_FAIL:
      //console.log("LOGIN FAIL reducer is run");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        isAuthenticated: false,
        access: null,
        refresh: null,
        user: null,
        loginErrors: null,
        signupErrors: payload,
        accountCreated: false,
      };
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        user: payload,
      };

    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };
    case PROFILE_UPDATE_FAIL:
    case RESET_PASSWORD_CONFIRM_FAIL:
    case RESET_PASSWORD_CONFIRM_SUCCESS:
    case RESET_PASSWORD_FAIL:
    case RESET_PASSWORD_SUCCESS:
    case ACTIVATION_FAIL:
    case ACTIVATION_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
}

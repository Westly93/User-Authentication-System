import axios from "axios";
import {
  USER_LOADED_FAIL,
  USER_LOADED_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAIL,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  LOGOUT,
} from "./types";

export const checkAuthenticated = () => (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ token: localStorage.getItem("access") });
    axios
      .post("http://127.0.0.1:8000/auth/jwt/verify/", body, config)
      .then((res) => {
        if (res.data.code !== "token_not_valid") {
          dispatch({
            type: AUTHENTICATED_SUCCESS,
          });
        } else {
          dispatch({
            type: AUTHENTICATED_FAIL,
          });
        }
      })
      .catch((err) =>
        dispatch({
          type: AUTHENTICATED_FAIL,
        })
      );
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};
export const loadUser = () => (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    axios
      .get("http://127.0.0.1:8000/auth/users/me/profile", config)
      .then((res) =>
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: USER_LOADED_FAIL,
        })
      );
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};
export const loginUser = (email, password) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    axios
      .post("http://127.0.0.1:8000/auth/jwt/create/", body, config)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch(loadUser());
      })
      .catch((err) =>
        dispatch({
          type: LOGIN_FAIL,
          payload: err.response.data,
        })
      );
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
export const signup = (name, email, password, re_password) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password, re_password });
  try {
    axios
      .post("http://127.0.0.1:8000/auth/users/", body, config)
      .then((res) => {
        dispatch({
          type: SIGNUP_SUCCESS,
        });
      })
      .catch((err) =>
        dispatch({
          type: SIGNUP_FAIL,
          payload: err.response.data,
        })
      );
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};
export const resetPassword = (email) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });
  try {
    axios
      .post("http://127.0.0.1:8000/auth/users/reset_password/", body, config)
      .then((res) =>
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        })
      )
      .catch((err) =>
        dispatch({
          type: RESET_PASSWORD_FAIL,
        })
      );
  } catch (err) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
    });
  }
};
export const resetPasswordConfirm = (
  uid,
  token,
  new_password,
  re_new_password
) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ token, uid, new_password, re_new_password });
  try {
    axios
      .post(
        "http://127.0.0.1:8000/auth/users/reset_password_confirm/",
        body,
        config
      )
      .then((res) =>
        dispatch({
          type: RESET_PASSWORD_CONFIRM_SUCCESS,
        })
      )
      .catch((err) =>
        dispatch({
          type: RESET_PASSWORD_CONFIRM_FAIL,
        })
      );
  } catch (err) {
    dispatch({
      type: RESET_PASSWORD_CONFIRM_FAIL,
    });
  }
};
export const userLogout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
export const activateAccount = (uid, token) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ uid, token });
  try {
    axios
      .post("http://127.0.0.1:8000/auth/users/activation/", body, config)
      .then((res) =>
        dispatch({
          type: ACTIVATION_SUCCESS,
        })
      )
      .catch((err) =>
        dispatch({
          type: ACTIVATION_FAIL,
        })
      );
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
  }
};
export const updateProfile = (address, bio, thumbnail) => (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    const formData = new FormData();
    formData.append("address", address);
    formData.append("bio", bio);
    formData.append("thumbnail", thumbnail);
    try {
      axios
        .put("http://127.0.0.1:8000/auth/users/me/profile", formData, config)
        .then((res) =>
          dispatch({
            type: PROFILE_UPDATE_SUCCESS,
            payload: res.data,
          })
        )
        .catch((err) =>
          dispatch({
            type: PROFILE_UPDATE_FAIL,
          })
        );
    } catch (err) {
      dispatch({
        type: PROFILE_UPDATE_FAIL,
      });
    }
  } else {
    dispatch({
      type: PROFILE_UPDATE_FAIL,
    });
  }
};

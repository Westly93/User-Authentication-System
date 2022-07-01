import axios from "axios";
import {
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_FAIL,
} from "./types";

export const fetchPosts = () => (dispatch) => {
  try {
    axios
      .get("http://127.0.0.1:8000/posts/")
      .then((res) =>
        dispatch({
          type: POSTS_LOADED_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: POSTS_LOADED_FAIL,
        })
      );
  } catch (err) {
    dispatch({
      type: POSTS_LOADED_FAIL,
    });
  }
};
export const addPost = (title, body) => (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const postBody = JSON.stringify({ title, body });
    try {
      axios
        .post("http://127.0.0.1:8000/posts/", postBody, config)
        .then((res) => {
          dispatch({
            type: ADD_POST_SUCCESS,
            payload: res.data,
          });
          //dispatch(fetchPosts());
        })
        .catch((err) =>
          dispatch({
            type: ADD_POST_FAIL,
          })
        );
    } catch (err) {
      dispatch({
        type: ADD_POST_FAIL,
      });
    }
  } else {
    dispatch({
      type: ADD_POST_FAIL,
    });
  }
};
export const deletePost = (id) => (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    try {
      axios
        .delete(`http://127.0.0.1:8000/posts/${id}/`, config)
        .then((res) =>
          dispatch({
            type: DELETE_POST_SUCCESS,
            payload: id,
          })
        )
        .catch((err) =>
          dispatch({
            type: DELETE_POST_FAIL,
          })
        );
    } catch (err) {
      dispatch({
        type: DELETE_POST_FAIL,
      });
    }
  } else {
    dispatch({
      type: DELETE_POST_FAIL,
    });
  }
};
export const updatePost = (updPost) => (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const body = JSON.stringify(updPost);
    try {
      axios
        .put(`http://127.0.0.1:8000/posts/${updPost.id}/`, body, config)
        .then((res) =>
          dispatch({
            type: POST_UPDATE_SUCCESS,
            payload: res.data,
          })
        )
        .catch((err) =>
          dispatch({
            type: POST_UPDATE_FAIL,
          })
        );
    } catch (err) {
      dispatch({
        type: POST_UPDATE_FAIL,
      });
    }
  } else {
    dispatch({
      type: POST_UPDATE_FAIL,
    });
  }
};

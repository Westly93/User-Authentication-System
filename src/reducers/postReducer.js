import {
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  ADD_POST_FAIL,
  ADD_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_SUCCESS,
  POST_UPDATE_FAIL,
  POST_UPDATE_SUCCESS,
} from "../actions/types";

const initialState = {
  items: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case DELETE_POST_FAIL:
      return {
        ...state,
      };
    case ADD_POST_FAIL:
      return {
        ...state,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        items: [...state.items.slice(0, 0), payload, ...state.items.slice(0)], //[...state.items, payload]
      };
    case POSTS_LOADED_SUCCESS:
      return {
        ...state,
        items: payload,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload),
      };
    case POST_UPDATE_SUCCESS:
      const index = state.items.findIndex((item) => item.id === payload.id);
      //console.log(index);
      return {
        ...state,
        items: [
          ...state.items.slice(0, index),
          payload,
          ...state.items.slice(index + 1),
        ],
      };
    case POST_UPDATE_FAIL:
      return {
        ...state,
      };
    case POSTS_LOADED_FAIL:
      return {
        ...state,

        items: [],
      };
    default:
      return state;
  }
}

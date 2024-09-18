import {
  USER_LOGIN_REQ,
  USER_LOGIN_REQ_SUCCESS,
  USER_LOGIN_REQ_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQ,
  USER_REGISTER_REQ_SUCCESS,
  USER_REGISTER_REQ_FAIL,
} from "../constants/User";

// User login Reducer
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQ:
      return { loading: true };
    case USER_LOGIN_REQ_SUCCESS:
      return { loading: false, userInfo: action.payload }; // Set userInfo on success
    case USER_LOGIN_REQ_FAIL:
      return { loading: false, error: action.payload }; // Set error on fail
    case USER_LOGOUT:
      return {}; // clear userInfo on logout
    default:
      return state;
  }
};

// User Register Reducer
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQ:
      return { loading: true };
    case USER_REGISTER_REQ_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_REQ_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

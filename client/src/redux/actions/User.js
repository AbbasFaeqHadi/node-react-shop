import axios from "axios";
import {
  USER_LOGIN_REQ,
  USER_LOGIN_REQ_SUCCESS,
  USER_LOGIN_REQ_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQ,
  USER_REGISTER_REQ_SUCCESS,
  USER_REGISTER_REQ_FAIL,
} from "../constants/User";
import { BASE_URL } from "../constants/BASE_URL";

// User login action
/* 
Asynchronous action creator taking email and password as parameters
Returns async function that takes dispatch as an argument.
Dispatch is a function that allows us to send actions to the store.
The action creator dispatches actions based on the state of the API request, such as logging in or registering.
*/
export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQ });
    const config = {
      headers: {
        // headers are included in the request.
        "Content-Type": "application/json", // This tells the server that the request body contains JSON data.
      },
    };
    const { data } = await axios.post(
      `${BASE_URL}/api/users/login`,
      { email, password },
      config
    );
    dispatch({ type: USER_LOGIN_REQ_SUCCESS, payload: data });

    // Store user info on the browser's local storage.
    // Structure: localStorage.setItem(key, value)
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_REQ_FAIL,
      payload: error.response.data.message,
    });
  }
};

// User logout action
export const userLogoutAction = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/login"; // Redirect after logout
};

// User register action
export const userRegisterAction =
  (name, email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQ });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/users`,
        { name, email, password },
        config
      );
      dispatch({ type: USER_REGISTER_REQ_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_REQ_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_REQ_FAIL,
        payload: error.response.data.message,
      });
    }
  };

import axios from "axios";
import {
  ORDER_REQ,
  ORDER_REQ_SUCCESS,
  // ORDER_REQ_FAIL,
  ORDER_DETAILS_REQ,
  ORDER_DETAILS_REQ_SUCCESS,
  ORDER_DETAILS_REQ_FAIL,
  ORDER_PAYMENT_REQ,
  ORDER_PAYMENT_REQ_SUCCESS,
  ORDER_PAYMENT_REQ_FAIL,
  ORDER_LIST_REQ,
  ORDER_LIST_REQ_SUCCESS,
  ORDER_LIST_REQ_FAIL,
} from "../constants/Order";
import { BASE_URL } from "../constants/BASE_URL";
import { CART_ITEMS_RESET } from "../constants/Cart";
import { userLogoutAction } from "./User";

// Order action
export const OrderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_REQ }); // Indicates the order request has started

    const userInfo = getState().userLoginReducer.userInfo;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${BASE_URL}/api/orders`, order, config);
    dispatch({ type: ORDER_REQ_SUCCESS, payload: data });
    dispatch({ type: CART_ITEMS_RESET, payload: data });
  } catch (error) {
    //   const message =
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message;

    //   if (message === "Not authorized") {
    //     dispatch(userLogoutAction());
    //   }
    //   dispatch({
    //     type: ORDER_REQ_FAIL,
    //     payload: message,
    //   });
    console.log(error);
  }
};

// Order payment action
export const OrderPaymentAction =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAYMENT_REQ }); // Indicates the order payment request has started
      const userInfo = getState().userLoginReducer.userInfo;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/api/orders/${orderId}/payment`,
        paymentResult,
        config
      );

      dispatch({ type: ORDER_PAYMENT_REQ_SUCCESS, payload: data });
      dispatch(orderDetailsAction(orderId));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (message === "Not authorized") {
        dispatch(userLogoutAction());
      }
      dispatch({
        type: ORDER_PAYMENT_REQ_FAIL,
        payload: message,
      });
    }
  };

// Order details request action
export const orderDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQ }); // Indicates the order details request has started
    const userInfo = getState().userLoginReducer.userInfo;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/api/orders/${id}`, config);
    dispatch({ type: ORDER_DETAILS_REQ_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized!") {
      dispatch(userLogoutAction());
    }

    dispatch({
      type: ORDER_DETAILS_REQ_FAIL,
      payload: message,
    });
  }
};

// Order list action
export const orderListAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQ }); // Indicates the order list request has started
    const userInfo = getState().userLoginReducer.userInfo;
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/api/orders`, config);
    dispatch({ type: ORDER_LIST_REQ_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized!") {
      dispatch(userLogoutAction());
    }
    dispatch({
      type: ORDER_LIST_REQ_FAIL,
      payload: message,
    });
  }
};

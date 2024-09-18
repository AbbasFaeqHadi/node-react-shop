import axios from "axios";
import {
  PRODUCT_LIST_REQ,
  PRODUCT_LIST_REQ_SUCCESS,
  PRODUCT_LIST_REQ_FAIL,
  PRODUCT_DETAILS_REQ,
  PRODUCT_DETAILS_REQ_SUCCESS,
  PRODUCT_DETAILS_REQ_FAIL,
} from "../constants/Product";

import { BASE_URL } from "../constants/BASE_URL";

// Action for the list of products
// Outer arrow function - creates and returns the inner arrow function
export const productListAction = () => async (dispatch) => {
  try {
    // Dispatch an action to indicate the request has started
    dispatch({ type: PRODUCT_LIST_REQ });
    // Perform the async API call to fetch the product list
    const { data } = await axios.get(`${BASE_URL}/api/products`);

    // Dispatch an action with the fetch data upon success
    dispatch({ type: PRODUCT_LIST_REQ_SUCCESS, payload: data });
  } catch (error) {
    // Dispatch an action with an error message upon failure
    dispatch({
      type: PRODUCT_LIST_REQ_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action for a single product
export const productAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQ });
    const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_REQ_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_REQ_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

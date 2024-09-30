import axios from "axios";

import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  CART_SAVE_SHIPPING_DETAILS,
  SAVE_PAYMENT_METHOD,
} from "../constants/Cart";

import { BASE_URL } from "../constants/BASE_URL";

// Add item to cart
export const addToCartAction = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
    dispatch({
      type: ADD_ITEM_TO_CART,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    // Save cart items in local storage
    const cartItems = getState().cartReducer.cartItems;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.log(error);
  }
};

// Remove item from cart
export const removeFromCartAction = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_FROM_CART,
    payload: id,
  });

  // Save updated cart items in local storage
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

// Save shipping details
export const saveShippingDetailsAction = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_DETAILS,
    payload: data,
  });

  localStorage.setItem("shippingDetails", JSON.stringify(data));
};

// Save payment method
export const savePaymentMethodAction = (data) => (dispatch) => {
  dispatch({
    type: SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  CART_ITEMS_RESET,
  CART_SAVE_SHIPPING_DETAILS,
  SAVE_PAYMENT_METHOD,
} from "../constants/Cart";

export const cartReducer = (
  state = { cartItems: [], shippingDetails: {} },
  action
) => {
  let item; // Declare like to avoid lexical declaration issue in switch case block.
  let itemExists;
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      item = action.payload; // Payload is the product
      itemExists = state.cartItems.find((x) => x.product === item.product);

      return {
        ...state,
        cartItems: itemExists // If true run map function, otherwise add item to cart
          ? state.cartItems.map((x) =>
            // If the product matches the existing one, replace new item
            // because it might have updated properties, like quantity.
            // If it doesn't match, return the existing item (x) as is.
              x.product === itemExists.product ? item : x
            )
          : [...state.cartItems, item], // If itemExists is falsy add item to cart
      };

    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case CART_SAVE_SHIPPING_DETAILS:
      return { ...state, shippingDetails: action.payload };

    case SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };

    case CART_ITEMS_RESET:
      return { ...state, cartItems: [] };

    default:
      return state;
  }
};

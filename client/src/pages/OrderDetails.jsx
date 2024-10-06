import { useDispatch, useSelector } from "react-redux";
import Layout from "../layout/Layouts";
import CartItems from "../components/CartItem";
import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { BASE_URL } from "../redux/constants/BASE_URL";
import { OrderAction, OrderPaymentAction } from "../redux/actions/Order";
import { saveShippingDetailsAction } from "../redux/actions/Cart";
import { useNavigate } from "react-router-dom";
import { ORDER_RESET } from "../redux/constants/Order";

const OrderDetails = () => {
  const cart = useSelector((state) => state.cartReducer);
  const { cartItems, shippingDetails } = cart;

  const addDemical = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // Subtotal rice  (does not include shipping and tax)
  const subtotal = addDemical(
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  );
  // Total
  const taxFee = addDemical(Number(subtotal * 0.25).toFixed(2)); // Convert to a number because toFixed returns a string
  // Calculate shipping fee (free for orders over 400 SEK)
  const shippingFee = addDemical(subtotal > 400 ? 0 : 100);

  const total = (
    Number(subtotal) +
    Number(taxFee) +
    Number(shippingFee)
  ).toFixed(2);

  // Manage shipping details form inputs
  const [recipientName, setRecipientName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // Store Paypal client id
  const [clientId, setClientId] = useState("");

  // Add order confirmation
  const orderReducer = useSelector((state) => state.orderReducer);
  const { order, success } = orderReducer;
  const [paymentResult, setPaymentResult] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getPaypalClientId();

    if (success) {
      dispatch({ type: ORDER_RESET });
      dispatch(OrderPaymentAction(order._id, paymentResult));
      // Redirect to the order confirmation page
      navigate(`/order/${order._id}`, {});
    }
  });

  // Fetch the PayPal client ID when the 'ProductDetails' component is mounted
  const getPaypalClientId = async () => {
    // Use async because we are making a network request
    const response = await axios.get(`${BASE_URL}/api/config/paypal`);
    const fetchedClientId = response.data;
    setClientId(fetchedClientId);
  };

  // Dispatch actions for saving the order
  const dispatch = useDispatch();
  const successPaymentHandler = async (paymentResult) => {
    try {
      setPaymentResult(paymentResult);
      // Dispatch the order action with order details to the Redux store
      dispatch(
        OrderAction({
          orderItems: cart.cartItems,
          shippingDetails: cart.shippingDetails,
          totalPrice: total,
          paymentMethod: "Paypal",
          price: subtotal,
          tax: taxFee,
          shippingCost: shippingFee,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Save shipping details to the Redux store
  const saveShippingDetails = () => {
    dispatch(
      saveShippingDetailsAction({
        recipientName,
        address,
        postalCode,
        city,
        country,
      })
    );
  };

  return (
    <>
      <Layout>
        <section className="text-gray-600 dark:text-gray-400 body-font dark:bg-gray-900 overflow-hidden">
          {" "}
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h2 className="title-font text-gray-500 dark:text-gray-300 tracking-widest">
                  {" "}
                  Order summary
                </h2>
                <CartItems items={cartItems} />
                <div className="flex border-t border-gray-200 dark:border-gray-700 py-2">
                  {" "}
                  <span className="text-gray-500 dark:text-gray-300">
                    Subtotal
                  </span>{" "}
                  <span className="ml-auto text-gray-900 dark:text-gray-100">
                    {subtotal} SEK
                  </span>{" "}
                </div>
                <div className="flex border-t border-gray-200 dark:border-gray-700 py-2">
                  {" "}
                  <span className="text-gray-500 dark:text-gray-300">
                    Tax (Vat: 25%)
                  </span>{" "}
                  <span className="ml-auto text-gray-900 dark:text-gray-100">
                    {taxFee} SEK
                  </span>{" "}
                </div>
                <div className="flex border-t border-b mb-6 border-gray-200 dark:border-gray-700 py-2">
                  {" "}
                  <span className="text-gray-500 dark:text-gray-300">
                    Shipping Cost
                  </span>{" "}
                  <span className="ml-auto text-gray-900 dark:text-gray-100">
                    {shippingFee} SEK
                  </span>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900 dark:text-gray-100">
                    {" "}
                    {total} SEK
                  </span>
                </div>
              </div>

              <div className="lg:w-1/3 md:w-1/2 p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10">
                <h2 className="text-lg mb-1 font-medium title-font dark:text-gray-200">
                  {" "}
                  
                  Shipping details
                </h2>
                <p className="dark:text-gray-400">
                  Please provide your complete shipping details.
                </p>{" "}

                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-400 dark:text-gray-500"
                  >
                    Name of recipient
                  </label>
                  <input
                    type="text"
                    id="recipientName"
                    name="recipientName"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full bg-white dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 dark:text-gray-200 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-400 dark:text-gray-500"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-white dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 dark:text-gray-200 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-400 dark:text-gray-500"
                  >
                    Postal code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-white dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 dark:text-gray-200 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-400 dark:text-gray-500"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 dark:text-gray-200 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-400 dark:text-gray-500"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-white dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 dark:text-gray-200 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <button
                  onClick={saveShippingDetails}
                  className="mb-10 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                  Save shipping details
                </button>
                {clientId && (
                  <PayPalScriptProvider
                    options={{
                      clientId,
                      currency: "SEK",
                    }}
                  >
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        // Initializes the PayPal SDK with the provided clientId
                        return actions.order.create({
                          // Initiates the order creation process with PayPal
                          purchase_units: [
                            // Specify the purchase details
                            {
                              amount: {
                                currency_code: "SEK",
                                value: total,
                                "disable-set-cookie": "true", // Disable cookies to prevent browser blocking on Firefox
                                "data-sdk-integration-source": "button", // Specify that the integration is a button for proper SDK behavior
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        // Function is triggered after user approves the transaction.
                        return actions.order.capture().then((details) => {
                          // details contains the details of the payment, i.e., paymentResult
                          successPaymentHandler(details);
                        });
                      }}
                    />
                  </PayPalScriptProvider>
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default OrderDetails;

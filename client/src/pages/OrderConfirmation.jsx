import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Layout from "../layout/Layouts";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orderDetailsAction } from "../redux/actions/Order";

const OrderConfirmation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderDetailsAction(id));
  }, [dispatch, id]);

  const orderDetailsReducer = useSelector((state) => state.orderDetailsReducer);
  const { order, loading } = orderDetailsReducer;
  // Confetti state
  const [isConfettiActive, setIsConfettiActive] = useState(true);

  // Confetti timer to stop after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConfettiActive(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="flex items-center justify-center min-h-48 dark:bg-gray-900">
          <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-300">
            Loading...
          </h1>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-white">
          {isConfettiActive && <Confetti />}
          <div className="p-8 bg-gray-100 rounded-lg shadow-lg text-center">
            <h1 className="text-4xl font-bold text-green-600 mb-4">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              Thank you for your order.
            </p>
            <div className="bg-white p-4 rounded shadow-sm mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Order Summary
              </h2>
              {order && (
                <div className="text-left">
                  <p>
                    <strong>Order ID:</strong> {order._id}
                  </p>
                  <p>
                    <strong>Name:</strong> {order.shippingDetails.recipientName}{" "}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.user.email}
                  </p>
                </div>
              )}
            </div>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
              onClick={() => {
                window.location.href = "/"; // Redirect to homepage
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default OrderConfirmation;

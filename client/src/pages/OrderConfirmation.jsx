import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Layout from "../layout/Layouts";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orderDetailsAction } from "../redux/actions/Order";
import Loading from "../components/Loading";

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
    <div className="bg-white dark:bg-gray-700">
      <Layout>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-800">
            {isConfettiActive && <Confetti />}
            <div className="p-8 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg text-center">
              <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4">
                Payment Successful!
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Thank you for your order.
              </p>
              <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-sm mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Order Summary
                </h2>
                {order && (
                  <div className="text-left">
                    <p className="dark:text-gray-300">
                      <strong>Order ID:</strong> {order._id}
                    </p>
                    <p className="dark:text-gray-300">
                      <strong>Name:</strong> {order.shippingDetails.recipientName}{" "}
                    </p>
                    <p className="dark:text-gray-300">
                      <strong>Email:</strong> {order.user.email}
                    </p>
                  </div>
                )}
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200 dark:bg-blue-500 dark:hover:bg-blue-400"
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
    </div>
  );
};

export default OrderConfirmation;

import { useDispatch } from "react-redux";
import { addToCartAction, removeFromCartAction } from "../redux/actions/Cart";

const CartItems = ({ items }) => {
  const dispatch = useDispatch();
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCartAction(id));
  };

  const addToCartHandler = (id, qty) => {
    dispatch(addToCartAction(id, qty));
  };

  return (
    <div className="mt-8">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {items.map((item) => (
            <li key={`cart-item-${item.product}`} className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  alt={item.name}
                  src={item.image}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href={item.href}>{item.name}</a>
                    </h3>
                    <p className="ml-4">{item.price} SEK</p>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">
                    Qty
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item.product, Number(e.target.value))
                      }
                      className="rounded ml-2 border border-gray-700 focus:ring-2 focus:ring-green-900 bg-transparent appearance-none py-2 focus:outline-none focus:border-green-500 pl-3 pr-10"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1}>{x + 1}</option>
                      ))}
                    </select>
                  </p>

                  <div className="flex">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CartItems;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productListAction } from "../redux/actions/Product";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Products = () => {
  const dispatch = useDispatch();
  const productListReducer = useSelector((state) => state.productListReducer);
  const { loading, error, products = [] } = productListReducer;

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="flex items-center justify-center min-h-48 h-auto">
          <h1 className="text-3xl font-bold text-red-500 dark:text-red-300">{error}</h1>
        </div>
      ) : (
        <>
          <section className="text-gray-600 dark:text-gray-400 body-font dark:bg-gray-800">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-4">
                {products.map((product) => (
                  <div className="p-4 lg:w-1/4 md:w-1/2" key={product._id}>
                    <div className="bg-white rounded-lg dark:bg-gray-700">
                      <div className="max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <div className="mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                          <div className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 dark:bg-gray-600">
                              {" "}
                              <img
                                src={product.image}
                                alt="Front of men&#039;s Basic Tee in black."
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                              />
                            </div>
                            <div className="mt-4 flex justify-between">
                              <div>
                                <h3 className="text-sm text-gray-700 dark:text-gray-200">
                                  <Link to={`/products/${product._id}`}>
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0"
                                    ></span>
                                    {product.name}
                                  </Link>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                  Reviews: {product.numReviews}
                                </p>
                              </div>
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {product.price} SEK
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Products;

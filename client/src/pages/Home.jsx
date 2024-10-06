import Layout from "../layout/Layouts";
import Products from "../components/Products";

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-700">
    <Layout>
        <Products></Products>
    </Layout>
    </div>
  );
};

export default Home;

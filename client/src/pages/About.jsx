import Layout from "../layout/Layouts";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      <section className="text-gray-600 body-font dark:text-gray-400 dark:bg-gray-800">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-gray-900 dark:text-white">
              About Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Welcome to Online Fashion, your ultimate destination for modern,
              trendy, and quality clothing. As a project for my portfolio, this
              webshop has been built with a vision to deliver the best online
              shopping experience for clothing enthusiasts worldwide. Our
              mission is to simplify the way you shop, ensuring fast deliveries
              and affordable returns.
            </p>
          </div>
          <div className="lg:w-3/4 w-full mx-auto mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Our Story
            </h2>
            <p className="leading-relaxed mb-6">
              Online Fashion was founded with the belief that shopping for
              clothing should be simple, fast, and enjoyable. We are an
              international clothing brand that focuses on combining quality
              with simplicity, giving you access to the latest fashion trends
              without complications. From the beginning, our goal has been to
              streamline the entire shopping experience—whether that means
              providing clear and easy navigation, offering flexible return
              policies, or ensuring you receive your purchase without
              unnecessary delays.
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Our Vision & Mission
            </h2>
            <p className="leading-relaxed mb-6">
              Our mission is simple: to bring the world of fashion to your
              doorstep with convenience and affordability. We aim to:
            </p>
            <ul className="list-disc pl-5 leading-relaxed">
              <li className="mb-2">
                Offer a seamless and straightforward shopping experience
              </li>
              <li className="mb-2">
                Provide fast international shipping to ensure your clothes are
                delivered promptly
              </li>
              <li className="mb-2">
                Make returns easy and affordable, allowing you to shop
                confidently
              </li>
            </ul>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Why Choose Us?
            </h2>
            <p className="leading-relaxed mb-6">
              At Online Fashion, we believe that fashion should be accessible to
              everyone, and shopping online should be hassle-free. We stand out
              from others because we are focused on:
            </p>
            <ul className="list-disc pl-5 leading-relaxed">
              <li className="mb-2">
                Simplicity: Our user-friendly platform ensures you find what
                you&apos;re looking for easily.
              </li>
              <li className="mb-2">
                Fast Delivery: No one likes waiting. We ship quickly, ensuring
                that your new clothes arrive when you need them.
              </li>
              <li className="mb-2">
                Affordable Returns: We understand that not every piece works
                out. That&apos;s why we offer affordable return options to
                ensure you have a risk-free shopping experience.
              </li>
            </ul>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Get In Touch
            </h2>
            <p className="leading-relaxed mb-6">
              If you have any questions, concerns, or feedback, we would love to
              hear from you. Your experience means everything to us, and we
              continuously strive to improve.
            </p>
            <Link
              to="/contact"
              className="text-blue-500 dark:text-blue-400 hover:underline"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Contact Us Here
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;

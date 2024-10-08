import { Link } from "react-router-dom";
import Layout from "../layout/Layouts";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <section className="text-gray-600 body-font dark:text-gray-400 dark:bg-gray-800">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-gray-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              At Online Fashion, we value your privacy and are committed to
              protecting your personal information. This privacy policy explains
              how we collect, use, and protect the information you share with
              us.
            </p>
          </div>
          <div className="lg:w-3/4 w-full mx-auto mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Information We Collect
            </h2>
            <p className="leading-relaxed mb-6">
              We collect various types of information to provide and improve
              your experience on our website. The information we may collect
              includes:
            </p>
            <ul className="list-disc pl-5 leading-relaxed">
              <li className="mb-2">
                Personal Information: This includes your name, email address,
                postal address, phone number, and payment information when you
                register or make a purchase on our site.
              </li>
              <li className="mb-2">
                Usage Data: We may collect information on how you access and use
                our website, including your IP address, browser type, and
                browsing history.
              </li>
              <li className="mb-2">
                Cookies: We use cookies to enhance your shopping experience,
                analyze site usage, and deliver personalized content and ads.
              </li>
            </ul>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              How We Use Your Information
            </h2>
            <p className="leading-relaxed mb-6">
              The information we collect is used for various purposes, including
              but not limited to:
            </p>
            <ul className="list-disc pl-5 leading-relaxed">
              <li className="mb-2">
                Processing transactions and delivering products to you.
              </li>
              <li className="mb-2">
                Improving our website and services to provide a better shopping
                experience.
              </li>
              <li className="mb-2">
                Sending promotional emails and newsletters, which you can opt
                out of at any time.
              </li>
              <li className="mb-2">
                Analyzing site usage to understand your preferences and
                personalize your experience.
              </li>
            </ul>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Sharing Your Information
            </h2>
            <p className="leading-relaxed mb-6">
              We do not sell or rent your personal information to third parties.
              We may share your information with trusted partners and service
              providers who assist us in operating our website and fulfilling
              orders, as long as those parties agree to keep this information
              confidential.
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Security of Your Information
            </h2>
            <p className="leading-relaxed mb-6">
              We take reasonable measures to protect your personal information
              from unauthorized access, use, or disclosure. However, please note
              that no method of transmission over the internet is 100% secure,
              and we cannot guarantee absolute security.
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Your Rights
            </h2>
            <p className="leading-relaxed mb-6">
              You have the right to access, update, and delete your personal
              information at any time. If you wish to exercise these rights,
              please contact us at the email provided below.
            </p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Contact Us
            </h2>
            <p className="leading-relaxed mb-6">
              If you have any questions or concerns about our privacy practices,
              please do not hesitate to contact us.
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

export default PrivacyPolicy;

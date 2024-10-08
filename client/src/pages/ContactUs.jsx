import Layout from "../layout/Layouts";

const ContactUs = () => {
  return (
    <Layout>
      <section className="text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 dark:text-white">
              Contact Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              We&apos;d love to hear from you. Whether you have questions or feedback, feel free to get in touch.
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600 dark:text-gray-300"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-gray-200 dark:bg-gray-700 bg-opacity-50 rounded border border-gray-400 dark:border-gray-600 focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-900 text-base outline-none text-gray-700 dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-gray-200 dark:bg-gray-700 bg-opacity-50 rounded border border-gray-400 dark:border-gray-600 focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-900 text-base outline-none text-gray-700 dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600 dark:text-gray-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full bg-gray-200 dark:bg-gray-700 bg-opacity-50 rounded border border-gray-400 dark:border-gray-600 focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-900 h-32 text-base outline-none text-gray-700 dark:text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-blue-600 border-0 rounded-full py-2 px-8 focus:outline-none hover:bg-blue-700 rounded text-lg">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactUs;
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Header } from "./Landing";
import { useNavigate } from "react-router-dom";

function Pricing() {
  const navigate = useNavigate();
  function liClassNames() {
    return "flex items-center space-x-3";
  }
  return (
    <>
      <Header
        isAuthenticated={true}
        searchQuery={""}
        setSearchQuery={function (): void {
          throw new Error("Function not implemented.");
        }}
        handleSearch={function (): void {
          throw new Error("Function not implemented.");
        }}
        handleNavigation={function (path: string): void {
          navigate(path);
        }}
        handleLogout={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <section className="bg-white" id="pricing">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl font-bold text-primaryText">
              Choose Your Plan and Get Started Today
            </h2>
            <p className="mb-5 text-secondaryText sm:text-xl">
              Enjoy a 14-day unlimited free trial with no contract or credit
              card required.
            </p>
          </div>
          <div className="space-y-8 lg:grid lg:grid-cols-3 lg:gap-10 lg:space-y-0">
            {/* Pricing Card: Free */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ ease: "easeOut", duration: 1.4 }}
              viewport={{ once: true }}
              className="flex flex-col p-6 mx-auto max-w-lg text-center text-primaryText bg-white rounded-xl border border-gray-100 shadow xl:p-8"
            >
              <h3 className="mb-4 text-2xl font-bold">Free</h3>
              <p className="font-light text-gray-500 sm:text-base">
                Ideal for casual readers or those just getting started.
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">$0</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className={liClassNames()}>
                  <CheckCircle className="text-green-500" />
                  <span>Read limited free stories</span>
                </li>
                <li className={liClassNames()}>
                  <CheckCircle className="text-green-500" />
                  <span>No hidden fees</span>
                </li>
              </ul>
              <a
                href="#pricing"
                className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Get Started
              </a>
            </motion.div>

            {/* Pricing Card: Medium Member */}
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 50 }}
              viewport={{ once: true }}
              className="flex flex-col relative p-6 mx-auto max-w-lg text-center overflow-hidden text-white bg-primaryText rounded-xl border border-gray-100 shadow xl:p-8"
            >
              <h3 className="absolute top-0 left-0 w-full py-4 bg-primary-600 text-white font-bold text-sm uppercase">
                Most Popular
              </h3>
              <h3 className="mb-4 mt-10 text-2xl font-bold">Medium Member</h3>
              <p className="font-light text-gray-400 sm:text-base">
                Perfect for readers who want access to exclusive content and
                features.
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">$5</span>
                <span className="text-gray-400">/month or $60/year</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className={liClassNames()}>
                  <CheckCircle className="text-green-500" />
                  <span>Read member-only stories</span>
                </li>
                <li className={liClassNames()}>
                  <CheckCircle className="text-green-500" />
                  <span>Support the writers you read most</span>
                </li>
                <li className={liClassNames()}>
                  <CheckCircle className="text-green-500" />
                  <span>Earn money for your writing</span>
                </li>
                <li className={liClassNames()}>
                  <CheckCircle className="text-green-500" />
                  <span>Listen to audio narrations</span>
                </li>
                <li className={liClassNames()}>
                  <CheckCircle className="text-green-500" />
                  <span>Read offline with the Medium app</span>
                </li>
                <li className={liClassNames()}>
                  <CheckCircle className="text-green-500" />
                  <span>Access our Mastodon community</span>
                </li>
              </ul>
              <a
                href="#pricing"
                className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4"
              >
                Get Started
              </a>
            </motion.div>

            {/* Pricing Card: Friend of Medium */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ ease: "easeOut", duration: 1.4 }}
              viewport={{ once: true }}
              className="flex flex-col p-6 mx-auto max-w-lg text-center text-primaryText bg-white rounded-xl border border-gray-100 shadow xl:p-8"
            >
              <h3 className="mb-4 text-2xl font-bold">Friend of Medium</h3>
              <p className="font-light text-gray-500 sm:text-base">
                Best for readers who want to give back even more to the writers
                they love.
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">$15</span>
                <span className="text-gray-500">/month or $150/year</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className={liClassNames()}>
                  <CheckCircle className="text-green-500" />
                  <span>All Medium member benefits</span>
                </li>
                <li className={liClassNames()}>
                  <CheckCircle className="text-green-500" />
                  <span>Give 4x more to the writers you read</span>
                </li>
                <li className={liClassNames()}>
                  <CheckCircle className="text-green-500" />
                  <span>
                  Share member-only stories
                  </span>
                </li>
                <li className={liClassNames()}>
                  <CheckCircle className="text-green-500" />
                  <span>Customize app icon</span>
                </li>
                <li className={liClassNames()}>
                  <CheckCircle className="text-green-500" />
                  <span>Connect your custom domain</span>
                </li>
                <li className={liClassNames()}>
                  <CheckCircle className="text-green-500" />
                  <span>Create your own publications</span>
                </li>
              </ul>
              <a
                href="#pricing"
                className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Get Started
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Pricing;

import { useNavigate } from "react-router-dom";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faMediumM,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";

export default function MediumLanding() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);
  const handleNavigation = () => {
    if (isAuthenticated) {
      navigate("/write");
    } else {
      navigate("/signin");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-300 ">
      <div className="font-serif bg-stone-300 shadow-2xl py-3 sticky top-0 z-50">
        <div className="max-w-7xl  mx-10 flex justify-between ">
          <div className="flex flex-between">
            <FontAwesomeIcon
              icon={faMedium}
              style={{ color: "#1f2937" }}
              className="mr-2 fa-2xl"
            />
            <h1 className="text-3xl font-sans font-semibold text-gray-900 tracking-wide">
              Medium
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  className="bg-gray-900 text-white font-sans shadow-xl py-2 px-4 rounded-3xl focus:outline-none"
                  onClick={handleNavigation}
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ color: "#f0f0f0" }}
                    className="mr-2 fa-xl"
                  />
                  <span>Write</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-3xl"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/signin")}
                className="bg-gray-900 text-white font-sans shadow-xl py-2 px-4 rounded-3xl focus:outline-none"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Centered Header Section */}
      <div className="py-16 bg-transparent text-center">
        <h1 className="text-7xl font-sans  font-bold text-green-900 ">
          Discover Human Stories & Ideas!
        </h1>
        <p className="text-2xl text-stone-900 rounded-4xl border  bg-stone-400 shadow-sm font-serif mt-4">
          A platform to read : write and broaden your perspective - Hindustan
          Times
        </p>
        <button
          onClick={handleNavigation}
          className="mt-8 bg-stone-400 hover:bg-green-900  text-stone-900 hover:text-white font-sans font-xl text-xl px-5 py-2 rounded-full transition duration-300 ease-in-out shadow-xl"
        >
          Start Reading
        </button>
      </div>

      <section className="py-16 px-7">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Left Section: Why Choose Us Title */}
          <div className="md:w-1/3 mb-12 md:mb-0 text-left">
            <h2 className="text-4xl text-slate-900 font-bold leading-snug mb-6">
              Why Choose Us?
            </h2>
            <p className="text-lg font-sans text-gray-600">
              Our platform is designed to offer you a seamless reading and
              writing experience. Here’s what makes us stand out:
            </p>
          </div>

          {/* Right Section: Feature Cards */}
          <div className="md:w-2/3 flex flex-col gap-6">
            <FeatureCard
              title="Personalized Feeds"
              description="Get content tailored to your interests, curated by our intelligent algorithms."
              icon="📜"
            />
            <FeatureCard
              title="Write Your Own Blog"
              description="Share your ideas with the world using our powerful blogging tools."
              icon="✍️"
            />
            <FeatureCard
              title="Join the Conversation"
              description="Engage with writers and thinkers through meaningful conversations."
              icon="🚀"
            />
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-bold leading-tight mb-2">
              Welcome to Your Storytelling Hub
            </h1>
            <p className="text-lg mb-4">
              Join a community of thinkers and creators sharing unique ideas.
            </p>
            <button
              onClick={() => navigate(isAuthenticated ? "/blog" : "/signup")}
              className="bg-white text-blue-600 hover:bg-blue-800 hover:text-white text-lg font-medium px-6 py-3 rounded-full shadow-md"
            >
              {isAuthenticated ? "Explore Blogs" : "Get Started for Free"}
            </button>
          </div>
          <div className="mt-12 md:mt-0">
            <FontAwesomeIcon icon={faMediumM} className="fa-10x" />
          </div>
        </div>
      </section>
      <footer className="text-gray-500 py-2 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="space-x-6 text-2xl ">
            <a
              href="https://github.com/hritikkkkk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://x.com/hritikkk_27"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://www.linkedin.com/in/hritik-kumar-366734304/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
          <div>
            <p className="text-lg">&copy; 2024 Hritik All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) => (
  <div className=" bg-stone-100 border border-gray-200 rounded-xl shadow-lg p-2 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
    <div className="text-4xl mb-4 text-gray-700">{icon}</div>
    <h3 className="text-2xl font-sans font-semibold mb-3 text-gray-900">
      {title}
    </h3>
    <p className="text-lg text-gray-600">{description}</p>
  </div>
);

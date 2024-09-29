import { useNavigate } from "react-router-dom";
import { BlogCard } from "./BlogCard";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "./BlogSkeleton";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";

const objectDate = new Date();

export default function MediumLanding() {
  const navigate = useNavigate();
  const { loading, blogs } = useBlogs();

 
  const featuredBlogs = blogs?.slice(0, 3) || [];
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

      {/* Main Content */}
      <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto px-8 py-12 space-y-8 md:space-y-0 md:space-x-12">
      {isAuthenticated ? (
        // Authenticated Section
        <>
          <div className="flex-1 flex flex-col justify-center items-center">
            <h1 className="text-4xl text-red-900 shadow-xl rounded-xl font-serif font-bold mb-6">
              Trending Blogs
            </h1>
            <p className="text-2xl text-gray-500 font-sans font-medium">
              Explore new ideas and insights from passionate writers...
            </p>
          </div>

          {/* Right Section: Featured Blogs */}
          <div className="flex-1">
            <div className="bg-stone-300 text-stone-900 font-bold border rounded-2xl p-6 shadow-2xl hover:transition-all">
              {loading ? (
                <div>
                  <BlogSkeleton />
                  <BlogSkeleton />
                </div>
              ) : (
                featuredBlogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={`${objectDate.toLocaleString("default", {
                      month: "long",
                    })} ${objectDate.getDate()} ${objectDate.getFullYear()}`}
                  />
                ))
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="text-center">
              <h1 className="text-4xl text-slate-900 shadow-xl rounded-xl font-serif font-bold mb-6">
                Welcome to Medium!
              </h1>
              <p className="text-2xl text-gray-500 font-sans font-medium">
                Sign in to explore trending blogs and more...
              </p>
            </div>
          </div>
        </>
      )}
    </div>

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

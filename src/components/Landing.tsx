import { useNavigate } from "react-router-dom";
import { BlogCard } from "./BlogCard";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "./BlogSkeleton";
import { faMedium } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const objectDate = new Date();

export default function MediumLanding() {
  const navigate = useNavigate();
  const { loading, blogs } = useBlogs();

  const handleNavigation = () => {
    navigate("/signin");
  };
  const featuredBlogs = blogs?.slice(0, 3) || [];

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
          <button className=" bg-gray-900 text-white font-sans shadow-xl  py-2 px-4 rounded-3xl focus:outline-none">
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ color: "#f0f0f0" }}
              className="mr-2 fa-xl"
            />
            <span>Write</span>
          </button>
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
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-4xl text-red-900 shadow-xl rounded-xl  font-serif font-bold   mb-6">
              Trending Blogs
            </h1>
            <p className="text-2xl text-gray-500 font-sans  font-medium ">
              Explore new ideas and insights from passionate writers...
            </p>
          </div>
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
                  authorName={blog.name || "Anonymous"}
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
      </div>
    </div>
  );
}

import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedium } from "@fortawesome/free-brands-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

export const Appbar = () => {
  return (
    <div className="border-b flex bg-slate-300 justify-between items-center px-10 py-4 sticky top-0 z-50">
      {/* Medium Icon */}
      <Link to={"/blog"} className="flex items-center cursor-pointer text-xl">
        <FontAwesomeIcon
          icon={faMedium}
          style={{ color: "#1f2937" }}
          className="mr-2 fa-2xl"
        />
        <span className="font-bold text-2xl text-gray-800">MEDIUM</span>
      </Link>

      {/* Write Button */}
      <Link to={`/publish`} className="ml-4">
        <button className="flex items-center bg-gray-800 text-white py-2 px-4 rounded-lg focus:outline-none">
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={{ color: "#f0f0f0" }}
            className="mr-2 fa-xl"
          />
          <span>Write</span>
        </button>
      </Link>

      {/* Avatar */}
      <Avatar size="big" name="Hritik" />
    </div>
  );
};

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedium } from "@fortawesome/free-brands-svg-icons";
import { Button } from "./ui/button";
export const Appbar = () => {
  return (
    <div className="border-b flex  shadow-2xl  justify-between items-center py-2 px-4   sticky top-0 z-50">
      <Link to={"/"} className="flex flex-between  cursor-pointer ">
        <FontAwesomeIcon
          icon={faMedium}
          style={{ color: "#1f2937" }}
          className="mr-2 fa-2xl"
        />
        <h1 className="text-3xl font-sans font-semibold text-gray-900 tracking-wide">
          Medium
        </h1>
      </Link>

      <Link to={`/publish`}>
        <Button
          variant="default"
          className=" font-sans rounded-3xl    py-2 px-4 focus:outline-none"
        >
          Write
        </Button>
      </Link>
    </div>
  );
};

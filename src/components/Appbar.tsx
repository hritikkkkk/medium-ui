import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedium } from "@fortawesome/free-brands-svg-icons";
import { Button } from "./ui/button";
export const Appbar = () => {
  return (
    <div className="border-b flex  shadow-2xl  justify-between items-center py-2 px-4 bg-white/10  sticky top-0 z-50">
      <Link
        to={"/"}
        className="flex items-center text-[#4A0E4E] cursor-pointer "
      >
        <FontAwesomeIcon icon={faMedium} className=" mr-2 fa-2x " />
        <h1 className="text-2xl font-sans font-semibold tracking-wide">
          Medium
        </h1>
      </Link>

      <Link to={`/publish`}>
        <Button className=" font-sans bg-[#4A0E4E] hover:bg-slate-900  py-2 px-4 focus:outline-none">
          Write
        </Button>
      </Link>
    </div>
  );
};

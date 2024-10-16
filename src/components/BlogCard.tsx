import { Link } from "react-router-dom";
import ArticleContent from "./ArticleContent";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-6 bg-white/80 border border-indigo-300 rounded-lg shadow-lg max-w-2xl w-full cursor-pointer hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center mb-4">
          <Avatar name={authorName} size="small" />
          <div className="font-light text-gray-700 pl-4">
            <div className="flex items-center">
              <span>{authorName}</span>
              <div className="flex items-center mx-2">
                <Circle />
              </div>
              <span className="text-sm text-gray-500">{publishedDate}</span>
            </div>
          </div>
        </div>
        <div className="text-2xl font-semibold text-gray-900">{title}</div>
        <div className="text-md text-gray-700 font-light mt-2">
          <ArticleContent content={content.slice(0, 100) + "..."} />
        </div>
        <div className="text-gray-500 text-sm font-light pt-4">
          {`${Math.ceil(content.length / 100)} min read`}
        </div>
      </div>
    </Link>
  );
};

// Circle Component
export function Circle() {
  return <div className="h-2 w-2 rounded-full bg-indigo-400"></div>;
}

// Avatar Component
export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  const avatarColors = ["bg-indigo-500", "bg-purple-600", "bg-blue-500"];
  const bgColor = avatarColors[name.charCodeAt(0) % avatarColors.length]; // Randomize color

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full ${
        size === "small" ? "w-8 h-8" : "w-12 h-12"
      } ${bgColor}`}
    >
      <span
        className={`${
          size === "small" ? "text-sm" : "text-xl"
        } font-semibold text-white`}
      >
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}

import { Blog } from "../hooks";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <div className="max-w-full bg-stone-300 ">
        <div className="px-10 py-10 ">
          <div className="text-5xl font-bold font-serif">{blog.title}</div>
          <div className="mt-3">{blog.author.name}</div>
          <div className="text-gray-600 font-sans pt-2">
            {blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "N/A"}
          </div>
          <div className="pt-4  font-sans">{blog.content}</div>
        </div>
      </div>
    </div>
  );
};

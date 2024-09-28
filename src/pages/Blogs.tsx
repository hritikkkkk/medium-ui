import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { FullBlog } from "../components/FullBlog";
import { useBlogs } from "../hooks";

const objectDate = new Date();

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  const [selectedBlog, setSelectedBlog] = useState(null);

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-start m-2">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-start m-2 shadow-2xl w-full max-w-screen-md rounded-md bg-stone-200">
        <div className=" pr-4  border-gray-300">
          {blogs.map((blog) => (
            <div key={blog.id} onClick={() => setSelectedBlog(blog)}>
              <BlogCard
                id={blog.id}
                authorName={blog.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={`${objectDate.toLocaleString("default", {
                  month: "long",
                })} ${objectDate.getDate()} ${objectDate.getFullYear()}`}
              />
            </div>
          ))}
        </div>
        <div>
          {selectedBlog ? (
            <FullBlog blog={selectedBlog} />
          ) : (
            <div className="text-gray-500 text-center">
              Select a blog to view the full content
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

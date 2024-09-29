import { useState, useCallback, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { FullBlog } from "../components/FullBlog";
import { useBlogs } from "../hooks";


const objectDate = new Date();

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [leftWidth, setLeftWidth] = useState(50);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newLeftWidth = (e.clientX / window.innerWidth) * 100;
    setLeftWidth(Math.max(20, Math.min(newLeftWidth, 80)));
  }, []);

  const handleMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

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
    <div className="flex flex-col h-screen shadow-2xl ">
      <Appbar />
      <div className="flex flex-grow bg-stone-300 overflow-hidden mt-1">
        <div
          className="overflow-y-auto scrollbar-hide  "
          style={{ width: `${leftWidth}%` }}
        >
          <div className="pr-4 bg-stone-300 ">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => setSelectedBlog(blog)}
                className="cursor-pointer max-w-screen-lg rounded-full "
              >
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
        </div>
        <div
          className="w-1 cursor-col-resize transition-colors bg-gray-400 hover:bg-gray-500"
          onMouseDown={handleMouseDown}
        />
        <div
          className="overflow-y-auto flex-grow scrollbar-hide"
          style={{ width: `${100 - leftWidth}%` }}
        >
          {selectedBlog ? (
            <FullBlog blog={selectedBlog} />
          ) : (
            <div className="text-gray-500 text-center p-4">
              Select a blog to view the full content
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

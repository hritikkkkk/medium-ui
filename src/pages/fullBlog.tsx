import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BACKEND_URL } from "@/config";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { Sidebar } from "@/components/Sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ArticleContent from "@/components/ArticleContent";
interface DecodedToken {
  id: string;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  createdAt: string;
}

interface Comment {
  id: string;
  content: string;
  user: {
    name: string;
  };
  createdAt: string;
}

export const FullBlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isCommentSidebarOpen, setIsCommentSidebarOpen] = useState(false); // New state
  const [comments, setComments] = useState<Comment[]>([]); // New state
  const [newComment, setNewComment] = useState(""); // New state for new comment

  const token = localStorage.getItem("token");

  let userId: string | null = null;
  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      userId = decoded.id;
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<BlogPost>(
          `${BACKEND_URL}/api/v1/blog/${id}`,
          { headers: { Authorization: localStorage.getItem("token") || "" } }
        );
        setBlog(response.data);

        const likesResponse = await axios.get(
          `${BACKEND_URL}/api/v1/${id}/likes`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        setLikes(likesResponse.data.likes.length);
        setHasLiked(
          likesResponse.data.likes.some(
            (like: { userId: string }) => like.userId === userId
          )
        );
      } catch (err) {
        setError("Failed to load the blog post or likes.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id, userId]);

  const toggleLike = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/${id}/toggle-like`,
        {},
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      if (response.data.message === "Post liked") {
        setLikes((prev) => prev + 1);
        setHasLiked(true);
      } else if (response.data.message === "Post unliked") {
        setLikes((prev) => prev - 1);
        setHasLiked(false);
      }
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/${id}/comments`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setComments(response.data.comments);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/${id}/comment`,
        { content: newComment },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/4 mb-8" />
        <Skeleton className="h-64 w-full mb-8" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="max-w-3xl mx-auto mt-10 px-4 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-600">{error || "Blog post not found."}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto mt-10 px-4 bg-gradient-to-br from-gray-50 via-slate-100 to-gray-200 shadow-lg rounded-md"
    >
      <Button
        variant="ghost"
        className="mb-6 hover:bg-gray-200"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4 text-indigo-500" />
        Back
      </Button>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold text-gray-800 mb-4"
      >
        {blog.title}
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center mb-6"
      >
        <Avatar className="h-12 w-12 mr-3 bg-indigo-900 ">
          <AvatarImage src={blog.author.name} />
          <AvatarFallback className="bg-indigo-500 text-white text-2xl">
            {blog.author?.name?.charAt(0).toUpperCase() || "A"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-indigo-600">
            {blog.author.name || "Anonymous"}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {`${Math.ceil(blog.content.length / 100)} min read`}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-between border-t border-b py-3 border-gray-200"
      >
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center text-base ${
              hasLiked
                ? "text-red-500 hover:text-indigo-500"
                : "text-indigo-500 hover:text-red-500"
            }`}
            onClick={toggleLike}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6 mr-2"
                  >
                    <path
                      d={
                        hasLiked
                          ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          : "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z"
                      }
                    />
                  </svg>
                </TooltipTrigger>
                <TooltipContent>
                  <p> {hasLiked ? "Unlike" : "Like"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {likes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-indigo-500 flex items-center"
            onClick={() => {
              setIsCommentSidebarOpen(true);
              fetchComments();
            }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <MessageCircle />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Comment</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="prose prose-lg max-w-none text-gray-800 mb-8"
      >
        {blog.content.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            <ArticleContent content={paragraph} />
          </p>
        ))}
      </motion.div>

      {isCommentSidebarOpen && (
        <Sidebar
          isOpen={isCommentSidebarOpen}
          onClose={() => setIsCommentSidebarOpen(false)}
        >
          <div className="p-4">
            <h3 className="text-2xl  text-gray-900 font-semibold mb-4">
              Responses
            </h3>
            <div className="mb-4">
              {comments.length ? (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="mb-4 border-b pb-2 bg-zinc-50"
                  >
                    <p className="font-semibold text-indigo-800">
                      {comment.user.name}
                    </p>
                    <p className="text-sm text-gray-400 mb-2">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                    <p className="text-lg font-sans text-gray-700">
                      {comment.content}
                    </p>
                  </div>
                ))
              ) : (
                <p>
                  There are currently no responses for this story. Be the first
                  to respond.
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <textarea
                className="border rounded text-xl text-gray-700 border-gray-300 font-sans font-medium p-2 mb-2"
                placeholder="what're your thoughts..."
                rows={4}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button
                className="self-end"
                onClick={handleCommentSubmit}
                disabled={!newComment.trim()}
              >
                Respond
              </Button>
            </div>
          </div>
        </Sidebar>
      )}
    </motion.div>
  );
};

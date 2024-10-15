import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BACKEND_URL } from "@/config";
import {  ArrowLeft } from "lucide-react";
import { jwtDecode } from "jwt-decode";
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

export const FullBlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

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
        transition={{ delay: 0.4 }}
        className="prose prose-lg max-w-none text-gray-800 mb-8"
      >
        {blog.content.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-between border-t border-b py-4 border-gray-300"
      >
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center text-base ${
              hasLiked ? "text-red-500" : "text-indigo-500"
            }`}
            onClick={toggleLike}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={hasLiked ? "currentColor" : "none"}
              stroke="currentColor"
              className="mr-2 h-10 w-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 22a5 5 0 005-5H7a5 5 0 005 5zM16.5 7.5l-4.5-4.5-4.5 4.5M12 11.5v3"
              />
            </svg>
            {likes} claps
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

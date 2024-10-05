import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bold,
  Italic,
  List,
  Image as ImageIcon,
  Link,
  Trash2,
  Edit3,
  MoreHorizontal,
  ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Article {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  createdAt?: string;
}

export const PublishPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [publishedArticles, setPublishedArticles] = useState<Article[]>([]);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  useEffect(() => {
    fetchPublishedArticles();
  }, []);

  const fetchPublishedArticles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<Article[]>(
        `${BACKEND_URL}/api/v1/blog/user/posts`,
        {
          headers: { Authorization: localStorage.getItem("token") || "" },
        }
      );
      setPublishedArticles(response.data);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      setError("Failed to fetch articles. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const response = await axios.post<Article>(
        `${BACKEND_URL}/api/v1/blog`,
        { title, content },
        { headers: { Authorization: localStorage.getItem("token") || "" } }
      );
      setPublishedArticles((prevArticles) => [...prevArticles, response.data]);
      setTitle("");
      setContent("");
      toast.success("Article published successfully!");
    } catch (error) {
      console.error("Failed to publish article:", error);
      toast.error("Failed to publish article. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: { Authorization: localStorage.getItem("token") || "" },
      });
      setPublishedArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== id)
      );
      toast.success("Article deleted successfully!");
    } catch (error) {
      console.error("Failed to delete article:", error);
      toast.error("Failed to delete article. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <header className="border-b  shadow-sm  ">
        <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between ">
          <h1 className="text-3xl font-bold text-indigo-900">Medium</h1>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowSidebar(!showSidebar)}
              variant="outline"
              className="px-4 py-2 text-indigo-600 border-indigo-600 hover:bg-indigo-50 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
            >
              {showSidebar ? "" : "Published Articles"}
            </Button>
            <Button
              onClick={handlePublish}
              disabled={isPublishing}
              variant="default"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
            >
              {isPublishing ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 flex">
        <div className="flex-grow mr-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 bg-white rounded-lg shadow-md p-6"
          >
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-4xl font-semibold border-none placeholder:text-gray-400 focus:ring-0 focus:outline-none w-full mb-4"
            />
            <div className="my-4 flex space-x-2">
              {[Bold, Italic, List, ImageIcon, Link].map((Icon, index) => (
                <button
                  key={index}
                  className="p-2 text-gray-500 hover:text-indigo-600 focus:outline-none transition-colors duration-200"
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
            <Textarea
              placeholder="Tell your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="w-full text-xl font-medium font-sans border-none placeholder:text-gray-400 focus:ring-0 focus:outline-none  text-gray-800 focus:ring-indigo-500"
            />
          </motion.div>
        </div>

        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-80 bg-white shadow-lg fixed right-0 top-0 bottom-0 p-6 overflow-y-auto"
            >
              <div className="flex items-center w-full mb-8 justify-between sticky top-0 z-50 bg-white/100 ">
                <button
                  onClick={() => setShowSidebar(false)}
                  className="text-indigo-600 hover:bg-indigo-50   rounded-full"
                >
                  <ChevronLeft size={28} />
                </button>
                <h2 className="text-2xl font-semibold  text-indigo-900">
                  Published Articles
                </h2>
              </div>
              {isLoading ? (
                <p>Loading stories...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : publishedArticles.length === 0 ? (
                <p>No stories published yet.</p>
              ) : (
                <AnimatePresence>
                  {publishedArticles.map((article) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="mb-6 border-b pb-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div>
                            <p className="text-xs text-gray-500">
                              {article.createdAt
                                ? new Date(
                                    article.createdAt
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() =>
                                console.log(`Edit article ${article.id}`)
                              }
                            >
                              <Edit3 className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your article.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(article.id)}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <h3 className="text-lg font-semibold mb-1">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {article.content}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
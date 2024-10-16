import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2, Edit3, MoreHorizontal } from "lucide-react";
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ArticleContent from "@/components/ArticleContent";

interface Article {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  createdAt?: string;
}

interface ArticleResponse {
  post: Article;
}

export const PublishPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [publishedArticles, setPublishedArticles] = useState<Article[]>([]);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    fetchPublishedArticles();
  }, []);

  const navigate = useNavigate();
  const navigateToBlogPage = (id: string) => {
    console.log(`Navigating to blog page with id: ${id}`);
    navigate(`/blog/${id}`);
  };

  const sortArticlesDescending = (articles: Article[]) => {
    return articles.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  };

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
      const response = await axios.post<ArticleResponse>(
        `${BACKEND_URL}/api/v1/blog`,
        { title, content },
        { headers: { Authorization: localStorage.getItem("token") || "" } }
      );
      const newArticle = response.data.post;
      setPublishedArticles((prevArticles) => {
        const updatedArticles = [...prevArticles, newArticle];
        return sortArticlesDescending(updatedArticles);
      });
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

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setTitle(article.title);
    setContent(article.content);
    setIsEditing(true);
    setShowSidebar(false);
  };

  const handleUpdate = async () => {
    if (!editingArticle) return;

    try {
      const response = await axios.put<ArticleResponse>(
        `${BACKEND_URL}/api/v1/blog/${editingArticle.id}`,
        { title, content },
        { headers: { Authorization: localStorage.getItem("token") || "" } }
      );
      const updatedArticle = response.data.post;
      setPublishedArticles((prevArticles) =>
        sortArticlesDescending(
          prevArticles.map((article) =>
            article.id === updatedArticle.id ? updatedArticle : article
          )
        )
      );
      setEditingArticle(null);
      setIsEditing(false);
      setTitle("");
      setContent("");
      toast.success("Article updated successfully!");
    } catch (error) {
      console.error("Failed to update article:", error);
      toast.error("Failed to update article. Please try again.");
    }
  };

  const cancelEdit = () => {
    setEditingArticle(null);
    setIsEditing(false);
    setTitle("");
    setContent("");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-serif">
      <header className="border-b shadow-sm bg-white sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-gray-900">
            <a href="/" className="hover:text-gray-700 transition-colors">
              Medium
            </a>
          </h1>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowSidebar(!showSidebar)}
              variant="outline"
              className="px-4 py-2 text-gray-700 border-gray-300 hover:bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
            >
              {showSidebar ? "Hide Articles" : "Published Articles"}
            </Button>
            {isEditing ? (
              <Button
                onClick={handleUpdate}
                variant="default"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Update
              </Button>
            ) : (
              <Button
                onClick={handlePublish}
                disabled={isPublishing}
                variant="default"
                className="px-6 py-2 bg-black hover:bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
              >
                {isPublishing ? "Publishing..." : "Publish"}
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 flex">
        <div className="flex-grow mr-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <textarea
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={1}
              className="text-5xl font-bold border-none placeholder:text-gray-300 focus:ring-0 focus:outline-none w-full mb-4 resize-none overflow-hidden"
              style={{ lineHeight: "1.2em", height: "auto" }}
              onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />

            <ReactQuill
              value={content}
              onChange={setContent}
              className="h-96 mb-4"
              theme="snow"
              placeholder="Tell your story..."
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  [{ font: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline"],
                  [{ color: [] }, { background: [] }],
                  [{ script: "sub" }, { script: "super" }],
                  [{ align: [] }],
                  ["image", "blockquote", "code-block"],
                  ["clean"],
                ],
              }}
            />
            {isEditing && (
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={cancelEdit}
                  variant="outline"
                  className="mr-2 px-4 py-2 text-red-600 border-red-600 hover:bg-red-50 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Cancel
                </Button>
              </div>
            )}
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
              <div className="flex items-center w-full mb-8 justify-between sticky top-0 bg-white py-4 z-10"></div>
              {isLoading ? (
                <p className="text-gray-600">Loading stories...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : publishedArticles.length === 0 ? (
                <p className="text-gray-600">No stories published yet.</p>
              ) : (
                <AnimatePresence>
                  {publishedArticles.map((article) => (
                    <motion.div
                      key={article.id}
                      className="p-4 mb-4 hover:bg-gray-50 transition rounded-xl cursor-pointer"
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
                              onClick={() => handleEdit(article)}
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
                      <div onClick={() => navigateToBlogPage(article.id)}>
                        <h3 className="text-xl font-bold mb-1 text-gray-900 hover:underline">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          <ArticleContent content={article.content} />
                        </p>
                      </div>
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

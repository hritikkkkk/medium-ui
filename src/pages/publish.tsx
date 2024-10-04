import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
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
} from "lucide-react";
import { AvatarImage } from "@radix-ui/react-avatar";

interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export const PublishPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [publishedArticles, setPublishedArticles] = useState<Article[]>([]);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPublishedArticles();
  }, []);

  const fetchPublishedArticles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<{ posts: Article[] }>(
        `${BACKEND_URL}/api/v1/blog`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setPublishedArticles(response.data.posts);
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
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setPublishedArticles((prevArticles) => [...prevArticles, response.data]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Failed to publish article:", error);
      setError("Failed to publish article. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setPublishedArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete article:", error);
      setError("Failed to delete article. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Tell your story</h1>
          <Button
            onClick={handlePublish}
            disabled={isPublishing}
            variant="default"
            className="px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isPublishing ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-4xl font-bold border-none placeholder:text-gray-400 focus:ring-0 focus:outline-none w-full"
          />
          <div className="my-4 flex space-x-2">
            {[Bold, Italic, List, ImageIcon, Link].map((Icon, index) => (
              <button
                key={index}
                className="p-2 text-gray-500 hover:text-gray-900 focus:outline-none"
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
          />
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Your stories
        </h2>
        {isLoading ? (
          <p>Loading stories...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : publishedArticles.length === 0 ? (
          <p>No stories published yet.</p>
        ) : (
          <div className="space-y-6">
            {publishedArticles.map((article) => (
              <div
                key={article.id}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        src="https://thispersondoesnotexist.com/"
                        alt="Author"
                      />
                      <AvatarFallback>AU</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">You</p>
                      <p className="text-sm text-gray-500">
                        {new Date(article.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 text-gray-500 hover:text-gray-900 focus:outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
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
                      <DropdownMenuItem
                        onClick={() => handleDelete(article.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-600 line-clamp-3">{article.content}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

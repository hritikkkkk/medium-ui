import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bold, Italic } from "lucide-react";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import toast from "react-hot-toast";

interface CommentCardProps {
  id: string;
  onCommentPosted: () => void;
}

export default function CommentCard({ id, onCommentPosted }: CommentCardProps) {
  const [comment, setComment] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBold = () => setIsBold(!isBold);
  const handleItalic = () => setIsItalic(!isItalic);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    setIsSubmitting(true);
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/${id}/comment`,
        { content: comment },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setComment("");
      setIsBold(false);
      setIsItalic(false);
      onCommentPosted();
      toast.success("Your comment has been successfully posted.");
    } catch (err) {
      console.error("Failed to post comment:", err);
      toast.error("Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-lg">
      <CardContent className="pt-0">
        <div className="relative mt-2">
          <textarea
            className={`w-full min-h-[120px] p-4 text-lg rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 ease-in-out text-gray-800 dark:text-gray-100 ${
              isBold ? "font-bold" : ""
            } ${isItalic ? "italic" : ""}`}
            placeholder="What are your thoughts?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBold}
              className={`hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors ${
                isBold ? "bg-blue-200 dark:bg-blue-800" : ""
              }`}
            >
              <Bold className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleItalic}
              className={`hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors ${
                isItalic ? "bg-blue-200 dark:bg-blue-800" : ""
              }`}
            >
              <Italic className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardContent className="flex justify-end pt-0">
        <Button
          onClick={handleCommentSubmit}
          disabled={!comment.trim() || isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Posting..." : "Respond"}
        </Button>
      </CardContent>
    </Card>
  );
}

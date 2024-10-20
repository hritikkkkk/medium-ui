import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { BACKEND_URL } from "@/config";

const apiUrl = `${BACKEND_URL}/api/v1/quote`;

interface QuoteData {
  content: string;
  author: string;
}

export default function Quote(): React.ReactElement {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<QuoteData>(apiUrl, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setQuote(response.data.content);
      setAuthor(response.data.author);
    } catch (err) {
      console.error("Error fetching quote:", err);
      setError("Failed to fetch quote. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchQuote();
      }
    }, 100000);
    return () => clearInterval(interval);
  }, [fetchQuote]);

  return (
    <div className="bg-white min-h-screen flex justify-center items-center p-4">
      <div className="max-w-lg text-center">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-white text-xl"
            >
              Loading...
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-200 text-xl"
            >
              {error}
            </motion.div>
          ) : (
            <motion.div
              key={quote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500  mb-4"
                aria-live="polite"
              >
                "{quote}"
              </motion.div>
              <motion.div
                className="text-lg font-bold font-sans text-gray-600"
                aria-live="polite"
              >
                {author}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={fetchQuote}
          className="mt-6 px-4 py-2 bg-white text-indigo-600 rounded-md shadow hover:bg-indigo-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Get new quote"
          disabled={isLoading}
        >
          {isLoading ? "Quote..." : "New Quote"}
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export const TrendingSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState("technology");

  const containerAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px)" : "translateY(50px)",
  });

  const backgroundColors: Record<string, string> = {
    technology: "bg-gradient-to-br from-[#4A0E4E] to-[#00A896]",
    culture: "bg-gradient-to-br from-[#FF6B6B] to-[#4A0E4E]",
    design: "bg-gradient-to-br from-[#00A896] to-[#FF6B6B]",
  };

  return (
    <section
      ref={ref}
      className={`${backgroundColors[activeTab]} transition-colors duration-500 p-10 rounded-xl m-0 md:m-10`}
    >
      <animated.div
        style={containerAnimation}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl font-bold text-center text-white/80 mb-12">
          Trending on Medium
        </h2>
        <Tabs
          defaultValue="technology"
          onValueChange={(value) => setActiveTab(value)}
          className="w-full"
        >
          <TabsList className="w-full justify-center mb-8 space-x-4 bg-transparent">
            <TabsTrigger
              value="technology"
              className={`py-2 px-4 rounded-full font-semibold transition duration-300 ${
                activeTab === "technology"
                  ? "bg-white text-[#4A0E4E]"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Technology
            </TabsTrigger>
            <TabsTrigger
              value="culture"
              className={`py-2 px-4 rounded-full font-semibold transition duration-300 ${
                activeTab === "culture"
                  ? "bg-white text-[#FF6B6B]"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Culture
            </TabsTrigger>
            <TabsTrigger
              value="design"
              className={`py-2 px-4 rounded-full font-semibold transition duration-300 ${
                activeTab === "design"
                  ? "bg-white text-[#00A896]"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Design
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="technology">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-3 gap-8 mt-8"
              >
                <ArticleCard
                  title="The Future of AI in Everyday Life"
                  author="Jane Doe"
                  readTime="5 min read"
                  imageUrl="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                />
                <ArticleCard
                  title="Blockchain Beyond Cryptocurrency"
                  author="John Smith"
                  readTime="7 min read"
                  imageUrl="https://images.unsplash.com/photo-1640161704729-cbe966a08476?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <ArticleCard
                  title="The Rise of No-Code Platforms"
                  author="Emily Johnson"
                  readTime="6 min read"
                  imageUrl="https://images.unsplash.com/photo-1642132652803-01f9738d0446?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </motion.div>
            </TabsContent>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <TabsContent value="culture">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-3 gap-8 mt-8"
              >
                <ArticleCard
                  title="The Evolution of Street Art"
                  author="Michael Brown"
                  readTime="8 min read"
                  imageUrl="https://plus.unsplash.com/premium_photo-1693166014348-a2c45600945e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZXZvbHV0aW9uJTIwb2YlMjBzdHJlZXQlMjBhcnR8ZW58MHx8MHx8fDA%3D"
                />
                <ArticleCard
                  title="Food Trends Shaping Our Culinary Future"
                  author="Sarah Lee"
                  readTime="6 min read"
                  imageUrl="https://plus.unsplash.com/premium_photo-1723600972666-f5b7aefeb73a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wx"
                />
                <ArticleCard
                  title="The Resurgence of Vinyl in the Digital Age"
                  author="David Wilson"
                  readTime="7 min read"
                  imageUrl="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </motion.div>
            </TabsContent>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <TabsContent value="design">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-3 gap-8 mt-8"
              >
                <ArticleCard
                  title="The Art of Minimalist Web Design"
                  author="Alice Thompson"
                  readTime="5 min read"
                  imageUrl="https://images.unsplash.com/photo-1544717305-996b815c338c"
                />
                <ArticleCard
                  title="Color Theory in Modern UI Design"
                  author="Robert Davis"
                  readTime="6 min read"
                  imageUrl="https://images.unsplash.com/photo-1502691876148-a84978e59af8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <ArticleCard
                  title="Typography Trends in 2024"
                  author="Laura Martinez"
                  readTime="8 min read"
                  imageUrl="https://images.unsplash.com/photo-1448471393961-ad67a6405eec?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </animated.div>
    </section>
  );
};

const ArticleCard: React.FC<{
  title: string;
  author: string;
  readTime: string;
  imageUrl: string;
}> = ({ title, author, readTime, imageUrl }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px)" : "translateY(50px)",
  });

  return (
    <animated.div ref={ref} style={cardAnimation}>
      <Card className="h-full bg-white shadow-lg transition-transform duration-300 hover:scale-105 overflow-hidden">
        <CardContent className="p-0">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover"
            onError={(e) =>
              ((e.target as HTMLImageElement).src =
                "https://via.placeholder.com/400")
            }
          />
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 text-[#4A0E4E]">
              {title}
            </h3>
            <p className="text-sm text-gray-600">
              By {author} · {readTime}
            </p>
          </div>
        </CardContent>
      </Card>
    </animated.div>
  );
};

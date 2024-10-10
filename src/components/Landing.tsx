import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMediumM } from "@fortawesome/free-brands-svg-icons";
import {
  Github,
  Linkedin,
  Twitter,
  Search,
  TrendingUp,
  BookOpen,
  PenTool,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import FAQSection from "./faq";
import CommunitySection from "./community";
import Comparison from "./comparsion";
import toast from "react-hot-toast";

export default function PremiumMediumLanding() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    handleNavigation("/signin");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching for: ${searchQuery}`);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Subscribing email: ${email}`);
    setEmail("");
    toast.success("email submit successfully", {
      position: "bottom-center",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      <Header
        isAuthenticated={isAuthenticated}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        handleNavigation={handleNavigation}
        handleLogout={handleLogout}
      />

      <main>
        <HeroSection handleNavigation={handleNavigation} />
        <FeaturesSection />
        <Comparison />
        <TrendingSection />
        <CommunitySection />
        <NewsletterSection
          handleNewsletterSubmit={handleNewsletterSubmit}
          email={email}
          setEmail={setEmail}
        />
        <FAQSection />
        <CTASection isAuthenticated={isAuthenticated} navigate={navigate} />
      </main>

      <Footer />
    </div>
  );
}

export const Header: React.FC<{
  isAuthenticated: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  handleNavigation: (path: string) => void;
  handleLogout: () => void;
}> = ({
  isAuthenticated,
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleNavigation,
  handleLogout,
}) => {
  const headerAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  });

  return (
    <animated.header
      style={headerAnimation}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg
            viewBox="0 0 1043.63 592.71"
            className="w-10 h-10 text-[#4A0E4E] fill-current"
          >
            <g data-name="Layer 2">
              <g data-name="Layer 1">
                <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94" />
              </g>
            </g>
          </svg>
          <span className="text-2xl font-bold text-[#4A0E4E]">Medium</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Button
            variant="ghost"
            onClick={() => handleNavigation("/")}
            className="text-[#4A0E4E] hover:text-[#00A896] transition-colors"
          >
            Home
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleNavigation("/membership")}
            className="text-[#4A0E4E] hover:text-[#00A896] transition-colors"
          >
            Membership
          </Button>
        </nav>
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Input
              type="search"
              placeholder="Search Medium"
              className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </form>
          {isAuthenticated ? (
            <div className="flex space-x-2">
              <Button
                onClick={() => handleNavigation("/publish")}
                className="bg-[#4A0E4E] text-white hover:bg-[#00A896] transition-colors"
              >
                Write
              </Button>
              <Button
                variant="outline"
                className="text-[#4A0E4E] border-[#4A0E4E] hover:bg-[#4A0E4E] hover:text-white transition-colors"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => handleNavigation("/signin")}
              className="bg-[#4A0E4E] text-white hover:bg-[#00A896] transition-colors"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </animated.header>
  );
};

const HeroSection: React.FC<{ handleNavigation: (path: string) => void }> = ({
  handleNavigation,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const heroAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={heroAnimation}
      className="py-20 text-center bg-gradient-to-br from-[#4A0E4E] to-[#00A896] text-white"
    >
      <Badge
        variant="secondary"
        className="bg-white/20 text-white hover:text-white hover:bg-slate-800 rounded-full text-sm md:text-base mb-6"
      >
        <span className="text-[#FF6B6B] font-semibold">#1</span>
        <span className="ml-2">Open Source Blogging Platform</span>
      </Badge>

      <motion.h1
        variants={itemAnimation}
        className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FF6B6B]"
      >
        Discover Stories That Matter
      </motion.h1>
      <motion.p
        variants={itemAnimation}
        className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto"
      >
        Join a community of curious minds, thought leaders, and storytellers.
      </motion.p>
      <motion.div variants={itemAnimation}>
        <Button
          size="lg"
          onClick={() => handleNavigation("/blog")}
          className="bg-[#FF6B6B] text-white hover:bg-[#00A896] transition-colors text-lg px-8 py-3 rounded-full"
        >
          Start Reading
        </Button>
      </motion.div>
    </motion.section>
  );
};

const FeaturesSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-[#4A0E4E]">
          Why Medium?
        </h2>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerAnimation}
          className="grid md:grid-cols-3 gap-8"
        >
          <motion.div variants={itemAnimation}>
            <FeatureCard
              title="Personalized Reading"
              description="Discover stories curated just for you, based on your interests and reading history."
              icon={<BookOpen className="w-10 h-10 text-[#00A896]" />}
            />
          </motion.div>
          <motion.div variants={itemAnimation}>
            <FeatureCard
              title="Powerful Writing Tools"
              description="Create beautiful, engaging stories with our intuitive editor and rich media support."
              icon={<PenTool className="w-10 h-10 text-[#00A896]" />}
            />
          </motion.div>
          <motion.div variants={itemAnimation}>
            <FeatureCard
              title="Engaged Community"
              description="Connect with readers and writers who share your passions and perspectives."
              icon={<TrendingUp className="w-10 h-10 text-[#00A896]" />}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const TrendingSection: React.FC = () => {
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
      className={`${backgroundColors[activeTab]} transition-colors duration-500 py-16`}
    >
      <animated.div
        style={containerAnimation}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl font-bold text-center text-white mb-12">
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

const NewsletterSection: React.FC<{
  handleNewsletterSubmit: (e: React.FormEvent) => void;
  email: string;
  setEmail: (email: string) => void;
}> = ({ handleNewsletterSubmit, email, setEmail }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px)" : "translateY(50px)",
  });

  return (
    <section
      ref={ref}
      className="py-16 bg-gradient-to-br from-[#4A0E4E] to-[#00A896] backdrop-blur-md"
    >
      <animated.div
        style={containerAnimation}
        className="container mx-auto px-4"
      >
        <div className="max-w-3xl mx-auto text-center bg-white/10 backdrop-blur-md shadow-xl rounded-lg p-8">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg text-gray-200 mb-6">
            Get the best stories delivered straight to your inbox every week.
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow bg-white/20 text-white placeholder-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              required
            />
            <Button
              type="submit"
              className="bg-[#FF6B6B] text-white hover:bg-[#00A896] transition-colors p-3 rounded-lg flex items-center justify-center"
            >
              <Mail className="mr-2 h-4 w-4" /> Subscribe
            </Button>
          </form>
        </div>
      </animated.div>
    </section>
  );
};

const CTASection: React.FC<{
  isAuthenticated: boolean;
  navigate: (path: string) => void;
}> = ({ isAuthenticated, navigate }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px)" : "translateY(50px)",
  });

  return (
    <section
      ref={ref}
      className="bg-gradient-to-r from-[#4A0E4E] to-[#00A896] text-white py-16"
    >
      <animated.div
        style={containerAnimation}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6"
      >
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Welcome to Your Storytelling Hub
          </h1>
          <p className="text-xl mb-6">
            Join a community of thinkers and creators sharing unique ideas.
          </p>
          <Button
            onClick={() => navigate(isAuthenticated ? "/blog" : "/signup")}
            size="lg"
            className="bg-[#FF6B6B] text-white hover:bg-white hover:text-[#4A0E4E] transition-colors text-lg px-8 py-3 rounded-full"
          >
            {isAuthenticated ? "Explore Blogs" : "Get Started for Free"}
          </Button>
        </div>
        <div className="mt-12 md:mt-0">
          <FontAwesomeIcon icon={faMediumM} className="text-8xl text-white" />
        </div>
      </animated.div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-[#4A0E4E] text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-[#FF6B6B] transition-colors">
                Our Story
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FF6B6B] transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FF6B6B] transition-colors">
                Press
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-[#FF6B6B] transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FF6B6B] transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FF6B6B] transition-colors">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Help</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-[#FF6B6B] transition-colors">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FF6B6B] transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FF6B6B] transition-colors">
                Support
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://github.com/hritikkkkk"
              className="hover:text-[#FF6B6B] transition-colors"
            >
              <Github />
            </a>
            <a
              href="https://x.com/hritikkk_27"
              className="hover:text-[#FF6B6B] transition-colors"
            >
              <Twitter />
            </a>
            <a
              href="https://www.linkedin.com/in/hritik-kumar-366734304/"
              className="hover:text-[#FF6B6B] transition-colors"
            >
              <Linkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-white/20 text-center">
        <p>&copy; 2024 Medium. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ title, description, icon }) => (
  <Card className="h-full bg-white shadow-xl transition-transform duration-300 hover:scale-105 border-none">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2 text-[#4A0E4E]">
        <span className="text-[#00A896]">{icon}</span>
        <span className="font-bold">{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

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

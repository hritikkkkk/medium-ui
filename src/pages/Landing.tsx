import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FAQSection from "@/components/faq";
import CommunitySection from "@/components/community";
import Comparison from "@/components/comparsion";
import Footer from "@/components/Footer";
import { TrendingSection } from "@/components/Trending";
import { FeaturesSection } from "@/components/Features";

export default function PremiumMediumLanding() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-sans">
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
        <FAQSection />
        <CTASection isAuthenticated={isAuthenticated} onNavigate={navigate} />
      </main>

      <Footer />
    </div>
  );
}

const Header: React.FC<{
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
      className="sticky top-0 z-50 bg-gradient-to-r from-indigo-100 to-purple-100 backdrop-blur-md shadow-sm"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg
            viewBox="0 0 1043.63 592.71"
            className="w-10 h-10 text-indigo-600 fill-current"
          >
            <g data-name="Layer 2">
              <g data-name="Layer 1">
                <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94" />
              </g>
            </g>
          </svg>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Medium</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Button
            variant="ghost"
            onClick={() => handleNavigation("/")}
            className="text-indigo-600 hover:text-purple-600 transition-colors"
          >
            Home
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleNavigation("/membership")}
            className="text-indigo-600 hover:text-purple-600 transition-colors"
          >
            Membership
          </Button>
        </nav>
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Input
              type="search"
              placeholder="Search Medium"
              className="pl-10 pr-4 py-2 rounded-full bg-white/50 focus:bg-white/80 transition-colors border-indigo-200 focus:border-indigo-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400"
              size={18}
            />
          </form>
          {isAuthenticated ? (
            <div className="flex space-x-2">
              <Button
                onClick={() => handleNavigation("/publish")}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-colors"
              >
                Write
              </Button>
              <Button
                variant="outline"
                className="text-indigo-600 border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => handleNavigation("/signin")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-colors"
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
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const heroAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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
      animate={controls}
      variants={heroAnimation}
      className="py-6 md:py-10 text-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemAnimation} className="mb-8">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 backdrop-blur-md shadow-sm">
            <span className="flex w-2 h-2 rounded-full bg-indigo-400 mr-2" />
            #1 Open Source Blogging Platform
          </span>
        </motion.div>

        <motion.h1
          variants={itemAnimation}
          className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
        >
          Discover Stories That Matter
        </motion.h1>

        <motion.p
          variants={itemAnimation}
          className="text-xl md:text-2xl  text-gray-600 mb-10 max-w-2xl mx-auto"
        >
          Join a community of curious minds, thought leaders, and storytellers shaping the future.
        </motion.p>

        <motion.div variants={itemAnimation}>
          <Button
            size="lg"
            onClick={() => handleNavigation("/blog")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Your Journey
          </Button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full filter blur-2xl opacity-20 animate-blob" />
      <div className="absolute top-1/3 right-4 w-32 h-32 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full filter blur-2xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full filter blur-2xl opacity-20 animate-blob animation-delay-4000" />
    </motion.section>
  );
};

interface CTASectionProps {
  isAuthenticated: boolean;
  onNavigate: (path: string) => void;
}

const CTASection: React.FC<CTASectionProps> = ({ isAuthenticated, onNavigate }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      }
    }
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
      variants={containerAnimation}
      className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800 py-24 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div variants={itemAnimation} className="text-center md:text-left md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Welcome to Your Storytelling Hub
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl">
              Join a community of thinkers and creators sharing unique ideas.
            </p>
            <Button
              onClick={() => onNavigate(isAuthenticated ? "/blog" : "/signup")}
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {isAuthenticated ? "Explore Blogs" : "Get Started for Free"}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full filter blur-2xl opacity-20 animate-blob" />
      <div className="absolute top-1/3 right-4 w-32 h-32 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full filter blur-2xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full filter blur-2xl opacity-20 animate-blob animation-delay-4000" />
    </motion.section>
  );
};


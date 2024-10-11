import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMediumM } from "@fortawesome/free-brands-svg-icons";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";
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
          <FontAwesomeIcon icon={faMediumM} className="fa-10x" />
        </div>
      </animated.div>
    </section>
  );
};

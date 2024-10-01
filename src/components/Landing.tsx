import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Github,
  Linkedin,
  Twitter,
  Search,
  TrendingUp,
  BookOpen,
  PenTool,
  Mail,
  Activity,
  FileText,
  Users,
} from "lucide-react";
import StatisticCard from "./ui/statisticCard";

export default function PremiumMediumLanding() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg viewBox="0 0 1043.63 592.71" className="w-10 h-10">
              <g data-name="Layer 2">
                <g data-name="Layer 1">
                  <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94" />
                </g>
              </g>
            </svg>
            <span className="text-2xl font-bold">Medium</span>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Button variant="ghost" onClick={() => handleNavigation("/")}>
              Home
            </Button>
            <Button variant="ghost" onClick={() => handleNavigation("/about")}>
              About
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavigation("/membership")}
            >
              Membership
            </Button>
          </nav>
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Input
                type="search"
                placeholder="Search Medium"
                className="pl-10 pr-4 py-2 rounded-full"
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
                <Button onClick={() => handleNavigation("/write")}>
                  Write
                </Button>
                <Button
                  variant="outline"
                  className="hover:bg-red-700"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={() => handleNavigation("/signin")}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className="py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Discover Stories That Matter
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join a community of curious minds, thought leaders, and
            storytellers.
          </p>
          <Button size="lg" onClick={() => handleNavigation("/start")}>
            Start Reading
          </Button>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Medium?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                title="Personalized Reading"
                description="Discover stories curated just for you, based on your interests and reading history."
                icon={<BookOpen className="w-10 h-10" />}
              />
              <FeatureCard
                title="Powerful Writing Tools"
                description="Create beautiful, engaging stories with our intuitive editor and rich media support."
                icon={<PenTool className="w-10 h-10" />}
              />
              <FeatureCard
                title="Engaged Community"
                description="Connect with readers and writers who share your passions and perspectives."
                icon={<TrendingUp className="w-10 h-10" />}
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Trending on Medium
            </h2>
            <Tabs defaultValue="technology">
              <TabsList>
                <TabsTrigger value="technology">Technology</TabsTrigger>
                <TabsTrigger value="culture">Culture</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
              </TabsList>

              <TabsContent value="technology">
                <div className="grid md:grid-cols-3 gap-8 mt-8">
                  <ArticleCard
                    title="The Future of AI in Everyday Life"
                    author="Jane Doe"
                    readTime="5 min read"
                    imageUrl="https://images.unsplash.com/photo-1498050108023-c5249f4df085" // AI concept image
                  />
                  <ArticleCard
                    title="Blockchain Beyond Cryptocurrency"
                    author="John Smith"
                    readTime="7 min read"
                    imageUrl="https://images.unsplash.com/photo-1640161704729-cbe966a08476?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Blockchain concept image
                  />
                  <ArticleCard
                    title="The Rise of No-Code Platforms"
                    author="Emily Johnson"
                    readTime="6 min read"
                    imageUrl="https://images.unsplash.com/photo-1642132652803-01f9738d0446?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // No-Code concept image
                  />
                </div>
              </TabsContent>

              <TabsContent value="culture">
                <div className="grid md:grid-cols-3 gap-8 mt-8">
                  <ArticleCard
                    title="The Evolution of Street Art"
                    author="Michael Brown"
                    readTime="8 min read"
                    imageUrl="https://plus.unsplash.com/premium_photo-1693166014348-a2c45600945e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZXZvbHV0aW9uJTIwb2YlMjBzdHJlZXQlMjBhcnR8ZW58MHx8MHx8fDA%3D" // Street art concept image
                  />
                  <ArticleCard
                    title="Food Trends Shaping Our Culinary Future"
                    author="Sarah Lee"
                    readTime="6 min read"
                    imageUrl="https://plus.unsplash.com/premium_photo-1723600972666-f5b7aefeb73a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Food trend concept image
                  />
                  <ArticleCard
                    title="The Resurgence of Vinyl in the Digital Age"
                    author="David Wilson"
                    readTime="7 min read"
                    imageUrl="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Vinyl records concept image
                  />
                </div>
              </TabsContent>

              <TabsContent value="design">
                <div className="grid md:grid-cols-3 gap-8 mt-8">
                  <ArticleCard
                    title="The Art of Minimalist Web Design"
                    author="Alice Thompson"
                    readTime="5 min read"
                    imageUrl="https://images.unsplash.com/photo-1544717305-996b815c338c" // Minimalist design concept image
                  />
                  <ArticleCard
                    title="Color Theory in Modern UI Design"
                    author="Robert Davis"
                    readTime="6 min read"
                    imageUrl="https://images.unsplash.com/photo-1502691876148-a84978e59af8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Color theory concept image
                  />
                  <ArticleCard
                    title="Typography Trends in 2024"
                    author="Laura Martinez"
                    readTime="8 min read"
                    imageUrl="https://images.unsplash.com/photo-1448471393961-ad67a6405eec?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Typography concept image
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Join a Growing Community
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatisticCard
                  icon={<Users size={40} />}
                value="10,000+"
                title="Active Writers"
                description="Writers & readers active this month"
              />
              <StatisticCard
                title="Total Articles"
                value="14,323"
                description="Published across all categories"
                icon={<FileText size={40} />}
              />
              <StatisticCard
               title="Avg. Read Time"
               value="4 min"
               description="Average time spent on articles"
               icon={<Activity size={40} />}
              />
            </div>
          </div>
        </section>

        <section className="py-16 ">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Get the best stories delivered straight to your inbox every
                week.
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required
                />
                <button
                  type="submit"
                  className="flex items-center bg-blue-600 text-white rounded-lg px-4 py-3 hover:bg-blue-700 transition duration-300"
                >
                  <Mail className="mr-2 h-4 w-4" /> Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Your Ideas, Amplified
              </h2>
              <p className="text-xl mb-6">
                Write, share, and connect with a global audience of millions.
              </p>
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  handleNavigation(isAuthenticated ? "/write" : "/signup")
                }
              >
                {isAuthenticated ? "Start Writing" : "Join Medium"}
              </Button>
            </div>
            <div className="mt-8 md:mt-0">
              <PenTool size={180} className="text-white opacity-50" />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Help</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">
                  <Github />
                </a>
                <a href="#" className="hover:text-gray-300">
                  <Twitter />
                </a>
                <a href="#" className="hover:text-gray-300">
                  <Linkedin />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-800 text-center">
            <p>&copy; 2024 Medium. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <span className="text-primary">{icon}</span>
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p>{description}</p>
    </CardContent>
  </Card>
);

const ArticleCard = ({
  title,
  author,
  readTime,
  imageUrl,
}: {
  title: string;
  author: string;
  readTime: string;
  imageUrl: string;
}) => (
  <Card>
    <CardContent className="p-0">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-cover"
        onError={(e) =>
          (e.currentTarget.src = "https://via.placeholder.com/400")
        }
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-gray-600">
          By {author} · {readTime}
        </p>
      </div>
    </CardContent>
  </Card>
);

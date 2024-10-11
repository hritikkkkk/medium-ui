import React from "react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = React.useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Subscribing email: ${email}`);
    setEmail("");
    toast.success("email sent successfully", {
      position: "bottom-center",
    });
  };

  return (
    <footer className="bg-[#4A0E4E] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-2">Stay Connected</h3>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex items-center"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-l-md focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                required
              />
              <Button
                type="submit"
                className="bg-[#FF6B6B] hover:bg-[#FF8C8C] text-white m-2 rounded-r-md"
              >
                <Mail className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-sm mt-2 text-gray-300">
              Get the best stories delivered straight to your inbox every week.
            </p>
          </div>
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
        </div>
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 Medium. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://github.com/hritikkkkk"
              className="hover:text-[#FF6B6B] transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/hritikkk_27"
              className="hover:text-[#FF6B6B] transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/hritik-kumar-366734304/"
              className="hover:text-[#FF6B6B] transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

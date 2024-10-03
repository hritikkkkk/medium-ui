import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Pricing from "../components/membership";
import { Button } from "../components/ui/button";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Freelance Writer",
    content:
      "This membership has been a game-changer for my writing career. The exclusive content and networking opportunities are unparalleled.",
    image: "https://thispersondoesnotexist.com/",
  },
  {
    name: "Samantha Lee",
    role: "Avid Reader",
    content:
      "I love the curated content and ad-free experience. It's worth every penny!",
    image: "https://thispersondoesnotexist.com/",
  },
  {
    name: "Michael Chen",
    role: "Tech Entrepreneur",
    content:
      "The audio versions of articles have made it possible for me to consume great content even during my busy schedule.",
    image: "https://thispersondoesnotexist.com/",
  },
  {
    name: "Emily Rodriguez",
    role: "Digital Marketer",
    content:
      "The insights I've gained from the premium content have directly contributed to my career growth. Highly recommended!",
    image: "https://thispersondoesnotexist.com/",
  },
  {
    name: "David Kim",
    role: "Student",
    content:
      "As a student, the affordable pricing and wealth of knowledge available have been invaluable for my studies and personal projects.",
    image: "https://thispersondoesnotexist.com/",
  },
];

export const Membership = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };
  return (
    <div>
      {" "}
      <Pricing />
      <section className="py-20">
        <div className="container mx-auto px-4 bg-gradient-to-b from-white to-slate-100">
          <h2 className="text-3xl font-semibold text-center mb-12 ">
            What Our Members Say
          </h2>
          <div className="relative bg-gradient-to-br  to-slate-500 from-white rounded-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                className="bg-card rounded-lg p-8 shadow-lg"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">
                      {testimonials[currentTestimonial].name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
                <p className="italic text-lg mb-4">
                  &ldquo;{testimonials[currentTestimonial].content}&rdquo;
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-2"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 " />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-2"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
      <section className="py-20 bg-zinc-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                q: "How do I cancel my subscription?",
                a: "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.",
              },
              {
                q: "Can I switch between plans?",
                a: "Yes, you can upgrade or downgrade your plan at any time. The changes will take effect on your next billing cycle.",
              },
              {
                q: "Is there a free trial?",
                a: "We offer a 7-day free trial for new members on all paid plans. You can cancel anytime during the trial period.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and Apple Pay.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 shadow-lg "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-white to-slate-500">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl font-bold mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join thousands of satisfied members and start your premium
            experience today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" className="bg-black text-white hover:bg-black/90">
              Start Your Free Trial
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

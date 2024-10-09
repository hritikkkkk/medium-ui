import { motion } from "framer-motion";
import Pricing from "../components/membership";
import { Button } from "../components/ui/button";
import { Testimonials } from "@/components/testimonials";

export const Membership = () => {
  return (
    <div>
      {" "}
      <Pricing />
      <Testimonials />
      <section>
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
      <section className="py-20 ">
        <div className="container mx-auto px-4  text-center">
          <motion.h2
            className="text-4xl font-bold py-6 relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ready to Get <span className="text-blue-600">Started?</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 text-muted-foreground mb-10"
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

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqItems = [
    {
      question: "How can I publish a new article?",
      answer:
        "You can publish a new article by clicking on the 'Write' button at the top-right corner. This will open the editor where you can create and format your content.",
    },
    {
      question: "How do I customize my profile?",
      answer:
        "Go to your profile page and click on the 'Edit Profile' button. You can update your name, bio, profile picture, and other settings.",
    },
    {
      question: "Can I save articles for offline reading?",
      answer:
        "Yes, you can save articles by clicking the 'Save' button below each article. Your saved articles will be available in the 'Saved' section of your profile.",
    },
    {
      question: "How do I follow a writer or publication?",
      answer:
        "To follow a writer or publication, click the 'Follow' button on their profile or publication page. This will add their latest articles to your feed.",
    },
  ];

  return (
    <section className="py-6 md:py-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
        >
          Frequently Asked Questions
        </motion.h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AccordionItem
                value={`item-${index + 1}`}
                className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-indigo-100"
              >
                <AccordionTrigger className="px-6 py-4 text-xl  text-gray-600 font-bold font-serif hover:text-indigo-900">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>

      <div className="absolute top-1/2 left-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full filter blur-2xl opacity-20 animate-blob" />
      <div className="absolute top-1/3 right-4 w-32 h-32 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full filter blur-2xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full filter blur-2xl opacity-20 animate-blob animation-delay-4000" />
    </section>
  );
}

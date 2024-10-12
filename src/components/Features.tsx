import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BookOpen, PenTool } from "lucide-react";

export const FeaturesSection: React.FC = () => {
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
    <section className="py-6 md:py-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 "
        >
          Why Medium?
        </motion.h2>
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
              icon={<BookOpen className="w-10 h-10 text-indigo-600" />}
            />
          </motion.div>
          <motion.div variants={itemAnimation}>
            <FeatureCard
              title="Powerful Writing Tools"
              description="Create beautiful, engaging stories with our intuitive editor and rich media support."
              icon={<PenTool className="w-10 h-10 text-indigo-600" />}
            />
          </motion.div>
          <motion.div variants={itemAnimation}>
            <FeatureCard
              title="Engaged Community"
              description="Connect with readers and writers who share your passions and perspectives."
              icon={<TrendingUp className="w-10 h-10 text-indigo-600" />}
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full filter blur-2xl opacity-20 animate-blob" />
      <div className="absolute top-1/3 right-4 w-32 h-32 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full filter blur-2xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full filter blur-2xl opacity-20 animate-blob animation-delay-4000" />
    </section>
  );
};

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ title, description, icon }) => (
  <Card className="h-full bg-white/80 backdrop-blur-sm shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/90 border-none">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2 text-[#4A0E4E]">
        <span>{icon}</span>
        <span className="font-bold">{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

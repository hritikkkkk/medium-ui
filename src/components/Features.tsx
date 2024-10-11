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

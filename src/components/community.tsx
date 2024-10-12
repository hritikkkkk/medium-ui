import React from 'react';
import { useSpring, animated } from 'react-spring';
import { motion, useInView } from 'framer-motion';
import { Users, FileText, Activity } from 'lucide-react';

interface AnimatedCounterProps {
  value: number;
  label?: string;
  showPlus?: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, label, showPlus }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const { number } = useSpring({
    from: { number: 0 },
    number: isInView ? value : 0,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-indigo-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <animated.div className="text-4xl font-bold">
        {number.to((n) => `${Math.floor(n)}${showPlus ? '+' : ''}`)}
      </animated.div>
      {label && <p className="text-xl">{label}</p>}
    </motion.div>
  );
};

interface StatisticCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  description: string;
  showPlus?: boolean;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ icon, title, value, description, showPlus = true }) => {
  return (
    <motion.div
      className="flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-indigo-100 transition-all duration-300 hover:scale-105 hover:bg-white/90"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-indigo-600 mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold text-gray-700">{title}</h3>
      <AnimatedCounter value={value} label="" showPlus={showPlus} />
      <p className="text-gray-600 mt-2">{description}</p>
    </motion.div>
  );
};

export default function CommunitySection() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />
      <motion.div
        className="container mx-auto px-4 text-center relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Join a Growing Community
        </h2>
        <p className="mb-12 text-xl text-gray-600 max-w-2xl mx-auto">
          We're building a vibrant community of writers, readers, and innovators.
          Join us and contribute to a world of knowledge and insights.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatisticCard
            icon={<Users size={40} />}
            value={10000}
            title="Active Writers"
            description="Writers & readers active this month"
            showPlus={true}
          />
          <StatisticCard
            title="Total Articles"
            value={14323}
            description="Published across all categories"
            icon={<FileText size={40} />}
            showPlus={true}
          />
          <StatisticCard
            title="Avg. Read Time"
            value={4}
            description="Average time spent on articles"
            icon={<Activity size={40} />}
            showPlus={false}
          />
        </div>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full filter blur-2xl opacity-20 animate-blob" />
      <div className="absolute top-1/3 right-4 w-32 h-32 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full filter blur-2xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full filter blur-2xl opacity-20 animate-blob animation-delay-4000" />
    </section>
  );
}

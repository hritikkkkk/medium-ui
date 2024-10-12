import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedium, faWordpress } from "@fortawesome/free-brands-svg-icons";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

type Feature =
  | "Curated content"
  | "Custom domains"
  | "Monetization"
  | "SEO optimization"
  | "Analytics";

type Platform = {
  name: string;
  icon: typeof faMedium;
  features: Record<Feature, boolean>;
};

const platforms: Platform[] = [
  {
    name: "Medium",
    icon: faMedium,
    features: {
      "Curated content": true,
      "Custom domains": true,
      Monetization: true,
      "SEO optimization": true,
      Analytics: true,
    },
  },
  {
    name: "WordPress",
    icon: faWordpress,
    features: {
      "Curated content": false,
      "Custom domains": true,
      Monetization: true,
      "SEO optimization": true,
      Analytics: false,
    },
  },
  {
    name: "Substack",
    icon: faNewspaper,
    features: {
      "Curated content": false,
      "Custom domains": true,
      Monetization: true,
      "SEO optimization": false,
      Analytics: true,
    },
  },
];

const featuresList: Feature[] = [
  "Curated content",
  "Custom domains",
  "Monetization",
  "SEO optimization",
  "Analytics",
];

export default function ComparisonSection() {
  return (
    <section className="py-6 md:py-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          How Medium Compares
        </h2>
        <div className="overflow-x-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block min-w-full"
          >
            <table className="w-full border-collapse bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="p-4 text-left text-gray-700">Features</th>
                  {platforms.map((platform) => (
                    <th
                      key={platform.name}
                      className="p-4 text-center text-indigo-700"
                    >
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <FontAwesomeIcon
                          icon={platform.icon}
                          className="w-16 h-16 text-indigo-600"
                          aria-label={`${platform.name} logo`}
                        />
                        <span className="font-bold text-gray-700">{platform.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featuresList.map((feature, index) => (
                  <motion.tr
                    key={feature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={
                      index % 2 === 0 ? "bg-white/60" : "bg-indigo-50/60"
                    }
                  >
                    <td className="p-4 border-b border-indigo-100 font-medium text-indigo-700">
                      {feature}
                    </td>
                    {platforms.map((platform) => (
                      <td
                        key={`${platform.name}-${feature}`}
                        className="p-4 border-b border-indigo-100 text-center"
                      >
                        {platform.features[feature] ? (
                          <Check
                            className="inline-block text-green-500"
                            aria-label={`${feature} is available on ${platform.name}`}
                          />
                        ) : (
                          <X
                            className="inline-block text-red-500"
                            aria-label={`${feature} is not available on ${platform.name}`}
                          />
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            onClick={() => console.log("Navigate to pricing")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Writing on Medium
          </Button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full filter blur-2xl opacity-20 animate-blob" />
      <div className="absolute top-1/3 right-4 w-32 h-32 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full filter blur-2xl opacity-20 animate-blob animation-delay-2000" />
    </section>
  );
}

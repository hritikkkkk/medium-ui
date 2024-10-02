import { motion } from "framer-motion";
import { Button } from "./ui/button";
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

export default function Comparison() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          How Medium Compares
        </h2>
        <div className="overflow-x-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block min-w-full"
          >
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left">Features</th>
                  {platforms.map((platform) => (
                    <th key={platform.name} className="p-4 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <FontAwesomeIcon
                          icon={platform.icon}
                          className="w-16 h-16 text-gray-700"
                          aria-label={`${platform.name} logo`}
                        />
                        <span className="font-bold">{platform.name}</span>
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
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="p-4 border-b border-gray-200 font-medium">
                      {feature}
                    </td>
                    {platforms.map((platform) => (
                      <td
                        key={`${platform.name}-${feature}`}
                        className="p-4 border-b border-gray-200 text-center"
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
          className="mt-8 text-center"
        >
          <Button size="lg" onClick={() => console.log("Navigate to pricing")}>
            Start Writing on Medium
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

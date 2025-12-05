import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

interface BrandValueCardProps {
  icon: string;
  title: string;
  description: string;
  gradient: string;
  index: number;
}

export default function BrandValueCard({
  icon,
  title,
  description,
  gradient,
  index,
}: BrandValueCardProps) {
  // Dynamically get the icon component from lucide-react
  const IconComponent = (Icons as any)[icon] || Icons.Circle;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover-lift group"
    >
      {/* Icon with gradient background */}
      <motion.div
        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient}
                   flex items-center justify-center mb-4
                   group-hover:scale-110 transition-transform duration-200`}
        whileHover={{ rotate: 5 }}
      >
        <IconComponent className="w-7 h-7 text-white" />
      </motion.div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

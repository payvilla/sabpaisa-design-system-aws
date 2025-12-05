import { motion } from 'framer-motion';
import { spacing } from '../data/designSystemData';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { copyToClipboard } from '../utils/clipboard';

export default function Spacing() {
  const [copiedClass, setCopiedClass] = useState<string>('');

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedClass(text);
      setTimeout(() => setCopiedClass(''), 1500);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Spacing Scale
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
          8pt grid system for consistent spacing throughout your application. Click any
          class name to copy it to clipboard.
        </p>
      </div>

      {/* Spacing Scale */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="space-y-6">
          {spacing.map((space, index) => (
            <motion.div
              key={space.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-6 p-4 rounded-xl hover:bg-gray-50
                         dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {/* Visual Representation */}
              <div className="w-32">
                <div
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded"
                  style={{ height: '32px', width: space.value }}
                />
              </div>

              {/* Details */}
              <div className="flex-1 grid grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Name
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {space.name}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Pixels
                  </div>
                  <div className="font-mono text-gray-900 dark:text-white">
                    {space.pixels}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Rem
                  </div>
                  <div className="font-mono text-gray-900 dark:text-white">
                    {space.value}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Tailwind
                    </div>
                    <code className="text-sm text-primary-600 dark:text-primary-400 font-mono">
                      {space.class}
                    </code>
                  </div>
                  <button
                    onClick={() => handleCopy(space.class)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600
                               transition-colors duration-200"
                    title="Copy class name"
                  >
                    {copiedClass === space.class ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Usage Examples */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700
                        rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Margin & Padding
          </h3>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <code className="text-primary-600 dark:text-primary-400">m-4</code>
              <span className="ml-2">→ margin: 1rem (16px)</span>
            </div>
            <div>
              <code className="text-primary-600 dark:text-primary-400">p-6</code>
              <span className="ml-2">→ padding: 1.5rem (24px)</span>
            </div>
            <div>
              <code className="text-primary-600 dark:text-primary-400">mx-8</code>
              <span className="ml-2">→ margin-left/right: 2rem (32px)</span>
            </div>
            <div>
              <code className="text-primary-600 dark:text-primary-400">py-4</code>
              <span className="ml-2">→ padding-top/bottom: 1rem (16px)</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700
                        rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Gap & Space
          </h3>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <code className="text-secondary-600 dark:text-secondary-400">gap-4</code>
              <span className="ml-2">→ gap: 1rem (16px)</span>
            </div>
            <div>
              <code className="text-secondary-600 dark:text-secondary-400">space-y-6</code>
              <span className="ml-2">→ vertical gap: 1.5rem (24px)</span>
            </div>
            <div>
              <code className="text-secondary-600 dark:text-secondary-400">space-x-4</code>
              <span className="ml-2">→ horizontal gap: 1rem (16px)</span>
            </div>
            <div>
              <code className="text-secondary-600 dark:text-secondary-400">gap-8</code>
              <span className="ml-2">→ gap: 2rem (32px)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

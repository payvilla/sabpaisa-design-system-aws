import { motion } from 'framer-motion';
import { typography } from '../data/designSystemData';
import CodeBlock from '../components/CodeBlock';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { copyToClipboard } from '../utils/clipboard';

export default function Typography() {
  const [copiedClass, setCopiedClass] = useState<string>('');

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedClass(text);
      setTimeout(() => setCopiedClass(''), 1500);
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Typography
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
          Consistent text styles using the Inter font family. All typography classes are
          ready to copy and paste into your project.
        </p>
      </div>

      {/* Font Families */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Font Families
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {typography.fontFamilies.map((font) => (
            <motion.div
              key={font.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover-lift"
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {font.name}
                  </h3>
                  <button
                    onClick={() => handleCopy(font.class)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
                               transition-colors duration-200"
                    title="Copy class name"
                  >
                    {copiedClass === font.class ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {font.usage}
                </p>
              </div>
              <div
                className={`text-2xl ${font.class} text-gray-900 dark:text-white mb-3`}
                style={{ fontFamily: font.value }}
              >
                The quick brown fox
              </div>
              <div className="space-y-1">
                <code className="text-xs text-primary-600 dark:text-primary-400 block">
                  {font.class}
                </code>
                <code className="text-xs text-gray-500 dark:text-gray-400 block truncate">
                  {font.value}
                </code>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Font Sizes */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Font Sizes
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-6">
          {typography.fontSizes.map((size, index) => (
            <motion.div
              key={size.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 rounded-xl
                         hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200
                         border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
            >
              <div className="flex-1">
                <div
                  className={`${size.class} font-heading text-gray-900 dark:text-white mb-1`}
                >
                  The quick brown fox jumps over the lazy dog
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">{size.name}</span>
                  <span>{size.pixels}</span>
                  <span>{size.value}</span>
                  <span>•</span>
                  <span className="text-xs">{size.usage}</span>
                </div>
              </div>
              <button
                onClick={() => handleCopy(size.class)}
                className="ml-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600
                           transition-colors duration-200"
                title="Copy class name"
              >
                {copiedClass === size.class ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Font Weights */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Font Weights
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {typography.fontWeights.map((weight) => (
            <motion.div
              key={weight.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover-lift"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {weight.name}
                </h3>
                <button
                  onClick={() => handleCopy(weight.class)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
                             transition-colors duration-200"
                >
                  {copiedClass === weight.class ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              <div
                className={`text-2xl ${weight.class} text-gray-900 dark:text-white mb-3`}
              >
                Typography {weight.value}
              </div>
              <div className="space-y-1">
                <code className="text-xs text-primary-600 dark:text-primary-400 block">
                  {weight.class}
                </code>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {weight.usage}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Typography Component */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Typography Component
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-6">
          <p className="text-gray-600 dark:text-gray-400">
            Use the Typography component for type-safe, consistent text rendering:
          </p>

          <CodeBlock
            code={`import Typography from '@/components/ui/Typography';

// Heading
<Typography variant="h1">Welcome to SabPaisa</Typography>

// Body text with color
<Typography variant="body-base" color="primary">
  Important information
</Typography>

// Centered text
<Typography variant="h2" align="center">
  Centered Heading
</Typography>

// Custom weight
<Typography variant="body-base" weight="bold">
  Bold text
</Typography>`}
          />

          <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl space-y-4">
            <div className="text-5xl font-bold text-gray-900 dark:text-white">
              Heading 1 Example
            </div>
            <div className="text-3xl font-semibold text-gray-900 dark:text-white">
              Heading 2 Example
            </div>
            <div className="text-base text-gray-700 dark:text-gray-300">
              Body text example with normal weight and line height
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Small text for captions and labels
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700
                           rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-primary-600 dark:text-primary-400">
              Typography Hierarchy
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• H1 (48px) - Page titles</li>
              <li>• H2 (36px) - Section headings</li>
              <li>• H3 (30px) - Subsections</li>
              <li>• H4 (24px) - Component headings</li>
              <li>• Body (16px) - Main content</li>
              <li>• Caption (12px) - Supporting text</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-secondary-600 dark:text-secondary-400">
              Guidelines
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• Use semantic HTML (h1, h2, p, etc.)</li>
              <li>• Maintain consistent line lengths (45-75 chars)</li>
              <li>• Ensure sufficient contrast ratios</li>
              <li>• Use appropriate font weights for hierarchy</li>
              <li>• Test typography at different screen sizes</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

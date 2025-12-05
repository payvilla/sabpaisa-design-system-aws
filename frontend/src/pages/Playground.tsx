import { motion } from 'framer-motion';
import { Code, Zap, Sparkles } from 'lucide-react';

export default function Playground() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 p-12 text-white"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-10 h-10" />
            <h1 className="text-5xl font-bold">Interactive Playground</h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mb-6">
            Test and experiment with SabPaisa Design System components in a live environment.
          </p>
        </div>
      </motion.div>

      {/* Coming Soon Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg text-center"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 mb-6">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Playground Coming Soon
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          We're building an interactive code playground where you can test and experiment with all
          SabPaisa Design System components in real-time. Stay tuned!
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
            <Zap className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-3 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Live Preview
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              See your code changes instantly with hot module reloading
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
            <Code className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-3 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Code Editor
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Full-featured code editor with syntax highlighting and autocomplete
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
            <Sparkles className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-3 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Templates
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Start with pre-built templates for common UI patterns
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            In the meantime, explore these sections:
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="/components"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium hover:from-primary-700 hover:to-primary-600 transition-all shadow-lg"
            >
              View Components
            </a>
            <a
              href="/examples"
              className="px-6 py-3 rounded-xl bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
            >
              See Examples
            </a>
            <a
              href="/documentation"
              className="px-6 py-3 rounded-xl bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
            >
              Read Docs
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { patterns } from '../data/designSystemData';
import CodeBlock from '../components/CodeBlock';
import { Workflow } from 'lucide-react';

export default function Patterns() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Fintech Patterns
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
          Domain-specific workflow patterns for payments, KYC, settlements, and more.
          Proven patterns used in production fintech applications.
        </p>
      </div>

      {/* Patterns */}
      <div className="space-y-8">
        {patterns.map((pattern, index) => (
          <motion.div
            key={pattern.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Pattern Header */}
            <div className="p-6 bg-gradient-to-r from-primary-500 to-secondary-500">
              <div className="flex items-center gap-3 mb-2">
                <Workflow className="w-8 h-8 text-white" />
                <h2 className="text-2xl font-bold text-white">{pattern.name}</h2>
              </div>
              <p className="text-white/90">{pattern.description}</p>
              <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium
                             bg-white/20 text-white">
                {pattern.category}
              </span>
            </div>

            {/* Workflow Steps */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Workflow Steps
              </h3>
              <div className="space-y-4">
                {pattern.workflow.map((step, stepIndex) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: stepIndex * 0.1 }}
                    className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900
                               border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br
                                    from-primary-500 to-secondary-500 flex items-center justify-center
                                    text-white font-bold text-sm">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {step.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Code Example */}
            {pattern.codeExample && (
              <div className="p-6 bg-gray-50 dark:bg-gray-900">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Implementation Example
                </h3>
                <CodeBlock code={pattern.codeExample} language="javascript" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

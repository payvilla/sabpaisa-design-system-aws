import { motion } from 'framer-motion';
import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDown, CheckCircle, AlertTriangle, Lightbulb, Sparkles } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import { integrationGuides } from '../data/designSystemData';

export default function IntegrationGuide() {
  const [activeTab, setActiveTab] = useState<'greenfield' | 'brownfield' | 'claude'>('greenfield');
  const guide = integrationGuides[activeTab];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Integration Guide
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl"
        >
          Comprehensive step-by-step guides for integrating SabPaisa Design System into
          your React projects. Choose your path below.
        </motion.p>
      </div>

      {/* Tab/Toggle Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <button
          onClick={() => setActiveTab('greenfield')}
          className={`px-6 py-4 rounded-xl font-medium transition-all duration-200 ${
            activeTab === 'greenfield'
              ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <div className="text-left">
            <div className="text-lg font-bold">New Projects (Greenfield)</div>
            <div className="text-sm opacity-90 mt-1">Start fresh • {integrationGuides.greenfield.duration}</div>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('brownfield')}
          className={`px-6 py-4 rounded-xl font-medium transition-all duration-200 ${
            activeTab === 'brownfield'
              ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <div className="text-left">
            <div className="text-lg font-bold">Existing Projects (Brownfield)</div>
            <div className="text-sm opacity-90 mt-1">Gradual migration • {integrationGuides.brownfield.duration}</div>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('claude')}
          className={`px-6 py-4 rounded-xl font-medium transition-all duration-200 ${
            activeTab === 'claude'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-500 text-white shadow-lg'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <div className="text-left">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <div className="text-lg font-bold">Claude AI Integration</div>
            </div>
            <div className="text-sm opacity-90 mt-1">MCP server • {integrationGuides.claude.duration}</div>
          </div>
        </button>
      </motion.div>

      {/* Guide Info Card */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-gradient-to-r rounded-xl p-6 border ${
          activeTab === 'claude'
            ? 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800'
            : 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800'
        }`}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {guide.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-1">{guide.subtitle}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{guide.description}</p>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded">
              Duration: {guide.duration}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded">
              Level: {guide.difficulty}
            </span>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Prerequisites:</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            {guide.prerequisites.map((prereq, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span>{prereq}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Steps Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Step-by-Step Instructions</h2>

        {guide.steps.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            {/* Step Header */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white flex items-center justify-center font-bold">
                {step.step}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {step.description}
                </p>

                {/* Educational Explanation */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-4 rounded-r">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1">
                        Why this step matters:
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {step.explanation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Code Example */}
                {step.codeExample && (
                  <div className="mb-4">
                    <CodeBlock code={step.codeExample} language={step.language || 'typescript'} />
                  </div>
                )}

                {/* Tips */}
                {step.tips && step.tips.length > 0 && (
                  <div className="mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-green-900 dark:text-green-200 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Tips:
                    </h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1.5">
                      {step.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Common Pitfalls */}
                {step.commonPitfalls && step.commonPitfalls.length > 0 && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-red-900 dark:text-red-200 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Common Pitfalls:
                    </h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1.5">
                      {step.commonPitfalls.map((pitfall, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400">•</span>
                          <span>{pitfall}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Troubleshooting Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Troubleshooting
        </h2>
        <div className="space-y-3">
          {guide.troubleshooting.map((issue, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <Disclosure.Button className="flex w-full justify-between items-center bg-red-50 dark:bg-red-900/20 px-6 py-4 text-left hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                      <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {issue.issue}
                      </span>
                    </div>
                    <ChevronDown
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform flex-shrink-0 ml-4`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-6 py-4 bg-white dark:bg-gray-800 text-sm space-y-3">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">Cause:</p>
                      <p className="text-gray-600 dark:text-gray-400">{issue.cause}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">Solution:</p>
                      <p className="text-gray-600 dark:text-gray-400">{issue.solution}</p>
                    </div>
                    {issue.preventionTip && (
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-3">
                        <p className="font-semibold text-green-900 dark:text-green-200 mb-1 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Prevention Tip:
                        </p>
                        <p className="text-green-800 dark:text-green-300">{issue.preventionTip}</p>
                      </div>
                    )}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>

      {/* Best Practices Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Best Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guide.bestPractices.map((practice, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5"
            >
              <div className="flex items-start gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {practice.practice}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 ml-8">
                {practice.why}
              </p>
              {practice.example && (
                <div className="ml-8">
                  <code className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded border border-green-300 dark:border-green-700 text-gray-800 dark:text-gray-200">
                    {practice.example}
                  </code>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { templates, categories } from '../data/templatesData.tsx';
import CodeBlock from '../components/CodeBlock';
import { Search, ChevronDown, ChevronUp, Copy, Check, Package, Code2, BookOpen } from 'lucide-react';

export default function Templates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedInstall, setCopiedInstall] = useState<string | null>(null);

  // Get template count per category
  const getCategoryCount = (category: string) => {
    if (category === 'all') return templates.length;
    return templates.filter((t) => t.category === category).length;
  };

  // Filter templates by category and search term
  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      const matchesSearch =
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        template.useCase.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const toggleTemplate = (id: string) => {
    setExpandedTemplate(expandedTemplate === id ? null : id);
  };

  const copyToClipboard = (text: string, type: 'code' | 'install', id: string) => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } else {
      setCopiedInstall(id);
      setTimeout(() => setCopiedInstall(null), 2000);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
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
          Templates Library
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
          Production-ready templates with full source code, installation instructions, and usage examples.
          Copy-paste into your hackathon project and customize as needed.
        </p>
      </div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-3"
      >
        <button
          onClick={() => setSelectedCategory('all')}
          className={`
            px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200
            ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg scale-105'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }
          `}
        >
          All Templates
          <span
            className={`
              ml-2 px-2 py-0.5 rounded-full text-xs font-semibold
              ${
                selectedCategory === 'all'
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }
            `}
          >
            {getCategoryCount('all')}
          </span>
        </button>
        {Object.entries(categories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`
              px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200
              ${
                selectedCategory === key
                  ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }
            `}
          >
            {category.icon} {category.name}
            <span
              className={`
                ml-2 px-2 py-0.5 rounded-full text-xs font-semibold
                ${
                  selectedCategory === key
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }
              `}
            >
              {category.count}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-primary-500 focus:border-transparent
                     transition-all duration-200"
        />
      </div>

      {/* Templates List */}
      <div className="space-y-6">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Template Header */}
            <div
              className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700
                         transition-colors duration-200"
              onClick={() => toggleTemplate(template.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {template.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                      {template.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium
                                   bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                      {categories[template.category as keyof typeof categories].icon}{' '}
                      {categories[template.category as keyof typeof categories].name}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700
                                   text-gray-600 dark:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {expandedTemplate === template.id ? (
                  <ChevronUp className="w-6 h-6 text-gray-400 flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0 ml-4" />
                )}
              </div>
            </div>

            {/* Template Details */}
            {expandedTemplate === template.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                {/* Live Preview */}
                <div className="p-6 bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center gap-2 mb-4">
                    <Code2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Live Preview
                    </h4>
                  </div>
                  <div className="p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
                                  flex items-center justify-center min-h-[200px]">
                    {template.preview()}
                  </div>
                </div>

                {/* Installation */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Installation
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {/* Dependencies */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Install dependencies:
                      </p>
                      <div className="relative">
                        <CodeBlock
                          code={`npm install ${template.installation.dependencies.join(' ')}`}
                          language="bash"
                        />
                        <button
                          onClick={() =>
                            copyToClipboard(
                              `npm install ${template.installation.dependencies.join(' ')}`,
                              'install',
                              template.id
                            )
                          }
                          className="absolute top-2 right-2 p-2 rounded-lg bg-gray-700 hover:bg-gray-600
                                     text-white transition-colors duration-200"
                          title="Copy install command"
                        >
                          {copiedInstall === template.id ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    {/* Steps */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Setup steps:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        {template.installation.steps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    {/* Meta Info */}
                    <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 pt-2">
                      <div>
                        <span className="font-medium">Framework:</span> {template.framework}
                      </div>
                      <div>
                        <span className="font-medium">Styling:</span> {template.styling}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Source Code */}
                <div className="p-6 bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Source Code
                      </h4>
                    </div>
                    <button
                      onClick={() => copyToClipboard(template.code, 'code', template.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg
                                 bg-primary-600 hover:bg-primary-700 text-white
                                 transition-colors duration-200"
                    >
                      {copiedCode === template.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Code
                        </>
                      )}
                    </button>
                  </div>
                  <CodeBlock code={template.code} language="typescript" />
                </div>

                {/* Props */}
                {template.props && template.props.length > 0 && (
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Props
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">
                              Prop
                            </th>
                            <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">
                              Type
                            </th>
                            <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">
                              Default
                            </th>
                            <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">
                              Required
                            </th>
                            <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {template.props.map((prop, pIndex) => (
                            <tr
                              key={pIndex}
                              className="border-b border-gray-200 dark:border-gray-700"
                            >
                              <td className="py-3 px-4">
                                <code className="text-primary-600 dark:text-primary-400 font-mono">
                                  {prop.name}
                                </code>
                              </td>
                              <td className="py-3 px-4 text-gray-600 dark:text-gray-400 font-mono text-xs">
                                {prop.type}
                              </td>
                              <td className="py-3 px-4 text-gray-600 dark:text-gray-400 font-mono text-xs">
                                {prop.default || '-'}
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2 py-1 rounded text-xs font-medium ${
                                    prop.required
                                      ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                  }`}
                                >
                                  {prop.required ? 'Yes' : 'No'}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                {prop.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Usage Examples */}
                <div className="p-6 bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Usage Examples
                    </h4>
                  </div>
                  <div className="space-y-4">
                    {template.usageExamples.map((example, eIndex) => (
                      <div key={eIndex}>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {example.title}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {example.description}
                        </p>
                        <CodeBlock code={example.code} language="typescript" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Use Case */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">💡 Use Case:</span> {template.useCase}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No templates found matching "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
}

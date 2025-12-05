import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { components } from '../data/designSystemData';
import CodeBlock from '../components/CodeBlock';
import ComponentPreview from '../components/ComponentPreview';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

export default function Components() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedComponent, setExpandedComponent] = useState<string | null>(null);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = ['All', ...new Set(components.map((c) => c.category))];
    return uniqueCategories;
  }, []);

  // Get component count per category
  const getCategoryCount = (category: string) => {
    if (category === 'All') return components.length;
    return components.filter((c) => c.category === category).length;
  };

  // Filter components by category and search term
  const filteredComponents = components.filter((component) => {
    const matchesCategory = selectedCategory === 'All' || component.category === selectedCategory;
    const matchesSearch =
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleComponent = (name: string) => {
    setExpandedComponent(expandedComponent === name ? null : name);
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
          Component Library
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
          Production-ready UI components with copy-paste code. Each component includes
          variants, props, and usage examples.
        </p>
      </div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-3"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200
              ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }
            `}
          >
            {category}
            <span
              className={`
                ml-2 px-2 py-0.5 rounded-full text-xs font-semibold
                ${
                  selectedCategory === category
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }
              `}
            >
              {getCategoryCount(category)}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search components..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-primary-500 focus:border-transparent
                     transition-all duration-200"
        />
      </div>

      {/* Components List */}
      <div className="space-y-6">
        {filteredComponents.map((component, index) => (
          <motion.div
            key={component.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Component Header */}
            <div
              className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700
                         transition-colors duration-200"
              onClick={() => toggleComponent(component.name)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {component.name}
                    </h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium
                                   bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                      {component.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {component.description}
                  </p>
                </div>
                {expandedComponent === component.name ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </div>

            {/* Component Details */}
            {expandedComponent === component.name && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                {/* Import Code */}
                <div className="p-6 bg-gray-50 dark:bg-gray-900">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Import
                  </h4>
                  <CodeBlock code={component.importCode} language="typescript" />
                </div>

                {/* Variants */}
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Variants
                  </h4>
                  <div className="space-y-6">
                    {component.variants.map((variant, vIndex) => (
                      <div
                        key={vIndex}
                        className="p-4 rounded-xl border border-gray-200 dark:border-gray-700
                                   bg-gray-50 dark:bg-gray-900"
                      >
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                          {variant.name}
                        </h5>

                        {/* Preview */}
                        <ComponentPreview
                          componentName={component.name}
                          variantPreview={variant.preview}
                        />

                        {/* Code */}
                        <CodeBlock code={variant.code} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Props */}
                <div className="p-6 bg-gray-50 dark:bg-gray-900">
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
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {component.props.map((prop, pIndex) => (
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
                              {prop.default}
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
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredComponents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No components found matching "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
}

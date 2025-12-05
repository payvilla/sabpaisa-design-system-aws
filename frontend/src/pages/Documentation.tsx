import { motion } from 'framer-motion';
import { useState } from 'react';
import { Copy, Check, Download, FileJson, FileCode, Package } from 'lucide-react';
import {
  exportAsJSON,
  exportAsCSSVariables,
  exportAsSCSS,
  exportAsTailwindConfig,
  downloadFile,
} from '../utils/designTokens';

type Tab = 'quickstart' | 'tokens' | 'snippets';

interface CodeSnippet {
  title: string;
  description: string;
  category: string;
  code: string;
  language: string;
}

const codeSnippets: CodeSnippet[] = [
  {
    title: 'Payment Form',
    description: 'Complete payment form with validation',
    category: 'Forms',
    language: 'tsx',
    code: `import { useState } from 'react';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validateAmount, validateCardNumber, validateCVV } from '@/utils/fintechValidators';
import ValidatedInput from '@/components/forms/ValidatedInput';

export default function PaymentForm() {
  const { values, errors, touched, handleChange, handleBlur, validateForm } = useFormValidation(
    { amount: '', cardNumber: '', cvv: '', expiry: '' },
    {
      amount: { validator: (val) => validateAmount(val, { min: 1, max: 100000 }), required: true },
      cardNumber: { validator: validateCardNumber, required: true },
      cvv: { validator: validateCVV, required: true },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Payment submitted:', values);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ValidatedInput
        label="Amount"
        type="number"
        value={values.amount}
        onChange={handleChange('amount')}
        onBlur={handleBlur('amount')}
        error={errors.amount}
        touched={touched.amount}
        required
      />
      <button type="submit" className="w-full py-3 bg-primary-600 text-white rounded-xl">
        Pay Now
      </button>
    </form>
  );
}`,
  },
  {
    title: 'Transaction List',
    description: 'Display list of transactions with status',
    category: 'Components',
    language: 'tsx',
    code: `import TransactionCard from '@/components/fintech/TransactionCard';
import { formatCurrency, getRelativeTime } from '@/utils';

interface Transaction {
  id: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'settled' | 'pending' | 'failed';
  timestamp: Date;
  merchantName: string;
}

export default function TransactionList({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="space-y-4">
      {transactions.map((txn) => (
        <TransactionCard
          key={txn.id}
          id={txn.id}
          amount={txn.amount}
          type={txn.type}
          status={txn.status}
          timestamp={txn.timestamp}
          merchantName={txn.merchantName}
        />
      ))}
    </div>
  );
}`,
  },
  {
    title: 'Currency Formatter Hook',
    description: 'Custom hook for formatting currency',
    category: 'Hooks',
    language: 'tsx',
    code: `import { useMemo } from 'react';
import { formatCurrency, formatIndianNumber } from '@/utils/formatters';

export function useCurrencyFormatter(amount: number, options?: { indian?: boolean }) {
  return useMemo(() => {
    if (options?.indian) {
      return formatIndianNumber(amount);
    }
    return formatCurrency(amount);
  }, [amount, options]);
}

// Usage
function Component() {
  const formatted = useCurrencyFormatter(150000, { indian: true });
  return <div>{formatted}</div>; // "1,50,000"
}`,
  },
  {
    title: 'API Fetch with Loading',
    description: 'Fetch data with loading and error states',
    category: 'Hooks',
    language: 'tsx',
    code: `import { useFetch } from '@/hooks/useCustomHooks';
import LoadingSpinner from '@/components/animations/LoadingSpinner';

export default function DataComponent() {
  const { data, loading, error, refetch } = useFetch<Transaction[]>('/api/transactions');

  if (loading) return <LoadingSpinner variant="circle" size="lg" />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}`,
  },
  {
    title: 'Metric Dashboard',
    description: 'Display key metrics with animated counters',
    category: 'Components',
    language: 'tsx',
    code: `import MetricCard from '@/components/charts/MetricCard';
import { TrendingUp, DollarSign, Users } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Total Revenue"
        value={452000}
        change={12.5}
        trend="up"
        icon={<DollarSign className="w-6 h-6" />}
        color="green"
        format="currency"
        currency="INR"
      />
      <MetricCard
        title="Transactions"
        value={1234}
        change={8.3}
        trend="up"
        icon={<TrendingUp className="w-6 h-6" />}
        color="blue"
      />
      <MetricCard
        title="Active Users"
        value={89}
        change={-2.1}
        trend="down"
        icon={<Users className="w-6 h-6" />}
        color="purple"
      />
    </div>
  );
}`,
  },
  {
    title: 'Date Range Filter',
    description: 'Filter data by date range',
    category: 'Utilities',
    language: 'tsx',
    code: `import { useState } from 'react';
import { startOfMonth, endOfMonth, formatDate } from '@/utils/dateTime';

export default function DateRangeFilter() {
  const [startDate, setStartDate] = useState(startOfMonth(new Date()));
  const [endDate, setEndDate] = useState(endOfMonth(new Date()));

  return (
    <div className="flex gap-4">
      <input
        type="date"
        value={formatDate(startDate, 'iso')}
        onChange={(e) => setStartDate(new Date(e.target.value))}
        className="px-4 py-2 rounded-lg border"
      />
      <input
        type="date"
        value={formatDate(endDate, 'iso')}
        onChange={(e) => setEndDate(new Date(e.target.value))}
        className="px-4 py-2 rounded-lg border"
      />
    </div>
  );
}`,
  },
];

export default function Documentation() {
  const [activeTab, setActiveTab] = useState<Tab>('quickstart');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(codeSnippets.map((s) => s.category)))];

  const filteredSnippets = selectedCategory === 'All'
    ? codeSnippets
    : codeSnippets.filter((s) => s.category === selectedCategory);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleExport = (format: 'json' | 'css' | 'scss' | 'tailwind') => {
    let content: string;
    let filename: string;
    let mimeType: string = 'text/plain';

    switch (format) {
      case 'json':
        content = exportAsJSON();
        filename = 'design-tokens.json';
        mimeType = 'application/json';
        break;
      case 'css':
        content = exportAsCSSVariables();
        filename = 'design-tokens.css';
        mimeType = 'text/css';
        break;
      case 'scss':
        content = exportAsSCSS();
        filename = 'design-tokens.scss';
        mimeType = 'text/x-scss';
        break;
      case 'tailwind':
        content = exportAsTailwindConfig();
        filename = 'tailwind.config.js';
        mimeType = 'text/javascript';
        break;
    }

    downloadFile(content, filename, mimeType);
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
          Documentation & Resources
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
          Everything you need to implement the SabPaisa Design System in your project. Quick start
          guides, code snippets, and exportable design tokens.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {[
          { id: 'quickstart', label: 'Quick Start' },
          { id: 'tokens', label: 'Design Tokens' },
          { id: 'snippets', label: 'Code Snippets' },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as Tab)}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === id
                ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Quick Start Tab */}
      {activeTab === 'quickstart' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          {/* Installation */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <Package className="w-6 h-6" />
              Installation
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Install the required dependencies to get started with the design system.
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">1. Install Tailwind CSS & dependencies</p>
                <div className="bg-gray-900 rounded-xl p-4 relative">
                  <button
                    onClick={() => copyCode('npm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init')}
                    className="absolute top-3 right-3 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                  >
                    {copiedCode === 'npm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init' ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
npm install -D tailwindcss postcss autoprefixer{'\n'}
npx tailwindcss init
                  </pre>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">2. Install additional dependencies</p>
                <div className="bg-gray-900 rounded-xl p-4 relative">
                  <button
                    onClick={() => copyCode('npm install framer-motion @headlessui/react lucide-react')}
                    className="absolute top-3 right-3 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                  >
                    {copiedCode === 'npm install framer-motion @headlessui/react lucide-react' ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
npm install framer-motion @headlessui/react lucide-react
                  </pre>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">3. Copy components to your project</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  Navigate to the Components page and copy any component code directly into your project.
                  All components are self-contained and ready to use.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Start Guide */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Start Guide
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  1. Setup Tailwind Config
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Export design tokens from the "Design Tokens" tab and add them to your tailwind.config.js
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  2. Copy Components
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Browse the Components page, find the components you need, and copy the code directly.
                  Create the corresponding files in your project:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>UI Components: <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">src/components/ui/</code></li>
                  <li>Fintech Components: <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">src/components/fintech/</code></li>
                  <li>Utilities: <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">src/utils/</code></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  3. Use in Your Project
                </h3>
                <div className="bg-gray-900 rounded-xl p-4 relative mt-3">
                  <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
{`import Button from '@/components/ui/Button';
import AmountDisplay from '@/components/fintech/AmountDisplay';
import { formatCurrency } from '@/utils/formatters';

export default function MyPage() {
  return (
    <div>
      <AmountDisplay amount={5000} type="credit" showIcon />
      <Button variant="primary">Pay Now</Button>
    </div>
  );
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Design Tokens Tab */}
      {activeTab === 'tokens' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Export Design Tokens
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Download design tokens in various formats for easy integration into your project.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleExport('json')}
                className="flex items-center gap-3 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
              >
                <FileJson className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">JSON Format</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    For JavaScript/TypeScript projects
                  </div>
                </div>
                <Download className="w-5 h-5 ml-auto text-blue-600 dark:text-blue-400" />
              </button>

              <button
                onClick={() => handleExport('css')}
                className="flex items-center gap-3 p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-2 border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-500 transition-colors"
              >
                <FileCode className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">CSS Variables</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    For vanilla CSS projects
                  </div>
                </div>
                <Download className="w-5 h-5 ml-auto text-purple-600 dark:text-purple-400" />
              </button>

              <button
                onClick={() => handleExport('scss')}
                className="flex items-center gap-3 p-6 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-2 border-pink-200 dark:border-pink-700 hover:border-pink-400 dark:hover:border-pink-500 transition-colors"
              >
                <FileCode className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">SCSS Variables</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    For Sass/SCSS projects
                  </div>
                </div>
                <Download className="w-5 h-5 ml-auto text-pink-600 dark:text-pink-400" />
              </button>

              <button
                onClick={() => handleExport('tailwind')}
                className="flex items-center gap-3 p-6 rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 border-2 border-cyan-200 dark:border-cyan-700 hover:border-cyan-400 dark:hover:border-cyan-500 transition-colors"
              >
                <FileCode className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">Tailwind Config</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    For Tailwind CSS projects
                  </div>
                </div>
                <Download className="w-5 h-5 ml-auto text-cyan-600 dark:text-cyan-400" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Code Snippets Tab */}
      {activeTab === 'snippets' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Snippets */}
          <div className="grid grid-cols-1 gap-6">
            {filteredSnippets.map((snippet, index) => (
              <motion.div
                key={snippet.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {snippet.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {snippet.description}
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
                      {snippet.category}
                    </span>
                  </div>
                  <button
                    onClick={() => copyCode(snippet.code)}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {copiedCode === snippet.code ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono">{snippet.code}</pre>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Copyright Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 p-6 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700"
      >
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            SabPaisa Product Design Engine
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} SabPaisa. All rights reserved. This documentation and all code snippets are proprietary.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

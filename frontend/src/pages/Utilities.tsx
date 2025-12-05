import { motion } from 'framer-motion';
import { useState } from 'react';
import { Copy, Check, Code2, Zap, Calendar, Type } from 'lucide-react';

// Import utilities
import * as formatters from '../utils/formatters';
import * as dateTime from '../utils/dateTime';
import * as stringUtils from '../utils/stringUtils';
import {
  useLocalStorage,
  useDebounce,
  useWindowSize,
  useToggle,
  useCopyToClipboard,
  useCountdown,
} from '../hooks/useCustomHooks';

type Tab = 'formatters' | 'datetime' | 'strings' | 'hooks';

interface UtilityDemo {
  name: string;
  description: string;
  code: string;
  result: string | number;
}

export default function Utilities() {
  const [activeTab, setActiveTab] = useState<Tab>('formatters');
  const [, copyToClipboard] = useCopyToClipboard();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Demo states
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const windowSize = useWindowSize();
  const [isToggled, toggle] = useToggle(false);
  const [storedName, setStoredName] = useLocalStorage('demoName', 'John');
  const { timeLeft, isRunning, start, pause, reset } = useCountdown(10);

  const copyCode = async (code: string) => {
    await copyToClipboard(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Formatter demos
  const formatterDemos: UtilityDemo[] = [
    {
      name: 'formatCurrency',
      description: 'Format amounts in INR, USD, EUR',
      code: `formatCurrency(5000)`,
      result: formatters.formatCurrency(5000),
    },
    {
      name: 'formatIndianNumber',
      description: 'Lakhs and Crores format',
      code: `formatIndianNumber(1500000)`,
      result: formatters.formatIndianNumber(1500000),
    },
    {
      name: 'formatAmountInWords',
      description: 'Convert amount to words',
      code: `formatAmountInWords(150000)`,
      result: formatters.formatAmountInWords(150000),
    },
    {
      name: 'abbreviateNumber',
      description: 'Abbreviate large numbers (Indian style)',
      code: `abbreviateNumber(15000000, true)`,
      result: formatters.abbreviateNumber(15000000, true),
    },
    {
      name: 'formatPercentage',
      description: 'Format decimal as percentage',
      code: `formatPercentage(0.125)`,
      result: formatters.formatPercentage(0.125),
    },
    {
      name: 'formatPhoneNumber',
      description: 'Format Indian phone number',
      code: `formatPhoneNumber('9876543210')`,
      result: formatters.formatPhoneNumber('9876543210'),
    },
    {
      name: 'formatCardNumber',
      description: 'Mask credit card with security',
      code: `formatCardNumber('1234567890123456', true)`,
      result: formatters.formatCardNumber('1234567890123456', true),
    },
    {
      name: 'maskData',
      description: 'Mask sensitive data',
      code: `maskData('ABCDE1234F', 5, 1)`,
      result: formatters.maskData('ABCDE1234F', 5, 1),
    },
  ];

  // DateTime demos
  const dateTimeDemos: UtilityDemo[] = [
    {
      name: 'formatDate',
      description: 'Format dates in various styles',
      code: `formatDate(new Date(), 'indian')`,
      result: dateTime.formatDate(new Date(), 'indian'),
    },
    {
      name: 'formatTime',
      description: 'Format time in 12h/24h',
      code: `formatTime(new Date(), '12h')`,
      result: dateTime.formatTime(new Date(), '12h'),
    },
    {
      name: 'getRelativeTime',
      description: 'Human-readable time ago',
      code: `getRelativeTime(Date.now() - 3600000)`,
      result: dateTime.getRelativeTime(Date.now() - 3600000),
    },
    {
      name: 'getSmartDate',
      description: 'Smart contextual date display',
      code: `getSmartDate(new Date())`,
      result: dateTime.getSmartDate(new Date()),
    },
    {
      name: 'getFiscalYear',
      description: 'Get Indian fiscal year',
      code: `getFiscalYear(new Date())`,
      result: dateTime.getFiscalYear(new Date()),
    },
    {
      name: 'getQuarter',
      description: 'Get quarter of the year',
      code: `getQuarter(new Date())`,
      result: dateTime.getQuarter(new Date()),
    },
    {
      name: 'formatDuration',
      description: 'Format seconds as duration',
      code: `formatDuration(3665)`,
      result: dateTime.formatDuration(3665),
    },
    {
      name: 'calculateAge',
      description: 'Calculate age from DOB',
      code: `calculateAge('1990-01-01')`,
      result: dateTime.calculateAge('1990-01-01'),
    },
  ];

  // String demos
  const stringDemos: UtilityDemo[] = [
    {
      name: 'capitalize',
      description: 'Capitalize first letter',
      code: `capitalize('hello world')`,
      result: stringUtils.capitalize('hello world'),
    },
    {
      name: 'capitalizeWords',
      description: 'Capitalize each word',
      code: `capitalizeWords('hello world')`,
      result: stringUtils.capitalizeWords('hello world'),
    },
    {
      name: 'toCamelCase',
      description: 'Convert to camelCase',
      code: `toCamelCase('hello world')`,
      result: stringUtils.toCamelCase('hello world'),
    },
    {
      name: 'toKebabCase',
      description: 'Convert to kebab-case',
      code: `toKebabCase('Hello World')`,
      result: stringUtils.toKebabCase('Hello World'),
    },
    {
      name: 'toSnakeCase',
      description: 'Convert to snake_case',
      code: `toSnakeCase('Hello World')`,
      result: stringUtils.toSnakeCase('Hello World'),
    },
    {
      name: 'truncate',
      description: 'Truncate with ellipsis',
      code: `truncate('Hello beautiful world', 15)`,
      result: stringUtils.truncate('Hello beautiful world', 15),
    },
    {
      name: 'slugify',
      description: 'Create URL-friendly slug',
      code: `slugify('Hello World!')`,
      result: stringUtils.slugify('Hello World!'),
    },
    {
      name: 'getInitials',
      description: 'Get initials from name',
      code: `getInitials('John Doe')`,
      result: stringUtils.getInitials('John Doe'),
    },
    {
      name: 'pluralize',
      description: 'Pluralize words',
      code: `pluralize('item', 5)`,
      result: stringUtils.pluralize('item', 5),
    },
    {
      name: 'generateUUID',
      description: 'Generate UUID v4',
      code: `generateUUID()`,
      result: stringUtils.generateUUID(),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Developer Utilities
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
          Production-ready utilities and hooks for formatting, dates, strings, and more. Copy-paste
          ready for immediate use in your fintech applications.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {[
          { id: 'formatters', label: 'Formatters', icon: Zap },
          { id: 'datetime', label: 'Date & Time', icon: Calendar },
          { id: 'strings', label: 'Strings', icon: Type },
          { id: 'hooks', label: 'React Hooks', icon: Code2 },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as Tab)}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
              activeTab === id
                ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Formatters Tab */}
      {activeTab === 'formatters' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formatterDemos.map((demo, index) => (
              <motion.div
                key={demo.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white font-mono text-sm">
                      {demo.name}()
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {demo.description}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-3 mb-3 relative">
                  <button
                    onClick={() => copyCode(demo.code)}
                    className="absolute top-2 right-2 p-1.5 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
                  >
                    {copiedCode === demo.code ? (
                      <Check className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </button>
                  <code className="text-xs text-gray-300 font-mono">{demo.code}</code>
                </div>

                <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                  <div className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                    {demo.result}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* DateTime Tab */}
      {activeTab === 'datetime' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dateTimeDemos.map((demo, index) => (
              <motion.div
                key={demo.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white font-mono text-sm">
                      {demo.name}()
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {demo.description}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-3 mb-3 relative">
                  <button
                    onClick={() => copyCode(demo.code)}
                    className="absolute top-2 right-2 p-1.5 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
                  >
                    {copiedCode === demo.code ? (
                      <Check className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </button>
                  <code className="text-xs text-gray-300 font-mono">{demo.code}</code>
                </div>

                <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                  <div className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                    {demo.result}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Strings Tab */}
      {activeTab === 'strings' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stringDemos.map((demo, index) => (
              <motion.div
                key={demo.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white font-mono text-sm">
                      {demo.name}()
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {demo.description}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-3 mb-3 relative">
                  <button
                    onClick={() => copyCode(demo.code)}
                    className="absolute top-2 right-2 p-1.5 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
                  >
                    {copiedCode === demo.code ? (
                      <Check className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </button>
                  <code className="text-xs text-gray-300 font-mono">{demo.code}</code>
                </div>

                <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                  <div className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                    {demo.result}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Hooks Tab */}
      {activeTab === 'hooks' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* useDebounce Demo */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              useDebounce Hook
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Debounce input values to prevent excessive updates
            </p>
            <div className="space-y-3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to search..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="text-xs text-gray-600 dark:text-gray-400">Immediate:</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                    {searchTerm || '(empty)'}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                  <div className="text-xs text-gray-600 dark:text-gray-400">Debounced (500ms):</div>
                  <div className="text-sm font-semibold text-primary-700 dark:text-primary-300 mt-1">
                    {debouncedSearch || '(empty)'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* useWindowSize Demo */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              useWindowSize Hook
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Get current window dimensions (resize window to see changes)
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-sm text-gray-600 dark:text-gray-400">Width:</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                  {windowSize.width}px
                </div>
              </div>
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                <div className="text-sm text-gray-600 dark:text-gray-400">Height:</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                  {windowSize.height}px
                </div>
              </div>
            </div>
          </div>

          {/* useToggle Demo */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              useToggle Hook
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Simple boolean toggle state management
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={toggle}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  isToggled
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {isToggled ? 'ON' : 'OFF'}
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Click to toggle • Current state: <strong>{isToggled.toString()}</strong>
              </span>
            </div>
          </div>

          {/* useLocalStorage Demo */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              useLocalStorage Hook
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Persist state in browser localStorage
            </p>
            <div className="space-y-3">
              <input
                type="text"
                value={storedName}
                onChange={(e) => setStoredName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Stored in localStorage as 'demoName':
                </div>
                <div className="text-sm font-semibold text-primary-700 dark:text-primary-300 mt-1">
                  {storedName || '(empty)'}
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Refresh the page - your value will persist!
              </p>
            </div>
          </div>

          {/* useCountdown Demo */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              useCountdown Hook
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Countdown timer with start, pause, and reset controls
            </p>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary-600 dark:text-primary-400">
                  {timeLeft}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">seconds</div>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={start}
                  disabled={isRunning}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Start
                </button>
                <button
                  onClick={pause}
                  disabled={!isRunning}
                  className="px-4 py-2 rounded-lg bg-yellow-600 text-white font-semibold hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Pause
                </button>
                <button
                  onClick={reset}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

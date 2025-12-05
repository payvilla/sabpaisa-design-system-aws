import { motion } from 'framer-motion';
import { Palette, Type, Box, Zap, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Palette,
    title: 'Color System',
    description: 'Comprehensive color palettes with WCAG compliance',
    href: '/colors',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Type,
    title: 'Typography',
    description: 'Consistent text styles with Inter font family',
    href: '/typography',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Box,
    title: 'Components',
    description: 'Production-ready UI components with copy-paste code',
    href: '/components',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Sub-10ms response time, optimized for speed',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Accessibility',
    description: 'WCAG 2.2 AA compliant design standards',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Sparkles,
    title: 'Fintech Patterns',
    description: 'Domain-specific patterns for payments and KYC',
    href: '/patterns',
    gradient: 'from-pink-500 to-rose-500',
  },
];

const stats = [
  { label: 'UI Components', value: '30+' },
  { label: 'Custom Fintech Icons', value: '70+' },
  { label: 'Utility Functions', value: '75+' },
  { label: 'React Hooks', value: '18+' },
];

export default function Overview() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 p-12 text-white"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-bold mb-4"
          >
            SabPaisa Design System
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-white/90 max-w-2xl mb-8"
          >
            World-class design system for building consistent, accessible, and beautiful
            financial applications. Copy, paste, and ship faster.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4"
          >
            <Link
              to="/colors"
              className="px-6 py-3 bg-white text-primary-600 rounded-xl font-semibold
                         hover:bg-gray-100 transition-colors duration-200"
            >
              Explore Colors
            </Link>
            <Link
              to="/components"
              className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl
                         font-semibold hover:bg-white/20 transition-colors duration-200"
            >
              View Components
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover-lift"
          >
            <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Features */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          What's Inside
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {feature.href ? (
                  <Link to={feature.href}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover-lift
                                    cursor-pointer group">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient}
                                      flex items-center justify-center mb-4 group-hover:scale-110
                                      transition-transform duration-200`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient}
                                    flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
        <p className="text-gray-300 mb-6">
          Start using the design system in your project in seconds:
        </p>
        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <p className="text-sm text-gray-400 mb-2">1. Import the component</p>
            <code className="text-sm text-primary-400 font-mono">
              import Button from '@/components/ui/Button';
            </code>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <p className="text-sm text-gray-400 mb-2">2. Use it in your code</p>
            <code className="text-sm text-secondary-400 font-mono">
              {'<Button variant="primary">Get Started</Button>'}
            </code>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <p className="text-sm text-gray-400 mb-2">3. Customize with props</p>
            <code className="text-sm text-accent-400 font-mono">
              {'<Button variant="primary" size="lg" fullWidth>Submit</Button>'}
            </code>
          </div>
        </div>
      </div>

      {/* Copyright Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
      >
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-4">
            <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Licensed Content
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            The SabPaisa Product Design Engine, including all components, patterns, icons, and
            documentation, is proprietary and confidential. All content is protected by
            copyright and intellectual property laws.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              © {new Date().getFullYear()} SabPaisa. All rights reserved.
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Building, Home, BarChart3, Users, Settings, Check, ChevronRight, ChevronLeft } from 'lucide-react';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'page-layouts' | 'loading' | 'splash' | 'fintech' | 'ui' | 'forms' | 'dashboards';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  preview: () => ReactNode;
  code: string;
  installation: {
    dependencies: string[];
    devDependencies?: string[];
    steps: string[];
  };
  props?: {
    name: string;
    type: string;
    default?: string;
    description: string;
    required: boolean;
  }[];
  usageExamples: {
    title: string;
    description: string;
    code: string;
  }[];
  framework: string;
  styling: string;
  useCase: string;
}

// Preview Components
const SnakeSpinnerPreview = () => {
  const segments = 12;
  const radius = 28;
  return (
    <div className="relative w-16 h-16">
      {Array.from({ length: segments }).map((_, i) => {
        const delay = i * 0.08;
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-primary-500 to-primary-600"
            style={{
              left: '50%',
              top: '50%',
              marginLeft: '-4px',
              marginTop: '-4px',
              transformOrigin: 'center',
            }}
            initial={{ rotate: i * 30 }}
            animate={{
              rotate: [i * 30, i * 30 + 360],
              scale: [1, 1.3, 1],
              opacity: [0.4, 1, 0.4],
              x: radius,
            }}
            transition={{
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: delay,
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
              },
              opacity: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
              },
              x: {
                duration: 0,
              },
            }}
          />
        );
      })}
    </div>
  );
};

const BouncingDotsPreview = () => (
  <div className="flex gap-3">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-4 h-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full"
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.15,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

const FadeZoomSplashPreview = () => (
  <div className="relative w-full h-48 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 rounded-xl overflow-hidden flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="text-center"
    >
      <motion.div
        className="text-white text-xl font-bold mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        SabPaisa
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
        className="h-1 bg-white/30 rounded-full mx-auto max-w-[120px]"
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
          className="h-full bg-white rounded-full"
        />
      </motion.div>
    </motion.div>
  </div>
);

const DashboardLayoutPreview = () => (
  <div className="flex h-48 bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden scale-75 origin-top-left w-[133%]">
    <aside className="w-24 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-2">
      <div className="text-xs font-bold mb-2">Dashboard</div>
      {[Home, BarChart3, Users, Settings].map((Icon, i) => (
        <div key={i} className="flex items-center gap-1 p-1 text-gray-700 dark:text-gray-300 rounded mb-1">
          <Icon className="w-3 h-3" />
        </div>
      ))}
    </aside>
    <div className="flex-1 flex flex-col">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 py-2">
        <div className="text-sm font-bold">Analytics</div>
      </header>
      <main className="flex-1 p-3">
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-2 border border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500">Metric {i}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  </div>
);

const PaymentCheckoutPreview = () => {
  const [selected, setSelected] = React.useState('card');
  return (
    <div className="max-w-xs p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg scale-90">
      <h3 className="text-lg font-bold mb-3">Complete Payment</h3>
      <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-xs text-gray-600 dark:text-gray-400">Total Amount</p>
        <p className="text-xl font-bold text-blue-600">₹1,234</p>
      </div>
      <div className="space-y-2">
        {[
          { id: 'card', icon: CreditCard, label: 'Card' },
          { id: 'upi', icon: Smartphone, label: 'UPI' },
          { id: 'bank', icon: Building, label: 'Net Banking' },
        ].map((method) => (
          <button
            key={method.id}
            onClick={() => setSelected(method.id)}
            className={`w-full flex items-center gap-2 p-2 rounded-lg border text-sm transition-all ${
              selected === method.id
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <method.icon className="w-4 h-4" />
            <span>{method.label}</span>
          </button>
        ))}
      </div>
      <button className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
        Pay ₹1,234
      </button>
    </div>
  );
};

const MultiStepFormPreview = () => {
  const currentStep = 2; // Static preview at step 2
  const steps = [
    { id: 1, title: 'Personal' },
    { id: 2, title: 'Business' },
    { id: 3, title: 'Documents' },
    { id: 4, title: 'Review' },
  ];
  return (
    <div className="w-full p-4 bg-white dark:bg-gray-800 rounded-xl scale-90">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step.id < currentStep
                    ? 'bg-green-500 text-white'
                    : step.id === currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.id < currentStep ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <p className="mt-1 text-xs">{step.title}</p>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-3 min-h-[80px]">
        <p className="text-sm">Step {currentStep} content</p>
      </div>
      <div className="flex justify-between">
        <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm" disabled>
          <ChevronLeft className="w-3 h-3" />
          Previous
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm" disabled>
          Next
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

// Templates Data
export const templates: Template[] = [
  // Loading Animations
  {
    id: 'snake-spinner-loader',
    name: 'Snake Spinner Loader',
    category: 'loading',
    description: 'Snake game-inspired spinner with segmented dots following each other in a circular motion',
    difficulty: 'Intermediate',
    tags: ['loading', 'spinner', 'animation', 'async'],
    preview: SnakeSpinnerPreview,
    code: `import { motion } from 'framer-motion';

export default function SnakeSpinner({ size = 64, color = '#006CED', segments = 12 }) {
  const radius = size * 0.44;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {Array.from({ length: segments }).map((_, i) => {
        const delay = (i * 0.08);
        const dotSize = size * 0.125;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: dotSize,
              height: dotSize,
              left: '50%',
              top: '50%',
              marginLeft: -dotSize / 2,
              marginTop: -dotSize / 2,
              background: \`linear-gradient(to bottom right, \${color}, \${color}DD)\`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.3, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: delay,
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
              },
              opacity: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
              },
            }}
            transformTemplate={({ rotate }) =>
              \`rotate(\${rotate}) translateX(\${radius}px)\`
            }
          />
        );
      })}
    </div>
  );
}`,
    installation: {
      dependencies: ['react', 'framer-motion'],
      devDependencies: ['@types/react'],
      steps: [
        'npm install framer-motion',
        'Copy the component code to your project (e.g., components/SnakeSpinner.tsx)',
        'Import and use: import SnakeSpinner from \'@/components/SnakeSpinner\'',
      ],
    },
    props: [
      {
        name: 'size',
        type: 'number',
        default: '64',
        description: 'Size of the loader in pixels',
        required: false,
      },
      {
        name: 'color',
        type: 'string',
        default: '#006CED',
        description: 'Color of the snake segments (hex, rgb, or CSS color)',
        required: false,
      },
      {
        name: 'segments',
        type: 'number',
        default: '12',
        description: 'Number of snake segments (recommended: 8-16)',
        required: false,
      },
    ],
    usageExamples: [
      {
        title: 'Basic Usage',
        description: 'Simple spinner with default settings',
        code: '<SnakeSpinner />',
      },
      {
        title: 'Custom Size and Color',
        description: 'Larger spinner with brand color',
        code: '<SnakeSpinner size={128} color="#FF8800" />',
      },
      {
        title: 'Button Loading State',
        description: 'Use inside a button during async operations',
        code: '<button disabled={loading}>\n  {loading ? <SnakeSpinner size={20} /> : \'Submit\'}\n</button>',
      },
    ],
    framework: 'react',
    styling: 'tailwindcss',
    useCase: 'Perfect for button loading states, page transitions, and async operations',
  },
  {
    id: 'bouncing-dots-loader',
    name: 'Bouncing Dots Loader',
    category: 'loading',
    description: 'Three dots bouncing in sequence for a playful loading effect',
    difficulty: 'Beginner',
    tags: ['loading', 'dots', 'animation', 'simple'],
    preview: BouncingDotsPreview,
    code: `import { motion } from 'framer-motion';

export default function BouncingDots({ color = '#006CED', dotSize = 16 }) {
  return (
    <div className="flex gap-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: dotSize,
            height: dotSize,
            background: \`linear-gradient(to bottom right, \${color}, \${color}DD)\`,
          }}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}`,
    installation: {
      dependencies: ['react', 'framer-motion'],
      devDependencies: ['@types/react'],
      steps: [
        'npm install framer-motion',
        'Copy the component code to your project',
        'Import and use in your app',
      ],
    },
    props: [
      {
        name: 'color',
        type: 'string',
        default: '#006CED',
        description: 'Color of the dots',
        required: false,
      },
      {
        name: 'dotSize',
        type: 'number',
        default: '16',
        description: 'Size of each dot in pixels',
        required: false,
      },
    ],
    usageExamples: [
      {
        title: 'Basic Usage',
        description: 'Default bouncing dots',
        code: '<BouncingDots />',
      },
      {
        title: 'Chat Message Loading',
        description: 'Show while typing indicator',
        code: '<div className="flex items-center gap-2">\n  <span>Typing</span>\n  <BouncingDots dotSize={8} />\n</div>',
      },
    ],
    framework: 'react',
    styling: 'tailwindcss',
    useCase: 'Ideal for message sending, chat applications, and content loading',
  },

  // Splash Screens
  {
    id: 'fade-zoom-splash',
    name: 'Fade & Zoom Splash Screen',
    category: 'splash',
    description: 'Elegant fade-in with zoom effect and gradient backdrop for app launch screens',
    difficulty: 'Intermediate',
    tags: ['splash', 'animation', 'launch', 'onboarding'],
    preview: FadeZoomSplashPreview,
    code: `import { motion } from 'framer-motion';

export default function FadeZoomSplash() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        <motion.img
          src="/brand/logos/Asset 2.svg"
          alt="SabPaisa"
          className="h-24 w-auto mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
          className="h-1 bg-white/30 rounded-full mx-auto max-w-xs"
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
            className="h-full bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}`,
    installation: {
      dependencies: ['react', 'framer-motion'],
      devDependencies: ['@types/react'],
      steps: [
        'npm install framer-motion',
        'Copy the component code to your project',
        'Replace logo path with your brand logo',
        'Use as app launch screen',
      ],
    },
    props: [],
    usageExamples: [
      {
        title: 'Basic Usage',
        description: 'Display as app launch screen',
        code: '<FadeZoomSplash />',
      },
      {
        title: 'With Auto-Hide',
        description: 'Hide after 2 seconds',
        code: 'const [showSplash, setShowSplash] = useState(true);\n\nuseEffect(() => {\n  setTimeout(() => setShowSplash(false), 2000);\n}, []);\n\nreturn showSplash ? <FadeZoomSplash /> : <MainApp />;',
      },
    ],
    framework: 'react',
    styling: 'tailwindcss',
    useCase: 'Perfect for app launches and initial loading screens',
  },

  // Page Layouts
  {
    id: 'dashboard-layout-basic',
    name: 'Basic Dashboard Layout',
    category: 'page-layouts',
    description: 'Complete dashboard with sidebar navigation, header, and responsive widget grid',
    difficulty: 'Intermediate',
    tags: ['dashboard', 'layout', 'grid', 'responsive', 'sidebar'],
    preview: DashboardLayoutPreview,
    code: `import { ReactNode } from 'react';
import { Home, BarChart3, Users, Settings } from 'lucide-react';

interface DashboardLayoutProps {
  title: string;
  children: ReactNode;
}

export default function DashboardLayout({ title, children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        </div>
        <nav className="space-y-1 px-3">
          {[{ icon: Home, label: 'Overview' },
             { icon: BarChart3, label: 'Analytics' },
             { icon: Users, label: 'Users' },
             { icon: Settings, label: 'Settings' }].map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}`,
    installation: {
      dependencies: ['react', 'lucide-react'],
      devDependencies: ['@types/react'],
      steps: [
        'npm install lucide-react',
        'Copy the component code to your project',
        'Wrap your dashboard content with this layout',
      ],
    },
    props: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: 'Dashboard page title displayed in header',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Dashboard content (widgets, charts, cards)',
      },
    ],
    usageExamples: [
      {
        title: 'Basic Usage',
        description: 'Simple dashboard with widgets',
        code: '<DashboardLayout title="Analytics Dashboard">\n  <MetricCard title="Revenue" value="$45,231" />\n  <MetricCard title="Users" value="1,234" />\n  <MetricCard title="Orders" value="567" />\n</DashboardLayout>',
      },
    ],
    framework: 'react',
    styling: 'tailwindcss',
    useCase: 'Complete dashboard page structure for admin panels and analytics views',
  },

  // Fintech Workflows
  {
    id: 'payment-checkout-flow',
    name: 'Payment Checkout Flow',
    category: 'fintech',
    description: 'Complete payment checkout with method selection, amount display, and confirmation',
    difficulty: 'Intermediate',
    tags: ['payment', 'checkout', 'fintech', 'transaction'],
    preview: PaymentCheckoutPreview,
    code: `import { useState } from 'react';
import { CreditCard, Smartphone, Building } from 'lucide-react';

const paymentMethods = [
  { id: 'card', name: 'Card', icon: CreditCard },
  { id: 'upi', name: 'UPI', icon: Smartphone },
  { id: 'netbanking', name: 'Net Banking', icon: Building },
];

export default function PaymentCheckout({ amount }: { amount: number }) {
  const [selected, setSelected] = useState('card');
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessing(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Complete Payment</h2>

      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
        <p className="text-3xl font-bold text-blue-600">₹{amount.toLocaleString('en-IN')}</p>
      </div>

      <div className="space-y-3 mb-6">
        <p className="text-sm font-semibold">Select Payment Method</p>
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelected(method.id)}
            className={\`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all \${
              selected === method.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }\`}
          >
            <method.icon className="w-6 h-6" />
            <span className="font-medium">{method.name}</span>
          </button>
        ))}
      </div>

      <button
        onClick={handlePayment}
        disabled={processing}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:opacity-50"
      >
        {processing ? 'Processing...' : \`Pay ₹\${amount.toLocaleString('en-IN')}\`}
      </button>
    </div>
  );
}`,
    installation: {
      dependencies: ['react', 'lucide-react'],
      devDependencies: ['@types/react'],
      steps: [
        'npm install lucide-react',
        'Copy the component code to your project',
        'Integrate with your payment gateway API',
      ],
    },
    props: [
      {
        name: 'amount',
        type: 'number',
        required: true,
        description: 'Payment amount in rupees',
      },
    ],
    usageExamples: [
      {
        title: 'Basic Usage',
        description: 'Simple checkout flow',
        code: '<PaymentCheckout amount={1234.56} />',
      },
    ],
    framework: 'react',
    styling: 'tailwindcss',
    useCase: 'Payment checkout pages for e-commerce and fintech applications',
  },

  // Forms
  {
    id: 'multi-step-form',
    name: 'Multi-Step Form Wizard',
    category: 'forms',
    description: 'Progressive form with step indicator, validation, and navigation controls',
    difficulty: 'Advanced',
    tags: ['form', 'wizard', 'multi-step', 'validation'],
    preview: MultiStepFormPreview,
    code: `import { useState } from 'react';
import { Check, ChevronRight, ChevronLeft } from 'lucide-react';

const steps = [
  { id: 1, title: 'Personal Info', description: 'Basic details' },
  { id: 2, title: 'Business Info', description: 'Company details' },
  { id: 3, title: 'Documents', description: 'Upload files' },
  { id: 4, title: 'Review', description: 'Confirm details' },
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={\`w-10 h-10 rounded-full flex items-center justify-center font-semibold \${
                  step.id < currentStep ? 'bg-green-500 text-white' :
                  step.id === currentStep ? 'bg-blue-600 text-white' :
                  'bg-gray-200 text-gray-600'
                }\`}>
                  {step.id < currentStep ? <Check className="w-5 h-5" /> : step.id}
                </div>
                <p className="mt-2 text-sm font-medium">{step.title}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={\`flex-1 h-1 mx-4 \${
                  step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }\`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">{steps[currentStep - 1].title}</h2>
        <div className="min-h-[200px]">
          <p>Step {currentStep} content</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(currentStep - 1, 1))}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-6 py-2 border rounded-lg disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(currentStep + 1, steps.length))}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          {currentStep === steps.length ? 'Submit' : 'Next'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}`,
    installation: {
      dependencies: ['react', 'lucide-react'],
      devDependencies: ['@types/react'],
      steps: [
        'npm install lucide-react',
        'Copy the component code to your project',
        'Customize steps array and form content for your use case',
      ],
    },
    props: [],
    usageExamples: [
      {
        title: 'Basic Usage',
        description: 'Simple multi-step form',
        code: '<MultiStepForm />',
      },
    ],
    framework: 'react',
    styling: 'tailwindcss',
    useCase: 'KYC onboarding, user registration, complex data collection forms',
  },
];

export const categories = {
  'page-layouts': {
    name: 'Page Layouts',
    description: 'Complete page templates for common use cases',
    icon: '📄',
    count: templates.filter((t) => t.category === 'page-layouts').length,
  },
  'loading': {
    name: 'Loading Animations',
    description: 'Animated loaders for async operations',
    icon: '⏳',
    count: templates.filter((t) => t.category === 'loading').length,
  },
  'splash': {
    name: 'Splash Screens',
    description: 'App launch and onboarding screens',
    icon: '🚀',
    count: templates.filter((t) => t.category === 'splash').length,
  },
  'fintech': {
    name: 'Fintech Workflows',
    description: 'Payment, KYC, and transaction templates',
    icon: '💳',
    count: templates.filter((t) => t.category === 'fintech').length,
  },
  'ui': {
    name: 'UI Components',
    description: 'Base UI components with variants',
    icon: '🎨',
    count: templates.filter((t) => t.category === 'ui').length,
  },
  'forms': {
    name: 'Form Patterns',
    description: 'Form layouts and validation patterns',
    icon: '📝',
    count: templates.filter((t) => t.category === 'forms').length,
  },
  'dashboards': {
    name: 'Dashboard Patterns',
    description: 'Dashboard widgets and layouts',
    icon: '📊',
    count: templates.filter((t) => t.category === 'dashboards').length,
  },
};

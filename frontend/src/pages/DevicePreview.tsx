import { motion } from 'framer-motion';
import { useState } from 'react';
import { Monitor, Smartphone, Tablet, RotateCw } from 'lucide-react';
import AmountDisplay from '../components/fintech/AmountDisplay';
import StatusBadge from '../components/fintech/StatusBadge';
import TransactionCard from '../components/fintech/TransactionCard';
import PaymentMethodSelector from '../components/fintech/PaymentMethodSelector';

type DeviceType = 'desktop' | 'tablet' | 'mobile';
type Orientation = 'portrait' | 'landscape';

interface Device {
  name: string;
  type: DeviceType;
  width: number;
  height: number;
  icon: React.ComponentType<any>;
}

const devices: Device[] = [
  { name: 'Desktop', type: 'desktop', width: 1920, height: 1080, icon: Monitor },
  { name: 'Laptop', type: 'desktop', width: 1440, height: 900, icon: Monitor },
  { name: 'iPad Pro', type: 'tablet', width: 1024, height: 1366, icon: Tablet },
  { name: 'iPad', type: 'tablet', width: 768, height: 1024, icon: Tablet },
  { name: 'iPhone 14 Pro', type: 'mobile', width: 393, height: 852, icon: Smartphone },
  { name: 'iPhone SE', type: 'mobile', width: 375, height: 667, icon: Smartphone },
  { name: 'Samsung Galaxy', type: 'mobile', width: 360, height: 800, icon: Smartphone },
];

const previewScenes = {
  'payment-flow': {
    name: 'Payment Flow',
    description: 'Complete payment checkout interface',
    component: () => {
      const [selectedPayment, setSelectedPayment] = useState('card');
      return (
        <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-full">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Your Payment
            </h2>
            <div className="text-center mb-6">
              <AmountDisplay amount={5499} type="neutral" size="xl" showIcon />
            </div>
            <PaymentMethodSelector
              selectedMethod={selectedPayment as any}
              onSelect={setSelectedPayment as any}
            />
            <button className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold">
              Pay ₹5,499
            </button>
          </div>
        </div>
      );
    },
  },
  'transaction-list': {
    name: 'Transaction History',
    description: 'List of recent transactions',
    component: () => (
      <div className="p-6 space-y-4 bg-gray-50 dark:bg-gray-900 min-h-full">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Transactions
        </h2>
        <TransactionCard
          id="TXN1234567890"
          amount={5000}
          type="credit"
          status="settled"
          date="2024-01-15T10:30:00"
          description="Payment Received"
          merchantName="E-commerce Store"
          paymentMethod="UPI"
        />
        <TransactionCard
          id="TXN1234567891"
          amount={-2500}
          type="debit"
          status="pending"
          date="2024-01-14T14:20:00"
          description="Food Order"
          merchantName="Food Delivery"
          paymentMethod="Card"
        />
        <TransactionCard
          id="TXN1234567892"
          amount={-1200}
          type="debit"
          status="settled"
          date="2024-01-13T09:15:00"
          description="Shopping Purchase"
          merchantName="Shopping Mall"
          paymentMethod="Net Banking"
        />
      </div>
    ),
  },
  'dashboard': {
    name: 'Dashboard',
    description: 'Merchant dashboard overview',
    component: () => (
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-full">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Today's Revenue</div>
            <AmountDisplay amount={125000} type="credit" size="lg" showIcon />
            <StatusBadge status="settled" className="mt-2" />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Pending</div>
            <AmountDisplay amount={25000} type="neutral" size="lg" showIcon />
            <StatusBadge status="pending" className="mt-2" />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Transactions</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">1,234</div>
            <div className="text-sm text-green-600 mt-2">↑ 12% from yesterday</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-100 transition-colors">
              New Transaction
            </button>
            <button className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 transition-colors">
              View Reports
            </button>
          </div>
        </div>
      </div>
    ),
  },
};

export default function DevicePreview() {
  const [selectedDevice, setSelectedDevice] = useState<Device>(devices[4]); // iPhone 14 Pro
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [selectedScene, setSelectedScene] = useState<keyof typeof previewScenes>('payment-flow');
  const [scale, setScale] = useState(0.7);

  const currentWidth = orientation === 'portrait' ? selectedDevice.width : selectedDevice.height;
  const currentHeight = orientation === 'portrait' ? selectedDevice.height : selectedDevice.width;

  const Scene = previewScenes[selectedScene].component;

  const canRotate = selectedDevice.type !== 'desktop';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Device Preview
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
          Test your components across different devices and screen sizes. Preview how your design
          adapts to mobile, tablet, and desktop viewports.
        </p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Select Device</h3>
          <div className="space-y-2">
            {devices.map((device) => {
              const Icon = device.icon;
              return (
                <button
                  key={device.name}
                  onClick={() => setSelectedDevice(device)}
                  className={`w-full p-3 rounded-xl text-left transition-all duration-200 flex items-center gap-3 ${
                    selectedDevice.name === device.name
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="flex-1">
                    <div>{device.name}</div>
                    <div className="text-xs opacity-60">
                      {device.width} × {device.height}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scene Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Select Scene</h3>
          <div className="space-y-2">
            {Object.entries(previewScenes).map(([key, scene]) => (
              <button
                key={key}
                onClick={() => setSelectedScene(key as keyof typeof previewScenes)}
                className={`w-full p-3 rounded-xl text-left transition-all duration-200 ${
                  selectedScene === key
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="font-medium">{scene.name}</div>
                <div className="text-xs opacity-60">{scene.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Settings</h3>

          {/* Orientation */}
          {canRotate && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Orientation
              </label>
              <button
                onClick={() =>
                  setOrientation(orientation === 'portrait' ? 'landscape' : 'portrait')
                }
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                <RotateCw className="w-4 h-4" />
                Rotate Device
              </button>
            </div>
          )}

          {/* Scale */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Preview Scale: {(scale * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.3"
              max="1"
              step="0.1"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Device Info */}
          <div className="mt-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <div>
                <strong>Device:</strong> {selectedDevice.name}
              </div>
              <div>
                <strong>Resolution:</strong> {currentWidth} × {currentHeight}px
              </div>
              <div>
                <strong>Type:</strong>{' '}
                {selectedDevice.type.charAt(0).toUpperCase() + selectedDevice.type.slice(1)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Device Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-center">
          <motion.div
            key={`${selectedDevice.name}-${orientation}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
            style={{
              width: `${currentWidth * scale}px`,
              height: `${currentHeight * scale}px`,
            }}
          >
            {/* Device Frame */}
            <div className="absolute inset-0 rounded-3xl bg-gray-900 p-4 shadow-2xl">
              {/* Device Notch/Camera (for mobile) */}
              {selectedDevice.type === 'mobile' && orientation === 'portrait' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl z-10" />
              )}

              {/* Screen */}
              <div className="w-full h-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden overflow-y-auto custom-scrollbar">
                <div style={{ transform: `scale(${1})`, transformOrigin: 'top left' }}>
                  <Scene />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Preview is scaled to {(scale * 100).toFixed(0)}% for better visibility. Actual device
          size: {currentWidth} × {currentHeight}px
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }
      `}</style>
    </div>
  );
}

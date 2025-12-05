import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Code, Eye } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

// Import components for demos
import AmountDisplay from '../components/fintech/AmountDisplay';
import TransactionCard from '../components/fintech/TransactionCard';
import PaymentMethodSelector from '../components/fintech/PaymentMethodSelector';
import KYCStatusIndicator from '../components/fintech/KYCStatusIndicator';
import SettlementSummary from '../components/fintech/SettlementSummary';
import MerchantCard from '../components/fintech/MerchantCard';
import FeeBreakdown from '../components/fintech/FeeBreakdown';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

interface Example {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  preview: React.ReactNode;
  code: string;
}

export default function Examples() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showCode, setShowCode] = useState<{ [key: string]: boolean }>({});
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [showRefundModal, setShowRefundModal] = useState(false);

  const toggleCode = (exampleId: string) => {
    setShowCode((prev) => ({ ...prev, [exampleId]: !prev[exampleId] }));
  };

  const examples: Example[] = [
    // ==================== PAYMENT FLOW ====================
    {
      id: 'payment-checkout',
      title: 'Payment Checkout Flow',
      description: 'Complete payment flow with method selection and amount display',
      category: 'Payment Flow',
      difficulty: 'beginner',
      preview: (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Complete Your Payment
            </h3>
            <AmountDisplay amount={5499} type="neutral" size="xl" showIcon />
          </div>
          <PaymentMethodSelector
            selectedMethod={selectedPayment as any}
            onSelect={setSelectedPayment as any}
          />
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold">
            Pay ₹5,499
          </button>
        </div>
      ),
      code: `import PaymentMethodSelector from '@/components/fintech/PaymentMethodSelector';
import AmountDisplay from '@/components/fintech/AmountDisplay';

function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState('card');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Complete Your Payment</h3>
        <AmountDisplay amount={5499} type="neutral" size="xl" showIcon />
      </div>
      <PaymentMethodSelector
        selectedMethod={selectedPayment}
        onMethodSelect={setSelectedPayment}
        availableMethods={['card', 'upi', 'netbanking', 'wallet']}
      />
      <button className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold">
        Pay ₹5,499
      </button>
    </div>
  );
}`,
    },

    // ==================== TRANSACTION HISTORY ====================
    {
      id: 'transaction-history',
      title: 'Transaction History List',
      description: 'Display list of transactions with expandable details',
      category: 'Transactions',
      difficulty: 'beginner',
      preview: (
        <div className="space-y-4">
          <TransactionCard
            id="TXN1234567890"
            amount={5000}
            type="credit"
            status="settled"
            date="2024-01-15T10:30:00"
            description="Payment Received"
            merchantName="E-commerce Store"
            paymentMethod="UPI"
            utr="UTR123456789"
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
            status="failed"
            date="2024-01-13T09:15:00"
            description="Shopping Purchase"
            merchantName="Shopping Mall"
            paymentMethod="Net Banking"
          />
        </div>
      ),
      code: `import TransactionCard from '@/components/fintech/TransactionCard';

function TransactionHistory() {
  const transactions = [
    {
      id: 'TXN1234567890',
      amount: 5000,
      type: 'credit',
      status: 'settled',
      timestamp: new Date('2024-01-15T10:30:00'),
      merchantName: 'E-commerce Store',
      paymentMethod: 'UPI',
      utr: 'UTR123456789',
    },
    // ... more transactions
  ];

  return (
    <div className="space-y-4">
      {transactions.map((txn) => (
        <TransactionCard key={txn.id} {...txn} />
      ))}
    </div>
  );
}`,
    },

    // ==================== FEE BREAKDOWN ====================
    {
      id: 'merchant-settlement',
      title: 'Merchant Settlement Dashboard',
      description: 'Complete settlement view with fee breakdown and status',
      category: 'Merchant Portal',
      difficulty: 'intermediate',
      preview: (
        <div className="grid gap-6 md:grid-cols-2">
          <SettlementSummary
            batchId="BATCH20240115001"
            transactionCount={156}
            grossAmount={100000}
            processingFee={2000}
            gst={360}
            netAmount={97640}
            settlementDate="Jan 17, 2024"
            status="pending"
          />
          <FeeBreakdown
            transactionAmount={10000}
            processingFee={{
              label: 'Processing Fee',
              amount: 200,
              percentage: 2,
              description: '2% of transaction amount',
            }}
            gst={{
              label: 'GST',
              amount: 36,
              percentage: 18,
              description: '18% on processing fee',
            }}
            showPercentage
          />
        </div>
      ),
      code: `import SettlementSummary from '@/components/fintech/SettlementSummary';
import FeeBreakdown from '@/components/fintech/FeeBreakdown';

function MerchantSettlement() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <SettlementSummary
        batchId="BATCH20240115001"
        transactionCount={156}
        grossAmount={100000}
        processingFee={2000}
        gst={360}
        netAmount={97640}
        settlementDate="Jan 17, 2024"
        status="pending"
      />
      <FeeBreakdown
        transactionAmount={10000}
        processingFee={{
          label: 'Processing Fee',
          amount: 200,
          percentage: 2,
        }}
        gst={{
          label: 'GST',
          amount: 36,
          percentage: 18,
        }}
      />
    </div>
  );
}`,
    },

    // ==================== KYC VERIFICATION ====================
    {
      id: 'kyc-flow',
      title: 'KYC Verification Flow',
      description: 'Complete KYC onboarding with status indicators',
      category: 'KYC & Onboarding',
      difficulty: 'intermediate',
      preview: (
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Complete Your KYC
            </h3>
            <KYCStatusIndicator
              steps={[
                { id: 'step1', label: 'Personal Details', status: 'completed' },
                { id: 'step2', label: 'Document Upload', status: 'completed' },
                { id: 'step3', label: 'Verification', status: 'current' },
                { id: 'step4', label: 'Approval', status: 'pending' },
              ]}
              orientation="vertical"
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 text-xl">📄</span>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Your documents are under review
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-300">
                  Typically takes 24-48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      code: `import KYCStatusIndicator from '@/components/fintech/KYCStatusIndicator';

function KYCFlow() {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Complete Your KYC</h3>
        <KYCStatusIndicator
          steps={[
            { label: 'Personal Details', status: 'completed' },
            { label: 'Document Upload', status: 'completed' },
            { label: 'Verification', status: 'current' },
            { label: 'Approval', status: 'pending' },
          ]}
          orientation="vertical"
        />
      </div>
    </div>
  );
}`,
    },

    // ==================== MERCHANT MANAGEMENT ====================
    {
      id: 'merchant-list',
      title: 'Merchant Management',
      description: 'Display and manage merchant profiles',
      category: 'Merchant Portal',
      difficulty: 'beginner',
      preview: (
        <div className="grid gap-4 md:grid-cols-2">
          <MerchantCard
            merchantId="MID123456"
            businessName="Tech Solutions Pvt Ltd"
            contactPerson="John Doe"
            email="contact@techsolutions.com"
            phone="+91 98765 43210"
            address="123 Tech Park, Bangalore"
            kycStatus="approved"
            verified={true}
            onViewDetails={() => alert('View details')}
          />
          <MerchantCard
            merchantId="MID123457"
            businessName="Food Services Inc"
            contactPerson="Jane Smith"
            email="info@foodservices.com"
            phone="+91 98765 43211"
            address="456 Food Street, Mumbai"
            kycStatus="pending"
            verified={false}
            onViewDetails={() => alert('View details')}
          />
        </div>
      ),
      code: `import MerchantCard from '@/components/fintech/MerchantCard';

function MerchantList() {
  const merchants = [
    {
      merchantName: 'Tech Solutions Pvt Ltd',
      merchantId: 'MID123456',
      email: 'contact@techsolutions.com',
      phone: '+91 98765 43210',
      kycStatus: 'approved',
      isVerified: true,
    },
    // ... more merchants
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {merchants.map((merchant) => (
        <MerchantCard
          key={merchant.merchantId}
          {...merchant}
          onViewDetails={() => handleViewDetails(merchant.merchantId)}
        />
      ))}
    </div>
  );
}`,
    },

    // ==================== REFUND FLOW ====================
    {
      id: 'refund-flow',
      title: 'Refund Processing',
      description: 'Handle refund requests with confirmation',
      category: 'Transactions',
      difficulty: 'advanced',
      preview: (
        <div className="space-y-4">
          <TransactionCard
            id="TXN9876543210"
            amount={-3500}
            type="debit"
            status="settled"
            date="2024-01-10T16:45:00"
            description="Electronics Purchase"
            merchantName="Electronics Store"
            paymentMethod="Card"
            utr="UTR987654321"
          />
          <button
            onClick={() => setShowRefundModal(true)}
            className="w-full py-3 rounded-xl border-2 border-primary-600 text-primary-600 font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20"
          >
            Initiate Refund
          </button>

          <Modal
            isOpen={showRefundModal}
            onClose={() => setShowRefundModal(false)}
            title="Confirm Refund"
            size="md"
          >
            <Modal.Body>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Are you sure you want to refund this transaction?
                </p>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Transaction ID</span>
                    <span className="text-sm font-mono text-gray-900 dark:text-white">TXN9876543210</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Refund Amount</span>
                    <AmountDisplay amount={3500} type="credit" size="sm" showSign />
                  </div>
                </div>
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <p className="text-xs text-amber-800 dark:text-amber-200">
                    Refund will be processed within 5-7 business days
                  </p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setShowRefundModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRefundModal(false);
                  alert('Refund initiated!');
                }}
                className="px-4 py-2 rounded-lg bg-primary-600 text-white"
              >
                Confirm Refund
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      ),
      code: `import TransactionCard from '@/components/fintech/TransactionCard';
import Modal from '@/components/ui/Modal';
import AmountDisplay from '@/components/fintech/AmountDisplay';

function RefundFlow() {
  const [showRefundModal, setShowRefundModal] = useState(false);

  return (
    <div className="space-y-4">
      <TransactionCard {...transactionData} />
      <button onClick={() => setShowRefundModal(true)}>
        Initiate Refund
      </button>

      <Modal
        isOpen={showRefundModal}
        onClose={() => setShowRefundModal(false)}
        title="Confirm Refund"
      >
        <Modal.Body>
          <div className="space-y-4">
            <p>Are you sure you want to refund this transaction?</p>
            <div className="p-4 bg-gray-50 rounded-lg">
              <AmountDisplay amount={3500} type="credit" showSign />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setShowRefundModal(false)}>Cancel</button>
          <button onClick={handleRefund}>Confirm Refund</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}`,
    },
  ];

  const categories = ['All', ...new Set(examples.map((ex) => ex.category))];
  const filteredExamples =
    selectedCategory === 'All'
      ? examples
      : examples.filter((ex) => ex.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
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
          Real-World Examples
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
          Production-ready examples demonstrating how to use SabPaisa components in real fintech
          scenarios. Each example includes live preview and copy-paste code.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
          <div className="text-3xl font-bold gradient-text">{examples.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Examples</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
          <div className="text-3xl font-bold gradient-text">{categories.length - 1}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
          <div className="text-3xl font-bold gradient-text">100%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Production Ready</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
          <div className="text-3xl font-bold gradient-text">Live</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Interactive</div>
        </div>
      </div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
          </button>
        ))}
      </motion.div>

      {/* Examples Grid */}
      <div className="space-y-8">
        {filteredExamples.map((example, index) => (
          <motion.div
            key={example.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Example Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {example.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{example.description}</p>
                </div>
                <Badge
                  variant="subtle"
                  className={getDifficultyColor(example.difficulty)}
                >
                  {example.difficulty}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                  {example.category}
                </span>
              </div>
            </div>

            {/* Preview */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Live Preview
                </h4>
              </div>
              <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                {example.preview}
              </div>
            </div>

            {/* Code */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Source Code
                </h4>
                <button
                  onClick={() => toggleCode(example.id)}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-2"
                >
                  {showCode[example.id] ? 'Hide Code' : 'Show Code'}
                  <ArrowRight className={`w-4 h-4 transition-transform ${showCode[example.id] ? 'rotate-90' : ''}`} />
                </button>
              </div>
              {showCode[example.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <CodeBlock code={example.code} language="typescript" />
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

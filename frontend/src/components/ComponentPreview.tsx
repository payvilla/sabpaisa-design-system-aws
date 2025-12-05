import { useState } from 'react';
import Badge from './ui/Badge';
import Switch from './ui/Switch';
import Checkbox from './ui/Checkbox';
import Radio from './ui/Radio';
import Tooltip from './ui/Tooltip';
import Select from './ui/Select';
import Modal from './ui/Modal';
import Tabs from './ui/Tabs';
import AmountDisplay from './fintech/AmountDisplay';
import StatusBadge from './fintech/StatusBadge';
import TransactionCard from './fintech/TransactionCard';
import PaymentMethodSelector from './fintech/PaymentMethodSelector';
import KYCStatusIndicator from './fintech/KYCStatusIndicator';
import SettlementSummary from './fintech/SettlementSummary';
import MerchantCard from './fintech/MerchantCard';
import FeeBreakdown from './fintech/FeeBreakdown';
import { CreditCard, Shield } from 'lucide-react';

interface ComponentPreviewProps {
  componentName: string;
  variantPreview: string;
}

export default function ComponentPreview({ componentName, variantPreview }: ComponentPreviewProps) {
  // State management for interactive components
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioSelected, setRadioSelected] = useState('option1');
  const [selectedValue, setSelectedValue] = useState('option1');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('card');

  const renderPreview = () => {
    switch (componentName) {
      // ==================== GENERAL UI COMPONENTS ====================
      case 'Button':
        return (
          <button
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              variantPreview === 'primary'
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-lg'
                : variantPreview === 'secondary'
                ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white hover:from-teal-700 hover:to-teal-600 shadow-lg'
                : variantPreview === 'outline'
                ? 'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                : variantPreview === 'ghost'
                ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                : 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 shadow-lg'
            }`}
          >
            {variantPreview.charAt(0).toUpperCase() + variantPreview.slice(1)} Button
          </button>
        );

      case 'Badge':
        return (
          <Badge
            variant={variantPreview as any}
            color="primary"
            icon={variantPreview === 'with-icon' ? <Shield className="w-4 h-4" /> : undefined}
          >
            {variantPreview === 'solid' ? 'Solid Badge' : variantPreview === 'outline' ? 'Outline Badge' : 'Subtle Badge'}
          </Badge>
        );

      case 'Switch':
        return (
          <div className="space-y-2">
            <Switch
              checked={switchChecked}
              onChange={setSwitchChecked}
              label={variantPreview === 'with-label' ? 'Enable notifications' : undefined}
              variant={variantPreview.includes('secondary') ? 'secondary' : 'primary'}
              size={variantPreview.includes('small') ? 'sm' : 'md'}
            />
          </div>
        );

      case 'Checkbox':
        return (
          <Checkbox
            checked={checkboxChecked}
            onChange={(e) => setCheckboxChecked(e.target.checked)}
            label={variantPreview === 'with-label' ? 'Accept terms and conditions' : undefined}
            description={variantPreview === 'with-description' ? 'You agree to our Terms of Service' : undefined}
          />
        );

      case 'Radio':
        return (
          <div className="space-y-3">
            <Radio
              name="demo"
              value="option1"
              checked={radioSelected === 'option1'}
              onChange={(e) => setRadioSelected(e.target.value)}
              label="Option 1"
            />
            <Radio
              name="demo"
              value="option2"
              checked={radioSelected === 'option2'}
              onChange={(e) => setRadioSelected(e.target.value)}
              label="Option 2"
              description={variantPreview === 'with-description' ? 'Additional information' : undefined}
            />
          </div>
        );

      case 'Tooltip':
        return (
          <Tooltip content="This is a helpful tooltip" position={variantPreview as any}>
            <button className="px-4 py-2 rounded-lg bg-primary-600 text-white">
              Hover me ({variantPreview})
            </button>
          </Tooltip>
        );

      case 'Select':
        const options = [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ];
        return (
          <div className="w-full max-w-xs">
            <Select
              options={options}
              value={selectedValue}
              onChange={(value) => setSelectedValue(String(value))}
              label={variantPreview !== 'no-label' ? 'Select an option' : undefined}
              variant={variantPreview.includes('filled') ? 'filled' : variantPreview.includes('outline') ? 'outline' : 'default'}
            />
          </div>
        );

      case 'Modal':
        return (
          <>
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
            >
              Open Modal ({variantPreview})
            </button>
            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Modal Title"
              size={variantPreview as any}
            >
              <Modal.Body>
                <p className="text-gray-600 dark:text-gray-400">
                  This is a {variantPreview} modal example with some content.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-primary-600 text-white"
                >
                  Confirm
                </button>
              </Modal.Footer>
            </Modal>
          </>
        );

      case 'Tabs':
        return (
          <Tabs
            variant={variantPreview as any}
            tabs={[
              {
                label: 'Tab 1',
                icon: <CreditCard className="w-4 h-4" />,
                content: <p className="text-gray-600 dark:text-gray-400">Content for tab 1</p>
              },
              {
                label: 'Tab 2',
                content: <p className="text-gray-600 dark:text-gray-400">Content for tab 2</p>
              },
              {
                label: 'Tab 3',
                content: <p className="text-gray-600 dark:text-gray-400">Content for tab 3</p>
              }
            ]}
          />
        );

      case 'Typography':
        return (
          <div
            className={`text-gray-900 dark:text-white ${
              variantPreview === 'h1'
                ? 'text-5xl font-bold'
                : variantPreview === 'h2'
                ? 'text-4xl font-bold'
                : variantPreview === 'body-large'
                ? 'text-lg'
                : 'text-base'
            }`}
          >
            {variantPreview === 'h1' ? 'Heading 1' : variantPreview === 'h2' ? 'Heading 2' : 'Body Text'}
          </div>
        );

      case 'Card':
        return (
          <div
            className={`p-6 rounded-xl ${
              variantPreview === 'glass'
                ? 'glass border border-white/20'
                : 'bg-white dark:bg-gray-700 shadow-lg'
            }`}
          >
            <div className="text-gray-900 dark:text-white font-semibold mb-2">Card Title</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Card content goes here with some example text.
            </div>
          </div>
        );

      case 'TextField':
        return (
          <div className="w-full max-w-md">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-2 rounded-lg border ${
                variantPreview === 'error'
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                 focus:ring-2 focus:border-transparent transition-all duration-200`}
            />
            {variantPreview === 'error' && (
              <p className="mt-1 text-sm text-red-500">Invalid email format</p>
            )}
          </div>
        );

      // ==================== FINTECH COMPONENTS ====================
      case 'AmountDisplay':
        return (
          <div className="space-y-3">
            <AmountDisplay
              amount={variantPreview === 'credit' ? 5000 : variantPreview === 'debit' ? -2500 : 10000}
              type={variantPreview as any}
              showSign
              showIcon
              size="lg"
            />
          </div>
        );

      case 'StatusBadge':
        return (
          <div className="flex flex-wrap gap-3">
            <StatusBadge status={variantPreview as any} />
          </div>
        );

      case 'TransactionCard':
        return (
          <TransactionCard
            id="TXN123456789"
            amount={variantPreview === 'credit' ? 5000 : -2500}
            type={variantPreview as any}
            status={variantPreview === 'failed' ? 'failed' : variantPreview === 'pending' ? 'pending' : 'settled'}
            date={new Date().toISOString()}
            description="Sample Transaction"
            merchantName="Sample Merchant"
            paymentMethod="UPI"
          />
        );

      case 'PaymentMethodSelector':
        return (
          <PaymentMethodSelector
            selectedMethod={selectedPayment as any}
            onSelect={setSelectedPayment as any}
          />
        );

      case 'KYCStatusIndicator':
        return (
          <KYCStatusIndicator
            steps={[
              { id: 'step1', label: 'Personal Details', status: 'completed' },
              { id: 'step2', label: 'Document Upload', status: variantPreview === 'pending' ? 'pending' : 'completed' },
              { id: 'step3', label: 'Verification', status: variantPreview === 'failed' ? 'failed' : variantPreview === 'current' ? 'current' : 'pending' },
              { id: 'step4', label: 'Approval', status: 'pending' },
            ]}
            orientation={variantPreview === 'horizontal' ? 'horizontal' : 'vertical'}
          />
        );

      case 'SettlementSummary':
        return (
          <SettlementSummary
            batchId="BATCH20240101001"
            grossAmount={100000}
            processingFee={2000}
            gst={360}
            netAmount={97640}
            transactionCount={45}
            settlementDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()}
            status={variantPreview as any}
            utr={variantPreview === 'completed' ? 'UTR1234567890' : undefined}
          />
        );

      case 'MerchantCard':
        return (
          <MerchantCard
            merchantId="MID123456"
            businessName="Sample Business Pvt Ltd"
            contactPerson="John Doe"
            email="contact@samplebusiness.com"
            phone="+91 98765 43210"
            address="123 Business Street, Mumbai"
            kycStatus={variantPreview as any}
            verified={variantPreview === 'approved'}
            onViewDetails={() => alert('View details clicked')}
          />
        );

      case 'FeeBreakdown':
        return (
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
            additionalFees={
              variantPreview === 'with-additional'
                ? [
                    {
                      label: 'Platform Fee',
                      amount: 50,
                      description: 'Fixed platform charge',
                    },
                  ]
                : []
            }
            showPercentage={variantPreview !== 'no-percentage'}
          />
        );

      default:
        return (
          <div className="text-gray-500 dark:text-gray-400 italic">
            Preview not available for this component
          </div>
        );
    }
  };

  return (
    <div className="p-6 min-h-[200px] rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center">
      {renderPreview()}
    </div>
  );
}

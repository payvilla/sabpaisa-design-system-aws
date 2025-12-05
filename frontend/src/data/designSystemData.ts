export const colors = {
  primary: {
    name: 'Primary Blue',
    description: 'Main CTAs, primary navigation, key interactive elements',
    shades: {
      50: { hex: '#eff6ff', usage: 'Lightest backgrounds, subtle highlights' },
      100: { hex: '#dbeafe', usage: 'Light backgrounds, disabled states' },
      200: { hex: '#bfdbfe', usage: 'Hover backgrounds, selected states' },
      300: { hex: '#93c5fd', usage: 'Disabled states, subtle accents' },
      400: { hex: '#60a5fa', usage: 'Borders, icons, lighter interactive elements' },
      500: { hex: '#3b82f6', usage: 'Primary brand color' },
      600: { hex: '#2563eb', usage: 'Primary hover states' },
      700: { hex: '#1d4ed8', usage: 'Primary active/pressed states' },
      800: { hex: '#1e40af', usage: 'Dark mode primary' },
      900: { hex: '#1e3a8a', usage: 'Darkest shade' },
    },
  },
  secondary: {
    name: 'Secondary Teal',
    description: 'Secondary actions, supporting elements, success states',
    shades: {
      50: { hex: '#eff5f5', usage: 'Lightest backgrounds' },
      100: { hex: '#dbf0ee', usage: 'Light backgrounds' },
      200: { hex: '#aeeae5', usage: 'Hover backgrounds' },
      300: { hex: '#7ce9df', usage: 'Subtle accents' },
      400: { hex: '#48eadc', usage: 'Borders, icons' },
      500: { hex: '#15ead7', usage: 'Secondary brand color' },
      600: { hex: '#0d9488', usage: 'Base teal' },
      700: { hex: '#10bcac', usage: 'Hover states' },
      800: { hex: '#10897f', usage: 'Active states' },
      900: { hex: '#0d5953', usage: 'Darkest shade' },
    },
  },
  accent: {
    name: 'Accent Orange',
    description: 'Highlights, warnings, call-to-action emphasis',
    shades: {
      50: { hex: '#f6f3ee', usage: 'Lightest backgrounds' },
      100: { hex: '#f2e6d9', usage: 'Light backgrounds' },
      200: { hex: '#f0cea8', usage: 'Hover backgrounds' },
      300: { hex: '#f4b771', usage: 'Subtle accents' },
      400: { hex: '#fa9f38', usage: 'Borders, icons' },
      500: { hex: '#ff8800', usage: 'Base orange' },
      600: { hex: '#ff8800', usage: 'Hover states' },
      700: { hex: '#cc6d00', usage: 'Active states' },
      800: { hex: '#955104', usage: 'Darker shade' },
      900: { hex: '#613605', usage: 'Darkest shade' },
    },
  },
  semantic: {
    success: { hex: '#22c55e', usage: 'Success messages, positive confirmations' },
    error: { hex: '#ef4444', usage: 'Error messages, validation failures' },
    warning: { hex: '#f59e0b', usage: 'Warning messages, cautionary states' },
    info: { hex: '#3b82f6', usage: 'Informational messages, tips' },
  },
  transaction: {
    credit: { hex: '#22c55e', usage: 'Money in, deposits, credits' },
    debit: { hex: '#ef4444', usage: 'Money out, withdrawals, debits' },
    pending: { hex: '#f59e0b', usage: 'Pending transactions, awaiting status' },
    settled: { hex: '#06b6d4', usage: 'Settled transactions, completed' },
    refunded: { hex: '#a855f7', usage: 'Refunded amounts' },
    failed: { hex: '#dc2626', usage: 'Failed transactions' },
  },
  neutral: {
    name: 'Neutral Grey',
    description: 'Greys for text, backgrounds, borders, and UI elements',
    shades: {
      50: { hex: '#f9fafb', usage: 'Lightest backgrounds, subtle borders' },
      100: { hex: '#f3f4f6', usage: 'Card backgrounds, hover states' },
      200: { hex: '#e5e7eb', usage: 'Borders, dividers' },
      300: { hex: '#d1d5db', usage: 'Disabled backgrounds, placeholders' },
      400: { hex: '#9ca3af', usage: 'Disabled text, subtle text' },
      500: { hex: '#6b7280', usage: 'Secondary text, icons' },
      600: { hex: '#4b5563', usage: 'Body text, labels' },
      700: { hex: '#374151', usage: 'Headings, dark text' },
      800: { hex: '#1f2937', usage: 'Dark mode backgrounds' },
      900: { hex: '#111827', usage: 'Darkest backgrounds, rich blacks' },
      950: { hex: '#030712', usage: 'Pure black, maximum contrast' },
    },
  },
  gradients: {
    name: 'Gradients',
    description: 'Beautiful gradients for backgrounds, cards, and visual appeal',
    collection: {
      blueTeal: {
        name: 'Blue to Teal',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
        css: 'bg-gradient-to-br from-blue-500 to-cyan-500',
        usage: 'Primary brand gradient, hero sections',
      },
      tealGreen: {
        name: 'Teal to Green',
        gradient: 'linear-gradient(135deg, #0d9488 0%, #22c55e 100%)',
        css: 'bg-gradient-to-br from-teal-600 to-green-500',
        usage: 'Success states, positive actions',
      },
      blueIndigo: {
        name: 'Blue to Indigo',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
        css: 'bg-gradient-to-br from-blue-500 to-indigo-500',
        usage: 'Secondary brand gradient',
      },
      orangePink: {
        name: 'Orange to Pink',
        gradient: 'linear-gradient(135deg, #ff8800 0%, #ec4899 100%)',
        css: 'bg-gradient-to-br from-orange-500 to-pink-500',
        usage: 'Accent gradient, CTAs',
      },
      purpleBlue: {
        name: 'Purple to Blue',
        gradient: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
        css: 'bg-gradient-to-br from-purple-500 to-blue-500',
        usage: 'Premium features, highlights',
      },
      darkGradient: {
        name: 'Dark Gradient',
        gradient: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        css: 'bg-gradient-to-br from-gray-800 to-gray-900',
        usage: 'Dark mode backgrounds, footers',
      },
    },
  },
};

export const typography = {
  fontFamilies: [
    {
      name: 'Heading',
      value: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
      class: 'font-heading',
      usage: 'For headings and titles',
    },
    {
      name: 'Body',
      value: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
      class: 'font-body',
      usage: 'For body text and paragraphs',
    },
    {
      name: 'Mono',
      value: 'source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace',
      class: 'font-mono',
      usage: 'For code blocks and monospace text',
    },
  ],
  fontSizes: [
    { name: 'XS', value: '0.75rem', pixels: '12px', class: 'text-xs', usage: 'Captions, labels' },
    { name: 'SM', value: '0.875rem', pixels: '14px', class: 'text-sm', usage: 'Small body text' },
    { name: 'Base', value: '1rem', pixels: '16px', class: 'text-base', usage: 'Base body text' },
    { name: 'LG', value: '1.125rem', pixels: '18px', class: 'text-lg', usage: 'Large body text' },
    { name: 'XL', value: '1.25rem', pixels: '20px', class: 'text-xl', usage: 'Small headings' },
    { name: '2XL', value: '1.5rem', pixels: '24px', class: 'text-2xl', usage: 'H4' },
    { name: '3XL', value: '1.875rem', pixels: '30px', class: 'text-3xl', usage: 'H3' },
    { name: '4XL', value: '2.25rem', pixels: '36px', class: 'text-4xl', usage: 'H2' },
    { name: '5XL', value: '3rem', pixels: '48px', class: 'text-5xl', usage: 'H1' },
  ],
  fontWeights: [
    { name: 'Normal', value: '400', class: 'font-normal', usage: 'Regular text' },
    { name: 'Medium', value: '500', class: 'font-medium', usage: 'Slightly emphasized' },
    { name: 'Semibold', value: '600', class: 'font-semibold', usage: 'Sub-headings' },
    { name: 'Bold', value: '700', class: 'font-bold', usage: 'Headings, emphasis' },
    { name: 'Extrabold', value: '800', class: 'font-extrabold', usage: 'Extra emphasis' },
  ],
};

export const components = [
  {
    name: 'Button',
    category: 'Interactive',
    description: 'Primary interactive component for user actions',
    variants: [
      {
        name: 'Primary',
        code: `<Button variant="primary" size="md">
  Continue
</Button>`,
        preview: 'primary',
      },
      {
        name: 'Secondary',
        code: `<Button variant="secondary" size="md">
  Cancel
</Button>`,
        preview: 'secondary',
      },
      {
        name: 'Outline',
        code: `<Button variant="outline" size="md">
  Learn More
</Button>`,
        preview: 'outline',
      },
      {
        name: 'Ghost',
        code: `<Button variant="ghost" size="md">
  Skip
</Button>`,
        preview: 'ghost',
      },
      {
        name: 'Danger',
        code: `<Button variant="danger" size="md">
  Delete
</Button>`,
        preview: 'danger',
      },
    ],
    props: [
      { name: 'variant', type: 'string', default: 'primary', description: 'Button style variant' },
      { name: 'size', type: 'string', default: 'md', description: 'Button size (sm, md, lg, xl)' },
      { name: 'isLoading', type: 'boolean', default: 'false', description: 'Show loading spinner' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable button' },
      { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Full width button' },
    ],
    importCode: `import Button from '@/components/ui/Button';`,
  },
  {
    name: 'Badge',
    category: 'Data Display',
    description: 'Status indicators, labels, and counts',
    variants: [
      {
        name: 'Solid',
        code: `<Badge variant="solid" color="primary">
  New
</Badge>`,
        preview: 'solid',
      },
      {
        name: 'Outline',
        code: `<Badge variant="outline" color="success">
  Verified
</Badge>`,
        preview: 'outline',
      },
      {
        name: 'Subtle',
        code: `<Badge variant="subtle" color="warning">
  Pending
</Badge>`,
        preview: 'subtle',
      },
    ],
    props: [
      { name: 'variant', type: 'string', default: 'solid', description: 'Badge style (solid, outline, subtle)' },
      { name: 'color', type: 'string', default: 'primary', description: 'Badge color theme' },
      { name: 'size', type: 'string', default: 'md', description: 'Badge size (sm, md, lg)' },
      { name: 'icon', type: 'ReactNode', default: 'undefined', description: 'Optional icon' },
      { name: 'onDismiss', type: 'function', default: 'undefined', description: 'Dismiss handler' },
    ],
    importCode: `import Badge from '@/components/ui/Badge';`,
  },
  {
    name: 'Switch',
    category: 'Forms',
    description: 'Toggle switch for binary choices',
    variants: [
      {
        name: 'Primary',
        code: `<Switch
  checked={enabled}
  onChange={setEnabled}
  label="Enable notifications"
/>`,
        preview: 'primary',
      },
      {
        name: 'With Description',
        code: `<Switch
  checked={enabled}
  onChange={setEnabled}
  label="Auto-save"
  description="Automatically save changes"
/>`,
        preview: 'with-description',
      },
    ],
    props: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'Switch state' },
      { name: 'onChange', type: 'function', default: '-', description: 'Change handler' },
      { name: 'label', type: 'string', default: 'undefined', description: 'Switch label' },
      { name: 'description', type: 'string', default: 'undefined', description: 'Helper text' },
      { name: 'variant', type: 'string', default: 'primary', description: 'Color variant' },
      { name: 'size', type: 'string', default: 'md', description: 'Switch size (sm, md)' },
    ],
    importCode: `import Switch from '@/components/ui/Switch';`,
  },
  {
    name: 'Checkbox',
    category: 'Forms',
    description: 'Checkbox for multiple selections',
    variants: [
      {
        name: 'Default',
        code: `<Checkbox
  label="Accept terms and conditions"
  checked={accepted}
  onChange={(e) => setAccepted(e.target.checked)}
/>`,
        preview: 'default',
      },
      {
        name: 'Indeterminate',
        code: `<Checkbox
  label="Select all"
  indeterminate={true}
/>`,
        preview: 'indeterminate',
      },
    ],
    props: [
      { name: 'label', type: 'ReactNode', default: 'undefined', description: 'Checkbox label' },
      { name: 'description', type: 'string', default: 'undefined', description: 'Helper text' },
      { name: 'variant', type: 'string', default: 'primary', description: 'Color variant' },
      { name: 'size', type: 'string', default: 'md', description: 'Checkbox size (sm, md)' },
      { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Indeterminate state' },
    ],
    importCode: `import Checkbox from '@/components/ui/Checkbox';`,
  },
  {
    name: 'Radio',
    category: 'Forms',
    description: 'Radio button for single selection',
    variants: [
      {
        name: 'Default',
        code: `<Radio
  label="Credit Card"
  checked={method === 'card'}
  onChange={() => setMethod('card')}
/>`,
        preview: 'default',
      },
      {
        name: 'With Description',
        code: `<Radio
  label="UPI"
  description="Instant payment via UPI"
  checked={method === 'upi'}
/>`,
        preview: 'with-description',
      },
    ],
    props: [
      { name: 'label', type: 'ReactNode', default: 'undefined', description: 'Radio label' },
      { name: 'description', type: 'string', default: 'undefined', description: 'Helper text' },
      { name: 'variant', type: 'string', default: 'primary', description: 'Color variant' },
      { name: 'size', type: 'string', default: 'md', description: 'Radio size (sm, md)' },
    ],
    importCode: `import Radio from '@/components/ui/Radio';`,
  },
  {
    name: 'Tooltip',
    category: 'Overlay',
    description: 'Contextual information on hover',
    variants: [
      {
        name: 'Top',
        code: `<Tooltip content="This is helpful information" position="top">
  <Button>Hover me</Button>
</Tooltip>`,
        preview: 'top',
      },
      {
        name: 'Bottom',
        code: `<Tooltip content="Payment details" position="bottom">
  <InfoIcon />
</Tooltip>`,
        preview: 'bottom',
      },
    ],
    props: [
      { name: 'content', type: 'string | ReactNode', default: '-', description: 'Tooltip content' },
      { name: 'position', type: 'string', default: 'top', description: 'Position (top, bottom, left, right)' },
      { name: 'delay', type: 'number', default: '200', description: 'Show delay in ms' },
    ],
    importCode: `import Tooltip from '@/components/ui/Tooltip';`,
  },
  {
    name: 'Select',
    category: 'Forms',
    description: 'Dropdown selector with search',
    variants: [
      {
        name: 'Default',
        code: `<Select
  options={paymentMethods}
  value={selected}
  onChange={setSelected}
  label="Payment Method"
/>`,
        preview: 'default',
      },
      {
        name: 'With Icons',
        code: `<Select
  options={options}
  value={selected}
  onChange={setSelected}
  variant="filled"
/>`,
        preview: 'with-icons',
      },
    ],
    props: [
      { name: 'options', type: 'SelectOption[]', default: '-', description: 'Dropdown options' },
      { name: 'value', type: 'string | number', default: 'undefined', description: 'Selected value' },
      { name: 'onChange', type: 'function', default: '-', description: 'Change handler' },
      { name: 'label', type: 'string', default: 'undefined', description: 'Field label' },
      { name: 'variant', type: 'string', default: 'default', description: 'Style variant' },
    ],
    importCode: `import Select from '@/components/ui/Select';`,
  },
  {
    name: 'Modal',
    category: 'Overlay',
    description: 'Dialog modal for focused interactions',
    variants: [
      {
        name: 'Small',
        code: `<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Action"
  size="sm"
>
  <p>Are you sure?</p>
</Modal>`,
        preview: 'small',
      },
      {
        name: 'Large',
        code: `<Modal
  isOpen={isOpen}
  onClose={handleClose}
  size="lg"
>
  <ModalBody>Content here</ModalBody>
</Modal>`,
        preview: 'large',
      },
    ],
    props: [
      { name: 'isOpen', type: 'boolean', default: '-', description: 'Modal visibility' },
      { name: 'onClose', type: 'function', default: '-', description: 'Close handler' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Modal title' },
      { name: 'size', type: 'string', default: 'md', description: 'Modal size (sm, md, lg)' },
      { name: 'showCloseButton', type: 'boolean', default: 'true', description: 'Show X button' },
    ],
    importCode: `import Modal from '@/components/ui/Modal';`,
  },
  {
    name: 'Tabs',
    category: 'Navigation',
    description: 'Tabbed navigation for content organization',
    variants: [
      {
        name: 'Line',
        code: `<Tabs
  tabs={[
    { label: 'Transactions', content: <TransactionList /> },
    { label: 'Settlements', content: <SettlementList /> }
  ]}
  variant="line"
/>`,
        preview: 'line',
      },
      {
        name: 'Pill',
        code: `<Tabs
  tabs={tabItems}
  variant="pill"
/>`,
        preview: 'pill',
      },
      {
        name: 'Enclosed',
        code: `<Tabs
  tabs={tabItems}
  variant="enclosed"
/>`,
        preview: 'enclosed',
      },
    ],
    props: [
      { name: 'tabs', type: 'TabItem[]', default: '-', description: 'Tab configuration' },
      { name: 'variant', type: 'string', default: 'line', description: 'Tab style (line, pill, enclosed)' },
      { name: 'defaultIndex', type: 'number', default: '0', description: 'Default active tab' },
      { name: 'onChange', type: 'function', default: 'undefined', description: 'Tab change handler' },
    ],
    importCode: `import Tabs from '@/components/ui/Tabs';`,
  },
  {
    name: 'Typography',
    category: 'Typography',
    description: 'Consistent text rendering with variants and colors',
    variants: [
      {
        name: 'Heading 1',
        code: `<Typography variant="h1">
  Welcome to SabPaisa
</Typography>`,
        preview: 'h1',
      },
      {
        name: 'Heading 2',
        code: `<Typography variant="h2">
  Section Title
</Typography>`,
        preview: 'h2',
      },
      {
        name: 'Body Large',
        code: `<Typography variant="body-large">
  Large body text
</Typography>`,
        preview: 'body-large',
      },
      {
        name: 'Body Base',
        code: `<Typography variant="body-base">
  Standard body text
</Typography>`,
        preview: 'body-base',
      },
    ],
    props: [
      { name: 'variant', type: 'string', default: 'body-base', description: 'Typography variant' },
      { name: 'color', type: 'string', default: 'default', description: 'Text color variant' },
      { name: 'align', type: 'string', default: 'left', description: 'Text alignment' },
      { name: 'weight', type: 'string', default: 'undefined', description: 'Font weight override' },
    ],
    importCode: `import Typography from '@/components/ui/Typography';`,
  },
  {
    name: 'Card',
    category: 'Layout',
    description: 'Container component with variants',
    variants: [
      {
        name: 'Default Card',
        code: `<Card variant="default" padding="lg">
  <CardHeader>
    <Typography variant="h3">Title</Typography>
  </CardHeader>
  <CardBody>
    Content goes here
  </CardBody>
</Card>`,
        preview: 'default',
      },
      {
        name: 'Glass Card',
        code: `<Card variant="glass" padding="lg">
  <CardBody>
    Glass effect content
  </CardBody>
</Card>`,
        preview: 'glass',
      },
    ],
    props: [
      { name: 'variant', type: 'string', default: 'default', description: 'Card style variant' },
      { name: 'padding', type: 'string', default: 'md', description: 'Card padding size' },
    ],
    importCode: `import Card from '@/components/ui/Card';`,
  },
  {
    name: 'TextField',
    category: 'Forms',
    description: 'Input field with validation and states',
    variants: [
      {
        name: 'Default Input',
        code: `<TextField
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  required
/>`,
        preview: 'default',
      },
      {
        name: 'With Error',
        code: `<TextField
  label="Email Address"
  type="email"
  error="Invalid email format"
  required
/>`,
        preview: 'error',
      },
    ],
    props: [
      { name: 'label', type: 'string', default: 'undefined', description: 'Input label' },
      { name: 'type', type: 'string', default: 'text', description: 'Input type' },
      { name: 'error', type: 'string', default: 'undefined', description: 'Error message' },
      { name: 'helperText', type: 'string', default: 'undefined', description: 'Helper text' },
    ],
    importCode: `import TextField from '@/components/ui/TextField';`,
  },
  {
    name: 'AmountDisplay',
    category: 'Fintech',
    description: 'Currency display with credit/debit color coding',
    variants: [
      {
        name: 'Credit',
        code: `<AmountDisplay
  amount={1250.00}
  type="credit"
  showSign
  showIcon
/>`,
        preview: 'credit',
      },
      {
        name: 'Debit',
        code: `<AmountDisplay
  amount={750.50}
  type="debit"
  showSign
/>`,
        preview: 'debit',
      },
      {
        name: 'Large',
        code: `<AmountDisplay
  amount={10000}
  type="credit"
  size="xl"
  bold
/>`,
        preview: 'large',
      },
    ],
    props: [
      { name: 'amount', type: 'number', default: '-', description: 'Amount value' },
      { name: 'type', type: 'string', default: 'neutral', description: 'Amount type (credit, debit, neutral)' },
      { name: 'currency', type: 'string', default: 'INR', description: 'Currency code' },
      { name: 'showSign', type: 'boolean', default: 'true', description: 'Show +/- sign' },
      { name: 'showIcon', type: 'boolean', default: 'false', description: 'Show trend icon' },
      { name: 'size', type: 'string', default: 'md', description: 'Text size (sm, md, lg, xl)' },
    ],
    importCode: `import AmountDisplay from '@/components/fintech/AmountDisplay';`,
  },
  {
    name: 'StatusBadge',
    category: 'Fintech',
    description: 'Transaction and KYC status indicators',
    variants: [
      {
        name: 'Transaction Status',
        code: `<StatusBadge
  status="settled"
  type="transaction"
/>`,
        preview: 'transaction',
      },
      {
        name: 'KYC Status',
        code: `<StatusBadge
  status="approved"
  type="kyc"
/>`,
        preview: 'kyc',
      },
      {
        name: 'Processing',
        code: `<StatusBadge
  status="processing"
  type="transaction"
/>`,
        preview: 'processing',
      },
    ],
    props: [
      { name: 'status', type: 'string', default: '-', description: 'Status value' },
      { name: 'type', type: 'string', default: 'transaction', description: 'Badge type (transaction, kyc)' },
      { name: 'size', type: 'string', default: 'md', description: 'Badge size' },
      { name: 'showIcon', type: 'boolean', default: 'true', description: 'Show status icon' },
    ],
    importCode: `import StatusBadge from '@/components/fintech/StatusBadge';`,
  },
  {
    name: 'TransactionCard',
    category: 'Fintech',
    description: 'Comprehensive payment transaction display',
    variants: [
      {
        name: 'Credit Transaction',
        code: `<TransactionCard
  id="TXN123456"
  amount={1250.00}
  type="credit"
  status="settled"
  date="01 Dec 2025"
  description="Payment received"
  merchantName="ABC Store"
/>`,
        preview: 'credit',
      },
      {
        name: 'With UTR',
        code: `<TransactionCard
  id="TXN789012"
  amount={500}
  type="debit"
  status="settled"
  date="30 Nov 2025"
  description="Refund processed"
  utr="UTR2025120112345"
  onViewDetails={() => {}}
/>`,
        preview: 'with-utr',
      },
    ],
    props: [
      { name: 'id', type: 'string', default: '-', description: 'Transaction ID' },
      { name: 'amount', type: 'number', default: '-', description: 'Transaction amount' },
      { name: 'type', type: 'string', default: '-', description: 'Transaction type (credit/debit)' },
      { name: 'status', type: 'string', default: '-', description: 'Transaction status' },
      { name: 'date', type: 'string', default: '-', description: 'Transaction date' },
      { name: 'description', type: 'string', default: '-', description: 'Transaction description' },
      { name: 'utr', type: 'string', default: 'undefined', description: 'UTR number' },
    ],
    importCode: `import TransactionCard from '@/components/fintech/TransactionCard';`,
  },
  {
    name: 'PaymentMethodSelector',
    category: 'Fintech',
    description: 'Payment method selection interface',
    variants: [
      {
        name: 'Default',
        code: `<PaymentMethodSelector
  selectedMethod={method}
  onSelect={setMethod}
/>`,
        preview: 'default',
      },
      {
        name: 'With Disabled',
        code: `<PaymentMethodSelector
  selectedMethod={method}
  onSelect={setMethod}
  disabledMethods={['qr']}
/>`,
        preview: 'disabled',
      },
    ],
    props: [
      { name: 'selectedMethod', type: 'PaymentMethod', default: 'undefined', description: 'Selected payment method' },
      { name: 'onSelect', type: 'function', default: '-', description: 'Selection handler' },
      { name: 'disabledMethods', type: 'PaymentMethod[]', default: '[]', description: 'Disabled payment methods' },
    ],
    importCode: `import PaymentMethodSelector from '@/components/fintech/PaymentMethodSelector';`,
  },
  {
    name: 'KYCStatusIndicator',
    category: 'Fintech',
    description: 'KYC verification progress stepper',
    variants: [
      {
        name: 'Vertical',
        code: `<KYCStatusIndicator
  steps={kycSteps}
  orientation="vertical"
/>`,
        preview: 'vertical',
      },
      {
        name: 'Horizontal',
        code: `<KYCStatusIndicator
  steps={kycSteps}
  orientation="horizontal"
/>`,
        preview: 'horizontal',
      },
    ],
    props: [
      { name: 'steps', type: 'KYCStep[]', default: '-', description: 'KYC steps configuration' },
      { name: 'orientation', type: 'string', default: 'vertical', description: 'Layout orientation' },
    ],
    importCode: `import KYCStatusIndicator from '@/components/fintech/KYCStatusIndicator';`,
  },
  {
    name: 'SettlementSummary',
    category: 'Fintech',
    description: 'Settlement batch details and T+2 display',
    variants: [
      {
        name: 'Pending',
        code: `<SettlementSummary
  batchId="BATCH20251201"
  settlementDate="03 Dec 2025"
  transactionCount={145}
  grossAmount={125000}
  processingFee={2487.50}
  gst={447.75}
  netAmount={122064.75}
  status="pending"
/>`,
        preview: 'pending',
      },
      {
        name: 'Completed',
        code: `<SettlementSummary
  {...summaryData}
  status="completed"
  utr="UTR2025120112345"
/>`,
        preview: 'completed',
      },
    ],
    props: [
      { name: 'batchId', type: 'string', default: '-', description: 'Settlement batch ID' },
      { name: 'settlementDate', type: 'string', default: '-', description: 'Settlement date' },
      { name: 'transactionCount', type: 'number', default: '-', description: 'Number of transactions' },
      { name: 'grossAmount', type: 'number', default: '-', description: 'Total transaction amount' },
      { name: 'processingFee', type: 'number', default: '-', description: 'Processing fee' },
      { name: 'gst', type: 'number', default: '-', description: 'GST amount' },
      { name: 'netAmount', type: 'number', default: '-', description: 'Net settlement amount' },
      { name: 'utr', type: 'string', default: 'undefined', description: 'UTR number' },
      { name: 'status', type: 'string', default: '-', description: 'Settlement status' },
    ],
    importCode: `import SettlementSummary from '@/components/fintech/SettlementSummary';`,
  },
  {
    name: 'MerchantCard',
    category: 'Fintech',
    description: 'Merchant profile information card',
    variants: [
      {
        name: 'Default',
        code: `<MerchantCard
  merchantId="MER123456"
  businessName="ABC Enterprises"
  contactPerson="John Doe"
  email="john@abc.com"
  phone="+91 98765 43210"
  address="Mumbai, Maharashtra"
  kycStatus="approved"
  verified
/>`,
        preview: 'default',
      },
      {
        name: 'Pending KYC',
        code: `<MerchantCard
  {...merchantData}
  kycStatus="pending"
  onViewDetails={() => {}}
/>`,
        preview: 'pending',
      },
    ],
    props: [
      { name: 'merchantId', type: 'string', default: '-', description: 'Merchant ID' },
      { name: 'businessName', type: 'string', default: '-', description: 'Business name' },
      { name: 'contactPerson', type: 'string', default: '-', description: 'Contact person name' },
      { name: 'email', type: 'string', default: '-', description: 'Email address' },
      { name: 'phone', type: 'string', default: '-', description: 'Phone number' },
      { name: 'address', type: 'string', default: '-', description: 'Business address' },
      { name: 'kycStatus', type: 'KYCStatus', default: '-', description: 'KYC verification status' },
      { name: 'verified', type: 'boolean', default: 'false', description: 'Verification badge' },
    ],
    importCode: `import MerchantCard from '@/components/fintech/MerchantCard';`,
  },
  {
    name: 'FeeBreakdown',
    category: 'Fintech',
    description: 'Processing fees and GST visualization',
    variants: [
      {
        name: 'Default',
        code: `<FeeBreakdown
  transactionAmount={10000}
  processingFee={{ label: 'Processing Fee', amount: 199, percentage: 1.99 }}
  gst={{ label: 'GST (18%)', amount: 35.82 }}
/>`,
        preview: 'default',
      },
      {
        name: 'With Additional Fees',
        code: `<FeeBreakdown
  transactionAmount={10000}
  processingFee={{ label: 'Processing Fee', amount: 199 }}
  gst={{ label: 'GST', amount: 35.82 }}
  additionalFees={[
    { label: 'Platform Fee', amount: 50 }
  ]}
/>`,
        preview: 'with-additional',
      },
    ],
    props: [
      { name: 'transactionAmount', type: 'number', default: '-', description: 'Base transaction amount' },
      { name: 'processingFee', type: 'FeeItem', default: '-', description: 'Processing fee details' },
      { name: 'gst', type: 'FeeItem', default: '-', description: 'GST details' },
      { name: 'additionalFees', type: 'FeeItem[]', default: '[]', description: 'Additional fees' },
      { name: 'showPercentage', type: 'boolean', default: 'true', description: 'Show percentage breakdown' },
    ],
    importCode: `import FeeBreakdown from '@/components/fintech/FeeBreakdown';`,
  },
];

export const spacing = [
  { name: '0', value: '0', pixels: '0px', class: 'space-0' },
  { name: '1', value: '0.25rem', pixels: '4px', class: 'space-1' },
  { name: '2', value: '0.5rem', pixels: '8px', class: 'space-2' },
  { name: '3', value: '0.75rem', pixels: '12px', class: 'space-3' },
  { name: '4', value: '1rem', pixels: '16px', class: 'space-4' },
  { name: '6', value: '1.5rem', pixels: '24px', class: 'space-6' },
  { name: '8', value: '2rem', pixels: '32px', class: 'space-8' },
  { name: '12', value: '3rem', pixels: '48px', class: 'space-12' },
  { name: '16', value: '4rem', pixels: '64px', class: 'space-16' },
];

export const patterns = [
  {
    name: 'Settlement Pattern',
    category: 'Fintech',
    description: 'T+2 settlement cycle for merchant payments',
    workflow: [
      { step: 1, name: 'Batch Creation', description: 'System creates settlement batch for eligible transactions' },
      { step: 2, name: 'Calculation', description: 'Calculate gross amount, fees, GST, and net amount' },
      { step: 3, name: 'Bank Transfer', description: 'Initiate NEFT/RTGS/IMPS to merchant account' },
      { step: 4, name: 'Confirmation', description: 'Receive UTR number from bank' },
      { step: 5, name: 'Notification', description: 'Send email/SMS with settlement details' },
    ],
    codeExample: `const grossAmount = sumOfTransactions;
const processingFee = grossAmount * 0.0199;
const gst = processingFee * 0.18;
const netAmount = grossAmount - processingFee - gst;`,
  },
  {
    name: 'KYC Onboarding',
    category: 'Fintech',
    description: '7-step merchant verification workflow',
    workflow: [
      { step: 1, name: 'Business Details', description: 'Business name, type, registration number' },
      { step: 2, name: 'Contact Info', description: 'Email, phone, address, authorized person' },
      { step: 3, name: 'Document Upload', description: 'PAN, GST, Business registration, Address proof' },
      { step: 4, name: 'Bank Details', description: 'Account number, IFSC, bank name' },
      { step: 5, name: 'DSC Integration', description: 'Digital Signature Certificate (optional)' },
      { step: 6, name: 'Review', description: 'Review all information before submission' },
      { step: 7, name: 'Verification', description: 'Auto-verify and manual review' },
    ],
  },
];

// Integration Guide Data
export const integrationGuides = {
  greenfield: {
    title: 'New Project Setup (Greenfield)',
    subtitle: 'Start fresh with SabPaisa Design System',
    description: 'Step-by-step guide for integrating the design system into a new React project from scratch.',
    duration: '15-20 minutes',
    difficulty: 'Beginner' as const,
    prerequisites: [
      'Node.js 16+ installed',
      'Basic React knowledge',
      'Familiarity with npm',
      'Code editor (VS Code recommended)'
    ],
    steps: [
      {
        step: 1,
        title: 'Create New Vite Project',
        description: 'Initialize a new React + TypeScript project using Vite',
        explanation: 'Vite provides the fastest development experience with instant HMR (Hot Module Replacement) and optimized builds. It\'s the recommended tool for modern React applications.',
        codeExample: `npm create vite@latest my-payment-app -- --template react-ts
cd my-payment-app
npm install`,
        language: 'bash',
        tips: [
          'Use descriptive project names (e.g., sabpaisa-merchant-portal)',
          'Choose the react-ts template for TypeScript support',
          'Run npm install immediately after creation'
        ],
        commonPitfalls: [
          'Forgetting to cd into project directory before npm install',
          'Using outdated Node.js version (requires 16+)'
        ]
      },
      {
        step: 2,
        title: 'Install SabPaisa Design System',
        description: 'Add the design system package to your dependencies',
        explanation: 'The @sabpaisa/design-system package includes all UI components, design tokens (colors, spacing, typography), and Tailwind CSS configuration needed for building payment interfaces.',
        codeExample: `npm install @sabpaisa/design-system`,
        language: 'bash',
        tips: [
          'Check package.json to verify installation',
          'The package includes TypeScript definitions automatically'
        ]
      },
      {
        step: 3,
        title: 'Configure Tailwind CSS',
        description: 'Extend Tailwind configuration with SabPaisa design tokens',
        explanation: 'The design system uses Tailwind CSS for styling. By extending the Tailwind config with SabPaisa tokens, you get access to brand colors, spacing scales, and other design primitives.',
        codeExample: `// tailwind.config.js
import sabpaisaConfig from '@sabpaisa/design-system/tailwind'

export default {
  ...sabpaisaConfig,
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  // Your custom extensions here
  theme: {
    extend: {
      // Add project-specific customizations
    }
  }
}`,
        language: 'typescript',
        tips: [
          'The content array tells Tailwind where to scan for class names',
          'Spread sabpaisaConfig first, then add your customizations',
          'Keep the default Tailwind config as base, extend only what you need'
        ],
        commonPitfalls: [
          'Replacing instead of extending the config (use spread operator)',
          'Missing files in content array (leads to missing styles)',
          'Incorrect import path for sabpaisaConfig'
        ]
      },
      {
        step: 4,
        title: 'Import Global Styles',
        description: 'Add design system CSS to your application entry point',
        explanation: 'The design system styles must be imported before your custom styles to ensure proper CSS cascade. This includes Tailwind base styles, component styles, and SabPaisa-specific utilities.',
        codeExample: `// main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Import design system styles FIRST
import '@sabpaisa/design-system/styles.css'

// Then your custom styles
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
        language: 'typescript',
        tips: [
          'Order matters: design system styles first, then custom styles',
          'This ensures you can override design system styles when needed',
          'Keep React.StrictMode for better development experience'
        ],
        commonPitfalls: [
          'Importing custom CSS before design system CSS (wrong cascade order)',
          'Forgetting to import styles entirely (components won\'t look right)'
        ]
      },
      {
        step: 5,
        title: 'Configure Dark Mode (Optional)',
        description: 'Set up Tailwind dark mode for theme switching',
        explanation: 'SabPaisa design system supports dark mode out of the box. Configure Tailwind to use class-based dark mode for manual control.',
        codeExample: `// tailwind.config.js
export default {
  darkMode: 'class', // Enable class-based dark mode
  // ... rest of config
}

// Add to your root component or layout
<html className={isDark ? 'dark' : ''}>`,
        language: 'typescript',
        tips: [
          'Use class-based dark mode for manual toggle control',
          'Store theme preference in localStorage for persistence',
          'All design system components respect dark mode automatically'
        ]
      },
      {
        step: 6,
        title: 'Create Your First Component',
        description: 'Build a payment form using design system components',
        explanation: 'Now that setup is complete, you can start using SabPaisa components. This example shows how to compose components for a typical payment interface.',
        codeExample: `// src/components/PaymentForm.tsx
import { Button, Card, TextField } from '@sabpaisa/design-system'
import { useState } from 'react'

export default function PaymentForm() {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Payment processing logic here
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <Card className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Make Payment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          className="w-full"
        >
          Pay ₹{amount || '0'}
        </Button>
      </form>
    </Card>
  )
}`,
        language: 'typescript',
        tips: [
          'Use TypeScript for better autocomplete and type safety',
          'Design system components accept className for custom styling',
          'Leverage dark mode classes (dark:text-white) for automatic theming'
        ]
      },
      {
        step: 7,
        title: 'Run Development Server',
        description: 'Start the Vite dev server and verify everything works',
        explanation: 'Vite\'s dev server provides instant feedback with HMR. Verify your setup by seeing the component render correctly with SabPaisa styling.',
        codeExample: `npm run dev`,
        language: 'bash',
        tips: [
          'Dev server typically runs on http://localhost:5173',
          'HMR updates instantly as you save files',
          'Check console for any warnings or errors'
        ]
      }
    ],
    troubleshooting: [
      {
        issue: 'Tailwind classes not applying / components look unstyled',
        cause: 'Tailwind config content paths not correctly configured or design system CSS not imported',
        solution: 'Verify tailwind.config.js includes correct content paths (./src/**/*.{js,ts,jsx,tsx}) and that @sabpaisa/design-system/styles.css is imported in main.tsx',
        preventionTip: 'Always check browser DevTools to see if CSS is loaded'
      },
      {
        issue: 'TypeScript errors with component props',
        cause: 'Missing type definitions or incorrect import statements',
        solution: 'Ensure @types packages are installed and imports use correct paths from @sabpaisa/design-system',
        preventionTip: 'Enable TypeScript strict mode for better error catching'
      },
      {
        issue: 'Dark mode not working',
        cause: 'Dark mode not enabled in Tailwind config or dark class not applied to html element',
        solution: 'Add darkMode: \'class\' to tailwind.config.js and ensure dark class is toggled on html element',
        preventionTip: 'Test dark mode toggle immediately after setup'
      },
      {
        issue: 'Build fails with "Cannot find module" errors',
        cause: 'Missing dependencies or incorrect import paths',
        solution: 'Run npm install to ensure all dependencies are installed, check import paths match package structure',
        preventionTip: 'Use absolute imports with @ alias for cleaner paths'
      }
    ],
    bestPractices: [
      {
        practice: 'Use TypeScript strictly',
        why: 'TypeScript provides autocomplete for component props, catches errors early, and makes refactoring safer',
        example: 'Enable strict: true in tsconfig.json'
      },
      {
        practice: 'Leverage design tokens instead of hardcoded values',
        why: 'Design tokens ensure consistency and make theme updates automatic across your app',
        example: 'Use bg-primary-600 instead of bg-blue-600'
      },
      {
        practice: 'Set up dark mode from the start',
        why: 'Adding dark mode later requires refactoring many components, easier to build with it from day one',
        example: 'Use dark: prefix on all color classes'
      },
      {
        practice: 'Test components in isolation',
        why: 'Isolated testing catches style issues early and makes debugging easier',
        example: 'Create a /dev route with all components for visual testing'
      },
      {
        practice: 'Configure ESLint with design system rules',
        why: 'Automated linting catches common mistakes and enforces best practices',
        example: 'Add tailwindcss/no-custom-classname rule'
      }
    ]
  },
  brownfield: {
    title: 'Existing Project Integration (Brownfield)',
    subtitle: 'Migrate your existing React app to SabPaisa Design System',
    description: 'Step-by-step guide for gradually integrating the design system into an existing React application without breaking changes.',
    duration: '30-45 minutes + ongoing migration',
    difficulty: 'Intermediate' as const,
    prerequisites: [
      'Existing React 16.8+ application',
      'Current build system (Webpack, Vite, etc.)',
      'Basic understanding of your current styling approach',
      'Git repository for safe rollback'
    ],
    steps: [
      {
        step: 1,
        title: 'Audit Current Setup',
        description: 'Assess your existing project for compatibility and potential conflicts',
        explanation: 'Before integrating the design system, understand your current tech stack, styling approach, and potential conflicts. This prevents surprises during migration.',
        codeExample: `# Check React version (requires 16.8+)
grep "react" package.json

# Check if Tailwind is already installed
grep "tailwindcss" package.json

# List all CSS/styling dependencies
npm list | grep -E "styled|emotion|css|sass"`,
        language: 'bash',
        tips: [
          'Document current color variables and spacing values',
          'Note components that will need refactoring',
          'Identify any custom Tailwind plugins in use',
          'Check for conflicting utility class libraries (Bootstrap, etc.)'
        ],
        commonPitfalls: [
          'Skipping the audit and encountering unexpected conflicts later',
          'Not checking React version compatibility first'
        ]
      },
      {
        step: 2,
        title: 'Create Feature Branch',
        description: 'Set up a safe environment for design system integration',
        explanation: 'Always integrate in a feature branch so you can test thoroughly and rollback if needed. This is especially important for brownfield migrations.',
        codeExample: `git checkout -b feature/sabpaisa-design-system
git push -u origin feature/sabpaisa-design-system`,
        language: 'bash',
        tips: [
          'Use descriptive branch name',
          'Consider creating a dev deployment for testing',
          'Keep main/master branch stable during migration'
        ]
      },
      {
        step: 3,
        title: 'Install Design System (Alongside Existing Styles)',
        description: 'Add SabPaisa design system without removing existing styling',
        explanation: 'Install the design system alongside your current styling solution. Both systems can coexist during the migration period, allowing gradual component-by-component migration.',
        codeExample: `npm install @sabpaisa/design-system`,
        language: 'bash',
        tips: [
          'Don\'t remove existing styling libraries yet',
          'Both old and new styles can coexist temporarily',
          'Plan for eventual cleanup after migration'
        ]
      },
      {
        step: 4,
        title: 'Configure Tailwind with Namespace (If Conflicts Exist)',
        description: 'Set up Tailwind configuration to avoid class name conflicts',
        explanation: 'If your app already uses Tailwind or has conflicting utility classes, use a prefix to namespace all SabPaisa classes. This prevents conflicts during the transition period.',
        codeExample: `// tailwind.config.js
import sabpaisaConfig from '@sabpaisa/design-system/tailwind'

export default {
  ...sabpaisaConfig,
  prefix: 'sp-', // Prefix all classes with sp-
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  // Merge with existing config if you have one
  theme: {
    extend: {
      ...sabpaisaConfig.theme.extend,
      // Your existing customizations
    }
  }
}

// Usage example:
<button className="sp-bg-primary-600 sp-text-white sp-px-4 sp-py-2">
  Pay Now
</button>`,
        language: 'typescript',
        tips: [
          'Only use prefix if you have conflicts',
          'Document the prefix convention for your team',
          'Consider removing prefix after full migration'
        ],
        commonPitfalls: [
          'Forgetting to use prefix in component classes',
          'Mixing prefixed and non-prefixed classes inconsistently'
        ]
      },
      {
        step: 5,
        title: 'Import Design System Styles with Scoping',
        description: 'Add design system CSS without affecting existing components',
        explanation: 'Import styles in a way that doesn\'t break existing components. Use CSS layers or careful import order to manage specificity.',
        codeExample: `// main.tsx or App.tsx
// Option 1: Import after existing styles (lower specificity)
import './existing-styles.css'
import '@sabpaisa/design-system/styles.css'

// Option 2: Use CSS layers for better control
// In your CSS:
@layer legacy, design-system;

@import '@sabpaisa/design-system/styles.css' layer(design-system);

@layer legacy {
  /* Your existing styles */
}`,
        language: 'typescript',
        tips: [
          'Test thoroughly after importing styles',
          'Check existing components for style changes',
          'Use browser DevTools to inspect CSS specificity',
          'CSS layers provide best control but require modern browsers'
        ],
        commonPitfalls: [
          'Importing design system styles first (breaks existing components)',
          'Not testing all existing pages after style import'
        ]
      },
      {
        step: 6,
        title: 'Create Component Mapping Strategy',
        description: 'Plan which components to migrate and in what order',
        explanation: 'Migrate components strategically, starting with lowest-risk items. This minimizes disruption and allows for incremental testing.',
        codeExample: `// Migration priority (recommended order):
// 1. New features (no existing code to break)
// 2. Leaf components (buttons, inputs - no children)
// 3. Container components (cards, modals)
// 4. Layout components (headers, footers)
// 5. Pages

// Document in a migration tracking file:
const MIGRATION_PLAN = {
  phase1: ['Button', 'TextField', 'Checkbox'], // Week 1
  phase2: ['Card', 'Modal', 'Dropdown'],       // Week 2
  phase3: ['Header', 'Sidebar', 'Footer'],     // Week 3
  phase4: ['Dashboard', 'PaymentPage'],        // Week 4
}`,
        language: 'typescript',
        tips: [
          'Start with components used in new features',
          'Migrate leaf components before containers',
          'Test each phase before moving to next',
          'Keep a migration checklist'
        ]
      },
      {
        step: 7,
        title: 'Migrate First Component with Wrapper Pattern',
        description: 'Refactor one component using the adapter wrapper pattern',
        explanation: 'Use wrapper components to maintain old APIs while using new design system underneath. This allows gradual migration without breaking existing code.',
        codeExample: `// Old component (keep for reference)
// src/components/legacy/OldButton.tsx
export function OldButton({ label, onClick, variant = 'primary' }) {
  return (
    <button
      className={\`legacy-btn legacy-btn-\${variant}\`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

// New wrapper component (same API, new styles)
// src/components/Button.tsx
import { Button as SabPaisaButton } from '@sabpaisa/design-system'

export function Button({ label, onClick, variant = 'primary' }) {
  // Map old variant names to new ones
  const variantMap = {
    primary: 'primary',
    secondary: 'secondary',
    danger: 'error'
  }

  return (
    <SabPaisaButton
      variant={variantMap[variant]}
      onClick={onClick}
    >
      {label}
    </SabPaisaButton>
  )
}

// Gradually update imports across codebase:
// Before: import { OldButton } from './legacy/OldButton'
// After:  import { Button } from './Button'`,
        language: 'typescript',
        tips: [
          'Keep old component for rollback safety',
          'Map old prop names to new ones in wrapper',
          'Update imports one file at a time',
          'Test each file after updating imports'
        ],
        commonPitfalls: [
          'Deleting old component before all usages updated',
          'Forgetting to handle all prop variations',
          'Not testing edge cases with the new wrapper'
        ]
      },
      {
        step: 8,
        title: 'Handle Color and Theme Migration',
        description: 'Map existing color variables to SabPaisa design tokens',
        explanation: 'Create a mapping between old color names and new design tokens to ensure consistent migration across all components.',
        codeExample: `// constants/colorMigration.ts
export const COLOR_MIGRATION_MAP = {
  // Old color name -> New design token
  'brand-blue': 'primary-600',
  'brand-orange': 'secondary-500',
  'success-green': 'green-600',
  'error-red': 'red-600',
  'text-primary': 'gray-900',
  'text-secondary': 'gray-600',
  'bg-light': 'gray-50',
  'bg-dark': 'gray-900',
}

// Helper for migration
export function migrateColorClass(oldClass: string): string {
  const mapped = COLOR_MIGRATION_MAP[oldClass]
  if (!mapped) {
    console.warn(\`No migration mapping for \${oldClass}\`)
    return oldClass
  }
  return mapped
}

// Usage in components:
// Old: className="text-brand-blue"
// New: className="text-primary-600"`,
        language: 'typescript',
        tips: [
          'Document all color mappings in one place',
          'Use find-and-replace carefully for color names',
          'Test color changes in light and dark mode',
          'Keep migration map for future reference'
        ]
      },
      {
        step: 9,
        title: 'Test Incrementally and Rollback if Needed',
        description: 'Validate each migration phase thoroughly before proceeding',
        explanation: 'Testing after each component migration catches issues early when they\'re easier to fix. Don\'t rush - quality over speed.',
        codeExample: `# After each component migration:

# 1. Visual regression testing
npm run test:visual

# 2. Unit tests
npm run test

# 3. Manual testing in browser
npm run dev

# 4. Check for console errors
# Open DevTools console and check for warnings

# 5. Test in both light and dark mode

# If issues found:
git checkout src/components/ProblematicComponent.tsx
# Fix issues before proceeding`,
        language: 'bash',
        tips: [
          'Test each migrated component in isolation',
          'Check all interactive states (hover, active, disabled)',
          'Verify accessibility with keyboard navigation',
          'Test on different screen sizes'
        ]
      },
      {
        step: 10,
        title: 'Gradual Cleanup of Old Styles',
        description: 'Remove legacy styling code after components are fully migrated',
        explanation: 'Only remove old styling dependencies after verifying all components work with the new design system. Keep old code until you\'re confident in the migration.',
        codeExample: `// After 100% migration complete:

# 1. Remove old CSS files
rm -rf src/styles/legacy/

# 2. Uninstall old styling dependencies
npm uninstall styled-components
npm uninstall @emotion/react
# or whatever you were using

# 3. Clean up package.json
# Remove unused dependencies

# 4. Update .gitignore if needed

# 5. Final build and test
npm run build
npm run test

# 6. Create cleanup commit
git add .
git commit -m "chore: remove legacy styling dependencies after design system migration"`,
        language: 'bash',
        tips: [
          'Keep old code until 100% migrated and tested',
          'Do cleanup in separate commit for easy rollback',
          'Document migration completion for team',
          'Consider keeping old styles for 1-2 sprints as safety net'
        ]
      }
    ],
    troubleshooting: [
      {
        issue: 'Style conflicts between old and new systems',
        cause: 'CSS specificity wars, overlapping class names, or incorrect import order',
        solution: 'Use CSS layers (@layer) to control specificity, or add prefix to design system classes to namespace them',
        preventionTip: 'Test in isolated environment first, use browser DevTools to inspect specificity'
      },
      {
        issue: 'Existing components break after importing design system styles',
        cause: 'Global CSS reset or base styles from design system affecting existing components',
        solution: 'Import design system styles after existing styles, or use CSS layers to isolate styles',
        preventionTip: 'Create a test page with all existing components before importing design system'
      },
      {
        issue: 'Build performance degradation',
        cause: 'Both old and new styling systems being bundled, increasing bundle size',
        solution: 'Use tree-shaking for unused components, consider code-splitting, remove old CSS as components migrate',
        preventionTip: 'Monitor bundle size after each phase, use webpack-bundle-analyzer'
      },
      {
        issue: 'TypeScript errors with wrapper components',
        cause: 'Prop type mismatches between old API and new design system components',
        solution: 'Create proper TypeScript interfaces for wrapper components, use type mapping utilities',
        preventionTip: 'Define wrapper interfaces before implementation'
      },
      {
        issue: 'Team members accidentally using old components',
        cause: 'Both old and new components exist with similar names, unclear which to use',
        solution: 'Use clear naming (e.g., prefix old with Legacy), update imports centrally, document migration status',
        preventionTip: 'Add ESLint rules to prevent importing from legacy paths'
      },
      {
        issue: 'Dark mode inconsistencies across old and new components',
        cause: 'Old components don\'t support dark mode, new ones do',
        solution: 'Add dark mode support to old components during wrapper creation, or accept temporary inconsistency',
        preventionTip: 'Prioritize migrating components that appear together on same page'
      }
    ],
    bestPractices: [
      {
        practice: 'Migrate in a feature branch, not main/master',
        why: 'Allows safe experimentation and easy rollback if issues arise without affecting production',
        example: 'Create feature/design-system-migration branch'
      },
      {
        practice: 'Start with new features, not existing ones',
        why: 'New features have no existing code to break, making them safest place to start using design system',
        example: 'Build new payment flow entirely with design system'
      },
      {
        practice: 'Keep old and new systems coexisting initially',
        why: 'Gradual migration is safer than big-bang rewrite, allows incremental testing and rollback',
        example: 'Both legacy CSS and design system CSS loaded during transition'
      },
      {
        practice: 'Document every breaking change',
        why: 'Team members need to know what changed and how to adapt their code',
        example: 'Maintain MIGRATION.md with API differences and component mappings'
      },
      {
        practice: 'Create wrapper components for old APIs',
        why: 'Maintains backward compatibility while using new design system underneath, minimizes code changes',
        example: 'Wrapper component accepts old props, translates to new component'
      },
      {
        practice: 'Test after each component migration, not at the end',
        why: 'Catching issues early makes them easier to fix and isolate',
        example: 'Full test suite after each component migration'
      },
      {
        practice: 'Use TypeScript strictly during migration',
        why: 'Type checking catches prop mismatches and API changes automatically',
        example: 'Enable strict: true in tsconfig.json'
      },
      {
        practice: 'Monitor bundle size throughout migration',
        why: 'Running both old and new systems temporarily increases bundle size, need to track and optimize',
        example: 'Use webpack-bundle-analyzer after each phase'
      }
    ]
  }
};

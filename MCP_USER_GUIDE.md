# MCP User Guide for Hackathon Developers

**Quick Start Guide for SabPaisa Design System MCP Server**

Get up and running with the SabPaisa Design System in your hackathon project in under 10 minutes.

---

## 🚀 1. Setup (2 minutes)

### Prerequisites

- ✅ Node.js >= 20.0.0
- ✅ Claude Desktop or Claude Code installed
- ✅ Basic React/Vue/Angular knowledge

### Step 1: Build the MCP Server

```bash
cd /Users/sabadmin/Documents/mcp-servers/sabpaisa-design-system-mcp
npm run build
```

**Expected output**: Successful TypeScript compilation (no errors)

### Step 2: Configure Claude Desktop

Add this configuration to your MCP config file:

**macOS/Linux**: `~/.claude/mcp.json` or `~/.cursor/mcp.json`
**Windows**: `%APPDATA%\Claude\mcp.json`

```json
{
  "mcpServers": {
    "sabpaisa-design-system": {
      "command": "node",
      "args": [
        "/Users/sabadmin/Documents/mcp-servers/sabpaisa-design-system-mcp/dist/index.js"
      ]
    }
  }
}
```

⚠️ **Important**: Use the ABSOLUTE path to `dist/index.js`

### Step 3: Restart Claude Desktop

Close and reopen Claude Desktop completely for the configuration to take effect.

### Step 4: Verify It Works

Ask Claude: **"What design system resources are available?"**

✅ **Success**: You should see a list of 28 resources (tokens, components, patterns, formatting, templates)

---

## 💡 2. Your First Query (1 minute)

Let's see the design system in action with a real example.

### Ask Claude:

```
"Show me the SabPaisa primary blue color"
```

### What You'll Get:

- 🎨 **Visual color swatch** (SVG preview)
- 📋 **All formats**: hex, RGB, HSL, RGBA, CSS var, Tailwind class
- ♿ **Accessibility info**: WCAG contrast ratios, AA/AAA compliance
- 💼 **Usage guidelines**: Where to use this color

### Understanding MCP Resources

**MCP Resources** = Design system data (colors, components, patterns)
**MCP Tools** = Actions you can take (search, convert, validate, generate)

You just used the `find_color` tool to query the `tokens/colors` resource!

---

## 🎯 3. Common Recipes (5 minutes)

### Recipe 1: Build a Payment Button (2 min)

**Use Case**: You need a branded, accessible payment button in React.

#### Step 1: Find the Primary Color

Ask Claude:
```
"Find the primary blue color with WCAG AA compliance"
```

Copy the hex value (e.g., `#2563eb`)

#### Step 2: Check Accessibility

Ask Claude:
```
"Is #2563eb accessible on white background?"
```

✅ You'll get contrast ratio and WCAG compliance status with visual preview.

#### Step 3: Generate the Button

Ask Claude:
```
"Generate a primary payment button in React"
```

#### Step 4: Copy-Paste the Code

You'll receive complete React code like this:

```tsx
import { Button } from '@/components/ui';

<Button
  variant="primary"
  size="md"
  onClick={handlePayment}
>
  Pay ₹1,234.56
</Button>
```

#### Step 5: Customize (Optional)

```tsx
// Use the design token directly
const PaymentButton = () => {
  return (
    <button
      style={{
        backgroundColor: 'var(--color-primary-500)', // From design system
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 600,
        border: 'none',
        cursor: 'pointer'
      }}
      onClick={handlePayment}
    >
      Pay ₹1,234.56
    </button>
  );
};
```

**Time saved**: 30 minutes of color picking, accessibility testing, and styling!

---

### Recipe 2: Format Transaction Amounts (1.5 min)

**Use Case**: Display Indian Rupee amounts correctly across your app.

#### Step 1: Get Formatting Rules

Ask Claude:
```
"Show me the INR currency formatting guidelines"
```

#### Step 2: Use the Formatter

Copy this utility function:

```typescript
// utils/currency.ts
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

// Usage examples:
formatINR(1234.56)    // "₹1,234.56"
formatINR(1000000)    // "₹10,00,000.00"
formatINR(50)         // "₹50.00"
```

#### Step 3: Validate User Input

Ask Claude:
```
"What's the validation regex for INR amounts?"
```

Copy the regex pattern:

```typescript
// Validates INR format: ₹1,234.56 or 1234.56
const INR_REGEX = /^₹?\s*\d{1,3}(,\d{3})*(\.\d{2})?$/;

export function validateINR(value: string): boolean {
  return INR_REGEX.test(value.trim());
}
```

**Complete Example:**

```tsx
import { useState } from 'react';

function TransactionAmount() {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);

    if (value && !validateINR(value)) {
      setError('Invalid amount format. Use: ₹1,234.56');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={handleChange}
        placeholder="₹0.00"
      />
      {error && <span style={{ color: 'red' }}>{error}</span>}
      <p>Formatted: {formatINR(parseFloat(amount.replace(/[₹,]/g, '')))}</p>
    </div>
  );
}
```

**Time saved**: 20 minutes of regex writing and Intl.NumberFormat research!

---

### Recipe 3: Implement KYC Flow (1.5 min)

**Use Case**: Add Know Your Customer verification to your app.

#### Step 1: Understand the Workflow

Ask Claude:
```
"Show me the KYC onboarding pattern"
```

You'll get the 7-step workflow:

```
1. Initial → 2. Documents Uploaded → 3. Under Review →
4. Pending Info → 5. Verified → 6. Rejected → 7. Expired
```

#### Step 2: Get Status Badge Component

Ask Claude:
```
"Generate a KYC status badge component in React"
```

#### Step 3: Implement Status Display

```tsx
// components/KYCStatus.tsx
type KYCStatus =
  | 'initial'
  | 'documents_uploaded'
  | 'under_review'
  | 'pending_info'
  | 'verified'
  | 'rejected'
  | 'expired';

interface KYCStatusBadgeProps {
  status: KYCStatus;
}

const statusConfig = {
  initial: { label: 'Not Started', color: 'gray', icon: '○' },
  documents_uploaded: { label: 'Uploaded', color: 'blue', icon: '↑' },
  under_review: { label: 'Under Review', color: 'yellow', icon: '⋯' },
  pending_info: { label: 'Info Required', color: 'orange', icon: '!' },
  verified: { label: 'Verified', color: 'green', icon: '✓' },
  rejected: { label: 'Rejected', color: 'red', icon: '✗' },
  expired: { label: 'Expired', color: 'gray', icon: '⊗' },
};

export function KYCStatusBadge({ status }: KYCStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: 500,
        backgroundColor: `var(--color-${config.color}-100)`,
        color: `var(--color-${config.color}-700)`,
      }}
    >
      <span>{config.icon}</span>
      {config.label}
    </span>
  );
}

// Usage:
<KYCStatusBadge status="verified" />
<KYCStatusBadge status="under_review" />
<KYCStatusBadge status="rejected" />
```

#### Step 4: Handle State Transitions

```typescript
// hooks/useKYC.ts
export function useKYC() {
  const [status, setStatus] = useState<KYCStatus>('initial');

  const canProgress = (from: KYCStatus, to: KYCStatus): boolean => {
    const validTransitions: Record<KYCStatus, KYCStatus[]> = {
      initial: ['documents_uploaded'],
      documents_uploaded: ['under_review'],
      under_review: ['verified', 'rejected', 'pending_info'],
      pending_info: ['documents_uploaded', 'rejected'],
      verified: ['expired'],
      rejected: ['documents_uploaded'],
      expired: ['documents_uploaded'],
    };

    return validTransitions[from]?.includes(to) ?? false;
  };

  const updateStatus = (newStatus: KYCStatus) => {
    if (canProgress(status, newStatus)) {
      setStatus(newStatus);
      // API call to update backend
    } else {
      console.error(`Invalid transition: ${status} → ${newStatus}`);
    }
  };

  return { status, updateStatus, canProgress };
}
```

**Time saved**: 45 minutes of workflow design and state machine logic!

---

### Recipe 4: Use Production-Ready Templates (1 min) **NEW**

**Use Case**: Get complete, copy-paste templates for common UI patterns.

#### Step 1: Browse Available Templates

Ask Claude:
```
"Show me all available template categories"
```

You'll see 7 categories:
- Page Layouts (dashboard, form, table views)
- Loading Animations (spinners, dots, progress)
- Splash Screens (app launch screens)
- Fintech Workflows (payment, KYC flows)
- UI Components (buttons, badges, modals)
- Forms (multi-step wizards, validation)
- Dashboards (widgets, metrics)

#### Step 2: Get a Specific Template

Ask Claude:
```
"Get the payment checkout flow template"
```

You'll receive:
- ✅ **Full source code** (React + TypeScript)
- 📦 **Installation steps** (dependencies + setup)
- 📋 **Props documentation** (all configurable options)
- 💡 **Usage examples** (basic + advanced)
- 🎨 **Live preview** (see it in action)

#### Step 3: Install & Use

```bash
# 1. Install dependencies (from template)
npm install lucide-react

# 2. Copy the component code
# (Provided in the template response)

# 3. Use in your app
import PaymentCheckout from '@/components/PaymentCheckout';

function App() {
  return <PaymentCheckout amount={1234.56} />;
}
```

#### Example: Dashboard Layout Template

Ask Claude:
```
"Show me the dashboard layout template"
```

You get complete code for:
- Sidebar navigation
- Header with title
- Responsive grid layout
- Dark mode support
- Mobile responsive

**Time saved**: 2-4 hours of building UI from scratch!

---

## 📚 4. Quick Reference

### All 6 MCP Tools

| Tool | Use Case | Example Query |
|------|----------|---------------|
| `search_design_system` | Find any resource | "Search for button components" |
| `find_color` | Get color with formats | "Find success colors" |
| `convert_color` | Change color format | "Convert #2563eb to RGB" |
| `validate_contrast` | Check accessibility | "Is blue on white accessible?" |
| `generate_component` | Create code | "Generate React button" |
| `view_analytics` | See usage stats | "Show server analytics" |

### All 28 Resources by Category

#### 🎨 Design Tokens (5)
- Colors, Typography, Spacing, Shadows, All Tokens

#### 🧩 Components (4)
- Button, Card, Input, All Components

#### 💼 Fintech Patterns (5)
- Settlement, KYC, Reconciliation, Refund/Chargeback, All Patterns

#### 📝 Formatting (4)
- Currency (INR), Datetime (IST), Masking (PII), Validation

#### 📖 Guidelines (2)
- Accessibility (WCAG 2.2 AA), Brand

#### 📦 Templates (8) **NEW**
- All Templates, Page Layouts, Loading Animations, Splash Screens
- Fintech Workflows, UI Components, Forms, Dashboards

### When to Use Which Tool?

```
Need a color? → find_color
Need to change format? → convert_color
Building UI? → generate_component + find_color
Checking accessibility? → validate_contrast
Don't know what exists? → search_design_system
Curious about usage? → view_analytics
```

### Common Query Patterns

**Colors:**
```
"Find primary blue"
"Show success colors"
"Convert #2563eb to rgb"
"Is this color accessible?"
```

**Components:**
```
"Generate React button"
"Show button variants"
"Create Vue input field"
```

**Patterns:**
```
"Explain KYC workflow"
"Show settlement pattern"
"How to handle refunds?"
```

**Formatting:**
```
"Format INR currency"
"IST date format"
"Mask phone numbers"
"Validate email regex"
```

**Templates:** **NEW**
```
"Show all template categories"
"Get payment checkout template"
"Find a loading spinner template"
"Show dashboard layout template"
"Get multi-step form wizard"
```

---

## 🔧 5. Troubleshooting

### Issue: "MCP server not found"

**Solution:**
1. Check the path in `mcp.json` is ABSOLUTE (not relative)
2. Verify the file exists: `ls /Users/sabadmin/Documents/mcp-servers/sabpaisa-design-system-mcp/dist/index.js`
3. Restart Claude Desktop completely

### Issue: "No colors found matching 'X'"

**Solution:**
- Try broader search: "primary" instead of "primary-blue-500"
- Use `search_design_system` first to explore
- Check available colors: "List all available colors"

### Issue: "Tool execution timeout"

**Solution:**
1. Check server is running: `cd /Users/sabadmin/Documents/mcp-servers/sabpaisa-design-system-mcp && npm start`
2. Rebuild if needed: `npm run build`
3. Check for TypeScript errors

### Issue: "Invalid color format"

**Examples of valid formats:**
- Hex: `#2563eb`, `#fff`
- RGB: `rgb(37, 99, 235)`
- HSL: `hsl(221, 83%, 53%)`
- Token name: `primary` (searches by name)

### Issue: "Component not generated correctly"

**Solution:**
- Specify framework: "Generate React button" (not just "button")
- Valid components: button, card, input
- Valid frameworks: react, vue, angular, html

### Need More Help?

- 📖 **Detailed Reference**: See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
- 📚 **Complete Guide**: See [README.md](./README.md)
- 🏗️ **Architecture**: See [FINAL_SUMMARY.md](./FINAL_SUMMARY.md)
- 🧪 **Testing**: See [TEST_REPORT.md](./TEST_REPORT.md)

---

## 🎯 Success Checklist

You're ready to build if you can:

- [x] Configure MCP server in under 2 minutes
- [x] Get your first color with visual preview
- [x] Generate a component for your framework
- [x] Format currency correctly
- [x] Validate color contrast for accessibility
- [x] Know where to find detailed documentation

---

## 🚀 Next Steps

Now that you're set up, here are common tasks for hackathon projects:

### Building a Login Form?
1. Ask: "Generate a login input component"
2. Ask: "Find colors for error and success states"
3. Ask: "Validate email format regex"

### Creating a Dashboard?
1. Ask: "Show card component specs"
2. Ask: "Find typography for headings"
3. Ask: "Generate card layout in React"

### Processing Payments?
1. Ask: "Show settlement workflow pattern"
2. Ask: "Format INR currency"
3. Ask: "Generate payment button"

### Adding KYC?
1. Ask: "Explain KYC onboarding workflow"
2. Ask: "Generate status badge component"
3. Ask: "Show document upload pattern"

---

## 💡 Pro Tips

1. **Start with search**: Use `search_design_system` to explore what exists
2. **Visual first**: Use `find_color` to SEE colors before coding
3. **Accessibility matters**: Always use `validate_contrast` for text colors
4. **Copy-paste ready**: All generated code is complete, just customize
5. **Framework agnostic**: Same design system works for React, Vue, Angular
6. **Fintech patterns**: Leverage pre-built workflows (KYC, settlement, etc.)

---

**Ready to build? Just ask Claude about the design system!**

*MCP Server Version: 1.0.0*
*Last Updated: November 27, 2025*
Give me design system.md file with the principles we implemented 




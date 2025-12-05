# SabPaisa COB Design System - Complete Documentation

**Version:** 2.0.0
**Last Updated:** December 1, 2025
**Industry:** FinTech / Core Banking
**Platform:** SabPaisa COB (Central Onboarding Bureau)
**Status:** ✅ Production Ready

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Design System Architecture](#design-system-architecture)
3. [Design Tokens Reference](#design-tokens-reference)
4. [Component Library](#component-library)
5. [Fintech Patterns](#fintech-patterns)
6. [Data Formatting Guidelines](#data-formatting-guidelines)
7. [MCP Server Implementation](#mcp-server-implementation)
8. [Frontend Integration](#frontend-integration)
9. [Typography System](#typography-system)
10. [Usage Examples](#usage-examples)
11. [Best Practices](#best-practices)
12. [Accessibility Guidelines](#accessibility-guidelines)

---

## Executive Summary

The SabPaisa COB Design System is a comprehensive, production-ready design system built specifically for financial technology applications. It provides a centralized source of truth for design tokens, UI components, workflow patterns, and formatting guidelines across 14+ hackathon products.

### Key Features

- **22 Design Resources** - Tokens, components, patterns, formatting, guidelines
- **6 MCP Tools** - Search, color conversion, validation, code generation, analytics
- **Multi-Format Support** - HEX, RGB, HSL, RGBA, CSS Variables, Tailwind Classes
- **WCAG 2.2 AA Compliant** - Accessibility-first design approach
- **Framework Agnostic** - Works with React, Vue, Angular, HTML
- **Fintech Optimized** - Domain-specific patterns for payments, KYC, settlements
- **Performance** - Sub-10ms average response time (5.89ms achieved)
- **Visual Previews** - SVG-based color swatches and component previews

### Technology Stack

- **Backend:** TypeScript, Node.js, Model Context Protocol (MCP)
- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Design Tokens:** Style Dictionary compatible
- **Search:** Fuse.js (fuzzy search)
- **Color Management:** tinycolor2
- **Analytics:** Built-in usage tracking

---

## Design System Architecture

### Three-Tier Token System

```
┌─────────────────────────────────────────────────────┐
│                 Component Tokens                     │
│  (Component-specific: button.primary.background)    │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│                 Semantic Tokens                      │
│  (Purpose-based: color.brand.primary, feedback)     │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│                 Primitive Tokens                     │
│  (Raw values: SabPaisaBlue500, Green600)           │
└─────────────────────────────────────────────────────┘
```

### Token Naming Convention

```
[foundation].[property].[modifier].[state]

Examples:
- color.text.default
- color.background.brand.bold
- space.100
- elevation.surface.raised
```

### MCP Server Architecture

```
┌─────────────────────────────────────────────────────┐
│              Claude Desktop Client                   │
└──────────────────────┬──────────────────────────────┘
                       │ MCP Protocol
┌──────────────────────▼──────────────────────────────┐
│          SabPaisa Design System MCP Server           │
│                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │  Resources  │  │    Tools    │  │  Analytics  │ │
│  │   (22)      │  │    (6)      │  │  Tracking   │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
│                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   Search    │  │   Visual    │  │   Logger    │ │
│  │   Engine    │  │ Generation  │  │   System    │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│              Design System Data                      │
│  ┌─────────────────────────────────────────────┐   │
│  │  design-system.json                          │   │
│  │  design-system-enhanced.json                 │   │
│  │  fintech-patterns.json                       │   │
│  │  data-formatting-guide.json                  │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## Design Tokens Reference

### Color Tokens

#### Brand Colors

##### Primary Blue
**Usage:** Main CTAs, primary navigation, key interactive elements

```json
{
  "50": "#eff6ff",   // Lightest backgrounds, subtle highlights
  "100": "#dbeafe",  // Light backgrounds, disabled states
  "200": "#bfdbfe",  // Hover backgrounds, selected states
  "300": "#93c5fd",  // Disabled states, subtle accents
  "400": "#60a5fa",  // Borders, icons, lighter interactive elements
  "500": "#3b82f6",  // Primary brand color
  "600": "#2563eb",  // Primary hover states
  "700": "#1d4ed8",  // Primary active/pressed states
  "800": "#1e40af",  // Dark mode primary
  "900": "#1e3a8a",  // Darkest shade
  "base": "#006CED"  // SabPaisa brand blue
}
```

**Tailwind Classes:** `primary-50` through `primary-900`
**CSS Variables:** `--color-primary-50` through `--color-primary-900`

**Multi-Format Example (Primary 500):**
```css
/* HEX */
color: #3b82f6;

/* RGB */
color: rgb(59, 130, 246);

/* HSL */
color: hsl(217, 91%, 60%);

/* RGBA (50% opacity) */
color: rgba(59, 130, 246, 0.5);

/* CSS Variable */
color: var(--color-primary-500);

/* Tailwind */
@apply text-primary-500;
```

##### Secondary Teal
**Usage:** Secondary actions, supporting elements, success states

```json
{
  "50": "#eff5f5",
  "100": "#dbf0ee",
  "200": "#aeeae5",
  "300": "#7ce9df",
  "400": "#48eadc",
  "500": "#15ead7",
  "600": "#0d9488",  // Base teal
  "700": "#10bcac",
  "800": "#10897f",
  "900": "#0d5953"
}
```

##### Accent Orange
**Usage:** Highlights, warnings, call-to-action emphasis

```json
{
  "50": "#f6f3ee",
  "100": "#f2e6d9",
  "200": "#f0cea8",
  "300": "#f4b771",
  "400": "#fa9f38",
  "500": "#ff8800",  // Base orange
  "600": "#ff8800",
  "700": "#cc6d00",
  "800": "#955104",
  "900": "#613605"
}
```

##### Navy Blue
**Usage:** Professional elements, headers, authority

```json
{
  "base": "#002E8B"
}
```

##### Dark Gray
**Usage:** Text, borders, backgrounds

```json
{
  "base": "#212121"
}
```

#### Semantic Colors

```json
{
  "success": {
    "base": "#22c55e",
    "usage": "Success messages, positive confirmations"
  },
  "error": {
    "base": "#ef4444",
    "usage": "Error messages, validation failures"
  },
  "warning": {
    "base": "#f59e0b",
    "usage": "Warning messages, cautionary states"
  },
  "info": {
    "base": "#3b82f6",
    "usage": "Informational messages, tips"
  }
}
```

#### Transaction-Specific Colors

```json
{
  "credit": {
    "base": "#22c55e",
    "usage": "Money in, deposits, credits"
  },
  "debit": {
    "base": "#ef4444",
    "usage": "Money out, withdrawals, debits"
  },
  "pending": {
    "base": "#f59e0b",
    "usage": "Pending transactions, awaiting status"
  },
  "settled": {
    "base": "#06b6d4",
    "usage": "Settled transactions, completed"
  },
  "refunded": {
    "base": "#a855f7",
    "usage": "Refunded amounts"
  },
  "failed": {
    "base": "#dc2626",
    "usage": "Failed transactions"
  }
}
```

#### Extended Color Palette

```json
{
  "dodgerBlue": "#00A8FE",
  "safetyOrange": "#FF5700",
  "ronchi": "#FFC247",
  "purple": "#506CE2",
  "turquoise": "#17BEB6"
}
```

### Spacing Tokens

**Based on 8pt Grid System**

```json
{
  "0": "0",          // 0px
  "1": "0.25rem",    // 4px
  "2": "0.5rem",     // 8px
  "3": "0.75rem",    // 12px
  "4": "1rem",       // 16px (base unit)
  "5": "1.25rem",    // 20px
  "6": "1.5rem",     // 24px
  "8": "2rem",       // 32px
  "10": "2.5rem",    // 40px
  "12": "3rem",      // 48px
  "16": "4rem",      // 64px
  "20": "5rem",      // 80px
  "24": "6rem"       // 96px
}
```

**Tailwind Usage:** `space-0` through `space-24`
**CSS Variables:** `--spacing-xs` through `--spacing-xl`

### Typography Tokens

#### Font Families

```json
{
  "heading": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  "body": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  "mono": "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
}
```

**Tailwind Usage:** `font-heading`, `font-body`, `font-mono`
**CSS Variables:** `--font-heading`, `--font-body`, `--font-mono`

#### Font Sizes

```json
{
  "xs": "0.75rem",    // 12px - Captions, labels
  "sm": "0.875rem",   // 14px - Small body text
  "base": "1rem",     // 16px - Base body text
  "lg": "1.125rem",   // 18px - Large body text
  "xl": "1.25rem",    // 20px - Small headings
  "2xl": "1.5rem",    // 24px - H4
  "3xl": "1.875rem",  // 30px - H3
  "4xl": "2.25rem",   // 36px - H2
  "5xl": "3rem"       // 48px - H1
}
```

**Tailwind Usage:** `text-xs` through `text-5xl`
**CSS Variables:** `--font-size-xs` through `--font-size-5xl`

#### Font Weights

```json
{
  "normal": "400",     // Regular text
  "medium": "500",     // Slightly emphasized
  "semibold": "600",   // Sub-headings
  "bold": "700",       // Headings, emphasis
  "extrabold": "800"   // Extra emphasis
}
```

**Tailwind Usage:** `font-normal`, `font-medium`, `font-semibold`, `font-bold`, `font-extrabold`

#### Line Heights

```json
{
  "none": "1",        // No line spacing
  "tight": "1.25",    // Headings
  "snug": "1.375",    // Sub-headings
  "normal": "1.5",    // Body text
  "relaxed": "1.625", // Comfortable reading
  "loose": "2"        // Extra spacing
}
```

**Tailwind Usage:** `leading-none` through `leading-loose`

#### Letter Spacing

```json
{
  "tighter": "-0.05em",   // Tight headings
  "tight": "-0.025em",    // Headings
  "normal": "0em",        // Body text
  "wide": "0.025em",      // Labels
  "wider": "0.05em",      // All-caps
  "widest": "0.1em"       // Wide all-caps
}
```

**Tailwind Usage:** `tracking-tighter` through `tracking-widest`

### Shadow Tokens

```json
{
  "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  "base": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  "inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  "none": "0 0 #0000"
}
```

### Border Radius Tokens

```json
{
  "none": "0",
  "sm": "0.125rem",   // 2px
  "base": "0.25rem",  // 4px
  "md": "0.375rem",   // 6px
  "lg": "0.5rem",     // 8px
  "xl": "0.75rem",    // 12px
  "2xl": "1rem",      // 16px
  "3xl": "1.5rem",    // 24px
  "full": "9999px"    // Pill shape
}
```

---

## Component Library

### Button Component

#### Variants

##### Primary Button
**Usage:** Main call-to-action, primary actions

```jsx
<Button variant="primary" size="md">
  Continue
</Button>
```

**Styles:**
- Background: Gradient from `blue-600` to `blue-500`
- Hover: Gradient from `blue-700` to `blue-600`
- Text: White
- Shadow: Large shadow with blue glow on hover
- Focus: Ring with `blue-400/50`

##### Secondary Button
**Usage:** Secondary actions, alternative options

```jsx
<Button variant="secondary" size="md">
  Cancel
</Button>
```

**Styles:**
- Background: Gradient from `teal-600` to `teal-500`
- Hover: Gradient from `teal-700` to `teal-600`
- Text: White
- Shadow: Large shadow with teal glow on hover

##### Outline Button
**Usage:** Tertiary actions, ghost buttons

```jsx
<Button variant="outline" size="md">
  Learn More
</Button>
```

**Styles:**
- Border: 2px `white/30`
- Hover Border: `white/50`
- Hover Background: `white/10`
- Text: White
- Backdrop: Blur

##### Ghost Button
**Usage:** Minimal actions, text-like buttons

```jsx
<Button variant="ghost" size="md">
  Skip
</Button>
```

**Styles:**
- Background: Transparent
- Hover Background: `white/10`
- Text: `white/80` → `white` on hover
- Backdrop: Blur

##### Danger Button
**Usage:** Destructive actions, delete, remove

```jsx
<Button variant="danger" size="md">
  Delete Account
</Button>
```

**Styles:**
- Background: Gradient from `red-600` to `red-500`
- Hover: Gradient from `red-700` to `red-600`
- Text: White
- Shadow: Large shadow with red glow on hover

#### Sizes

```jsx
// Small
<Button size="sm">Small</Button>
// px-4 py-2 text-sm rounded-xl gap-2

// Medium (default)
<Button size="md">Medium</Button>
// px-6 py-3 text-base rounded-xl gap-2

// Large
<Button size="lg">Large</Button>
// px-8 py-4 text-lg rounded-xl gap-3

// Extra Large
<Button size="xl">Extra Large</Button>
// px-8 py-4 text-xl rounded-xl gap-3
```

#### States

```jsx
// Loading
<Button isLoading>Processing...</Button>

// Disabled
<Button disabled>Not Available</Button>

// With Icons
<Button leftIcon={<Icon />}>Continue</Button>
<Button rightIcon={<Icon />}>Next</Button>

// Full Width
<Button fullWidth>Submit</Button>
```

#### Component Props

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}
```

### Card Component

```jsx
<Card variant="default" padding="lg">
  <CardHeader>
    <Typography variant="h3">Card Title</Typography>
  </CardHeader>
  <CardBody>
    Card content goes here
  </CardBody>
  <CardFooter>
    <Button variant="primary">Action</Button>
  </CardFooter>
</Card>
```

#### Card Variants

- `default` - Standard white/dark card
- `glass` - Glassmorphism effect with backdrop blur
- `gradient` - Gradient background
- `outlined` - Border with no background

### Input Component

```jsx
<TextField
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
  error={errors.email}
  required
/>
```

#### Input States

- Default
- Focus
- Error
- Disabled
- Success (with validation)

### Typography Component

```jsx
<Typography variant="h1" color="primary" align="center">
  Welcome to SabPaisa
</Typography>
```

See [Typography System](#typography-system) section for complete details.

### Toast/Notification Component

```jsx
<Toast
  type="success"
  message="Payment successful"
  duration={3000}
  onClose={() => {}}
/>
```

#### Toast Types

- `success` - Green background, checkmark icon
- `error` - Red background, error icon
- `warning` - Orange background, warning icon
- `info` - Blue background, info icon

---

## Fintech Patterns

### Settlement Pattern

**Overview:** T+2 settlement cycle for merchant payments

#### Data Model

```typescript
interface Settlement {
  id: string;                    // SETL001234
  batchId: string;               // BATCH20250115
  date: string;                  // ISO 8601 datetime
  amount: number;                // Gross amount
  transactionCount: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  bankAccount: string;           // Masked
  utrNumber?: string;            // UTR123456
  processingFee: number;         // 1.99% of amount
  gst: number;                   // 18% of processing fee
  netAmount: number;             // amount - fees - gst
  merchantCode: string;
}
```

#### Workflow

```
1. Batch Creation (T+2, 6 PM daily)
   ↓
2. Fee Calculation (1.99% + 18% GST)
   ↓
3. Bank Transfer Initiation (NEFT/RTGS/IMPS)
   ↓
4. UTR Confirmation
   ↓
5. Notification (Email/SMS with PDF)
```

#### Fee Formula

```javascript
const grossAmount = sumOfTransactions;
const processingFee = grossAmount * 0.0199;
const gst = processingFee * 0.18;
const netAmount = grossAmount - processingFee - gst;
```

#### UI Pattern

**List View:**
- Columns: Settlement ID, Batch ID, Date, Transactions, Gross, Fees, GST, Net, Status, UTR, Actions
- Filters: Date Range, Status, Bank Account, Amount Range
- Actions: View Details, Download PDF, Download Excel, Retry (if FAILED)

**Status Colors:**
```javascript
{
  PENDING: 'amber-500',
  PROCESSING: 'blue-500',
  COMPLETED: 'green-500',
  FAILED: 'red-500'
}
```

### KYC Onboarding Pattern

**Overview:** 7-step merchant verification workflow

#### Workflow Steps

```
1. Business Details
   └─ Business name, type, registration number

2. Contact Information
   └─ Email, phone, address, authorized person

3. Document Upload
   └─ PAN, GST, Business registration, Address proof

4. Bank Details
   └─ Account number, IFSC, bank name, account type

5. DSC Integration (Optional)
   └─ Digital Signature Certificate upload

6. Review & Submit
   └─ Review all information before submission

7. Verification
   └─ Auto-verify (PAN, GST), Manual review, Approval/Rejection
```

#### Document Requirements

```typescript
interface KYCDocuments {
  panCard: File;           // Required
  gstCertificate: File;    // Required for businesses > 20L
  businessProof: File;     // Registration certificate
  addressProof: File;      // Utility bill/rental agreement
  bankProof: File;         // Cancelled cheque/passbook
  dsc?: File;             // Optional digital signature
}
```

#### Validation Rules

- **PAN:** Alphanumeric, 10 characters, format: `ABCDE1234F`
- **GST:** 15 characters, format: `22AAAAA0000A1Z5`
- **Phone:** 10 digits, starts with 6-9
- **Email:** Standard email validation
- **IFSC:** 11 characters, alphanumeric

### Reconciliation Pattern

**Overview:** Daily matching of transactions with bank statements

#### Workflow

```
1. Import Bank Statement
   ↓
2. Auto-Match Transactions (UTR, Amount, Date)
   ↓
3. Review Unmatched Items
   ↓
4. Manual Matching/Exception Handling
   ↓
5. Generate Reconciliation Report
```

#### Matching Algorithm

```javascript
function matchTransaction(bankEntry, systemTransaction) {
  // Exact match
  if (bankEntry.utr === systemTransaction.utr &&
      bankEntry.amount === systemTransaction.amount) {
    return 'EXACT_MATCH';
  }

  // Partial match (amount + date)
  if (bankEntry.amount === systemTransaction.amount &&
      isSameDay(bankEntry.date, systemTransaction.date)) {
    return 'PARTIAL_MATCH';
  }

  return 'NO_MATCH';
}
```

### Refund & Chargeback Pattern

**Overview:** Process refunds and handle chargebacks

#### Refund Workflow

```
1. Refund Request
   ↓
2. Validation (Transaction exists, Refundable amount, Time limit)
   ↓
3. Approval (Auto for < ₹1000, Manual for > ₹1000)
   ↓
4. Processing (Reverse payment gateway, Update status)
   ↓
5. Confirmation (UTR generated, Email sent)
```

#### Chargeback Workflow

```
1. Chargeback Notification (From bank/payment gateway)
   ↓
2. Investigation (Review transaction, Gather evidence)
   ↓
3. Response (Accept or Dispute with evidence)
   ↓
4. Dispute Resolution (Bank decision)
   ↓
5. Final Settlement (Debit merchant or Reverse chargeback)
```

---

## Data Formatting Guidelines

### Currency Formatting (INR)

#### Standard Format

```javascript
// Function
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

// Examples
formatCurrency(1234.5)     → ₹1,234.50
formatCurrency(123456)     → ₹1,23,456.00
formatCurrency(12345678)   → ₹1,23,45,678.00
```

#### Display Rules

**Large Amounts (Transactions, Settlements):**
```css
.amount-large {
  font-size: text-2xl;
  font-weight: font-bold;
  color: text-emerald-500; /* for credits */
  color: text-red-500;     /* for debits */
}
```

**Small Amounts (Fees, Taxes):**
```css
.amount-small {
  font-size: text-sm;
  font-weight: font-normal;
  color: text-gray-500;
}
```

#### Compact Format

```javascript
function formatCompact(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return formatCurrency(amount);
}

// Examples
formatCompact(12500)      → ₹12.5K
formatCompact(150000)     → ₹1.5L
formatCompact(23000000)   → ₹2.3Cr
```

### Date & Time Formatting

#### Full DateTime (IST)

```javascript
// Pattern: DD MMM YYYY, HH:mm IST
// Example: 15 Jan 2025, 14:30 IST

function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata',
    timeZoneName: 'short'
  }).format(new Date(date));
}
```

#### Short DateTime

```javascript
// Pattern: DD MMM, HH:mm
// Example: 15 Jan, 14:30

function formatShortDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata'
  }).format(new Date(date));
}
```

#### Relative Time

```javascript
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minutes ago`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)} hours ago`;
  return `${Math.floor(minutes / 1440)} days ago`;
}
```

### PII Masking

#### PAN Card Masking

```javascript
// Input: ABCDE1234F
// Output: ABXXXX234F

function maskPAN(pan: string): string {
  return pan.slice(0, 2) + 'X'.repeat(4) + pan.slice(-4);
}
```

#### Phone Number Masking

```javascript
// Input: 9876543210
// Output: 98XXXXX210

function maskPhone(phone: string): string {
  return phone.slice(0, 2) + 'X'.repeat(5) + phone.slice(-3);
}
```

#### Email Masking

```javascript
// Input: john.doe@example.com
// Output: jo*****@example.com

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  return local.slice(0, 2) + '*'.repeat(5) + '@' + domain;
}
```

#### Account Number Masking

```javascript
// Input: 1234567890123456
// Output: XXXXXXXXXXXX3456

function maskAccountNumber(accountNumber: string): string {
  return 'X'.repeat(accountNumber.length - 4) + accountNumber.slice(-4);
}
```

### Transaction ID Format

```javascript
// Pattern: TXN + YYYYMMDD + 6-digit sequential
// Example: TXN20250115000123

function generateTransactionId(sequenceNumber: number): string {
  const date = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '');
  const seq = sequenceNumber.toString().padStart(6, '0');
  return `TXN${date}${seq}`;
}
```

---

## MCP Server Implementation

### Overview

The SabPaisa Design System MCP Server is a standalone service that provides design system access via the Model Context Protocol.

**Technology Stack:**
- TypeScript
- Node.js
- @modelcontextprotocol/sdk
- Fuse.js (fuzzy search)
- tinycolor2 (color utilities)

**Performance:**
- Average Response Time: 5.89ms
- Server Startup: <2 seconds
- Memory Usage: ~25MB
- Search Indexing: <100ms

### Resources (22 Available)

#### Design Tokens

1. `sabpaisa://tokens/all` - Complete token system
2. `sabpaisa://tokens/colors` - All color palettes
3. `sabpaisa://tokens/typography` - Font families, sizes, weights
4. `sabpaisa://tokens/spacing` - 8pt grid spacing
5. `sabpaisa://tokens/shadows` - Elevation system

#### Components

6. `sabpaisa://components/all` - Complete component library
7. `sabpaisa://components/button` - Button specifications
8. `sabpaisa://components/card` - Card specifications
9. `sabpaisa://components/input` - Input specifications
10. `sabpaisa://components/typography` - Typography component

#### Fintech Patterns

11. `sabpaisa://patterns/all` - All workflow patterns
12. `sabpaisa://patterns/settlement` - Settlement processing
13. `sabpaisa://patterns/kyc` - KYC onboarding
14. `sabpaisa://patterns/reconciliation` - Daily reconciliation
15. `sabpaisa://patterns/refund-chargeback` - Refund workflows

#### Formatting

16. `sabpaisa://formatting/currency` - INR formatting
17. `sabpaisa://formatting/datetime` - IST timezone
18. `sabpaisa://formatting/masking` - PII masking
19. `sabpaisa://formatting/validation` - Regex patterns

#### Guidelines

20. `sabpaisa://guidelines/accessibility` - WCAG 2.2 AA
21. `sabpaisa://guidelines/brand` - Brand identity
22. `sabpaisa://guidelines/usage` - Usage documentation

### Tools (6 Available)

#### 1. search_design_system

**Purpose:** Fuzzy search across all resources

**Input:**
```json
{
  "query": "blue button",
  "category": "all",
  "limit": 10
}
```

**Output:**
- Ranked search results
- Relevance scores
- Resource URIs
- Preview snippets

#### 2. find_color

**Purpose:** Find colors with WCAG filtering and visual palette

**Input:**
```json
{
  "query": "primary",
  "wcagLevel": "AA"
}
```

**Output:**
- Color details (HEX, RGB, HSL, RGBA)
- CSS variables
- Tailwind classes
- WCAG contrast ratios
- SVG color palette visualization

#### 3. convert_color

**Purpose:** Convert between color formats

**Input:**
```json
{
  "color": "#2563eb",
  "toFormat": "rgb"
}
```

**Output:**
- Converted color value
- All available formats
- SVG color swatch
- Usage examples

#### 4. validate_contrast

**Purpose:** WCAG color contrast validation

**Input:**
```json
{
  "foreground": "#2563eb",
  "background": "#ffffff",
  "textSize": "normal"
}
```

**Output:**
- Contrast ratio (e.g., 5.17:1)
- WCAG AA compliance (✓/✗)
- WCAG AAA compliance (✓/✗)
- SVG preview with sample text
- Recommendations

#### 5. generate_component

**Purpose:** Generate framework-specific component code

**Input:**
```json
{
  "component": "button",
  "variant": "primary",
  "framework": "react"
}
```

**Output:**
- Complete component code
- Import statements
- Usage example
- SVG component preview (default, hover, focus states)

**Supported Frameworks:**
- React (TypeScript)
- Vue 3
- Angular
- HTML/CSS

#### 6. view_analytics

**Purpose:** View usage statistics

**Output:**
```json
{
  "uptime": "5d 12h 34m",
  "totalRequests": 1248,
  "resourceRequests": 834,
  "toolCalls": 414,
  "averageResponseTime": "7.23ms",
  "topResources": [...],
  "topTools": [...],
  "topSearchQueries": [...]
}
```

### Installation

```bash
# Navigate to MCP server directory
cd /Users/sabadmin/Documents/mcp-servers/sabpaisa-design-system-mcp

# Install dependencies
npm install

# Build TypeScript
npm run build

# Test server
npm start
```

### Claude Desktop Configuration

Add to `~/.claude/mcp.json` or `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "sabpaisa-design-system": {
      "command": "node",
      "args": [
        "/Users/sabadmin/Documents/mcp-servers/sabpaisa-design-system-mcp/dist/index.js"
      ],
      "env": {
        "DEBUG": "0"
      }
    }
  }
}
```

**Debug Mode:**
```json
"env": { "DEBUG": "1" }
```

---

## Frontend Integration

### Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── TextField.tsx
│   │       └── Typography.tsx
│   ├── styles/
│   │   ├── variables.css       # CSS custom properties
│   │   ├── global.css
│   │   └── scrollbar.css
│   ├── index.css              # Main styles with typography utilities
│   └── main.tsx
├── tailwind.config.js          # Tailwind configuration
├── index.html                  # Font loading
└── TYPOGRAPHY.md              # Typography documentation
```

### Tailwind Configuration

File: `tailwind.config.js`

```javascript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          // ... full palette
          900: '#1e3a8a',
        },
        secondary: { /* teal palette */ },
        accent: { /* orange palette */ },
      },
      fontFamily: {
        heading: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['source-code-pro', 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
    },
  },
  plugins: [],
};
```

### CSS Variables

File: `src/styles/variables.css`

```css
:root {
  /* Colors */
  --primary-color: #2563eb;
  --primary-hover: #1d4ed8;
  --secondary-color: #0d9488;
  --secondary-hover: #0f766e;

  /* Typography - Font Families */
  --font-heading: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-body: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;

  /* Typography - Font Sizes */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Border Radius */
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
}
```

### Font Loading

File: `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SabPaisa COB</title>

    <!-- Preconnect to Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- Load Inter font -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## Typography System

See complete documentation in [TYPOGRAPHY.md](./TYPOGRAPHY.md)

### Quick Reference

#### Heading Classes

```css
.heading-1  /* 48px, bold, tight */
.heading-2  /* 36px, bold, tight */
.heading-3  /* 30px, semibold, snug */
.heading-4  /* 24px, semibold, snug */
.heading-5  /* 20px, medium, normal */
.heading-6  /* 18px, medium, normal */
```

#### Body Text Classes

```css
.body-large  /* 18px, normal, relaxed */
.body-base   /* 16px, normal, normal */
.body-small  /* 14px, normal, normal */
```

#### Utility Classes

```css
.caption      /* 12px, normal, wide */
.label        /* 14px, medium, wide, uppercase */
.code-inline  /* monospace, small, with background */
.code-block   /* monospace, small, with padding */
```

#### Typography Component

```tsx
import Typography from '@/components/ui/Typography';

<Typography variant="h1" color="primary" align="center">
  Welcome to SabPaisa
</Typography>
```

**Props:**
- `variant`: h1-h6, body-large/base/small, caption, label
- `color`: default, primary, secondary, subtle, error, success, warning
- `align`: left, center, right, justify
- `weight`: normal, medium, semibold, bold, extrabold
- `as`: Override HTML element

---

## Usage Examples

### Example 1: Creating a Payment Button

```jsx
import Button from '@/components/ui/Button';
import { CreditCard } from 'lucide-react';

function PaymentForm() {
  return (
    <Button
      variant="primary"
      size="lg"
      leftIcon={<CreditCard />}
      onClick={handlePayment}
      fullWidth
    >
      Pay ₹1,23,456.00
    </Button>
  );
}
```

### Example 2: Transaction Status Card

```jsx
import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';

function TransactionCard({ transaction }) {
  const statusColor = {
    SUCCESS: 'success',
    PENDING: 'warning',
    FAILED: 'error'
  }[transaction.status];

  return (
    <Card variant="glass" padding="lg">
      <Typography variant="label">Transaction ID</Typography>
      <Typography variant="body-base" className="mb-2">
        {transaction.id}
      </Typography>

      <Typography variant="h2" color={statusColor} className="mb-4">
        {formatCurrency(transaction.amount)}
      </Typography>

      <Typography variant="caption" color="subtle">
        {formatDateTime(transaction.date)}
      </Typography>
    </Card>
  );
}
```

### Example 3: KYC Form with Validation

```jsx
import TextField from '@/components/ui/TextField';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';

function KYCForm() {
  const [formData, setFormData] = useState({
    pan: '',
    gst: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  const validatePAN = (pan) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h3" className="mb-6">
        Business Details
      </Typography>

      <TextField
        label="PAN Card Number"
        value={formData.pan}
        onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
        placeholder="ABCDE1234F"
        error={errors.pan}
        helperText="10-character alphanumeric PAN"
        required
      />

      <TextField
        label="GST Number"
        value={formData.gst}
        onChange={(e) => setFormData({ ...formData, gst: e.target.value })}
        placeholder="22AAAAA0000A1Z5"
        error={errors.gst}
        required
      />

      <TextField
        label="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        placeholder="9876543210"
        error={errors.phone}
        required
      />

      <Button variant="primary" type="submit" fullWidth>
        Continue
      </Button>
    </form>
  );
}
```

### Example 4: Settlement Summary with Fee Breakdown

```jsx
function SettlementSummary({ settlement }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Typography variant="body-base">Gross Amount</Typography>
        <Typography variant="h3" className="font-bold">
          {formatCurrency(settlement.amount)}
        </Typography>
      </div>

      <div className="flex justify-between items-center">
        <Typography variant="body-small" color="subtle">
          - Processing Fee (1.99%)
        </Typography>
        <Typography variant="body-base" color="subtle">
          {formatCurrency(settlement.processingFee)}
        </Typography>
      </div>

      <div className="flex justify-between items-center">
        <Typography variant="body-small" color="subtle">
          - GST (18%)
        </Typography>
        <Typography variant="body-base" color="subtle">
          {formatCurrency(settlement.gst)}
        </Typography>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center">
          <Typography variant="body-base" className="font-semibold">
            Net Amount
          </Typography>
          <Typography variant="h2" color="success" className="font-bold">
            {formatCurrency(settlement.netAmount)}
          </Typography>
        </div>
      </div>
    </div>
  );
}
```

---

## Best Practices

### Design Principles

1. **Consistency** - Use design tokens for all visual properties
2. **Accessibility** - Minimum WCAG 2.2 AA compliance
3. **Performance** - Optimize for fast loading and rendering
4. **Responsiveness** - Mobile-first, adaptive layouts
5. **Clarity** - Clear visual hierarchy and information architecture

### Component Usage

#### DO ✓

```jsx
// Use design tokens
<Button variant="primary" size="md">Submit</Button>

// Use Typography component for consistency
<Typography variant="h1">Page Title</Typography>

// Use semantic color names
<div className="text-primary-600 bg-success-50">Success</div>
```

#### DON'T ✗

```jsx
// Don't use arbitrary values
<button style={{ background: '#1234ab', fontSize: '17px' }}>Submit</button>

// Don't use inline styles for design tokens
<h1 style={{ fontFamily: 'Arial', fontSize: '32px' }}>Title</h1>

// Don't use non-semantic colors
<div style={{ color: '#00ff00', background: '#ffff00' }}>Success</div>
```

### Color Usage

1. **Primary** - Main CTAs, navigation, key actions
2. **Secondary** - Supporting actions, alternative options
3. **Accent** - Highlights, warnings, emphasis
4. **Semantic** - Success, error, warning, info messages
5. **Transaction** - Financial status indicators

### Typography Hierarchy

```
H1 (48px) - Page titles
  └─ H2 (36px) - Section headings
      └─ H3 (30px) - Subsections
          └─ H4 (24px) - Component headings
              └─ Body (16px) - Content
                  └─ Caption (12px) - Supporting text
```

### Spacing Consistency

Use the 8pt grid system:
- Small gaps: 8px, 16px
- Medium gaps: 24px, 32px
- Large gaps: 48px, 64px

```jsx
// Good
<div className="space-y-4">  {/* 16px */}
<div className="mb-6">       {/* 24px */}
<div className="p-8">        {/* 32px */}

// Avoid arbitrary values
<div className="mb-[17px]">
<div className="p-[33px]">
```

---

## Accessibility Guidelines

### WCAG 2.2 AA Compliance

#### Color Contrast

**Normal Text (16px):**
- Minimum ratio: 4.5:1
- Preferred ratio: 7:1 (AAA)

**Large Text (24px+):**
- Minimum ratio: 3:1
- Preferred ratio: 4.5:1 (AAA)

**Use the MCP tool to validate:**
```
"Is this color combination accessible: #2563eb on #ffffff?"
```

#### Contrast Examples

✓ **PASS AA:**
- `#2563eb` (primary-600) on `#ffffff` (white): 5.17:1
- `#0d9488` (teal-600) on `#ffffff` (white): 4.84:1

✗ **FAIL AA:**
- `#60a5fa` (primary-400) on `#ffffff` (white): 3.62:1
- Use darker shade (600+) for text on white backgrounds

### Semantic HTML

Always use proper HTML elements:

```jsx
// Good
<button type="button">Click Me</button>
<h1>Page Title</h1>
<nav>Navigation</nav>
<main>Main Content</main>

// Bad
<div onClick={}>Click Me</div>
<div className="heading">Page Title</div>
```

### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```jsx
<Button onKeyDown={handleKeyDown} tabIndex={0}>
  Submit
</Button>
```

### Screen Reader Support

Add ARIA labels for screen readers:

```jsx
<button aria-label="Close modal">
  <X />
</button>

<input aria-describedby="email-help" />
<span id="email-help">Enter your email address</span>
```

### Focus States

All interactive elements must have visible focus states:

```css
button:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
```

---

## Appendix

### File Locations

```
# Design System JSON Files
/Users/sabadmin/Documents/COB Hackathon 2025/sabpaisa-cob-platform/frontend/
├── sabpaisa-design-system.json
├── sabpaisa-design-system-enhanced.json
├── sabpaisa-fintech-patterns.json
└── sabpaisa-data-formatting-guide.json

# MCP Server
/Users/sabadmin/Documents/mcp-servers/sabpaisa-design-system-mcp/

# Frontend Implementation
/Users/sabadmin/Documents/COB Hackathon 2025/sabpaisa-cob-platform/frontend/
├── tailwind.config.js
├── src/styles/variables.css
├── src/index.css
├── src/components/ui/Typography.tsx
└── TYPOGRAPHY.md
```

### Version History

- **v2.0.0** (Nov 25, 2025) - Enhanced with multi-format colors, expanded components, fintech patterns
- **v1.0.0** - Initial release with basic tokens and components

### Resources

- [MCP Protocol Documentation](https://modelcontextprotocol.info/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [Inter Font Family](https://rsms.me/inter/)

### Support & Contact

For questions, issues, or contributions:
- Check the MCP server README at `/mcp-servers/sabpaisa-design-system-mcp/README.md`
- Review component examples in `/src/components/ui/`
- Use the `view_analytics` MCP tool to see popular usage patterns

---

**Built with care for the SabPaisa COB Platform**
**Last Updated:** December 1, 2025
**Version:** 2.0.0
**Status:** ✅ Production Ready

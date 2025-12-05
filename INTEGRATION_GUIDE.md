# SabPaisa Design System MCP Integration Guide

**Complete guide for integrating SabPaisa Design System MCP server into your hackathon projects.**

This guide helps you connect to the cloud-hosted MCP server and leverage SabPaisa's design system directly within Claude Code.

---

## 🎯 What You Get

By integrating this MCP server, you gain instant access to:

- **64 Design System Resources**: Colors, typography, components, patterns, formatting rules
- **15 Powerful Tools**: Search, generate components, validate accessibility, convert colors
- **Real-time Updates**: Always get the latest design system changes
- **Zero Setup**: No local installation required

---

## 🚀 Quick Start (5 minutes)

### Prerequisites

Before starting, ensure you have:
- **Node.js 18+** installed (`node --version`)
- **npm 9+** installed (`npm --version`)
- **Claude Code** installed

### Step 1: Create HTTP Bridge Script

Claude Code requires a local bridge to connect to HTTP-based MCP servers. Create this one-time setup:

```bash
# Create a directory for the bridge script
mkdir -p ~/.sabpaisa-mcp
cd ~/.sabpaisa-mcp

# Create the bridge script
cat > mcp-bridge.mjs <<'EOF'
#!/usr/bin/env node
import * as readline from 'readline';

const endpoint = process.argv[2] || 'https://suanrlo9yc.execute-api.ap-south-1.amazonaws.com/mcp';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });

rl.on('line', async (line) => {
  try {
    const request = JSON.parse(line);
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) {
      console.log(JSON.stringify({ jsonrpc: '2.0', id: request.id, error: { code: -32603, message: `HTTP ${response.status}` }}));
    } else {
      console.log(JSON.stringify(await response.json()));
    }
  } catch (error) {
    console.log(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32603, message: error.message }}));
  }
});
EOF

# Make it executable
chmod +x mcp-bridge.mjs
```

### Step 2: Configure Claude Code

**Option A: Project-Specific (Recommended)**

1. Create configuration in your project:
   ```bash
   mkdir -p .claude
   ```

2. Add to `.claude/mcp.json`:

```json
{
  "mcpServers": {
    "sabpaisa-design-system": {
      "command": "node",
      "args": [
        "/Users/YOUR_USERNAME/.sabpaisa-mcp/mcp-bridge.mjs",
        "https://suanrlo9yc.execute-api.ap-south-1.amazonaws.com/mcp"
      ],
      "description": "SabPaisa Design System - Colors, components, patterns, formatting"
    }
  }
}
```

**Replace `/Users/YOUR_USERNAME` with your actual home directory path.**

**Option B: Global Configuration**

1. Create global config:
   - **macOS/Linux**: `mkdir -p ~/.config/claude-code`
   - **Windows**: `mkdir %APPDATA%\claude-code`

2. Add the same configuration to `~/.config/claude-code/mcp.json` (macOS/Linux) or `%APPDATA%\claude-code\mcp.json` (Windows)

3. **Windows users**: Replace the path with `C:\Users\YOUR_USERNAME\.sabpaisa-mcp\mcp-bridge.mjs`

### Step 3: Restart Claude Code

Close and reopen Claude Code for changes to take effect.

### Step 4: Verify Connection

Open Claude Code and ask:

```
Can you list the available MCP resources from SabPaisa Design System?
```

You should see 64 resources including:
- Design tokens (colors, typography, spacing)
- Components (Button, Card, Input, etc.)
- Fintech patterns (Settlement, KYC, Reconciliation)
- Data formatting guidelines

### Step 3: Start Building

You're ready! Use the tools to build your project.

---

## 🔧 Available Tools

### 1. Search Design System

Find anything in the design system:

```
Search for "primary button" in the design system
```

```
Find all payment-related patterns
```

### 2. Find Colors

Get color values with accessibility info:

```
Find the primary blue color with all format variations
```

```
Show me success colors that meet WCAG AA standards
```

### 3. Convert Colors

Convert between formats:

```
Convert #2563eb to RGB and HSL
```

```
Convert the primary color to a CSS variable
```

### 4. Validate Contrast

Check accessibility compliance:

```
Validate contrast between primary blue and white background
```

```
Check if these colors meet WCAG AAA for normal text
```

### 5. Generate Components

Get production-ready component code:

```
Generate a primary button component in React
```

```
Create a Card component in Vue with shadow and padding
```

```
Generate an Input field component in React with validation states
```

---

## 📚 Common Use Cases

### Building a Payment Form

```
I need to build a payment form. Show me:
1. Input component specs
2. Button variants for submit
3. Color palette for success/error states
4. Currency formatting guidelines
```

### Creating a Dashboard

```
Help me create a fintech dashboard:
1. Search for Card component
2. Get settlement pattern specifications
3. Find data formatting rules for amounts and dates
4. Generate dashboard Card components in React
```

### Implementing Status Badges

```
I need status badges for transactions:
1. Find success, pending, and error colors
2. Check contrast for white text on these colors
3. Generate Badge component with variants
```

### Building a KYC Flow

```
I'm building a KYC verification flow:
1. Search for KYC patterns
2. Get Input components for PAN, Aadhaar
3. Find validation rules for Indian documents
4. Generate form components
```

---

## 🎨 Design Tokens Reference

### Colors

Available color scales:
- **Primary**: Blue shades (50-950)
- **Success**: Green shades
- **Warning**: Yellow/Orange shades
- **Error**: Red shades
- **Neutral**: Gray shades

**Usage:**
```
Show me all primary color shades with hex values
```

```
Find the primary-600 color in all formats
```

### Typography

Available font families:
- **Sans**: System fonts for UI
- **Mono**: Monospace for code/data

Available sizes: xs, sm, base, lg, xl, 2xl, 3xl, 4xl

**Usage:**
```
Get typography specifications for headings
```

```
Show font size and line height for body text
```

### Spacing

Scale: 0, 1, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128

**Usage:**
```
What's the recommended spacing for card padding?
```

### Shadows

Available elevations: sm, base, md, lg, xl, 2xl

**Usage:**
```
Get shadow values for elevated cards
```

---

## 💼 Fintech Patterns

### Settlement Workflow

```
Show me the settlement workflow pattern
```

Includes:
- Transaction collection
- Batch processing
- Settlement creation
- Payout execution
- Reconciliation

### KYC Verification

```
Get KYC verification pattern specifications
```

Includes:
- Document collection (PAN, Aadhaar, Bank)
- Validation rules
- Verification states
- UI components

### Transaction Reconciliation

```
Show transaction reconciliation pattern
```

Includes:
- Match types (auto, manual, partial)
- Status tracking
- Exception handling

---

## 📐 Data Formatting Guidelines

### Indian Currency

```
How should I format Indian currency amounts?
```

Rules:
- Format: ₹1,23,456.78 (Indian numbering)
- Use `Intl.NumberFormat` with locale 'en-IN'
- Always show 2 decimal places

### Dates

```
What's the standard date format?
```

Formats:
- Display: DD MMM YYYY (15 Jan 2025)
- API: ISO 8601 (2025-01-15T00:00:00Z)

### PAN Numbers

```
How should I format and validate PAN numbers?
```

Format: ABCDE1234F (10 alphanumeric)
Pattern: `[A-Z]{5}[0-9]{4}[A-Z]{1}`

### IFSC Codes

```
Get IFSC code validation rules
```

Format: BANK0001234 (11 alphanumeric)
Pattern: `[A-Z]{4}0[A-Z0-9]{6}`

---

## 🏗️ Example Project Workflows

### 1. Building a Transaction Dashboard

```markdown
Step 1: Get design foundation
"Show me Card component specs and color tokens for transaction statuses"

Step 2: Generate components
"Generate a TransactionCard component in React with status badge"

Step 3: Add data formatting
"How should I format transaction amounts and timestamps?"

Step 4: Implement status logic
"What colors should I use for success, pending, and failed transactions?"
```

### 2. Creating a Payment Form

```markdown
Step 1: Get form components
"Show me Input and Button component specifications"

Step 2: Generate form fields
"Generate Input components for amount, UPI ID, and remarks"

Step 3: Add validation
"Get validation rules for UPI IDs and amount formatting"

Step 4: Add submit button
"Generate a primary Button component for form submission"
```

### 3. Building a Settlement Report

```markdown
Step 1: Understand pattern
"Show me the settlement workflow pattern"

Step 2: Get data formatting
"How should I format settlement amounts, dates, and batch IDs?"

Step 3: Create UI
"Generate Table component with settlement data columns"

Step 4: Add status indicators
"Find appropriate colors for settlement statuses"
```

---

## 🎓 Advanced Features

### Accessibility Validation

Always check color contrast:

```
I'm using primary-600 (#2563eb) for a button with white text.
Validate if this meets WCAG AA standards.
```

### Multi-framework Support

Generate components for your framework:

```
Generate this button in React
```

```
Generate the same button in Vue
```

```
Generate the same button in Angular
```

### Real-time Design Updates

The MCP server always reflects the latest design system. When the design team updates:
- Color values
- Component specs
- New patterns

You get them automatically without any code changes.

---

## 🐛 Troubleshooting

### "MCP server not found" or "Cannot connect"

**Cause**: Bridge script path incorrect or Node.js not found

**Solution**:
```bash
# 1. Verify Node.js is installed
node --version  # Should show v18 or higher

# 2. Check bridge script exists
ls -la ~/.sabpaisa-mcp/mcp-bridge.mjs

# 3. Test the bridge script manually
echo '{"jsonrpc":"2.0","method":"ping","id":1}' | node ~/.sabpaisa-mcp/mcp-bridge.mjs

# 4. Verify the path in .claude/mcp.json matches your home directory
# Replace /Users/YOUR_USERNAME with your actual path (use `echo $HOME` on macOS/Linux)
```

### MCP Server Not Responding

1. Check the health endpoint:
   ```bash
   curl https://suanrlo9yc.execute-api.ap-south-1.amazonaws.com/health
   # Should return: {"status":"healthy","version":"1.0.0",...}
   ```

2. Test direct HTTP connection:
   ```bash
   curl -X POST https://suanrlo9yc.execute-api.ap-south-1.amazonaws.com/mcp \
     -H "Content-Type: application/json" \
     -d '{"jsonrpc":"2.0","method":"resources/list","id":1,"params":{}}'
   ```

3. Restart Claude Code

### "Permission denied" when creating bridge script

**macOS/Linux**:
```bash
chmod +x ~/.sabpaisa-mcp/mcp-bridge.mjs
```

**Windows**: Run PowerShell as Administrator

### Can't Find Resources

Make sure you're using the right query:

❌ "Show button"
✅ "Search for button component in design system"

❌ "Colors"
✅ "Find primary color with all format variations"

### Component Generation Issues

Be specific about framework and variant:

❌ "Generate button"
✅ "Generate a primary button component in React"

### Bridge Script Not Working

If the bridge script fails, check:

1. **Syntax errors**: Open `~/.sabpaisa-mcp/mcp-bridge.mjs` and ensure it matches the template exactly
2. **Node version**: Requires Node.js 18+ for native fetch API
3. **Permissions**: The file must be executable (`chmod +x`)
4. **Path**: Use absolute path in `.claude/mcp.json`, not `~` shorthand

---

## 💡 Pro Tips

1. **Start Broad, Then Narrow**: First search the design system, then request specific components

2. **Ask for Patterns**: Fintech patterns include best practices and complete workflows

3. **Validate Accessibility**: Always check contrast before finalizing color choices

4. **Use Multi-format**: Request colors in all formats to ensure consistency across platforms

5. **Leverage Analytics**: The `view_analytics` tool shows what resources are most used

---

## 📞 Support

### During Hackathon

- **Frontend Showcase**: Visit `https://sabpaisa-design-system-frontend-428169664322.s3-website.ap-south-1.amazonaws.com` to explore components visually
- **Health Check**: `https://suanrlo9yc.execute-api.ap-south-1.amazonaws.com/health` for server status
- **Design Docs**: Check `/docs` folder in repository

### Common Questions

**Q: Can I use this MCP server in production?**
A: This is a hackathon/demo server. For production, contact SabPaisa team.

**Q: How often is the design system updated?**
A: Updates deploy automatically on git push. Check health endpoint for version.

**Q: Can I contribute new patterns?**
A: Yes! Fork the repository and submit a PR.

**Q: What if I need a component not in the system?**
A: Use existing patterns as reference and ask Claude Code to generate custom components following the design system guidelines.

---

## 🎉 You're All Set!

Start building amazing fintech products with SabPaisa's design system.

**Quick command to get started:**

```
Show me the top 5 most useful resources from SabPaisa Design System for building a payment dashboard
```

Happy hacking!

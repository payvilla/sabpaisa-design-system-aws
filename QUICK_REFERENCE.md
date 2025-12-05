# SabPaisa Design System MCP - Quick Reference

## 🚀 Quick Start (30 seconds)

```bash
cd /Users/sabadmin/Documents/mcp-servers/sabpaisa-design-system-mcp
npm start  # Production mode (clean logs)
```

## 🔧 MCP Configuration

Add to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "sabpaisa-design-system": {
      "command": "node",
      "args": ["/Users/sabadmin/Documents/mcp-servers/sabpaisa-design-system-mcp/dist/index.js"]
    }
  }
}
```

## 📚 All 6 MCP Tools

### 1. search_design_system
Search across all design resources

```typescript
{
  "query": "button",
  "category": "components",  // Optional: all, tokens, components, patterns, formatting, templates
  "limit": 10                 // Optional: default 10
}
```

### 2. find_color
Find colors with accessibility info + visual palette

```typescript
{
  "query": "primary",         // Color name, palette, or hex
  "wcagLevel": "AA"           // Optional: AA or AAA
}
```

**Returns:** Color palette visualization + formats (hex, rgb, hsl, rgba, CSS var, Tailwind)

### 3. convert_color
Convert between color formats + color swatch

```typescript
{
  "color": "#2563eb",         // Any color format
  "toFormat": "rgb",          // hex, rgb, hsl, rgba, cssVar, tailwind
  "opacity": 0.5              // Optional: for rgba
}
```

**Returns:** Converted color + visual swatch

### 4. validate_contrast
Check WCAG compliance + live preview

```typescript
{
  "foreground": "#2563eb",
  "background": "#ffffff",
  "textSize": "normal"        // normal or large
}
```

**Returns:** Contrast ratio + WCAG AA/AAA status + visual preview

### 5. generate_component
Generate component code + preview

```typescript
{
  "component": "button",      // button, card, input
  "variant": "primary",       // primary, secondary, outline
  "framework": "react",       // react, vue, angular, html
  "includeImports": true      // Optional: default true
}
```

**Returns:** Framework-specific code + component preview SVG

### 6. view_analytics
View server usage statistics

```typescript
{
  "reset": false              // Optional: true to reset analytics
}
```

**Returns:** Uptime, request counts, top resources, top tools, popular queries

## 📦 All 28 Resources

### Design Tokens (5)
- `sabpaisa://tokens/all` - Complete token system
- `sabpaisa://tokens/colors` - Color palettes
- `sabpaisa://tokens/typography` - Font system
- `sabpaisa://tokens/spacing` - 8pt grid
- `sabpaisa://tokens/shadows` - Elevation system

### Components (4)
- `sabpaisa://components/all` - Full library
- `sabpaisa://components/button` - Button specs
- `sabpaisa://components/card` - Card specs
- `sabpaisa://components/input` - Input specs

### Fintech Patterns (5)
- `sabpaisa://patterns/all` - All patterns
- `sabpaisa://patterns/settlement` - Settlement workflow
- `sabpaisa://patterns/kyc` - KYC onboarding
- `sabpaisa://patterns/reconciliation` - Reconciliation
- `sabpaisa://patterns/refund-chargeback` - Refund flows

### Formatting (4)
- `sabpaisa://formatting/currency` - INR formatting
- `sabpaisa://formatting/datetime` - IST timezone
- `sabpaisa://formatting/masking` - PII masking
- `sabpaisa://formatting/validation` - Regex patterns

### Guidelines (2)
- `sabpaisa://guidelines/accessibility` - WCAG 2.2 AA
- `sabpaisa://guidelines/brand` - Brand guidelines

### Templates (8) **NEW**
- `sabpaisa://templates/all` - All templates
- `sabpaisa://templates/page-layouts` - Dashboard, form, table layouts
- `sabpaisa://templates/loading` - Spinners, dots, pulse loaders
- `sabpaisa://templates/splash` - App launch screens
- `sabpaisa://templates/fintech` - Payment, KYC workflows
- `sabpaisa://templates/ui` - Button, badge, modal variants
- `sabpaisa://templates/forms` - Multi-step forms, validation
- `sabpaisa://templates/dashboards` - Widget layouts, metrics

## 💬 Example Queries for Claude

**Colors:**
```
"What's the SabPaisa primary blue?"
"Find success colors that meet WCAG AA"
"Convert #2563eb to RGB format"
"Is #2563eb accessible on white background?"
```

**Components:**
```
"Show me the button component"
"Generate a React payment button"
"Create a Vue input for account numbers"
"What component states are available?"
```

**Patterns:**
```
"Explain the KYC onboarding pattern"
"How do I handle settlements?"
"Show me reconciliation workflow"
```

**Formatting:**
```
"How to format Indian Rupees?"
"What's the date format for IST?"
"Show PII masking rules"
```

**Templates:** **NEW**
```
"Show me a dashboard layout template"
"Get a payment checkout flow template"
"Find a loading spinner template with code"
"Show all template categories"
"Get the multi-step form wizard template"
```

**Analytics:**
```
"Show me the server usage statistics"
"What are the most popular resources?"
"View analytics"
```

## 🎨 Visual Features

All color and component tools include SVG visualizations:

- **Color Palette:** Grid of color swatches with shades and hex values
- **Color Swatch:** Single color preview with label
- **Contrast Checker:** Side-by-side preview with WCAG indicators
- **Component Preview:** Visual representation with states (default, hover, focus)

All visualizations are:
- Markdown-embeddable (data URI format)
- High-quality SVG graphics
- Properly contrast-accessible
- System font compatible

## 📊 Performance

| Metric | Value |
|--------|-------|
| Average Response | 5.89ms |
| Server Startup | <2 seconds |
| Resource Caching | <1ms |
| Search Index Build | <100ms |

## 🐛 Debug Mode

Enable verbose logging:

```bash
DEBUG=1 npm start
# or
npm run dev:debug
```

Disable debug mode (production):

```bash
DEBUG=0 npm start
# or
npm run start:prod
# or
npm start  # (default is no debug)
```

## 📁 File Locations

- **Server:** `/Users/sabadmin/Documents/mcp-servers/sabpaisa-design-system-mcp/dist/index.js`
- **Config:** `~/.cursor/mcp.json` or `~/.claude/mcp.json`
- **Analytics:** `.analytics.json` (auto-generated)
- **Logs:** stderr (debug mode only)

## 🔄 Rebuild After Changes

```bash
npm run build   # Build TypeScript
npm start       # Start server
```

## 📞 Troubleshooting

**Server won't start:**
```bash
# Check if port is in use
lsof -i :8080

# Rebuild
npm run build

# Check logs
DEBUG=1 npm start
```

**No colors found:**
- Check design system JSON files in `data/` directory
- Ensure symlinks are valid
- Try different query (e.g., "blue" instead of "primary-blue")

**Search returns no results:**
- Design system might not have complete metadata
- Try broader query terms
- Use `search_design_system` with `category: "all"`

## 🎯 Production Checklist

- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors
- [ ] MCP config added to `~/.cursor/mcp.json`
- [ ] Server starts without errors
- [ ] Test color tool: "find primary colors"
- [ ] Test search: "search for button"
- [ ] Test analytics: "view analytics"
- [ ] Verify visualizations appear in responses

---

**Version:** 1.0.0
**Status:** Production Ready ✅
**Last Updated:** November 27, 2025

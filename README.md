# SabPaisa Design System MCP Server

**Cloud-hosted MCP server providing SabPaisa design system tokens, components, and patterns to 14+ fintech products.**

Deployed on AWS Lambda + S3/CloudFront for real-time access to design system resources via Claude Code and other MCP-compatible tools.

---

## 🚀 Live Endpoints

- **MCP Server**: `https://suanrlo9yc.execute-api.ap-south-1.amazonaws.com/mcp` (deployed via Lambda)
- **Frontend Landing Page**: `http://sabpaisa-design-system-frontend-428169664322.s3-website.ap-south-1.amazonaws.com` (deployed via S3)
- **Health Check**: `https://suanrlo9yc.execute-api.ap-south-1.amazonaws.com/health`

---

## 📦 What's Included

### MCP Server
- **28 Resources**: Complete design system access
  - Design tokens (colors, typography, spacing, shadows)
  - Component specifications (Button, Card, Input)
  - Fintech patterns (Settlement, Reconciliation, KYC, Refund/Chargeback)
  - Data formatting guidelines (currency, datetime, masking, validation)
  - Guidelines (accessibility, brand)
  - **Templates (NEW)**: 6 production-ready templates with full source code
    - Loading animations (Snake Spinner, Bouncing Dots)
    - Splash screens (Fade & Zoom)
    - Page layouts (Dashboard Layout)
    - Fintech workflows (Payment Checkout)
    - Forms (Multi-Step Wizard)

- **6 Tools**:
  - `search_design_system` - Search across all design system resources
  - `find_color` - Find colors with accessibility info
  - `convert_color` - Convert between color formats
  - `validate_contrast` - Check WCAG compliance
  - `generate_component` - Generate component code
  - `view_analytics` - Server usage statistics

### Frontend Showcase
- Interactive design system documentation
- Live component previews
- Color palette explorer
- Typography samples
- Pattern demonstrations
- **Templates Library**: Browse and copy 6 production-ready templates
  - Live preview with animations
  - Full source code with copy button
  - Installation instructions
  - Props documentation
  - Usage examples

---

## 🛠️ Architecture

```
┌─────────────────────────────────────────────────┐
│  GitHub Repository                              │
│  ├── src/              (MCP Server)             │
│  ├── frontend/         (React Showcase)         │
│  ├── data/             (Design Tokens)          │
│  └── .github/workflows (Auto-deployment)        │
└─────────────────────────────────────────────────┘
                      │
                      │ git push (triggers)
                      ▼
┌─────────────────────────────────────────────────┐
│  GitHub Actions                                 │
│  ├── Build TypeScript                           │
│  ├── Deploy to Lambda (Serverless Framework)   │
│  ├── Build React app                            │
│  └── Deploy to S3 + CloudFront                  │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌──────────────────┐          ┌──────────────────┐
│  AWS Lambda      │          │  S3 + CloudFront │
│  (MCP Server)    │          │  (Frontend)      │
│  + API Gateway   │          │                  │
└──────────────────┘          └──────────────────┘
```

---

## 💻 Local Development

### MCP Server

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run locally (stdio mode)
npm start

# Test health check (if running HTTP handler)
curl http://localhost:3000/health
```

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

---

## 🚢 Deployment

### Prerequisites
1. AWS Account with credentials configured
2. GitHub repository with secrets:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `S3_BUCKET_NAME`
   - `CLOUDFRONT_DISTRIBUTION_ID`

### Auto-Deployment
Push to `main` branch triggers automatic deployment:

```bash
git add .
git commit -m "Update design system"
git push origin main
```

GitHub Actions will:
1. Build and deploy MCP server to Lambda
2. Build and deploy frontend to S3/CloudFront
3. Invalidate CloudFront cache for instant updates

### Manual Deployment

**MCP Server:**
```bash
npm run build
serverless deploy
```

**Frontend:**
```bash
cd frontend
npm run build
aws s3 sync dist/ s3://your-bucket-name
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

---

## 📚 Integration Guide

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for detailed instructions on integrating this MCP server into:
- Claude Code projects
- Other MCP-compatible tools
- Custom applications

---

## 🏗️ Repository Structure

```
sabpaisa-design-system-aws/
├── src/
│   ├── index.ts              # Main MCP server (stdio)
│   ├── index-http.ts         # Lambda HTTP handler
│   ├── resources.ts          # Resource handlers
│   ├── tools.ts              # Tool handlers
│   ├── logger.ts             # Logging utility
│   └── analytics.ts          # Usage analytics
├── data/
│   ├── design-system.json
│   ├── fintech-patterns.json
│   ├── data-formatting-guide.json
│   └── design-templates.json     # 6 templates with code
├── data-enhanced/            # 36 modular JSON files
├── frontend/
│   ├── src/                  # React app source
│   ├── public/               # Static assets
│   └── package.json
├── docs/
│   ├── SABPAISA_DESIGN_SYSTEM_COMPLETE.md
│   └── TYPOGRAPHY.md
├── .github/
│   └── workflows/
│       └── deploy.yml        # Auto-deployment workflow
├── serverless.yml            # Lambda config
├── package.json
└── tsconfig.json
```

---

## 🔧 Configuration

### Serverless Framework (`serverless.yml`)
- Runtime: Node.js 20.x
- Memory: 512 MB
- Timeout: 30 seconds
- Region: us-east-1

### Environment Variables
- `NODE_ENV`: production
- `DEBUG`: 0

---

## 📊 Cost Estimate

**Monthly AWS Costs (estimated):**
- Lambda: ~$3/month (assuming moderate usage)
- API Gateway: Included in Lambda costs
- S3: ~$0.50/month
- CloudFront: ~$0.50/month
- **Total: ~$4-5/month**

Free tier covers most development/testing usage.

---

## 🧪 Testing

### Health Check
```bash
curl https://[your-api-gateway-url]/health
```

Expected response:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "server": "@sabpaisa/design-system-mcp",
  "resources": 20,
  "tools": 6,
  "timestamp": "2025-12-05T..."
}
```

### MCP Request
```bash
curl -X POST https://[your-api-gateway-url]/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "resources/list",
    "params": {}
  }'
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

Proprietary - SabPaisa Design System

---

## 🆘 Support

For hackathon support:
- Check [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
- View frontend showcase at `https://[your-cloudfront-url]`
- Test health endpoint for server status

---

## 🎯 Hackathon Resources

### Quick Links
- **Integration Guide**: [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
- **Frontend Showcase**: Live component demos
- **Design Docs**: [docs/](./docs/)

### Getting Started
1. Add MCP server to Claude Code config
2. Explore available resources and tools
3. Use `search_design_system` to find components
4. Generate component code with `generate_component`

Happy coding!

# The Wild Oasis 🏕️

A modern, luxurious cabin hotel booking application built with Next.js 15 and Supabase.

## 🌟 Features

- **Modern Tech Stack**: Next.js 15, React 18, Supabase
- **Authentication**: Google OAuth integration
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimized**: Image optimization, lazy loading, bundle analysis
- **Testing**: Comprehensive unit tests (Jest) and E2E tests (Playwright)
- **CI/CD**: Automated testing, building, and deployment
- **Developer Experience**: ESLint, Prettier, Husky hooks

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd the-wild-oasis
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your actual values:
   - Get Supabase credentials from [supabase.com](https://supabase.com)
   - Set up Google OAuth in [Google Cloud Console](https://console.cloud.google.com)

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
the-wild-oasis/
├── app/                    # Next.js app directory
│   ├── components/         # Reusable React components
│   ├── lib/               # Utility functions and configurations
│   ├── hooks/             # Custom React hooks
│   ├── globals.css        # Global CSS styles
│   └── layout.js          # Root layout component
├── e2e/                   # Playwright E2E tests
├── __tests__/             # Test utilities and setup
├── .github/               # GitHub Actions workflows
├── .vscode/               # VS Code configuration
├── public/                # Static assets
└── docs/                  # Documentation
```

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### E2E Tests

```bash
# Run E2E tests
npm run e2e

# Run E2E tests with UI
npm run e2e:ui

# Run E2E tests in headed mode
npm run e2e:headed
```

## 🔧 Development

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Run all validations
npm run validate
```

### Build development image

docker-compose build

# Stop all services

docker-compose down

````

### Production
```bash
# Build production image
docker build -t wild-oasis .

# Run production container
docker run -p 3000:3000 wild-oasis
````

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Bundle Size**: Analyzed and optimized
- **Image Optimization**: Next.js Image component with AVIF/WebP support

## 🔒 Security

- **Environment Variables**: All secrets properly managed
- **HTTPS**: Enforced in production
- **Security Headers**: CSP, HSTS, and other security headers configured
- **Authentication**: Secure OAuth implementation
- **Input Validation**: All user inputs validated and sanitized

## 📈 Monitoring & Analytics

- **Error Tracking**: Sentry integration (optional)
- **Analytics**: Google Analytics 4 (optional)
- **Performance**: Web Vitals tracking
- **Health Checks**: Built-in health check endpoint

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push to main

### Netlify

1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `out`
4. Add environment variables

### Docker Deployment

```bash
# Build and push to registry
docker build -t your-registry/wild-oasis .
docker push your-registry/wild-oasis

# Deploy to your server
docker pull your-registry/wild-oasis
docker run -d -p 3000:3000 your-registry/wild-oasis
```

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Fonts**: Google Fonts (Josefin Sans)

### Backend & Database

- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Authentication**: NextAuth.js with Google OAuth
- **API**: Next.js API Routes
- **File Storage**: Supabase Storage

### Development Tools

- **Package Manager**: npm
- **Code Quality**: ESLint + Prettier
- **Testing**: Jest + React Testing Library + Playwright
- **Git Hooks**: Husky + lint-staged
- **CI/CD**: GitHub Actions

## 📚 Documentation

- [Testing Guide](docs/testing_guide.md)
- [GitHub Secrets Setup](docs/github-secrets-setup.md)
- [API Documentation](docs/api.md)
- [Deployment Guide](docs/deployment.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run validate`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new booking system
fix: resolve authentication issue
docs: update README
style: format code with prettier
refactor: optimize cabin filtering
test: add unit tests for CabinCard
chore: update dependencies
```

## 📝 Environment Variables

### Required

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Optional

```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-nextauth-secret
GOOGLE_ANALYTICS_ID=your-ga-id
SENTRY_DSN=your-sentry-dsn
```

## 🐛 Troubleshooting

### Common Issues

1. **Build fails with "Module not found"**

   ```bash
   # Clear cache and reinstall
   npm run clean
   npm install
   ```

2. **Tests fail in CI but pass locally**

   ```bash
   # Run tests in CI mode locally
   npm run test:ci
   ```

3. **Linting errors**

   ```bash
   # Auto-fix most issues
   npm run lint:fix
   npm run format
   ```

4. **Docker build issues**
   ```bash
   # Clear Docker cache
   docker system prune -a
   docker-compose build --no-cache
   ```

## 📊 Performance Benchmarks

- **First Contentful Paint**: < 1.2s
- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 500KB (gzipped)

## 🔄 Update Guide

### Updating Dependencies

```bash
# Check for updates
npm run deps:check

# Update all dependencies
npm run deps:update

# Test after updates
npm run validate
```

### Version Releases

1. Update version in `package.json`
2. Create changelog entry
3. Tag release: `git tag v1.0.0`
4. Push tags: `git push --tags`

## 📞 Support

- **Issues**: [GitHub Issues](your-repo-url/issues)
- **Discussions**: [GitHub Discussions](your-repo-url/discussions)
- **Documentation**: [Project Wiki](your-repo-url/wiki)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Playwright](https://playwright.dev/) for reliable E2E testing
- The open-source community for all the great tools

---

Built with ❤️ by Porya Nikmaram & Deploy

```bash
# Build for production
npm run build

# Start production server
npm run start

# Preview production build locally
npm run preview

# Analyze bundle size
npm run analyze
```

## 🐳 Docker

### Development

```bash
# Start development environment
docker-compose up

# Buil
```

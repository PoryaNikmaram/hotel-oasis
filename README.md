# The Wild Oasis 🏕️

A modern, luxurious cabin hotel booking application built with Next.js 15 and Supabase.

## ✨ Features

- 🚀 **Modern Stack**: Next.js 15, React 18, Supabase
- 🔐 **Authentication**: Google OAuth integration
- 📱 **Responsive Design**: Mobile-first with Tailwind CSS
- ⚡ **Performance**: Optimized images, lazy loading, efficient bundling
- ✅ **Testing**: Comprehensive unit tests with Jest
- 🎨 **Code Quality**: ESLint, Prettier, Husky hooks
- 🔄 **CI/CD**: Automated testing and deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Installation

1. **Clone and install**

   ```bash
   git clone <your-repo-url>
   cd the-wild-oasis
   npm install
   ```

2. **Environment setup**

   ```bash
   cp .env.example .env.local
   ```

   Required variables:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXTAUTH_SECRET=your-nextauth-secret
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
the-wild-oasis/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   ├── lib/               # Utilities and configs
│   ├── hooks/             # Custom hooks
│   └── globals.css        # Global styles
├── __tests__/             # Test utilities
├── .github/               # CI/CD workflows
└── public/                # Static assets
```

## 🧪 Testing

```bash
npm run test              # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # With coverage
npm run test:ci          # CI mode
```

## 🛠️ Development Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Lint code
npm run lint:fix         # Fix lint issues
npm run format           # Format with Prettier
npm run validate         # Run all checks
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Add environment variables in dashboard
3. Deploy automatically on push to main

### Manual Deployment

```bash
npm run build
npm run start
```

## 🛠️ Tech Stack

**Frontend**: Next.js 15, React 18, Tailwind CSS, Heroicons  
**Backend**: Supabase (PostgreSQL + Auth + Storage)  
**Authentication**: NextAuth.js with Google OAuth  
**Testing**: Jest, React Testing Library  
**Code Quality**: ESLint, Prettier, Husky

## 📚 Documentation

- [Testing Guide](docs/testing-guide.md)
- [GitHub Secrets Setup](docs/github-secrets-setup.md)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/name`
3. Make changes and test: `npm run validate`
4. Commit: `git commit -m 'feat: add feature'`
5. Push and create Pull Request

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance

## 🐛 Troubleshooting

**Build fails**

```bash
npm run clean
npm install
```

**Tests fail**

```bash
npm run test:ci
```

**Lint errors**

```bash
npm run lint:fix
npm run format
```

## 📊 Performance Targets

- First Contentful Paint: < 1.2s
- Largest Contentful Paint: < 2.5s
- First Input Delay: < 100ms
- Cumulative Layout Shift: < 0.1

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 🙏 Acknowledgments

Built with ❤️ using [Next.js](https://nextjs.org/), [Supabase](https://supabase.com/), and [Tailwind CSS](https://tailwindcss.com/)

---

**Support**: [GitHub Issues](your-repo-url/issues) | [Discussions](your-repo-url/discussions)

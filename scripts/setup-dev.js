#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up development environment...');

try {
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Setup Husky
  console.log('🐕 Setting up Husky...');
  execSync('npx husky install', { stdio: 'inherit' });

  // Make hooks executable (for Unix systems)
  const hooksDir = path.join(process.cwd(), '.husky');
  if (fs.existsSync(hooksDir)) {
    const hooks = ['pre-commit', 'commit-msg', 'pre-push'];
    hooks.forEach(hook => {
      const hookPath = path.join(hooksDir, hook);
      if (fs.existsSync(hookPath)) {
        try {
          fs.chmodSync(hookPath, '755');
        } catch (error) {
          console.log(
            `ℹ️  Could not make ${hook} executable (Windows environment)`
          );
        }
      }
    });
  }

  console.log('✅ Development environment setup complete!');
  console.log('');
  console.log('Available commands:');
  console.log('  npm run dev          - Start development server');
  console.log('  npm run build        - Build for production');
  console.log('  npm run lint         - Run ESLint with auto-fix');
  console.log('  npm run format       - Format code with Prettier');
  console.log('  npm run validate     - Run all checks');
  console.log('');
  console.log('Git hooks are now active:');
  console.log('  ✓ Pre-commit: Lints and formats staged files');
  console.log('  ✓ Commit-msg: Validates commit message format');
  console.log('  ✓ Pre-push: Runs full validation and build');
} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
}

# Git Hooks Configuration

This project uses Husky and lint-staged to maintain code quality and consistency.

## What happens when you commit?

### Pre-commit Hook

- ✅ Runs ESLint on staged JavaScript files and auto-fixes issues
- ✅ Runs Prettier on staged files to format code
- ✅ Only processes files that are staged (not the entire codebase)

### Commit Message Hook

- ✅ Validates commit message format
- ✅ Enforces conventional commit format: `type(scope): description`

**Valid commit types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `ci`: CI/CD changes
- `build`: Build system changes
- `revert`: Reverting changes

**Examples:**

```
feat(auth): add user login functionality
fix(ui): resolve button alignment issue
docs: update installation guide
```

### Pre-push Hook

- ✅ Runs full project build to ensure no build errors
- ✅ Runs complete lint and format validation
- ✅ Prevents pushing broken code

## Available Commands

```bash
# Development
npm run dev                 # Start development server
npm run build              # Build for production

# Code Quality
npm run lint               # Run ESLint with auto-fix
npm run lint:check         # Check ESLint without fixing
npm run format             # Format all files with Prettier
npm run format:check       # Check formatting without fixing
npm run validate           # Run all checks (lint + format + type-check)

# Git Hooks
npm run pre-commit         # Run pre-commit checks manually
npx lint-staged           # Run lint-staged manually

# Utilities
npm run clean              # Clean build directories
npm run reinstall          # Clean reinstall of dependencies
npm run setup-dev          # Setup development environment for new contributors
```

## Bypassing Hooks (Emergency Only)

```bash
# Skip pre-commit hook
git commit --no-verify -m "emergency fix"

# Skip pre-push hook
git push --no-verify
```

⚠️ **Use with caution!** Only bypass hooks in emergency situations.

## Troubleshooting

### Hook not running on Windows?

Ensure you have Git Bash or WSL installed, or use:

```powershell
npx husky install
```

### Permission denied errors?

On Unix systems, make hooks executable:

```bash
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
chmod +x .husky/pre-push
```

### Lint-staged not working?

Check your staged files:

```bash
git status
git add .
```

## Team Setup

New team members should run:

```bash
npm run setup-dev
```

This will install dependencies and configure Husky automatically.

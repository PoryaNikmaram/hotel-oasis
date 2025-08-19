# GitHub Secrets Setup Guide

## How to Add Secrets to Your GitHub Repository

### Step 1: Navigate to Repository Settings

1. Go to your GitHub repository
2. Click on **Settings** tab (you need admin access)
3. In the left sidebar, find **Secrets and variables**
4. Click on **Actions**

### Step 2: Add Required Secrets

Click **New repository secret** for each of the following:

#### Essential Supabase Secrets (REQUIRED)

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://adczmndslhsvhgaxovxw.supabase.co

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkY3ptbmRzbGhzdmhnYXhvdnh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NzY1MjMsImV4cCI6MjA2MzE1MjUyM30.-oeF5keiz6Dl5ztKsQZURz5MpiPgDleUnHDr1avPPMI

Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkY3ptbmRzbGhzdmhnYXhvdnh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzU3NjUyMywiZXhwIjoyMDYzMTUyNTIzfQ.9Vs7Vq3rq1otHN0Brc1luCtojGN56qTTI0ue1tDQC2Q
```

#### Deployment Secrets (Choose based on your platform)

##### For Vercel Deployment:

```
Name: VERCEL_TOKEN
Value: (Get from https://vercel.com/account/tokens)

Name: VERCEL_ORG_ID
Value: (Get from your Vercel project settings)

Name: VERCEL_PROJECT_ID
Value: (Get from your Vercel project settings)
```

##### For Docker Hub (Optional):

```
Name: DOCKER_USERNAME
Value: (Your Docker Hub username)

Name: DOCKER_PASSWORD
Value: (Your Docker Hub password or access token)
```

##### For Code Coverage (Optional):

```
Name: CODECOV_TOKEN
Value: (Get from https://codecov.io/)
```

### Step 3: Environment-Specific Configuration

#### Create Environments (Optional but Recommended)

1. Go to **Settings** → **Environments**
2. Create two environments: `staging` and `production`
3. Add environment-specific secrets if needed
4. Configure protection rules:
   - For `production`: Add required reviewers
   - For `staging`: Auto-deploy from develop branch

### Step 4: Local Development Setup

Create a `.env.local` file in your project root:

```bash
# .env.local (DO NOT COMMIT THIS FILE)
NEXT_PUBLIC_SUPABASE_URL=https://adczmndslhsvhgaxovxw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkY3ptbmRzbGhzdmhnYXhvdnh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NzY1MjMsImV4cCI6MjA2MzE1MjUyM30.-oeF5keiz6Dl5ztKsQZURz5MpiPgDleUnHDr1avPPMI
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkY3ptbmRzbGhzdmhnYXhvdnh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzU3NjUyMywiZXhwIjoyMDYzMTUyNTIzfQ.9Vs7Vq3rq1otHN0Brc1luCtojGN56qTTI0ue1tDQC2Q
```

### Step 5: Update .gitignore

Ensure these files are in your `.gitignore`:

```gitignore
# Environment files
.env
.env.local
.env.production
.env.staging

# Build outputs
.next/
out/
build/
dist/

# Dependencies
node_modules/

# Testing
coverage/
playwright-report/
test-results/

# Cache files
.eslintcache
*.log
```

## Security Best Practices

### ⚠️ IMPORTANT SECURITY NOTES:

1. **NEVER commit secret keys to your repository**
2. **Rotate keys regularly** (every 3-6 months)
3. **Use different keys for different environments** (dev, staging, production)
4. **Limit access to production secrets** to senior developers only
5. **Enable audit logs** in GitHub to track secret access
6. **Use GitHub's secret scanning** to detect exposed secrets
7. **Consider using a secret management service** (AWS Secrets Manager, HashiCorp Vault)

## Verifying Your Setup

### Test the GitHub Actions Workflow:

1. Make a small change to your code
2. Create a pull request
3. Watch the Actions tab to see the workflow run
4. Check that all jobs pass successfully

### Troubleshooting Common Issues:

#### Build Fails with "Environment variables not found"

- Ensure all secrets are properly added in GitHub Settings
- Check secret names match exactly (case-sensitive)
- Verify you're using `secrets.` prefix in workflow file

#### Deployment Fails

- Check deployment platform credentials are correct
- Ensure project IDs match your actual project
- Verify API tokens haven't expired

#### Tests Fail in CI but Pass Locally

- Check Node version matches between local and CI
- Ensure all environment variables are set in CI
- Look for timezone or locale-specific issues

## Next Steps

1. **Test the pipeline**: Push a commit to trigger the workflow
2. **Monitor the first runs**: Check Actions tab for any failures
3. **Set up branch protection**: Require CI to pass before merging
4. **Configure notifications**: Set up Slack/Discord alerts for failures
5. **Document for your team**: Create a wiki page with CI/CD guidelines

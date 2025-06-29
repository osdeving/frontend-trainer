# 🚀 GitHub Actions Workflows

This directory contains the CI/CD workflows for TailwindTrainer, implementing industry best practices for automated testing, quality assurance, and deployment.

## 📋 Workflows Overview

### 🔄 CI/CD Pipeline (`ci.yml`)

**Triggers:** Push and Pull Requests to `main` and `develop` branches

**Jobs:**

1. **🔍 Lint & Type Check** - Code quality validation
2. **🧪 Unit Tests & Coverage** - Automated testing with coverage reporting
3. **🏗️ Build Test** - Ensure application builds successfully
4. **🎭 E2E Tests** - End-to-end user journey validation
5. **🔒 Security Audit** - Vulnerability scanning
6. **🎯 Quality Gate** - Overall quality validation

### 🚀 Deployment (`deploy.yml`)

**Triggers:** Successful CI pipeline on `main` branch

**Jobs:**

1. **🚀 Deploy to Vercel** - Production deployment with environment management

## 🎯 Quality Gates

All commits must pass these automated checks:

### ✅ **Required Checks**

-   ESLint rules (no warnings/errors)
-   TypeScript compilation
-   Unit test suite (80%+ coverage)
-   E2E test suite
-   Security audit (no critical vulnerabilities)
-   Successful build

### 📊 **Coverage Requirements**

-   **Minimum Coverage:** 80%
-   **Coverage Reports:** Generated for all pull requests
-   **Coverage Trend:** Tracked and reported

### 🔒 **Security Standards**

-   Automated vulnerability scanning
-   Dependency security audit
-   No critical or high severity issues allowed

## 🛠️ Setup Instructions

### 1. Required Secrets

Add these secrets to your GitHub repository:

```bash
# Vercel Deployment (for deploy.yml)
VERCEL_TOKEN=your_vercel_token
ORG_ID=your_vercel_org_id
PROJECT_ID=your_vercel_project_id

# Codecov (optional, for enhanced coverage reporting)
CODECOV_TOKEN=your_codecov_token
```

### 2. Repository Settings

**Branch Protection Rules** (recommended for `main`):

-   Require status checks to pass
-   Require branches to be up to date
-   Require pull request reviews
-   Dismiss stale reviews when new commits are pushed
-   Restrict pushes to specific people/teams

**Required Status Checks:**

-   `🔍 Lint & Type Check`
-   `🧪 Unit Tests & Coverage`
-   `🏗️ Build Test`
-   `🎭 E2E Tests`
-   `🔒 Security Audit`
-   `🎯 Quality Gate`

### 3. Codecov Integration

1. Sign up at [codecov.io](https://codecov.io)
2. Connect your GitHub repository
3. Add `CODECOV_TOKEN` to repository secrets
4. Coverage reports will be automatically generated

## 📊 Workflow Outputs

### 🧪 **Test Results**

-   Unit test results with coverage percentages
-   E2E test results with browser compatibility
-   Failed test artifacts (screenshots, videos)

### 📈 **Build Information**

-   Build size analysis
-   Bundle size tracking
-   Performance metrics

### 🔍 **Quality Metrics**

-   Code coverage trends
-   Security vulnerability reports
-   Performance regression detection

## 🚀 Usage Examples

### Running Locally

```bash
# Run the same checks as CI
npm run lint                 # ESLint check
npm run type-check          # TypeScript check
npm run test:coverage       # Unit tests with coverage
npm run build              # Build test
npm run test:e2e           # E2E tests (dev server must be running)

# Or run everything
npm run test:all
```

### Manual Workflow Triggers

You can manually trigger workflows from the GitHub Actions tab:

1. Go to **Actions** tab in your repository
2. Select the workflow you want to run
3. Click **Run workflow**
4. Choose the branch and click **Run workflow**

## 🔧 Customization

### Adding New Checks

To add additional quality checks:

1. **Edit `ci.yml`:**

    ```yaml
    - name: 🔍 Your Custom Check
      run: npm run your-custom-script
    ```

2. **Update Quality Gate:**

    ```yaml
    # Add your check to the quality gate job
    needs:
        [unit-tests, e2e-tests, build-test, security-audit, your-custom-check]
    ```

3. **Add to package.json:**
    ```json
    "scripts": {
      "your-custom-script": "command-to-run"
    }
    ```

### Adjusting Coverage Thresholds

Update in `jest.config.js`:

```javascript
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80,
  },
},
```

### Environment-Specific Workflows

Create additional workflow files for different environments:

-   `staging.yml` - Staging deployment
-   `performance.yml` - Performance testing
-   `accessibility.yml` - A11Y testing

## 📋 Troubleshooting

### Common Issues

**❌ TypeScript Errors:**

```bash
# Fix locally
npm run type-check
```

**❌ Test Failures:**

```bash
# Run tests locally
npm run test:watch
```

**❌ E2E Test Failures:**

```bash
# Debug E2E tests
npm run test:e2e:ui
```

**❌ Build Failures:**

```bash
# Test build locally
npm run build
```

### Workflow Debugging

1. **Check workflow logs** in the Actions tab
2. **Download artifacts** for failed E2E tests
3. **Review coverage reports** for test failures
4. **Check environment variables** for deployment issues

## 🎯 Best Practices

### 1. **Commit Frequently**

-   Small, focused commits
-   Descriptive commit messages
-   Regular pushes to trigger CI

### 2. **Test Coverage**

-   Write tests for new features
-   Maintain coverage above 80%
-   Test edge cases and error conditions

### 3. **Pull Request Workflow**

-   Create feature branches
-   Fill out PR template completely
-   Address review feedback promptly
-   Ensure all checks pass before merge

### 4. **Performance Monitoring**

-   Monitor build times
-   Track bundle size changes
-   Review coverage trends

## 📊 Metrics and Monitoring

The workflows provide comprehensive metrics:

-   **Code Quality:** ESLint warnings/errors
-   **Test Coverage:** Line, branch, function coverage
-   **Performance:** Build times, bundle size
-   **Security:** Vulnerability count and severity
-   **Reliability:** Test pass rates, deployment success

These metrics help maintain high code quality and catch regressions early in the development process.

---

**For questions or improvements to these workflows, please open an issue or pull request with the `ci/cd` label.**

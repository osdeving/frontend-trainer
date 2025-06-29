# 🚀 Contributing to TailwindTrainer

Thank you for your interest in contributing to TailwindTrainer! This guide will help you get started and ensure your contributions align with our project standards.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contribution Workflow](#contribution-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Community Guidelines](#community-guidelines)

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Git** for version control
- **Modern browser** for testing (Chrome, Firefox, Safari)

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/frontend-trainer.git
   cd frontend-trainer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Run tests**
   ```bash
   # Unit tests
   npm test
   
   # E2E tests (requires dev server running)
   npm run test:e2e
   ```

## 🔄 Contribution Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
# For features
git checkout -b feature/your-feature-name

# For bug fixes
git checkout -b fix/bug-description

# For documentation
git checkout -b docs/documentation-update
```

### 2. Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test improvements
- `chore/` - Maintenance tasks

### 3. Make Your Changes

Follow our [Definition of Done](.github/DEFINITION_OF_DONE.md) checklist:

- ✅ Write clean, readable code
- ✅ Add appropriate tests
- ✅ Update documentation
- ✅ Follow coding standards
- ✅ Test thoroughly

### 4. Commit Your Changes

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format: type(scope): description
git commit -m "feat(challenges): add new difficulty level filter"
git commit -m "fix(input): resolve challenge input advancing bug"
git commit -m "docs(readme): update installation instructions"
```

**Commit Types:**
- `feat` - New features
- `fix` - Bug fixes
- `docs` - Documentation changes
- `style` - Formatting, no code change
- `refactor` - Code restructuring
- `test` - Adding/updating tests
- `chore` - Maintenance tasks

## 📝 Coding Standards

### TypeScript Guidelines

- Use strict TypeScript (no `any` types)
- Define proper interfaces for all data structures
- Use descriptive type names
- Prefer type inference where possible

```typescript
// ✅ Good
interface ChallengeConfig {
  allowHints: boolean;
  timeLimit?: number;
  questionCount: number;
}

// ❌ Avoid
const config: any = { ... };
```

### React Best Practices

- Use functional components with hooks
- Follow React naming conventions
- Implement proper error boundaries
- Use TypeScript for props interfaces

```typescript
// ✅ Good
interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  showHint?: boolean;
}

export function QuestionCard({ question, onAnswer, showHint = false }: QuestionCardProps) {
  // Component implementation
}
```

### Styling Guidelines

- Use TailwindCSS for styling
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Use semantic HTML elements

```tsx
// ✅ Good
<button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
  Submit Answer
</button>
```

## 🧪 Testing Guidelines

### Unit Testing

- Write tests for all business logic
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Aim for 80%+ code coverage

```typescript
// ✅ Good test structure
describe("ChallengeStore", () => {
  test("should return correct challenge configuration for free practice", () => {
    // Arrange
    const challengeId = "free_practice";
    
    // Act
    const challenge = challengeStore.getChallenge(challengeId);
    
    // Assert
    expect(challenge).toBeDefined();
    expect(challenge?.type).toBe("practice");
    expect(challenge?.config.allowHints).toBe(true);
  });
});
```

### E2E Testing

- Test complete user journeys
- Use page objects for reusable components
- Test across different viewports
- Include accessibility testing

```typescript
// ✅ Good E2E test
test("user can complete a basic challenge flow", async ({ page }) => {
  await page.goto("/challenges/free_practice");
  
  await expect(page.locator('input[type="text"]')).toBeVisible();
  await page.fill('input[type="text"]', "flex");
  await page.click("text=Check Answer");
  
  await expect(page.locator("text=Correct")).toBeVisible();
});
```

## 📋 Pull Request Process

### 1. Before Submitting

- [ ] All tests pass locally
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] No console errors or warnings

### 2. Pull Request Template

Use our [PR template](.github/pull_request_template.md) and complete all sections:

- **Description** - Clear explanation of changes
- **Type of Change** - Feature, bug fix, etc.
- **Testing** - How to test the changes
- **Checklist** - All quality gates passed

### 3. Review Process

- All CI checks must pass
- At least one approved review required
- Address all review feedback
- Squash commits before merging

## 🐛 Issue Guidelines

### Reporting Bugs

Use our [bug report template](.github/ISSUE_TEMPLATE/bug_report.yml):

- Provide clear reproduction steps
- Include browser and device information
- Add screenshots if applicable
- Check console for error messages

### Requesting Features

Use our [feature request template](.github/ISSUE_TEMPLATE/feature_request.yml):

- Explain the problem you're solving
- Describe your proposed solution
- Consider alternatives and complexity
- Provide user stories

## 🎯 Code Review Guidelines

### As a Reviewer

- Be constructive and specific
- Focus on code quality and maintainability
- Test the changes locally
- Check for security issues
- Verify documentation is updated

### As an Author

- Respond to feedback promptly
- Ask questions if feedback is unclear
- Make requested changes or discuss alternatives
- Keep PRs focused and reasonably sized

## 🏗️ Architecture Guidelines

### Project Structure

```
frontend-trainer/
├── app/                 # Next.js app directory
├── components/          # Reusable UI components
├── lib/                # Business logic and utilities
├── tests/              # E2E tests
├── __tests__/          # Unit tests
└── .github/            # GitHub workflows and templates
```

### State Management

- Use React hooks for local state
- Implement custom stores for global state
- Keep business logic separate from UI components

### Performance

- Optimize images and assets
- Implement lazy loading where appropriate
- Monitor bundle size
- Use React.memo for expensive components

## 🤝 Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different opinions and approaches

### Getting Help

- Check existing documentation first
- Search existing issues and discussions
- Ask specific, well-formed questions
- Provide context and examples

### Recognition

We appreciate all contributions! Contributors will be:

- Listed in our README
- Mentioned in release notes
- Given credit for their work
- Invited to provide input on project direction

## 📊 Quality Standards

All contributions must meet our quality standards:

- **Code Quality**: ESLint rules, TypeScript compliance
- **Testing**: 80%+ coverage, all tests passing
- **Performance**: No significant performance regression
- **Security**: No new vulnerabilities introduced
- **Accessibility**: WCAG compliance maintained

## 🔄 Release Process

We follow semantic versioning:

- **Patch** (1.0.1) - Bug fixes
- **Minor** (1.1.0) - New features (backward compatible)
- **Major** (2.0.0) - Breaking changes

Releases happen regularly, and we maintain a clear CHANGELOG.

---

## 🎉 Thank You!

Your contributions help make TailwindTrainer better for everyone. Whether you're fixing a typo, adding a feature, or improving documentation, every contribution matters!

For questions, feel free to:
- Open an issue for bugs or feature requests
- Start a discussion for general questions
- Review our documentation and guides

Happy coding! 🚀

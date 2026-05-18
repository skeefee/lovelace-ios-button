# Contributing to iOS Button Card

Thank you for your interest in contributing to iOS Button Card! This document provides guidelines and instructions for contributing.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Documentation](#documentation)

## Code of Conduct

We're committed to providing a welcoming and inspiring community for all. Please read and adhere to our Code of Conduct (based on Contributor Covenant).

- Be respectful and inclusive
- Welcome newcomers and help them get oriented
- Focus on constructive criticism
- Respect differing opinions and experiences

## Getting Started

### Prerequisites
- Node.js 14+ and npm
- Git
- Basic understanding of:
  - LitElement / Web Components
  - Home Assistant Lovelace architecture
  - JavaScript ES6+

### Set Up Your Environment

1. **Fork the repository** on GitHub
2. **Clone your fork locally**
   ```bash
   git clone https://github.com/skeefee/lovelace-ios-button.git
   cd lovelace-ios-button
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

## Development Setup

### Project Structure
```
lovelace-ios-button/
├── custom-button-card.js           # Main card component
├── custom-button-card-editor.js    # Visual editor component
├── schema.js                       # Configuration schema
├── develop.html                    # Development environment
├── package.json                    # NPM configuration
├── webpack.config.js               # Build configuration
├── .babelrc                        # Babel configuration
├── README.md                       # Documentation
├── INSTALL.md                      # Installation guide
├── example-config.yaml             # Usage examples
└── example-advanced.yaml           # Advanced examples
```

### Running Development Environment

**Option 1: Using develop.html**
```bash
# Start a simple HTTP server
python -m http.server 8000

# Or using Node.js
npx http-server

# Then open: http://localhost:8000/develop.html
```

**Option 2: Using webpack dev server**
```bash
npm run dev
# Opens at http://localhost:8080
```

**Option 3: Using webpack watch**
```bash
npm run watch
# Rebuilds on file changes
```

## Coding Standards

### JavaScript Style Guide

Follow these standards for all JavaScript code:

**1. Variable Naming**
```javascript
// ✓ Good
const isActive = true;
const _handleClick = () => {};
let pressTimer = null;

// ✗ Avoid
const is_active = true;
const handleClick = () => {};
let pt = null;
```

**2. Class Structure**
```javascript
class CustomButtonCard extends LitElement {
  static get properties() {
    // Properties first
  }

  static get styles() {
    // Styles second
  }

  constructor() {
    // Constructor
  }

  render() {
    // Render method
  }

  // Public methods
  setConfig() {}

  // Private methods
  _handleClick() {}
}
```

**3. Comments**
```javascript
// ✓ Good - Clear purpose
let _pressTimer = null; // Timout ID for long press detection

/**
 * Toggle entity state
 * @private
 */
_toggleEntity() {}

// ✗ Avoid - Unclear
let t = null; // timer

// Handle click event
_handleClick() {}
```

**4. Error Handling**
```javascript
// ✓ Good
setConfig(config) {
  if (!config || !config.entity) {
    throw new Error('You must define an entity');
  }
}

// ✗ Avoid
setConfig(config) {
  // Silently fail
}
```

### CSS Standards

**1. Use CSS Custom Properties**
```css
/* ✓ Good */
color: var(--custom-button-text-color);
background: var(--custom-button-background);

/* ✗ Avoid */
color: #212121;
background: white;
```

**2. Organize Rules Logically**
```css
/* Layout properties first */
display: flex;
flex-direction: column;

/* Then dimensions */
width: 100%;
height: 100%;

/* Then styling */
color: var(--custom-button-text-color);
background: var(--custom-button-background);

/* Then transitions */
transition: all 0.2s ease;
```

## Making Changes

### Before You Start
1. Check [GitHub Issues](https://github.com/skeefee/lovelace-ios-button/issues) for duplicates
2. If your change is significant, open an issue first to discuss
3. Assign yourself to the issue

### During Development
1. Keep commits small and focused
2. Write meaningful commit messages
3. Test your changes thoroughly
4. Update documentation as needed

**Commit Message Format:**
```
[feature|fix|docs|style] Short description

Longer explanation of changes if needed.
Fixes #123 (if applicable)
```

Examples:
```
feature: Add double-tap interaction support

Split interaction handling from single tap detection.
Hold detection now uses configurable timeout.
```

```
fix: Colors not applying to active state

CSS selector was missing .active class requirement.
Fixes #45
```

### Common Changes

**Adding a New Configuration Option**
1. Update `custom-button-card.js` properties and `setConfig()`
2. Update `custom-button-card-editor.js` with editor UI
3. Update `schema.js` for visual editor
4. Add example to `example-config.yaml`
5. Document in `README.md`
6. Test in `develop.html`

**Adding a New Interaction**
1. Add handler method in main component
2. Add event listener in `render()`
3. Implement behavior in interaction handler
4. Add configuration option and schema
5. Update documentation
6. Test in develop.html

**Fixing a Bug**
1. Create test case in `develop.html`
2. Fix the issue
3. Verify fix works in all scenarios
4. Add regression test if needed
5. Document fix in commit

## Testing

### Manual Testing

Use `develop.html` for interactive testing:

1. **Test entity switching**
   - Add/remove entities
   - Change entity states
   - Verify correct rendering

2. **Test interactions**
   - Click: single tap
   - Hold: 500ms press
   - Double-click: rapid clicks
   - Touch: mobile devices (use device tools in F12)

3. **Test styling**
   - Verify colors apply correctly
   - Test visibility toggles
   - Check responsive behavior

4. **Test configurations**
   - Load JSON configurations
   - Switch between configs
   - Verify all options work

### Browser Testing

Test on these browsers:
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Mobile Testing

- iOS Safari
- Chrome Mobile
- Firefox Mobile

### Home Assistant Testing

For full integration testing:

1. Copy files to Home Assistant instance
2. Add card to a dashboard
3. Test all interactions
4. Test visual editor
5. Verify state changes work

## Submitting Changes

### Before Submitting

1. **Self-review your code**
   - Does it follow coding standards?
   - Is it well-documented?
   - Did you test all scenarios?

2. **Run tests**
   ```bash
   npm run build
   ```

3. **Update documentation**
   - README.md for user features
   - Code comments for developers
   - INSTALL.md for setup instructions

4. **Check your commits**
   - Commits are logical and focused
   - Messages follow format
   - No sensitive information included

### Creating a Pull Request

1. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request on GitHub**
   - Use clear title (e.g., "Add double-tap interaction support")
   - Include description of changes
   - Reference any issues (Fixes #123)
   - Include before/after if UI changes

3. **PR Template**
   ```markdown
   ## Description
   [What does this PR do?]

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation
   - [ ] Other

   ## Testing
   - [ ] Tested in develop.html
   - [ ] Tested in Home Assistant
   - [ ] Tested on mobile

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Documentation updated
   - [ ] No breaking changes
   - [ ] Backward compatible

   ## Screenshots (if applicable)
   [Add screenshots of UI changes]

   ## Related Issues
   Fixes #123
   ```

### Review Process

1. Maintainers will review your PR
2. Provide feedback or request changes
3. Update PR based on feedback
4. PR will be merged once approved

## Documentation

### Code Documentation

Use JSDoc for functions:

```javascript
/**
 * Toggle the entity state between on and off
 * @private
 * @returns {void}
 */
_toggleEntity() {
  // Implementation
}
```

### README Updates

When adding features, update README.md:
- Add to Features section
- Include configuration example
- Document in Configuration Options table
- Add usage example

### File Documentation

Add header comments to new files:

```javascript
/**
 * iOS Button Card - Main Component
 * 
 * A customizable button card for Home Assistant Lovelace
 * with support for advanced interactions (tap, hold, double-tap)
 * 
 * @version 1.0.0
 * @author [Your Name]
 */
```

## Questions?

Have questions about contributing?
- Open an issue with the `question` label
- Message on Home Assistant community forum
- Check existing documentation and examples

Thank you for contributing! 🙏

# 🚀 Quick Reference Guide - UI Components

## 🎨 Color Classes

```css
/* Text Colors */
.text-accent    /* Orange/Gold */
.text-success   /* Green */
.text-danger    /* Red */
.text-warning   /* Orange */
.text-info      /* Blue */

/* Background Colors */
.bg-accent      /* Orange background */
.bg-success     /* Green background (light) */
.bg-danger      /* Red background (light) */
.bg-warning     /* Orange background (light) */
.bg-info        /* Blue background (light) */
```

## 🔘 Buttons

```jsx
/* Primary Button (Gradient) */
<button className="btn btn-primary">Save</button>

/* Ghost Button */
<button className="btn btn-ghost">Cancel</button>

/* Glass Button (Blur effect) */
<button className="btn btn-glass">View</button>

/* Success/Danger Buttons */
<button className="btn btn-success">✓ Done</button>
<button className="btn btn-danger">✗ Delete</button>

/* Sizes */
<button className="btn btn-lg">Large</button>
<button className="btn btn-sm">Small</button>
<button className="btn btn-full">Full Width</button>

/* Loading State */
<button className="btn btn-primary btn-loading">Processing...</button>
```

## 📦 Cards

```jsx
/* Standard Card */
<div className="card">Content</div>

/* Glass Card (Blur) */
<div className="card-glass">Premium Content</div>

/* Gradient Card */
<div className="card-gradient">Featured</div>

/* Interactive Card (Clickable) */
<div className="card-interactive" onClick={handleClick}>
  Click me
</div>

/* With Hover Effects */
<div className="card hover-lift">Lifts on hover</div>
<div className="card hover-scale">Scales on hover</div>
<div className="card hover-glow">Glows on hover</div>
```

## 📝 Form Inputs

```jsx
/* Basic Input */
<div className="input-wrap">
  <label className="input-label">Email</label>
  <input className="input" type="email" placeholder="you@example.com" />
</div>

/* Success State */
<input className="input input-success" />
<div className="input-feedback success">✓ Valid</div>

/* Error State */
<input className="input input-error" />
<div className="input-feedback error">⚠ Required</div>

/* Floating Label */
<div className="input-floating">
  <input className="input" placeholder=" " />
  <label className="input-label">Name</label>
</div>

/* With Icon */
<div className="input-wrap">
  <input className="input input-with-icon" />
  <span className="input-icon">🔍</span>
</div>
```

## ⏳ Loading States

```jsx
/* Spinner */
<div className="spinner"></div>
<div className="spinner spinner-lg"></div>
<div className="spinner spinner-sm"></div>

/* Loading Overlay */
<div className="loading-overlay">
  <div className="loading-content">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
</div>

/* Dots Loader */
<div className="loading-dots">
  <div className="loading-dot"></div>
  <div className="loading-dot"></div>
  <div className="loading-dot"></div>
</div>

/* Skeleton Screens */
<div className="skeleton skeleton-title"></div>
<div className="skeleton skeleton-text"></div>
<div className="skeleton skeleton-avatar"></div>
<div className="skeleton skeleton-card"></div>
<div className="skeleton skeleton-button"></div>

/* Progress Bar */
<div className="progress">
  <div className="progress-fill" style={{width: '60%'}}></div>
</div>

/* Circular Progress */
<div className="progress-circle" style={{'--progress': '75%'}}>
  <div className="progress-circle-value">75%</div>
</div>
```

## 🔔 Toast Notifications

```jsx
<div className="toast-container">
  {/* Success Toast */}
  <div className="toast toast-success">
    <div className="toast-icon">✓</div>
    <div className="toast-content">
      <div className="toast-title">Success!</div>
      <div className="toast-message">Changes saved.</div>
    </div>
    <button className="toast-close">×</button>
  </div>

  {/* Error Toast */}
  <div className="toast toast-error">
    <div className="toast-icon">✗</div>
    <div className="toast-content">
      <div className="toast-title">Error!</div>
      <div className="toast-message">Something went wrong.</div>
    </div>
    <button className="toast-close">×</button>
  </div>

  {/* Warning Toast */}
  <div className="toast toast-warning">
    <div className="toast-icon">⚠</div>
    <div className="toast-content">
      <div className="toast-title">Warning!</div>
      <div className="toast-message">Please review.</div>
    </div>
    <button className="toast-close">×</button>
  </div>

  {/* Info Toast */}
  <div className="toast toast-info">
    <div className="toast-icon">ℹ</div>
    <div className="toast-content">
      <div className="toast-title">Info</div>
      <div className="toast-message">New update available.</div>
    </div>
    <button className="toast-close">×</button>
  </div>
</div>
```

## 💬 Tooltips

```jsx
<div className="tooltip">
  <button className="btn">Hover me</button>
  <div className="tooltip-content">
    This is a tooltip
  </div>
</div>
```

## 🪟 Modals

```jsx
<div className="modal-overlay">
  <div className="modal">
    <div className="modal-header">
      <h2 className="modal-title">Modal Title</h2>
      <button className="modal-close">×</button>
    </div>
    <div className="modal-body">
      <p>Modal content goes here...</p>
    </div>
    <div className="modal-footer">
      <button className="btn btn-ghost">Cancel</button>
      <button className="btn btn-primary">Confirm</button>
    </div>
  </div>
</div>
```

## 📭 Empty States

```jsx
<div className="empty-state">
  <div className="empty-state-icon">📭</div>
  <h3 className="empty-state-title">No items found</h3>
  <p className="empty-state-description">
    Get started by creating your first item.
  </p>
  <div className="empty-state-action">
    <button className="btn btn-primary">Create Item</button>
  </div>
</div>
```

## 🏷️ Badges

```jsx
<span className="badge badge-gold">Gold</span>
<span className="badge badge-green">Success</span>
<span className="badge badge-blue">Info</span>
<span className="badge badge-teal">New</span>
<span className="badge badge-red">Error</span>
```

## ✨ Animations

```jsx
/* Fade Animations */
<div className="fade-up">Fades up</div>
<div className="fade-up-1">Delayed fade</div>
<div className="fade-up-2">More delayed</div>
<div className="fade-in">Fades in</div>

/* Slide Animations */
<div className="slide-in-right">Slides from right</div>
<div className="slide-in-left">Slides from left</div>

/* Scale Animation */
<div className="scale-in">Scales in</div>

/* Bounce Animation */
<div className="bounce">Bounces</div>
```

## 📏 Spacing Utilities

```css
/* Gaps */
.gap-1  /* 4px */
.gap-2  /* 8px */
.gap-3  /* 12px */
.gap-4  /* 16px */
.gap-6  /* 24px */

/* Margins */
.m-0    /* 0 */
.mt-2   /* margin-top: 8px */
.mt-4   /* margin-top: 16px */
.mb-2   /* margin-bottom: 8px */
.mb-4   /* margin-bottom: 16px */

/* Padding */
.p-0    /* 0 */
.p-2    /* 8px */
.p-4    /* 16px */
```

## 📐 Layout Utilities

```css
/* Display */
.flex           /* display: flex */
.inline-flex    /* display: inline-flex */
.grid           /* display: grid */
.hidden         /* display: none */

/* Flex Alignment */
.items-center       /* align-items: center */
.justify-center     /* justify-content: center */
.justify-between    /* justify-content: space-between */

/* Position */
.relative   /* position: relative */
.absolute   /* position: absolute */
.fixed      /* position: fixed */

/* Size */
.w-full     /* width: 100% */
.h-full     /* height: 100% */
```

## 🎭 Typography

```css
/* Sizes */
.text-xs    /* 11px */
.text-sm    /* 13px */
.text-base  /* 14px */
.text-lg    /* 16px */
.text-xl    /* 18px */
.text-2xl   /* 22px */
.text-3xl   /* 26px */
.text-4xl   /* 32px */

/* Weights */
.font-medium    /* 500 */
.font-semibold  /* 600 */
.font-bold      /* 700 */

/* Alignment */
.text-left
.text-center
.text-right
```

## 🎨 Border Radius

```css
.rounded        /* 10px */
.rounded-lg     /* 16px */
.rounded-xl     /* 22px */
.rounded-full   /* 9999px (circle) */
```

## 🌑 Shadows

```css
.shadow-sm      /* Small shadow */
.shadow-md      /* Medium shadow */
.shadow-lg      /* Large shadow */
.shadow-xl      /* Extra large shadow */
```

## 👁️ Opacity

```css
.opacity-0      /* 0% */
.opacity-50     /* 50% */
.opacity-75     /* 75% */
.opacity-100    /* 100% */
```

## 🖱️ Cursor

```css
.pointer        /* cursor: pointer */
.not-allowed    /* cursor: not-allowed */
```

## 📱 Responsive Classes

```jsx
/* Mobile Menu Toggle */
<button className="mobile-menu-toggle">
  ☰
</button>

/* Sidebar with mobile support */
<div className="sidebar mobile-open">
  {/* Sidebar content */}
</div>
```

## ♿ Accessibility

```jsx
/* Skip to content link */
<a href="#main-content" className="skip-to-content">
  Skip to content
</a>

/* Screen reader only */
<span className="sr-only">
  Hidden from visual users
</span>
```

## 🎯 Common Patterns

### Loading Button
```jsx
const [loading, setLoading] = useState(false);

<button 
  className={`btn btn-primary ${loading ? 'btn-loading' : ''}`}
  disabled={loading}
  onClick={handleSubmit}
>
  {loading ? 'Saving...' : 'Save Changes'}
</button>
```

### Form with Validation
```jsx
const [email, setEmail] = useState('');
const [error, setError] = useState('');

<div className="input-wrap">
  <label className="input-label">Email</label>
  <input 
    className={`input ${error ? 'input-error' : ''}`}
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  {error && (
    <div className="input-feedback error">
      ⚠ {error}
    </div>
  )}
</div>
```

### Card with Hover Effect
```jsx
<div className="card hover-lift" onClick={handleClick}>
  <h3 className="text-xl font-bold mb-2">Card Title</h3>
  <p className="text-sm text-secondary">Card description</p>
</div>
```

### Empty State with Action
```jsx
{items.length === 0 && (
  <div className="empty-state">
    <div className="empty-state-icon">📭</div>
    <h3 className="empty-state-title">No items yet</h3>
    <p className="empty-state-description">
      Create your first item to get started.
    </p>
    <div className="empty-state-action">
      <button className="btn btn-primary" onClick={handleCreate}>
        Create Item
      </button>
    </div>
  </div>
)}
```

---

## 🔗 Related Files

- **Full Documentation**: `UI_IMPROVEMENTS.md`
- **CSS Source**: `src/index.css`
- **Component Examples**: See individual page components

---

**Pro Tip**: Combine utility classes for quick styling!
```jsx
<div className="flex items-center gap-3 p-4 rounded-lg shadow-md">
  <span className="text-accent font-bold">Quick styling!</span>
</div>
# 🎨 Modern Split-Screen Authentication Page

## Overview
A beautiful, modern split-screen authentication interface inspired by contemporary design trends. Features a 50/50 layout with form on the left and illustrated content on the right.

## Features

### ✨ Design Elements
- **Color Palette**: Bright mustard yellow (#E1BA33), deep charcoal gray, clean white
- **Layout**: Responsive 50/50 split on desktop, stacked on mobile
- **Typography**: Modern, clean fonts with proper hierarchy
- **Illustrations**: Minimalist SVG vector illustrations with security/art themes

### 📋 Sign Up Form ("JOIN US")
- Full Name input
- Email Address input
- Password input with eye icon toggle
- Radio button selection:
  - "I am an art lover, a collector"
  - "I am an artist"
- reCAPTCHA placeholder
- Terms & Conditions checkbox
- "JOIN US" button
- "Join Using Google" button

### 🔐 Login Form ("LOGIN")
- Email Address input
- Password input with eye icon toggle
- "Forgot Password?" link
- Terms & Conditions checkbox
- reCAPTCHA placeholder
- "LOGIN" button
- "Login Using Google" button

### 🎬 Animations
- **Form Transitions**: Smooth slide-in animations when switching forms
- **Hover Effects**: Button hover states with scale and shadow effects
- **Focus States**: Clear visual feedback for form inputs
- **Toggle Animation**: Smooth fade transitions on the right side

## File Structure

```
/client/src/
├── pages/
│   └── AuthSplitScreen.jsx          (Main component)
└── styles/
    └── AuthSplitScreen.css           (All styling)
```

## Usage

### Access the Page
```
Route: /auth
Link: <Link to="/auth">Login</Link>
```

### Toggle Between Login and Sign Up
The toggle buttons on the right side switch between forms:
- "NEW HERE?" button → JOIN US form
- "ONE OF US?" button → LOGIN form

## Component Structure

```jsx
<AuthSplitScreen>
  ├── Left Side (.auth-split-left)
  │   └── Form Container
  │       ├── Sign Up Form
  │       └── Login Form
  └── Right Side (.auth-split-right)
      └── Toggle Section (with illustration)
```

## Customization

### Colors
Edit the color variables in `AuthSplitScreen.css`:
```css
Primary Yellow: #E1BA33
Dark Charcoal: #1a1a1a
Light Gray: #ddd, #f9f9f9
```

### Form Validation
Modify validation logic in `AuthSplitScreen.jsx`:
```javascript
validateSignUp() {}
validateLogin() {}
```

### Illustrations
SVG illustrations are embedded in the component. To modify:
1. Edit the `<svg>` elements in the toggle sections
2. Adjust viewBox dimensions for responsiveness
3. Update colors to match the palette

## Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| Desktop (1024+) | 50/50 split |
| Tablet (768-1023) | 50/50 with adjusted spacing |
| Mobile (480-767) | Stacked layout |
| Small (< 480) | Full width, minimal padding |

## API Integration

Currently uses simulated API calls. To integrate:

```javascript
// In handleSignUpSubmit()
const response = await fetch('your-api-endpoint/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(signUpForm)
});

// In handleLoginSubmit()
const response = await fetch('your-api-endpoint/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(loginForm)
});
```

## Accessibility

✅ Proper form labels
✅ Error messaging
✅ Keyboard navigation support
✅ Focus states for inputs
✅ reCAPTCHA integration ready
✅ ARIA attributes ready

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Form Fields Detail

### Sign Up
| Field | Type | Validation |
|-------|------|-----------|
| Full Name | Text | Required |
| Email | Email | Required, valid format |
| Password | Password | Required, min 6 chars |
| User Type | Radio | Required |
| Terms | Checkbox | Required |

### Login
| Field | Type | Validation |
|-------|------|-----------|
| Email | Email | Required, valid format |
| Password | Password | Required |
| Terms | Checkbox | Required |

## Features Implemented

✅ Form validation with error messages
✅ Password visibility toggle
✅ Smooth form transitions
✅ reCAPTCHA placeholder
✅ Google OAuth button (UI ready)
✅ Terms & Conditions checkbox
✅ Responsive design
✅ Loading states
✅ Forgot Password link
✅ Modern UI with animations
✅ Split-screen layout
✅ Illustration with SVG

## Future Enhancements

- [ ] Google OAuth integration
- [ ] reCAPTCHA v3 integration
- [ ] Email verification flow
- [ ] Password reset functionality
- [ ] Social login options (Facebook, GitHub)
- [ ] Two-factor authentication
- [ ] Remember me functionality
- [ ] Dark mode support
- [ ] Animation preferences (respects prefers-reduced-motion)

## Testing Checklist

- [ ] Sign up form validation works
- [ ] Login form validation works
- [ ] Password toggle works on both forms
- [ ] Form toggle animation plays smoothly
- [ ] Responsive layout on mobile/tablet
- [ ] Form submission handling
- [ ] Error messages display correctly
- [ ] Buttons are accessible
- [ ] Links work properly

## Notes

- The component uses React hooks (useState)
- CSS animations are GPU-accelerated for smooth performance
- reCAPTCHA is a placeholder and needs Google API integration
- Google OAuth buttons are UI-ready and need backend integration
- Form data is logged to console in development

# 🎨 Split-Screen Auth - Visual Guide

## Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│                    SPLIT-SCREEN LAYOUT                      │
├──────────────────────────┬──────────────────────────────────┤
│                          │                                  │
│   FORM SIDE (50%)        │   ILLUSTRATION SIDE (50%)        │
│   ═════════════          │   ════════════════════            │
│                          │                                  │
│  JOIN US / LOGIN         │  ╭─────────────────────╮         │
│  ─────────────           │  │ "New here ?" or     │         │
│                          │  │ "One of us ?"       │         │
│  [Full Name Input]       │  │                     │         │
│  [Email Input]           │  │ [Illustration SVG]  │         │
│  [Password Input] 👁️     │  │                     │         │
│  ○ Collector ○ Artist    │  │ [JOIN US/LOGIN btn] │         │
│  ☐ reCAPTCHA            │  │                     │         │
│  ☑ Terms & Conditions   │  ╰─────────────────────╯         │
│  [JOIN US / LOGIN Button]│  Background: Mustard Yellow     │
│  ─────────────────       │  (#E1BA33)                       │
│  OR                      │                                  │
│  [Join with Google]      │                                  │
│                          │                                  │
└──────────────────────────┴──────────────────────────────────┘
```

## Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| Mustard Yellow | #E1BA33 | Right side background, buttons, accents |
| Dark Charcoal | #1a1a1a | Text, headings |
| Light Gray | #f9f9f9 | Input backgrounds, hover states |
| Border Gray | #ddd | Input borders |
| White | #fff | Form background, illustrations |

## Typography

```
Headings:
  "JOIN US" / "LOGIN" - 36px, Bold (700), Charcoal

Subheading:
  "Enter your details..." - 16px, Regular (400), Gray

Label:
  Form labels - 14px, Medium (500), Charcoal

Body:
  Right side text - 16px, Regular (400), Charcoal

Button Text:
  Buttons - 16px, Bold (600), Uppercase, Letter-spacing 1px
```

## Form Fields Visualization

### Sign Up Form
```
JOIN US
Enter your details to get access
─────────────────────────────────

Full Name
[___________________________________]

Email Address
[___________________________________]

Password
[_________________________________👁️]

○ I am an art lover, a collector
○ I am an artist

☐ I'm not a robot                reCAPTCHA
                                 by Google

☑ By Registering, I Accept The Terms...

        [JOIN US BUTTON]
        ───────────────
             OR
     [Google Logo] Join Using Google
```

### Login Form
```
LOGIN
Enter Login details to get access
─────────────────────────────────

Email Address
[___________________________________]

Password
[_________________________________👁️]

                        Forgot Password?

☑ I Accept The Terms & Conditions...

☐ I'm not a robot                reCAPTCHA
                                 by Google

        [LOGIN BUTTON]
        ──────────────
             OR
     [Google Logo] Login Using Google
```

## Right Side Content

### Sign Up Side ("New here ?")
```
╭────────────────────────────────╮
│ "New here ?"                   │
│                                │
│ Unleash your creativity &      │
│ explore a world of art. Join   │
│ our community today and        │
│ discover unique pieces that    │
│ inspire you!                   │
│                                │
│    [JOIN US (outlined button)]  │
│                                │
│    [SVG Illustration showing   │
│     security/lock symbols,     │
│     gears, and creative icons] │
│                                │
╰────────────────────────────────╯
```

### Login Side ("One of us ?")
```
╭────────────────────────────────╮
│ "One of us ?"                  │
│                                │
│ Welcome back to your artistic  │
│ haven! Log in to continue your │
│ journey and find the perfect   │
│ artwork that speaks to you.    │
│                                │
│    [LOGIN (outlined button)]    │
│                                │
│    [SVG Illustration showing   │
│     security elements,         │
│     biometric icons,           │
│     and interface symbols]     │
│                                │
╰────────────────────────────────╯
```

## Interactive Elements

### Buttons

**JOIN US / LOGIN Button**
- Default: Mustard Yellow (#E1BA33), Charcoal text
- Hover: Darker Yellow (#d9ac2d), raised with shadow
- Active: Pressed state
- Disabled: Reduced opacity (0.7)

**Google Button**
- Default: White, gray border, charcoal text
- Hover: Yellow background, yellow border, shadow

**Toggle Button (Right side)**
- Default: Transparent, white border, white text
- Hover: White background, yellow text, raised with shadow

### Form Inputs

**Default State**
- Background: Light gray (#f9f9f9)
- Border: 1px solid #ddd
- Cursor: Text

**Focus State**
- Border: 1px solid #E1BA33 (mustard yellow)
- Box-shadow: 0 0 0 3px rgba(225, 186, 51, 0.1)
- Background: White

**Error State**
- Border: 1px solid #ff4444 (red)
- Background: #fff5f5 (light red)

## Animation Flows

### Form Switch (LEFT SIDE)
```
Sign Up Form visible
        ↓
Click toggle button on right
        ↓
Sign Up form slides out left (-30px)
        ↓
Login form slides in from right (+30px)
        ↓
Login Form visible
```

### Right Side Toggle
```
"New here ?" side
        ↓
Click toggle
        ↓
Fade out current content
        ↓
Slide transition
        ↓
Fade in "One of us ?" content
```

## Responsive Breakdown

### Desktop (1024px+)
- 50/50 split layout
- Full height: 100vh
- Full width forms and illustrations
- Clip-path on right side: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)

### Tablet (768px - 1023px)
- Still 50/50 split but with adjusted padding
- Illustrations: 250px × 250px
- Heading: 28px font

### Mobile (480px - 767px)
- Stacked layout (column)
- Full width forms
- Shorter illustration height (200px × 200px)
- Padding reduced to 30px

### Small Mobile (< 480px)
- Full width with 16px padding
- Illustration: 150px × 150px
- Smaller fonts and spacing

## Hover & Focus States

```
Input Field Hover:
  Normal gray → Subtle brightness increase

Input Field Focus:
  Border turns yellow (#E1BA33)
  Box shadow appears with yellow tint
  Background becomes white

Button Hover:
  Transform: translateY(-2px) - rises up
  Box-shadow: Darkened shadow adds depth
  Color: Slightly darker shade
```

## Accessibility Features

✅ **Semantic HTML**: Proper form structure
✅ **Label Association**: All inputs have associated labels
✅ **Focus Indicators**: Visible focus states on all interactive elements
✅ **Error Messages**: Clear, red-colored error text
✅ **Keyboard Navigation**: Tab through form fields
✅ **Password Toggle**: Accessible button for show/hide
✅ **reCAPTCHA**: Placeholder ready for integration
✅ **ARIA Ready**: Can be added for screen readers

## State Management

```javascript
isLogin (boolean)
├─ false → Shows Sign Up form and "New here ?" content
└─ true  → Shows Login form and "One of us ?" content

signUpForm (object)
├─ fullName: ""
├─ email: ""
├─ password: ""
├─ userType: "collector" | "artist"
└─ termsAccepted: false

loginForm (object)
├─ email: ""
├─ password: ""
└─ termsAccepted: false

errors (object) - Validation errors display
loading (boolean) - Button disabled state during submission
showPassword (boolean) - Eye icon toggle state
```

## Transitions & Animations

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Form slide in | 0.5s | ease-out | Form changes |
| Button hover | 0.3s | ease | Mouse over |
| Input focus | 0.3s | ease | Focus event |
| Right side fade | 0.6s | ease-out | Toggle click |

## Error Display

```
Form Group with Error:
┌─────────────────────────────┐
│ Email Address               │
│ [_____error border______]   │
│ ❌ Invalid email format     │
└─────────────────────────────┘
```

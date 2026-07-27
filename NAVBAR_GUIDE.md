# Responsive Navbar Component Guide

## Features ✨

- **Fully Responsive**: Desktop, tablet, and mobile-friendly
- **Dropdown Menus**: Multi-level navigation with smooth animations
- **Mobile Hamburger Menu**: Collapsible menu for smaller screens
- **Search Bar**: Built-in search functionality on desktop & mobile
- **Sticky Header**: Navbar stays at top while scrolling
- **Modern Design**: Clean UI with Tailwind CSS styling
- **Smooth Animations**: Hover effects and transitions

## Installation

### 1. Create Vite React App
```bash
cd APJ-Institute-Website/client
npm create vite@latest . -- --template react
npm install
```

### 2. Install Dependencies
```bash
npm install react-router-dom lucide-react
npm install -D tailwindcss postcss autoprefixer
```

### 3. Configure Tailwind CSS
```bash
npx tailwindcss init -p
```

Update `tailwind.config.js`:
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add to `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Update main.jsx
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## Component Structure

### Navbar Component (`src/components/Navbar.jsx`)
- **Logo Section**: Branded with APJ Institute logo
- **Desktop Navigation**: Horizontal menu with hover dropdowns
- **Mobile Navigation**: Collapsible menu with touch-friendly interactions
- **Search Functionality**: Search bar on desktop and mobile

### Key Features

#### 1. State Management
```javascript
- isOpen: Toggle mobile menu
- activeDropdown: Track active dropdown menu
- searchTerm: Store search input
```

#### 2. Navigation Links Structure
```javascript
{
  label: 'Menu Item',
  href: '/path',
  submenu: [
    { label: 'Submenu Item', href: '/path/submenu' }
  ]
}
```

#### 3. Responsive Breakpoints
- **Mobile**: < 768px (md breakpoint)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px (lg breakpoint)

## Customization

### Change Logo/Branding
Edit the logo section in Navbar.jsx:
```jsx
<div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg">
  <span className="text-white font-bold text-lg">YOUR_LOGO</span>
</div>
```

### Customize Colors
Modify Tailwind classes:
- `bg-blue-600` → Change to your brand color
- `text-gray-700` → Text colors
- `hover:bg-gray-50` → Hover effects

### Add/Remove Menu Items
Edit the `navLinks` array in Navbar.jsx:
```javascript
const navLinks = [
  { label: 'New Item', href: '/new-item' },
  // ... more items
];
```

### Adjust Spacing & Sizing
Tailwind classes can be modified:
- `h-16` → Height of navbar (change value)
- `px-4` → Horizontal padding
- `space-x-1` → Gap between items

## Usage in App.jsx

```jsx
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      {/* Your page content */}
    </>
  );
}
```

## Running the Project

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Browser Compatibility

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. **Lazy load pages** with React.lazy() for better performance
2. **Memoize components** if needed with React.memo()
3. **Use dynamic imports** for route components
4. **Optimize images** in assets folder

## Accessibility Features

- Semantic HTML structure
- Proper ARIA labels
- Keyboard navigation support (Tab key)
- Color contrast compliance
- Mobile touch-friendly interaction sizes

---

**Next Steps**: Customize the navbar to match your institute's branding and add your pages!

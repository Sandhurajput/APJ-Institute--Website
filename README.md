# APJ Institute Dantewada - Website

A modern, responsive institutional website built with React, Vite, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone/Setup the project**
```bash
cd APJ-Institute-Website/client
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

## 📁 Project Structure

```
APJ-Institute-Website/
├── client/                          # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Basic responsive navbar
│   │   │   └── AdvancedNavbar.jsx  # Advanced navbar with icons & notifications
│   │   ├── pages/                  # Page components
│   │   ├── layouts/                # Layout components
│   │   ├── routes/                 # Route configurations
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── services/               # API services
│   │   ├── context/                # React context
│   │   ├── utils/                  # Utility functions
│   │   ├── assets/                 # Images, fonts, etc.
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                          # Backend (Node.js + Express)
│   ├── config/                     # Configuration files
│   ├── controllers/                # Route controllers
│   ├── routes/                     # API routes
│   ├── models/                     # Database models
│   ├── middleware/                 # Custom middleware
│   ├── utils/                      # Utility functions
│   ├── uploads/                    # Uploaded files
│   ├── app.js                      # Express app
│   └── index.js                    # Server entry point
│
├── NAVBAR_GUIDE.md                 # Navbar component documentation
└── README.md                       # This file
```

## 🎨 Available Components

### 1. Navbar Component (`src/components/Navbar.jsx`)
**Features:**
- ✅ Fully responsive design
- ✅ Dropdown menus with smooth animations
- ✅ Mobile hamburger menu
- ✅ Search functionality
- ✅ Sticky positioning

**Usage:**
```jsx
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      {/* Rest of your app */}
    </>
  );
}
```

### 2. Advanced Navbar (`src/components/AdvancedNavbar.jsx`)
**Additional Features:**
- ✅ All Navbar features
- ✅ Emoji icons for menu items
- ✅ Notification bell with counter
- ✅ User profile section
- ✅ Enhanced styling with hover effects

## 🛠️ Configuration

### Tailwind CSS
Configuration is in `tailwind.config.js`:
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // Add custom theme extensions here
    },
  },
  plugins: [],
}
```

### Vite
Configuration is in `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

## 📦 Dependencies

```json
{
  "react": "^18.2.0",                 // UI library
  "react-dom": "^18.2.0",             // DOM rendering
  "react-router-dom": "^6.20.0",      // Routing
  "lucide-react": "^0.294.0"          // Icon library
}
```

**Dev Dependencies:**
```json
{
  "vite": "^5.0.0",                   // Build tool
  "tailwindcss": "^3.3.0",            // CSS framework
  "@vitejs/plugin-react": "^4.2.0"   // React plugin for Vite
}
```

## 📝 Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 🎯 Customization

### Change Navbar Colors
In `Navbar.jsx`, modify Tailwind classes:
```jsx
// Change primary color
from-blue-600 to-blue-800  →  from-purple-600 to-purple-800
```

### Add Navigation Links
Edit `navLinks` array in `Navbar.jsx`:
```javascript
const navLinks = [
  { label: 'New Page', href: '/new-page' },
  {
    label: 'Menu',
    href: '/menu',
    submenu: [
      { label: 'Submenu', href: '/menu/submenu' }
    ]
  }
];
```

### Customize Logo
Replace the logo section:
```jsx
<img src="/logo.png" alt="Logo" className="w-10 h-10" />
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Deployment Options
- **Vercel** (Recommended): Connect GitHub repo, auto-deploy
- **Netlify**: Drag & drop or connect GitHub
- **GitHub Pages**: Static hosting
- **Firebase Hosting**: Google's platform
- **AWS Amplify**: AWS hosting solution

## 📱 Responsive Breakpoints

The navbar is responsive across all devices:

| Device | Breakpoint | Behavior |
|--------|-----------|----------|
| Mobile | < 768px | Hamburger menu |
| Tablet | 768px - 1024px | Partial menu |
| Desktop | > 1024px | Full menu |

## ♿ Accessibility Features

- ✅ Semantic HTML structure
- ✅ Keyboard navigation support
- ✅ ARIA labels for screen readers
- ✅ Color contrast compliance
- ✅ Touch-friendly mobile menu

## 🐛 Troubleshooting

### Issue: Styles not applying
**Solution:** Ensure `index.css` includes:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Issue: React Router not working
**Solution:** Wrap App with `<BrowserRouter>`:
```jsx
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter>
  <App />
</BrowserRouter>
```

### Issue: Icons not showing (lucide-react)
**Solution:** Import icons correctly:
```jsx
import { Menu, X, ChevronDown } from 'lucide-react';
```

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)
- [React Router](https://reactrouter.com)
- [Lucide Icons](https://lucide.dev)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

We welcome contributions! Please feel free to submit pull requests.

## 📞 Support

For questions or issues, please contact the development team.

---

**Last Updated**: 2024
**Version**: 1.0.0

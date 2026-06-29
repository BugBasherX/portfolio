# KONCEPT Website - React Version

A luxurious, premium digital experience website built with React.js, featuring 3D animations, cinematic effects, and a sophisticated black/white/gold color palette.

## 🚀 Technology Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Full type safety and better developer experience
- **Vite** - Lightning fast build tool and dev server
- **Motion** - Powerful animations and 3D effects (formerly Framer Motion)
- **Tailwind CSS v4** - Latest utility-first CSS framework
- **Lucide React** - Beautiful, consistent icons

## 🎨 Features

- **Premium Design**: Luxurious black theme with white, silver, and gold accents
- **3D Animations**: Advanced particle systems, floating elements, and depth effects
- **Smooth Scrolling**: Seamless navigation between sections
- **Interactive Elements**: Hover animations, glass effects, and metallic surfaces
- **Responsive Design**: Optimized for all devices and screen sizes
- **Logo Integration**: Your KONCEPT logo beautifully integrated throughout
- **Portfolio Integration**: YouTube video integration with modal players

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Differences from Next.js Version

This React version maintains **100% identical functionality** to the Next.js version while using:
- Standard React 18 setup with Vite
- Client-side routing instead of Next.js routing
- Standard ES modules instead of Next.js modules
- Vite's fast HMR instead of Next.js Fast Refresh

## 🎨 Color Palette

The website uses a premium color scheme:
- **Primary Black**: #000000
- **Charcoal**: #1a1a1a  
- **White Accent**: #ffffff
- **Silver**: #c0c0c0
- **Platinum**: #e5e4e2
- **Gold Accent**: #ffd700

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── ServicesSection.tsx
│   ├── PortfolioSection.tsx
│   ├── ContactSection.tsx
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── ui/             # Reusable UI components
├── config/             # Configuration files
│   └── siteConfig.ts
├── styles/             # Global styles
│   └── globals.css
├── App.tsx            # Main application component
└── main.tsx           # React entry point
```

## 🌟 Premium Features

- **Advanced 3D Effects**: Perspective transforms, preserve-3d, and complex animations
- **Particle Systems**: Dynamic particle effects throughout
- **Glass Morphism**: Backdrop filters and glass-like surfaces
- **Metallic Materials**: Sophisticated gradient surfaces
- **Smooth Animations**: Motion-powered transitions and interactions
- **Professional Navigation**: Dual navigation system with active states

## 🔧 Customization

Your website content is configured in `/src/config/siteConfig.ts`. Update this file to modify:
- Company information
- Contact details
- Social media links
- Portfolio items

## 🚀 Deployment

Build for production:
```bash
npm run build
```

The build files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

*3D animations and advanced effects work best in modern browsers with hardware acceleration.*

---

**KONCEPT** - Transcending boundaries. Creating legacies. Inspiring futures.
# Image Integration Guide for KONCEPT Website

This guide explains different ways to add your own images to the KONCEPT website.

## 🖼️ Method 1: Using Unsplash (Current Method)

The website currently uses Unsplash for high-quality stock images. To get specific images:

### Search for Specific Images:
```tsx
// Use the unsplash_tool in any component
const imageUrl = await unsplash_tool("modern office workspace");
// This will return a relevant professional image URL
```

### Common Search Terms for Business Websites:
- "professional headshot" - For about section
- "modern office workspace" - For hero backgrounds
- "technology dashboard" - For portfolio projects
- "creative team meeting" - For team sections
- "minimalist design" - For clean backgrounds

## 🚀 Method 2: Adding Your Own Images

### Step 1: Create Images Folder
```
/your-project/
├── assets/
│   ├── images/
│   │   ├── hero-bg.jpg
│   │   ├── about-photo.jpg
│   │   ├── portfolio-1.jpg
│   │   └── logo.png
```

### Step 2: Import and Use Images
```tsx
// In any component file
import heroImage from '../assets/images/hero-bg.jpg';
import aboutPhoto from '../assets/images/about-photo.jpg';
import logo from '../assets/images/logo.png';

// Then use in JSX
<img src={heroImage} alt="Hero background" />

// Or with ImageWithFallback component
import { ImageWithFallback } from './components/figma/ImageWithFallback';

<ImageWithFallback 
  src={aboutPhoto}
  alt="About us"
  className="w-full h-64 object-cover rounded-lg"
/>
```

## 📱 Method 3: External URLs (Hosted Images)

If you host images on your own server or cloud service:

```tsx
// Direct URL usage
<img 
  src="https://yourdomain.com/images/your-photo.jpg" 
  alt="Your description"
/>

// Update portfolio images in config
// In /config/siteConfig.ts
portfolio: [
  {
    id: 1,
    title: "Your Project",
    imageUrl: "https://yourdomain.com/portfolio/project1.jpg",
    // ... other fields
  }
]
```

## 🎯 Specific Image Replacements

### 1. Hero Section Background
Update `/components/HeroSection.tsx`:
```tsx
// Add background image
<section 
  className="relative h-screen..."
  style={{
    backgroundImage: 'url(your-hero-image.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
```

### 2. About Section Photo
Add personal/team photo:
```tsx
// In AboutSection.tsx, replace the 3D element with:
<div className="relative">
  <img 
    src="your-professional-photo.jpg"
    alt="About us"
    className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
  />
</div>
```

### 3. Portfolio Project Images
Update project images in `/config/siteConfig.ts`:
```tsx
portfolio: [
  {
    id: 1,
    title: "Your Project Name",
    imageUrl: "path/to/your/project-screenshot.jpg",
    // ... rest of config
  }
]
```

### 4. Logo Integration
Add your logo to the hero section:
```tsx
// In HeroSection.tsx, replace or add to the title area:
<div className="flex items-center justify-center mb-8">
  <img 
    src="your-logo.png" 
    alt="Your Company Logo" 
    className="w-24 h-24 mr-4"
  />
  <h1>Your Company Name</h1>
</div>
```

## 📊 Recommended Image Sizes

### Hero Section:
- **Background**: 1920x1080px (Full HD)
- **Logo**: 200x200px (PNG with transparent background)

### About Section:
- **Profile/Team Photo**: 800x800px (Square format)
- **Company Photos**: 1200x800px (Landscape)

### Portfolio:
- **Project Screenshots**: 1200x900px (4:3 aspect ratio)
- **Mobile Screenshots**: 400x800px (Mobile aspect ratio)

### General Guidelines:
- **Format**: JPG for photos, PNG for logos/graphics with transparency
- **Quality**: High quality but optimized for web (under 500KB per image)
- **Alt Text**: Always include descriptive alt text for accessibility

## 🔧 Image Optimization Tips

### 1. Compress Images:
- Use tools like TinyPNG, ImageOptim, or Squoosh
- Aim for under 500KB per image
- Maintain quality while reducing file size

### 2. Responsive Images:
```tsx
<img 
  src="image-large.jpg"
  srcSet="image-small.jpg 480w, image-medium.jpg 800w, image-large.jpg 1200w"
  sizes="(max-width: 480px) 480px, (max-width: 800px) 800px, 1200px"
  alt="Responsive image"
/>
```

### 3. Lazy Loading:
```tsx
<img 
  src="your-image.jpg"
  loading="lazy"
  alt="Description"
/>
```

## 🎨 Quick Customization Examples

### Replace Hero Title with Logo + Text:
```tsx
// In HeroSection.tsx
<div className="text-center flex flex-col items-center">
  <img src="your-logo.png" alt="Logo" className="w-32 h-32 mb-8" />
  <h1 className="text-6xl font-black">Your Company</h1>
  <p className="text-xl">Your tagline here</p>
</div>
```

### Add Team Photos to About Section:
```tsx
// Replace 3D element with team grid
<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
  {teamMembers.map(member => (
    <div key={member.id} className="text-center">
      <img 
        src={member.photo} 
        alt={member.name}
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
      />
      <h3 className="text-white font-semibold">{member.name}</h3>
      <p className="text-white/60">{member.role}</p>
    </div>
  ))}
</div>
```

## 🚀 Quick Start Checklist

- [ ] Gather your images (logo, photos, portfolio screenshots)
- [ ] Optimize images for web (compress, resize)
- [ ] Choose your integration method (local files vs URLs)
- [ ] Update the configuration file with your image paths
- [ ] Test on different screen sizes
- [ ] Add proper alt text for accessibility

Remember: Start with the most important images (logo, hero background, about photo) and gradually replace others as you gather more content!
# KONCEPT Website Customization Guide

This guide will help you personalize the KONCEPT website with your own content, images, and branding.

## 🚀 Quick Start

1. **Update Site Configuration**: Edit `/config/siteConfig.ts` with your details
2. **Add Your Images**: Use the methods described in the Images section
3. **Customize Components**: Update individual components as needed
4. **Test Your Changes**: Preview your site to ensure everything looks good

## 📝 1. Basic Information Updates

### Update `/config/siteConfig.ts` with your details:

```typescript
company: {
  name: "Your Company Name", // Replace with your business/personal brand
  tagline: "Your Amazing Tagline", // Your unique value proposition
  description: "Your compelling description", // What you do in one sentence
}
```

### Contact Information:
```typescript
contact: {
  email: "your.email@domain.com", // Your real email
  phone: "+1 (555) 123-4567", // Your phone number
  location: "Your City, State", // Your location
}
```

### Social Media Links:
```typescript
social: {
  github: "https://github.com/yourusername",
  twitter: "https://twitter.com/yourusername", 
  linkedin: "https://linkedin.com/in/yourusername",
  instagram: "https://instagram.com/yourusername",
}
```

## 🖼️ 2. Adding Your Own Images

### Method 1: Using Unsplash (Recommended for placeholders)
The website uses the `unsplash_tool` to automatically fetch relevant images. Images are already integrated, but you can update search terms in components.

### Method 2: Adding Your Own Image Files
1. Create an `/assets` or `/images` folder in your project
2. Add your image files (PNG, JPG, WebP recommended)
3. Import and use them in components:

```tsx
// In any component
import yourImage from '../assets/your-image.jpg';

// Then use it
<img src={yourImage} alt="Description" />

// Or with the ImageWithFallback component
<ImageWithFallback 
  src={yourImage} 
  alt="Your image description"
  className="w-full h-64 object-cover"
/>
```

### Method 3: Using External URLs
Simply update the `imageUrl` fields in your portfolio projects:

```typescript
portfolio: [
  {
    id: 1,
    title: "Your Project",
    imageUrl: "https://your-website.com/project-image.jpg", // Your hosted image
    // ... other details
  }
]
```

## 🏢 3. Customizing the About Section

### Update Your Story in `/config/siteConfig.ts`:
```typescript
about: {
  title: "Your Name/Company", // Your personal or business name
  paragraphs: [
    "Your first paragraph about your background and mission...",
    "Second paragraph about your approach and values...",
    "Third paragraph about your vision and what sets you apart..."
  ],
  statistics: [
    { icon: "Award", value: "50+", label: "Projects Completed", color: "#ffd700" },
    { icon: "Users", value: "100+", label: "Satisfied Clients", color: "#ffffff" },
    { icon: "Lightbulb", value: "5+", label: "Years Experience", color: "#c0c0c0" },
    { icon: "Target", value: "100%", label: "Client Satisfaction", color: "#ffd700" },
  ]
}
```

## 🛠️ 4. Updating Your Services

### Modify the services array in `/config/siteConfig.ts`:
```typescript
services: [
  {
    title: "Web Development", // Your service name
    description: "Building modern, responsive websites with cutting-edge technology", // What you offer
    accent: "#ffffff", // Color accent (white, #c0c0c0, or #ffd700)
  },
  {
    title: "Mobile Apps",
    description: "Creating native and cross-platform mobile applications",
    accent: "#c0c0c0",
  },
  // Add more services as needed
],
```

## 💼 5. Adding Your Portfolio Projects

### Update the portfolio array in `/config/siteConfig.ts`:
```typescript
portfolio: [
  {
    id: 1,
    title: "Your Project Name",
    category: "Web Application", // Type of project
    description: "Detailed description of what you built and the impact",
    year: "2024",
    accent: "#ffffff",
    imageUrl: "path/to/your/project-image.jpg", // Your project screenshot
    projectUrl: "https://yourproject.com", // Live project URL
    technologies: ["React", "Node.js", "PostgreSQL"], // Tech stack used
  },
  // Add more projects...
]
```

## 🎨 6. Customizing Colors and Branding

### The website uses a premium color palette defined in `/styles/globals.css`:
- **Primary**: Black (#000000) - Main background
- **White**: (#ffffff) - Primary accent
- **Silver**: (#c0c0c0) - Secondary accent  
- **Gold**: (#ffd700) - Highlight accent

### To customize colors, update the CSS variables:
```css
:root {
  --koncept-gold: #your-brand-color; /* Replace with your brand color */
  --koncept-silver: #your-secondary-color;
}
```

## 📧 7. Setting Up Contact Form

The contact form currently shows a success message without actually sending emails. To make it functional:

1. **Use a form service** like Formspree, Netlify Forms, or EmailJS
2. **Update the form handler** in `/components/ContactSection.tsx`
3. **Add your API endpoint** to the configuration

Example with Formspree:
```tsx
// In ContactSection.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  
  if (response.ok) {
    // Handle success
  }
};
```

## 🔍 8. SEO Optimization

### Update meta information in `/config/siteConfig.ts`:
```typescript
seo: {
  title: "Your Name - Web Developer & Designer",
  description: "Professional web development and design services. Creating modern, responsive websites.",
  keywords: ["web developer", "your city", "react developer", "freelancer"],
}
```

## 📱 9. Making It Your Own

### Personal Touches:
1. **Replace "KONCEPT"** with your personal brand name throughout the site
2. **Update the tagline** to reflect your unique value proposition  
3. **Customize the hero section** with your personal message
4. **Add your professional headshot** to the about section
5. **Include your certifications** or achievements in the stats

### Business Customization:
1. **Company logo**: Add your logo to the hero and footer sections
2. **Brand colors**: Update the color scheme to match your brand
3. **Team photos**: If you have a team, add team member sections
4. **Testimonials**: Add client testimonials to build credibility

## 🚀 10. Deployment Tips

1. **Environment Variables**: Set up environment variables for API keys
2. **Image Optimization**: Compress images before uploading
3. **Performance**: Test loading speeds and optimize as needed
4. **Mobile Testing**: Ensure everything works perfectly on mobile devices
5. **Analytics**: Add Google Analytics or similar tracking

## ❓ Need Help?

If you need assistance with any customization:
1. Check the component files in `/components/` for specific changes
2. Review the configuration file for easy updates
3. Test changes locally before deploying
4. Keep backups of your original files

Remember: Start with the configuration file - it's the easiest way to personalize most of the content!
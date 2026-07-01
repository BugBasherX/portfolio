// KONCEPT Website Configuration
// Update this file with your personal/business details

import ecommerceImg from '../../assets/portfolio-ecommerce.png';
import portfolioImg from '../../assets/portfolio-portfolio.png';
import ngoImg from '../../assets/portfolio-ngo.png';
import uilib from '../../assets/portfolio-uilib.png';

export const siteConfig = {
  // Company/Personal Information
  company: {
    name: "YUBRAJ", // Your company/brand name
    tagline: "Full-Stack Developer & Graphic Designer", // Your tagline
    description:
      "Transforming ideas into impactful digital experiences from Nepal", // Hero description

    // About Section
    about: {
      title: "YUBRAJ KURMI", // Can be your name or company name
      paragraphs: [
        "I am a full-stack web developer and graphic designer from Nepal, passionate about building responsive websites, intuitive UI/UX, and dynamic web applications that make a real difference.",
        "With hands-on experience in React, Node.js, Python, Figma, and Adobe Creative Suite, I craft solutions that blend elegant design with robust engineering — from e-commerce platforms to interactive UI component libraries.",
        "From concept to creation, I am your partner in innovation — pushing boundaries and delivering high-quality web and design solutions that contribute to Nepal's growing tech ecosystem.",
      ],
      statistics: [
        {
          icon: "Award",
          value: "20+",
          label: "Projects Delivered",
          color: "#ffd700",
        },
        {
          icon: "Users",
          value: "20+",
          label: "Happy Clients",
          color: "#ffffff",
        },
        {
          icon: "Lightbulb",
          value: "5+",
          label: "Open Source Contributions",
          color: "#c0c0c0",
        },
        {
          icon: "Target",
          value: "25%",
          label: "Performance Gains",
          color: "#ffd700",
        },
      ],
    },
  },

  // Contact Information
  contact: {
    email: "yuvraj.kurmi@gmail.com",
    phone: "+977-9801234567",
    location: "Rupandehi, Nepal",

    // Contact form destination (you'll need to set up a form handler)
    formAction: "/api/contact",
  },

  // Social Media Links
  social: {
    github: "https://github.com/yubrajkurmi",
    twitter: "https://x.com/yubrajkurmi",
    linkedin: "https://linkedin.com/in/yubrajkurmi",
    instagram: "https://instagram.com/yubrajkurmi",
  },

  // Services You Offer
  services: [
    {
      title: "Full-Stack Development",
      description:
        "Building end-to-end web applications with React.js, Node.js, Express.js, MongoDB and MySQL",
      accent: "#ffffff",
    },
    {
      title: "UI/UX Design",
      description:
        "Crafting intuitive, user-centered interfaces with Figma, Adobe XD and modern design systems",
      accent: "#c0c0c0",
    },
    {
      title: "Graphic Design",
      description:
        "Logos, branding kits, social media posts and visual identities using Photoshop and Illustrator",
      accent: "#ffd700",
    },
    {
      title: "E-Commerce Solutions",
      description:
        "Responsive e-commerce platforms with shopping cart, user auth and payment gateway integration",
      accent: "#ffffff",
    },
    {
      title: "Performance Optimization",
      description:
        "Improving load speed, responsiveness and cross-browser compatibility for better user experience",
      accent: "#c0c0c0",
    },
    {
      title: "Logo Designing",
      description:
        "Crafting logos that speak your brand's language — modern, memorable and impactful",
      accent: "#ffd700",
    },
  ],

  // Your Portfolio Projects
  portfolio: [
    {
      id: 1,
      title: "Nepal E-Commerce Platform",
      category: "Full-Stack Development",
      description:
        "Full-stack web application with user authentication, product catalog, shopping cart, and payment gateway integration. Enhanced user experience and performance.",
      year: "2024",
      accent: "#ffffff",
      type: "image",
      thumbnailUrl: ecommerceImg,
      technologies: ["React.js", "Node.js", "MongoDB", "Payment Integration"],
    },
    {
      id: 2,
      title: "Personal Portfolio Website",
      category: "Web Development",
      description:
        "Responsive portfolio showcasing web development and graphic design projects. Implemented SEO optimization and modern UI/UX design patterns.",
      year: "2024",
      accent: "#c0c0c0",
      type: "image",
      thumbnailUrl: portfolioImg,
      technologies: ["React.js", "SEO", "UI/UX", "Responsive Design"],
    },
    {
      id: 3,
      title: "Nepal NGO Event Portal",
      category: "Full-Stack Development",
      description:
        "Developed website for Kathmandu-based NGO to manage events, donations, and volunteer registrations, increasing online engagement.",
      year: "2024",
      accent: "#ffd700",
      type: "image",
      thumbnailUrl: ngoImg,
      technologies: ["React.js", "Node.js", "Express.js", "MySQL"],
    },
    {
      id: 4,
      title: "Interactive UI Component Library",
      category: "UI/UX & Design",
      description:
        "Created reusable UI components for Nepalese startups using Figma and HTML/CSS, streamlining web development workflow.",
      year: "2024",
      accent: "#ffd700",
      type: "image",
      thumbnailUrl: uilib,
      technologies: ["Figma", "HTML/CSS", "JavaScript", "Component Design"],
    },
  ],

  // SEO and Meta Information
  seo: {
    title: "Yubraj Kurmi - Full-Stack Developer & Graphic Designer",
    description:
      "Full-stack web developer and graphic designer from Nepal. Skilled in React, Node.js, Python, Figma, and Adobe Creative Suite.",
    keywords: [
      "full-stack developer",
      "graphic designer",
      "Nepal",
      "React.js",
      "Node.js",
      "UI/UX",
      "web development",
    ],
  },

  // Footer tagline (three phrases shown in gold / white / silver)
  footerTagline: {
    phrase1: "Crafting digital experiences.",
    phrase2: "Building lasting solutions.",
    phrase3: "Inspiring through code.",
  },

  // Copyright and Legal
  legal: {
    copyrightYear: new Date().getFullYear().toString(),
    copyrightHolder: "Yubraj Kurmi",
    rightsText:
      "All rights reserved. Crafted with precision and passion.",
  },
};

// Helper function to get configuration values
export const getConfig = (key: string) => {
  return siteConfig[key as keyof typeof siteConfig];
};

// KONCEPT Website Configuration
// Update this file with your personal/business details

export const siteConfig = {
  // Company/Personal Information
  company: {
    name: "KONCEPT", // Your company/brand name
    tagline: "Where Innovation Meets Imagination", // Your tagline
    description:
      "Transcending the boundaries between imagination and reality", // Hero description

    // About Section
    about: {
      title: "KONCEPT", // Can be your name or company name
      paragraphs: [
        "We are visionaries who transform the impossible into reality. Our journey began with a simple belief: that creativity combined with cutting-edge technology can reshape entire industries.",
        "Every project is a masterpiece in the making. We don't just build applications—we craft experiences that transcend expectations and redefine what's possible in the digital realm.",
        "From concept to creation, we are your partners in innovation, pushing boundaries and setting new standards for excellence in every pixel, every interaction, and every moment of user delight.",
      ],
      statistics: [
        {
          icon: "Award",
          value: "150+",
          label: "Awards Won",
          color: "#ffd700",
        },
        {
          icon: "Users",
          value: "500+",
          label: "Happy Clients",
          color: "#ffffff",
        },
        {
          icon: "Lightbulb",
          value: "1000+",
          label: "Ideas Realized",
          color: "#c0c0c0",
        },
        {
          icon: "Target",
          value: "99%",
          label: "Success Rate",
          color: "#ffd700",
        },
      ],
    },
  },

  // Contact Information
  contact: {
    email: "cbanish369@gmail.com", // Your email
    phone: "+91 9176190019", // Your phone number
    location: "Chennai , TamilNadu", // Your location

    // Contact form destination (you'll need to set up a form handler)
    formAction: "/api/contact", // Update this when you set up form handling
  },

  // Social Media Links
  social: {
    github: "https://github.com/ANISH20112010", // Your GitHub
    twitter: "https://x.com/LEARNINMINUTE", // Your Twitter/X
    linkedin: "https://linkedin.com/in/yourusername", // Your LinkedIn
    instagram: "https://instagram.com/yourusername", // Your Instagram
  },

  // Services You Offer
  services: [
    {
      title: "Premium Design",
      description:
        "Crafting visually stunning experiences that captivate and inspire",
      accent: "#ffffff",
    },
    {
      title: "Advanced Development",
      description:
        "Building next-generation solutions with cutting-edge technology",
      accent: "#c0c0c0",
    },
    {
      title: "Motion & Animation",
      description:
        "Bringing designs to life with fluid, captivating animations",
      accent: "#ffd700",
    },
    {
      title: "Digital Experiences",
      description:
        "Creating immersive web applications that push boundaries",
      accent: "#ffffff",
    },
    {
      title: "User Experience",
      description:
        "Designing intuitive interfaces that users absolutely love",
      accent: "#c0c0c0",
    },
    {
      title: "Logo Designing",
      description:
        "We craft logos that speak your brand’s language ",
      accent: "#ffd700",
    },
  ],

  // Your Portfolio Projects
  portfolio: [
    {
      id: 1,
      title: "ENGINEERING EARTH", // Project name
      category: "Video Content", // Project category
      description:
        "Future Of Sci-Fi Earth",
      year: "2024",
      accent: "#ffffff",
      type: "video", // New field to identify video content
      videoUrl: "https://youtu.be/KjNIauKFzYQ?si=1MY9vMVc7kH3MGeC", // Your YouTube video
      videoId: "KjNIauKFzYQ", // YouTube video ID for embedding
      thumbnailUrl: `https://img.youtube.com/vi/KjNIauKFzYQ/maxresdefault.jpg`, // YouTube thumbnail
      technologies: ["Creative", "Design", "Showcase"], // Technologies used
    },
    {
      id: 2,
      title: "How Does Space Sounds Like?",
      category: "Video Content",
      description:
        "You Won't Believe Your Ears",
      year: "2024",
      accent: "#c0c0c0",
      type: "video",
      videoUrl: "https://youtu.be/zAWkv6CwKxI?si=ZA_OpiVn_crc6-68",
      videoId: "zAWkv6CwKxI",
      thumbnailUrl: `https://img.youtube.com/vi/zAWkv6CwKxI/maxresdefault.jpg`,
      technologies: ["Development", "Innovation", "Technology"],
    },
    {
      id: 3,
      title: "Life Beyond Us-3",
      category: "Video Content",
      description:
        "Life Beyond Us 3 is a channel dedicated to exploring the mysteries of the universe, the potential of life beyond Earth, and the future of humanity in space. ",
      year: "2024",
      accent: "#ffd700",
      type: "video",
      videoUrl: "https://youtu.be/3gzyhjUvyqQ?si=R4FBWnr2NSMF3ywR",
      videoId: "3gzyhjUvyqQ",
      thumbnailUrl: `https://img.youtube.com/vi/3gzyhjUvyqQ/maxresdefault.jpg`,
      technologies: ["Creative", "Video", "Presentation"],
    },
    {
      id: 4,
      title: "Do We Survive The Killer Asteroid?",
      category: "Video Content",
      description:
        "explores the wonders and mysteries of the universe, diving deep into the science of space, cosmic phenomena, and the potential future of humanity",
      year: "2024",
      accent: "#ffd700",
      type: "video",
      videoUrl: "https://youtu.be/9RnHyNhlZ5g?si=q1Men2o2zvL8LI1v",
      videoId: "9RnHyNhlZ5g",
      thumbnailUrl: `https://img.youtube.com/vi/9RnHyNhlZ5g/maxresdefault.jpg`,
      technologies: ["Creative", "Video", "Presentation"],
    },
    // Add more projects as needed
  ],

  // SEO and Meta Information
  seo: {
    title: "KONCEPT - Where Innovation Meets Imagination",
    description:
      "Premium digital experiences and cutting-edge web development. Transforming ideas into extraordinary realities.",
    keywords: [
      "web development",
      "design",
      "innovation",
      "digital experiences",
    ],
  },

  // Copyright and Legal
  legal: {
    copyrightYear: "2025",
    copyrightHolder: "KONCEPT Studio", // Your name/company
    rightsText:
      "All rights reserved. Crafted with precision and passion.",
  },
};

// Helper function to get configuration values
export const getConfig = (key: string) => {
  return siteConfig[key as keyof typeof siteConfig];
};
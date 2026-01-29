const config = {
  title: "Yuvraj Kurmi | Full-Stack Developer",
  description: {
    long: "Explore the portfolio of Yuvraj, a full-stack developer and creative technologist specializing in interactive web experiences, 3D animations, and innovative projects. Discover my latest work, including Coding Ducks, The Booking Desk, Ghostchat, and more. Let's build something amazing together!",
    short:
      "Discover the portfolio of Yuvraj, a full-stack developer creating interactive web experiences and innovative projects.",
  },
  keywords: [
    "Yuvraj kurmi",
    "portfolio",
    "full-stack developer",
    "creative technologist",
    "web development",
    "3D animations",
    "interactive websites",
    "Coding Ducks",
    "The Booking Desk",
    "Ghostchat",
    "web design",
    "Python",
    "React",
    "Next.js",
    "Spline",
    "Framer Motion",
  ],
  author: "Yuvraj Kurmi",
  email: "developerrajir@gmail.com",
  site: "https://yuvrajkurmi.com.np",

  // for github stars button
  githubUsername: "bugbasherx",
  githubRepo: "3d-portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/bugbasherx",
    linkedin: "https://www.linkedin.com/in/bugbasherx/",
    instagram: "https://www.instagram.com/obscln",
    facebook: "https://www.facebook.com/obscln/",
    github: "https://github.com/bugbasherx",
  },
};
export { config };

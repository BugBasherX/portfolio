"use client";

import { motion } from "motion/react";
import { useMemo } from "react";
import { Github, Twitter, Linkedin, Instagram, ArrowUp, Star, Diamond, Sparkles } from "lucide-react";
import { siteConfig } from "../config/siteConfig";
import logo from 'figma:asset/e9afabb7434f237f121fca51dffa09ee3fce323e.png';

export function Footer() {
  const particles = useMemo(() =>
    [...Array(15)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      colorIndex: i % 4,
      duration: 6 + Math.random() * 4,
      delay: Math.random() * 5,
    })), []);

  const socialLinks = [
    { icon: Github, href: siteConfig.social.github, label: "GitHub", color: "#ffffff" },
    { icon: Twitter, href: siteConfig.social.twitter, label: "Twitter", color: "#c0c0c0" },
    { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn", color: "#ffffff" },
    { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram", color: "#ffd700" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-t from-[#000000] via-[#1a1a1a] to-[#000000] overflow-hidden">
      {/* Sophisticated background elements */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.width,
              height: p.height,
              background: p.colorIndex === 0 ? 
                "linear-gradient(45deg, #ffffff, #e5e4e2)" :
                p.colorIndex === 1 ?
                "linear-gradient(45deg, #ffd700, #ffed4e)" :
                p.colorIndex === 2 ?
                "linear-gradient(45deg, #c0c0c0, #a8a8a8)" :
                "linear-gradient(45deg, #ffffff80, #ffd70080)",
              willChange: "transform, opacity",
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [0.5, 1.5, 0.5],
              y: [0, -30, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main footer content */}
        <motion.div
          className="text-center space-y-10 sm:space-y-12"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Available badge */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2.5 px-5 py-2.5 rounded-full border border-green-500/30 bg-green-500/10">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-green-400 text-xs sm:text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>
                Available for freelance work
              </span>
            </div>
          </motion.div>

          {/* Brand logo and name */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Logo */}
            <motion.div
              className="flex justify-center mb-6"
              whileHover={{ 
                scale: 1.1,
                rotateY: 15,
                transition: { duration: 0.3 }
              }}
            >
              <motion.img
                src={logo}
                alt={`${siteConfig.company.name} Logo`}
                className="h-14 sm:h-20 w-auto"
                animate={{
                  filter: [
                    "drop-shadow(0 0 20px rgba(255, 255, 255, 0.2))",
                    "drop-shadow(0 0 30px rgba(255, 215, 0, 0.3))",
                    "drop-shadow(0 0 20px rgba(255, 255, 255, 0.2))"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.h3
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <span className="bg-gradient-to-r from-white via-[#c0c0c0] to-[#ffd700] bg-clip-text text-transparent">
                {siteConfig.company.name}
              </span>
            </motion.h3>
            
            <div className="w-40 h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent mx-auto" />
          </motion.div>

          {/* Enhanced tagline */}
          <motion.div
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-base sm:text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed px-2">
              <span className="text-[#ffd700]">{siteConfig.footerTagline.phrase1}</span>{" "}
              <span className="text-white">{siteConfig.footerTagline.phrase2}</span>{" "}
              <span className="text-[#c0c0c0]">{siteConfig.footerTagline.phrase3}</span>
            </p>
            
            <p className="text-white/50 max-w-3xl mx-auto text-sm sm:text-base px-4">
              {siteConfig.company.description}
            </p>
          </motion.div>

          {/* Enhanced social icons */}
          <motion.div
            className="flex items-center justify-center space-x-4 sm:space-x-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.label}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="relative flex w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl items-center justify-center text-white/60 hover:text-white transition-all duration-300 group overflow-hidden"
                  whileHover={{ 
                    scale: 1.1,
                    y: -8,
                    rotateY: 10,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5 sm:w-7 sm:h-7 relative z-10 transition-all duration-300" />
                  
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${social.color}20, transparent)`,
                    }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 rounded-2xl border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ borderColor: `${social.color}40` }}
                    animate={{
                      borderColor: [`${social.color}40`, `${social.color}80`, `${social.color}40`],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.a>

                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-xl -z-10"
                  style={{ backgroundColor: `${social.color}20` }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced divider with animation */}
          <motion.div
            className="relative py-6 sm:py-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-64 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto relative overflow-hidden"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Enhanced copyright */}
          <motion.p
            className="text-white/40 text-xs sm:text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            viewport={{ once: true }}
          >
            © {siteConfig.legal.copyrightYear} {siteConfig.legal.copyrightHolder}. {siteConfig.legal.rightsText}
          </motion.p>
        </motion.div>

        {/* Back to top button — responsive position */}
        <motion.button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="group absolute top-4 right-4 sm:top-12 sm:right-12 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white hover:text-[#ffd700] transition-all duration-300 overflow-hidden"
          whileHover={{ 
            scale: 1.1,
            y: -5,
            rotateZ: 10,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce relative z-10" />
          
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#ffd700]/20 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-xl -z-10" />
        </motion.button>
      </div>

      {/* Ambient footer lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-radial from-white/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-radial from-[#ffd700]/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[300px] sm:w-[600px] h-48 bg-gradient-radial from-white/3 to-transparent blur-3xl" />
      </div>
    </footer>
  );
}

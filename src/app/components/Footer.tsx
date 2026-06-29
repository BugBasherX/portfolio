"use client";

import { motion } from "motion/react";
import { Github, Twitter, Linkedin, Instagram, ArrowUp, Star, Diamond, Sparkles } from "lucide-react";
import { siteConfig } from "../config/siteConfig";
import logo from 'figma:asset/e9afabb7434f237f121fca51dffa09ee3fce323e.png';

export function Footer() {
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
    <footer className="relative py-24 px-6 bg-gradient-to-t from-[#000000] via-[#1a1a1a] to-[#000000] overflow-hidden">
      {/* Sophisticated background elements */}
      <div className="absolute inset-0">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: i % 4 === 0 ? 
                "linear-gradient(45deg, #ffffff, #e5e4e2)" :
                i % 4 === 1 ?
                "linear-gradient(45deg, #ffd700, #ffed4e)" :
                i % 4 === 2 ?
                "linear-gradient(45deg, #c0c0c0, #a8a8a8)" :
                "linear-gradient(45deg, #ffffff80, #ffd70080)",
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [0.5, 1.5, 0.5],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main footer content */}
        <motion.div
          className="text-center space-y-12"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Decorative header */}
          <motion.div
            className="flex items-center justify-center space-x-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Diamond className="w-8 h-8 text-[#ffd700]" />
            </motion.div>
            
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-6 h-6 text-white/60" />
            </motion.div>
            
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-[#c0c0c0]" />
            </motion.div>
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
                alt="KONCEPT Logo"
                className="h-20 w-auto"
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
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6"
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
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              <span className="text-[#ffd700]">Transcending boundaries.</span>{" "}
              <span className="text-white">Creating legacies.</span>{" "}
              <span className="text-[#c0c0c0]">Inspiring futures.</span>
            </p>
            
            <p className="text-white/50 max-w-3xl mx-auto">
              {siteConfig.company.description}
            </p>
          </motion.div>

          {/* Enhanced social icons */}
          <motion.div
            className="flex items-center justify-center space-x-8"
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
                  className="relative block w-16 h-16 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 group overflow-hidden"
                  whileHover={{ 
                    scale: 1.1,
                    y: -8,
                    rotateY: 10,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-7 h-7 relative z-10 transition-all duration-300" />
                  
                  {/* Hover background effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${social.color}20, transparent)`,
                    }}
                  />
                  
                  {/* Animated border on hover */}
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

                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-xl -z-10"
                  style={{ backgroundColor: `${social.color}20` }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced divider with animation */}
          <motion.div
            className="relative py-8"
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
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Enhanced copyright */}
          <motion.p
            className="text-white/40 text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            viewport={{ once: true }}
          >
            © {siteConfig.legal.copyrightYear} {siteConfig.legal.copyrightHolder}. {siteConfig.legal.rightsText}
          </motion.p>
        </motion.div>

        {/* Enhanced back to top button */}
        <motion.button
          onClick={scrollToTop}
          className="group absolute top-12 right-12 w-16 h-16 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white hover:text-[#ffd700] transition-all duration-300 overflow-hidden"
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
          <ArrowUp className="w-6 h-6 group-hover:animate-bounce relative z-10" />
          
          {/* Hover background effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#ffd700]/20 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Glow effect */}
          <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-xl -z-10" />
        </motion.button>
      </div>

      {/* Ambient footer lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-white/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-[#ffd700]/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[600px] h-48 bg-gradient-radial from-white/3 to-transparent blur-3xl" />
      </div>
    </footer>
  );
}
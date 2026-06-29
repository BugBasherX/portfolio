"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from 'figma:asset/e9afabb7434f237f121fca51dffa09ee3fce323e.png';
import { siteConfig } from "../config/siteConfig";

const sections = [
  { name: 'Home', id: 'hero' },
  { name: 'About', id: 'about' },
  { name: 'Services', id: 'services' },
  { name: 'Portfolio', id: 'portfolio' },
  { name: 'Contact', id: 'contact' }
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sectionElements = sections.map(section => document.getElementById(section.id));
      const scrollPosition = window.scrollY + 100;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Main Header Navigation */}
      <motion.header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer"
              onClick={() => scrollToSection('hero')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                src={logo}
                alt={`${siteConfig.company.name} Logo`}
                className="h-8 sm:h-10 w-auto"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))" }}
              />
              <motion.span
                className="text-xl sm:text-2xl font-black text-white tracking-wider"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {siteConfig.company.name}
              </motion.span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8" aria-label="Primary navigation">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  className={`relative px-3 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
                    activeSection === section.id
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                  onClick={() => scrollToSection(section.id)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {section.name}
                  {activeSection === section.id && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                      layoutId="activeSection"
                    >
                      <div className="w-2 h-0.5 bg-gradient-to-r from-[#ffd700] to-white rounded-full" />
                    </motion.div>
                  )}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/5 to-[#ffd700]/5 rounded-lg opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-3 text-white rounded-xl bg-white/5 border border-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.9 }}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu — AnimatePresence handles mount/unmount cleanly */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation"
              className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-b border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-4 py-4 space-y-1">
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    className={`flex items-center w-full text-left px-4 py-3 rounded-xl text-base font-medium uppercase tracking-wider transition-colors duration-200 ${
                      activeSection === section.id
                        ? 'text-white bg-white/10 border border-white/20'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                    onClick={() => scrollToSection(section.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.05 }}
                  >
                    {activeSection === section.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffd700] mr-3 flex-shrink-0" />
                    )}
                    {section.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Right Side Dot Navigation — desktop only */}
      <nav className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 space-y-4 hidden lg:block" aria-label="Section navigation">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            className={`relative w-4 h-4 rounded-full transition-all duration-300 group ${
              activeSection === section.id
                ? 'bg-white/60 scale-125'
                : 'bg-white/20 hover:bg-white/40'
            }`}
            onClick={() => scrollToSection(section.id)}
            whileHover={{ scale: activeSection === section.id ? 1.25 : 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Navigate to ${section.name}`}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: index % 3 === 0 ? "#ffffff40" :
                            index % 3 === 1 ? "#c0c0c040" : "#ffd70040",
                opacity: activeSection === section.id ? 1 : 0.6
              }}
              animate={{
                scale: activeSection === section.id ? [1, 1.1, 1] : [1, 1.2, 1],
                opacity: activeSection === section.id ? [0.8, 1, 0.8] : [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: activeSection === section.id ? 1.5 : 2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
            {activeSection === section.id && (
              <motion.div
                className="absolute -inset-1 rounded-full border border-white/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              />
            )}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              {section.name}
            </div>
          </motion.button>
        ))}
      </nav>
    </>
  );
}

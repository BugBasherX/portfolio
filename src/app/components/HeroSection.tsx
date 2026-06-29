"use client";

import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { ChevronDown, Sparkles, Zap } from "lucide-react";
import { useEffect, useRef } from "react";
import { siteConfig } from "../config/siteConfig";
import logo from 'figma:asset/e9afabb7434f237f121fca51dffa09ee3fce323e.png';

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sectionRef = useRef<HTMLElement>(null);

  const springConfig = { damping: 25, stiffness: 400 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), springConfig);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(event.clientX - centerX);
        mouseY.set(event.clientY - centerY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      id="hero"
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(192, 192, 192, 0.02) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255, 215, 0, 0.01) 0%, transparent 50%),
          linear-gradient(135deg, #000000 0%, #1a1a1a 100%)
        `
      }}
    >
      {/* Advanced particle system */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              background: i % 3 === 0 ? 'rgba(255, 255, 255, 0.6)' : 
                         i % 3 === 1 ? 'rgba(192, 192, 192, 0.4)' : 
                         'rgba(255, 215, 0, 0.3)',
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -100, -200],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute inset-0 perspective-2000"
        style={{ rotateX, rotateY }}
      >
        {/* Large central crystal */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 preserve-3d"
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
            rotateZ: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl border border-white/30 glass-effect">
            <div className="absolute inset-2 bg-gradient-to-tl from-transparent to-white/10 rounded-lg" />
            <div className="absolute inset-4 bg-gradient-to-br from-white/5 to-transparent rounded-md animate-pulse-glow" />
          </div>
        </motion.div>

        {/* Floating platinum sphere */}
        <motion.div
          className="absolute top-2/3 right-1/4 w-24 h-24 preserve-3d"
          animate={{
            rotateY: [0, 360],
            y: [-20, 20, -20],
            z: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#e5e4e2] via-[#c0c0c0] to-[#808080] metallic-surface border border-white/20 glow-silver" />
        </motion.div>

        {/* Prismatic triangular elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute preserve-3d"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + Math.sin(i) * 20}%`,
            }}
            animate={{
              rotateX: [0, 360],
              rotateZ: [360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear",
            }}
          >
            <div 
              className="w-16 h-16 bg-gradient-to-br from-white/15 to-transparent border border-white/25 glass-effect"
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
            />
          </motion.div>
        ))}

        {/* Golden accent rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 border-2 border-[#ffd700]/30 rounded-full preserve-3d"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              marginLeft: `-${100 + i * 50}px`,
              marginTop: `-${100 + i * 50}px`,
            }}
            animate={{
              rotateX: [0, 360],
              rotateY: [360, 0],
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[#ffd700]/10 to-transparent animate-shimmer" />
          </motion.div>
        ))}
      </motion.div>

      {/* Main content - Using configuration */}
      <div className="relative z-10 text-center perspective-1000">
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        >
          {/* Logo above title */}
          <motion.div
            className="absolute -top-40 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            whileHover={{
              scale: 1.1,
              rotateY: 15,
              filter: "drop-shadow(0 0 40px rgba(255, 255, 255, 0.4))"
            }}
          >
            <img
              src={logo}
              alt="KONCEPT Logo"
              className="h-24 w-auto"
            />
          </motion.div>

          {/* Decorative elements around title */}
          <motion.div
            className="absolute -top-20 left-1/2 transform -translate-x-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-8 h-8 text-[#ffd700]" />
          </motion.div>

          <h1 className="text-8xl md:text-9xl lg:text-[14rem] font-black tracking-tighter text-glow-white mb-8 relative">
            <span className="bg-gradient-to-r from-white via-[#e5e4e2] to-[#c0c0c0] bg-clip-text text-transparent">
              {siteConfig.company.name.slice(0, 3)}
            </span>
            <span className="bg-gradient-to-r from-[#c0c0c0] via-[#ffd700] to-white bg-clip-text text-transparent">
              {siteConfig.company.name.slice(3)}
            </span>
            
            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-2 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"
              style={{ width: "80%" }}
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </h1>
        </motion.div>

        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <p className="text-2xl md:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            {siteConfig.company.tagline}
          </p>

          <motion.div
            className="flex items-center justify-center space-x-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <motion.button
              className="group relative px-12 py-6 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-full text-white text-lg transition-all duration-500 overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 40px rgba(255, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center space-x-3">
                <Zap className="w-6 h-6" />
                <span>Enter the Experience</span>
              </span>
              
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#ffd700]/20 to-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </motion.button>

            <motion.button
              className="px-8 py-6 border-2 border-white/30 rounded-full text-white/80 hover:text-white hover:border-[#ffd700]/50 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(255, 215, 0, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-4"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="text-white/40 text-sm uppercase tracking-widest"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to Explore
        </motion.div>
        <div className="relative">
          <ChevronDown className="w-8 h-8 text-white/60" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent to-[#ffd700]/50 rounded-full"
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-white/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-[#ffd700]/5 to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/3 to-transparent blur-3xl animate-pulse-glow" />
      </div>
    </section>
  );
}
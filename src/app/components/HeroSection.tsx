"use client";

import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { ChevronDown, Sparkles, Zap, ArrowRight } from "lucide-react";
import { useEffect, useRef, useMemo } from "react";
import { siteConfig } from "../config/siteConfig";
import logo from 'figma:asset/e9afabb7434f237f121fca51dffa09ee3fce323e.png';

const skillPills = [
  { label: "React.js", color: "#61DAFB" },
  { label: "Node.js", color: "#68A063" },
  { label: "TypeScript", color: "#3178C6" },
  { label: "Figma", color: "#F24E1E" },
  { label: "Python", color: "#FFD43B" },
  { label: "MongoDB", color: "#47A248" },
  { label: "Adobe Suite", color: "#FF0000" },
  { label: "UI/UX", color: "#ffd700" },
];

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sectionRef = useRef<HTMLElement>(null);

  const particles = useMemo(() =>
    [...Array(25)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 4 + 1}px`,
      height: `${Math.random() * 4 + 1}px`,
      colorType: i % 3,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
    })), []);

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
      {/* Particle system */}
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
              background: p.colorType === 0 ? 'rgba(255, 255, 255, 0.6)' :
                         p.colorType === 1 ? 'rgba(192, 192, 192, 0.4)' :
                         'rgba(255, 215, 0, 0.3)',
              willChange: "transform, opacity",
            }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: [0, -100, -200] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <motion.div className="absolute inset-0 perspective-2000" style={{ rotateX, rotateY }}>
        {/* Large central crystal */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-20 h-20 sm:w-32 sm:h-32 preserve-3d"
          animate={{ rotateX: [0, 360], rotateY: [0, 360], rotateZ: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl border border-white/30 glass-effect">
            <div className="absolute inset-2 bg-gradient-to-tl from-transparent to-white/10 rounded-lg" />
            <div className="absolute inset-4 bg-gradient-to-br from-white/5 to-transparent rounded-md animate-pulse-glow" />
          </div>
        </motion.div>

        {/* Floating platinum sphere */}
        <motion.div
          className="absolute top-2/3 right-1/4 w-16 h-16 sm:w-24 sm:h-24 preserve-3d"
          animate={{ rotateY: [0, 360], y: [-20, 20, -20], z: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#e5e4e2] via-[#c0c0c0] to-[#808080] metallic-surface border border-white/20 glow-silver" />
        </motion.div>

        {/* Prismatic triangular elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute preserve-3d hidden sm:block"
            style={{ left: `${20 + (i * 15)}%`, top: `${30 + Math.sin(i) * 20}%` }}
            animate={{ rotateX: [0, 360], rotateZ: [360, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 12 + i * 2, repeat: Infinity, delay: i * 0.5, ease: "linear" }}
          >
            <div
              className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-white/15 to-transparent border border-white/25 glass-effect"
              style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            />
          </motion.div>
        ))}

        {/* Golden accent rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 border-2 border-[#ffd700]/30 rounded-full preserve-3d"
            style={{
              width: `${150 + i * 80}px`,
              height: `${150 + i * 80}px`,
              marginLeft: `-${75 + i * 40}px`,
              marginTop: `-${75 + i * 40}px`,
            }}
            animate={{ rotateX: [0, 360], rotateY: [360, 0] }}
            transition={{ duration: 25 + i * 5, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[#ffd700]/10 to-transparent animate-shimmer" />
          </motion.div>
        ))}
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center perspective-1000 px-4 w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        >
          {/* Logo above title */}
          <motion.div
            className="absolute -top-24 sm:-top-32 md:-top-40 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.1, rotateY: 15, filter: "drop-shadow(0 0 40px rgba(255, 255, 255, 0.4))" }}
          >
            <img
              src={logo}
              alt={`${siteConfig.company.name} Logo`}
              className="h-14 sm:h-20 md:h-24 w-auto"
            />
          </motion.div>

          {/* Decorative sparkle */}
          <motion.div
            className="absolute -top-10 sm:-top-14 md:-top-20 left-1/2 transform -translate-x-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#ffd700]" />
          </motion.div>

          <h1 className="text-[3.25rem] xs:text-6xl sm:text-7xl md:text-9xl lg:text-[14rem] font-black tracking-tighter text-glow-white mb-4 sm:mb-6 relative leading-none" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="bg-gradient-to-r from-white via-[#e5e4e2] to-[#c0c0c0] bg-clip-text text-transparent">
              {siteConfig.company.name.slice(0, 3)}
            </span>
            <span className="bg-gradient-to-r from-[#c0c0c0] via-[#ffd700] to-white bg-clip-text text-transparent">
              {siteConfig.company.name.slice(3)}
            </span>
            <motion.div
              className="absolute -bottom-2 sm:-bottom-4 left-1/2 transform -translate-x-1/2 h-1 sm:h-2 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"
              style={{ width: "80%" }}
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </h1>
        </motion.div>

        <motion.div
          className="space-y-5 sm:space-y-7"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white/80 max-w-3xl mx-auto leading-relaxed px-2" style={{ fontFamily: 'var(--font-sans)' }}>
            {siteConfig.company.tagline}
          </p>

          {/* Skill pills */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            {skillPills.map((skill, i) => (
              <motion.span
                key={skill.label}
                className="px-3 py-1 text-xs sm:text-sm rounded-full border font-medium tracking-wide"
                style={{
                  borderColor: `${skill.color}40`,
                  color: skill.color,
                  backgroundColor: `${skill.color}10`,
                  fontFamily: 'var(--font-sans)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.6 + i * 0.06 }}
                whileHover={{ scale: 1.08, backgroundColor: `${skill.color}20` }}
              >
                {skill.label}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 pt-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.9 }}
          >
            {/* Primary CTA — gold gradient fill */}
            <motion.button
              className="group relative w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-full text-black text-base sm:text-lg font-semibold overflow-hidden shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%)',
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.25)',
                fontFamily: 'var(--font-sans)',
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(255, 215, 0, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Explore the portfolio"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <Zap className="w-5 h-5 sm:w-5 sm:h-5" />
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-white/30"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </motion.button>

            {/* Secondary CTA — outlined */}
            <motion.button
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border border-white/30 rounded-full text-white/80 hover:text-white hover:border-white/60 transition-all duration-300 text-base sm:text-lg font-medium backdrop-blur-sm"
              style={{
                fontFamily: 'var(--font-sans)',
                backgroundColor: 'rgba(255,255,255,0.04)',
              }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Learn more about Yubraj Kurmi"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              About Me
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator — mouse icon style */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-3"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="text-white/40 text-xs sm:text-sm uppercase tracking-widest"
          style={{ fontFamily: 'var(--font-sans)' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to Explore
        </motion.div>
        {/* Mouse icon */}
        <div className="relative w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-1.5">
          <motion.div
            className="w-1.5 h-3 bg-gradient-to-b from-[#ffd700] to-transparent rounded-full"
            animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -inset-1 rounded-full border border-[#ffd700]/20"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </div>
        <ChevronDown className="w-4 h-4 text-white/30" />
      </motion.div>

      {/* Ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-radial from-white/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-radial from-[#ffd700]/5 to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-gradient-radial from-white/3 to-transparent blur-3xl animate-pulse-glow" />
      </div>
    </section>
  );
}

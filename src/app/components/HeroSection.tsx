"use client";

import { motion } from "motion/react";
import { ChevronDown, Zap, ArrowRight } from "lucide-react";
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
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-20 px-4 sm:px-6"
      style={{
        background: `
          radial-gradient(circle at 10% 20%, rgba(255, 215, 0, 0.02) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 40%),
          #000000
        `
      }}
    >
      {/* Editorial Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto space-y-8 sm:space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Logo container */}
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt={`${siteConfig.company.name} Logo`}
              className="h-16 sm:h-20 w-auto"
            />
          </div>

          {/* Visionary Headline */}
          <h1 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="bg-gradient-to-r from-white via-[#e5e4e2] to-[#c0c0c0] bg-clip-text text-transparent">
              {siteConfig.company.name.slice(0, 3)}
            </span>
            <span className="bg-gradient-to-r from-[#c0c0c0] via-[#ffd700] to-white bg-clip-text text-transparent">
              {siteConfig.company.name.slice(3)}
            </span>
          </h1>

          <div className="w-32 h-1 bg-gradient-to-r from-[#ffd700] via-white to-transparent mx-auto rounded-full" />
        </motion.div>

        {/* Tagline & Vision */}
        <motion.div
          className="space-y-6 sm:space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <p className="text-lg sm:text-2xl md:text-3xl text-white/80 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
            {siteConfig.company.tagline}
          </p>

          <p className="text-sm sm:text-base text-white/50 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
            {siteConfig.company.description}
          </p>

          {/* Skill Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto pt-2">
            {skillPills.map((skill) => (
              <span
                key={skill.label}
                className="px-3.5 py-1 text-xs sm:text-sm rounded-full border tracking-wide transition-all duration-300 hover:bg-white/5"
                style={{
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: 'rgba(255,255,255,0.02)'
                }}
              >
                {skill.label}
              </span>
            ))}
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              className="group relative w-full sm:w-auto px-10 py-4 sm:py-4.5 rounded-full text-black text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                boxShadow: '0 0 25px rgba(255, 215, 0, 0.2)',
                fontFamily: 'var(--font-sans)',
              }}
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="flex items-center justify-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>View Portfolio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            <button
              className="w-full sm:w-auto px-10 py-4 sm:py-4.5 border border-white/10 rounded-full text-white/80 hover:text-white hover:border-white/30 transition-all duration-300 text-sm sm:text-base font-semibold backdrop-blur-sm"
              style={{
                fontFamily: 'var(--font-sans)',
                backgroundColor: 'rgba(255,255,255,0.03)',
              }}
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              About Me
            </button>
          </div>
        </motion.div>
      </div>

      {/* Static scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none opacity-40">
        <span className="text-white/60 text-[10px] sm:text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-sans)' }}>
          Scroll to Explore
        </span>
        <ChevronDown className="w-4 h-4 text-white" />
      </div>
    </section>
  );
}

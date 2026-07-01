"use client";

import { motion } from "motion/react";
import { Palette, Code, Zap, Globe, Eye, Diamond } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

const iconSequence = [Code, Eye, Palette, Globe, Zap, Diamond];

function ServiceCard({ service, index }: { service: any, index: number }) {
  const IconComponent = iconSequence[index % iconSequence.length];

  return (
    <motion.div
      className="group relative rounded-2xl border p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: 'rgba(255,255,255,0.08)',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.4) 100%)',
      }}
      whileHover={{
        borderColor: `${service.accent}40`,
        boxShadow: `0 10px 30px ${service.accent}05`
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      <div className="space-y-6">
        {/* Icon Container */}
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center relative overflow-hidden"
          style={{ backgroundColor: `${service.accent}12` }}
        >
          <IconComponent 
            className="w-7 h-7"
            style={{ color: service.accent }}
          />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-glow-white transition-all duration-300" style={{ fontFamily: 'var(--font-display)' }}>
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-white/60 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
          {service.description}
        </p>
      </div>

      {/* Decorative colored dot in corner */}
      <div className="mt-8 flex justify-end">
        <div 
          className="w-2 h-2 rounded-full" 
          style={{ 
            backgroundColor: service.accent,
            boxShadow: `0 0 8px ${service.accent}` 
          }} 
        />
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section
      id="services"
      className="min-h-screen py-20 sm:py-32 px-4 sm:px-6 bg-black relative"
      style={{
        background: `
          radial-gradient(circle at 25% 75%, rgba(192, 192, 192, 0.02) 0%, transparent 50%),
          #000000
        `
      }}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Section badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-white/10 bg-white/2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="text-white/70 text-xs font-semibold uppercase tracking-widest" style={{ fontFamily: 'var(--font-sans)' }}>
              Services
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-none" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="text-white">What I</span>
            <br />
            <span className="bg-gradient-to-r from-white via-[#c0c0c0] to-[#ffd700] bg-clip-text text-transparent">
              Offer
            </span>
          </h2>

          <div className="w-32 h-1 bg-gradient-to-r from-[#ffd700] via-white to-transparent mx-auto rounded-full" />
          
          <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
            Delivering <span className="text-[#ffd700]">full-stack solutions</span> and{" "}
            <span className="text-white">creative design</span> from Nepal to the world
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {siteConfig.services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

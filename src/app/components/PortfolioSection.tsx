"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Globe } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

function ProjectCard({ project, index }: { project: any, index: number }) {
  const accentColor =
    project.accent === "#c0c0c0" ? "#c0c0c0" :
    project.accent === "#ffd700" ? "#ffd700" :
    "#ffffff";

  const handleCardClick = () => {
    if (project.projectUrl) {
      window.open(project.projectUrl, '_blank');
    }
  };

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl cursor-pointer border flex flex-col justify-between"
      style={{ 
        borderColor: 'rgba(255,255,255,0.08)',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.4) 100%)' 
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      onClick={handleCardClick}
      whileHover={{ y: -6, borderColor: `${accentColor}30` }}
    >
      {/* Visual Thumbnail */}
      <div className="relative h-56 sm:h-64 overflow-hidden bg-black/20 border-b border-white/5">
        {project.thumbnailUrl ? (
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${accentColor}10 0%, transparent 60%)`
            }}
          />
        )}

        {/* Clean static category badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white/90 text-xs border border-white/10 font-medium">
          {project.category}
        </div>
      </div>

      {/* Info Body */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Header row */}
          <div className="flex items-center justify-between text-xs text-white/40">
            <span className="uppercase tracking-widest">{project.category}</span>
            <span>{project.year}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white group-hover:text-[#ffd700] transition-colors duration-300" style={{ fontFamily: 'var(--font-display)' }}>
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/60 leading-relaxed line-clamp-3" style={{ fontFamily: 'var(--font-sans)' }}>
            {project.description}
          </p>
        </div>

        {/* Technologies & CTA Link */}
        <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies?.slice(0, 3).map((tech: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] sm:text-xs rounded-full border border-white/5 text-white/40 bg-white/2"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div 
            className="flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider group-hover:translate-x-0.5 transition-transform duration-300"
            style={{ color: accentColor, fontFamily: 'var(--font-sans)' }}
          >
            <span>View Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="min-h-screen py-20 sm:py-32 bg-black relative"
      style={{
        background: `
          radial-gradient(circle at 75% 75%, rgba(255, 215, 0, 0.02) 0%, transparent 50%),
          #000000
        `
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        
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
              Portfolio
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-none" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="text-white">Selected</span>
            <br />
            <span className="bg-gradient-to-r from-white via-[#c0c0c0] to-[#ffd700] bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <div className="w-32 h-1 bg-gradient-to-r from-[#ffd700] via-white to-transparent mx-auto rounded-full" />

          <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
            A curated showcase of <span className="text-[#ffd700]">web applications</span> and <span className="text-white">digital designs</span>
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteConfig.portfolio.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Visionary start request CTA */}
        <motion.div
          className="text-center pt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <button
            className="group relative px-10 py-4.5 rounded-full text-black font-semibold overflow-hidden text-sm sm:text-base transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
              boxShadow: '0 0 25px rgba(255, 215, 0, 0.2)',
              fontFamily: 'var(--font-sans)',
            }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}

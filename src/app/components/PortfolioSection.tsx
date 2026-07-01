"use client";

import { motion, AnimatePresence } from "motion/react";
import { useRef, useState, useMemo, useEffect } from "react";
import { ExternalLink, Play, X, Youtube, ArrowUpRight, Eye } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

// Video Player Modal Component
function VideoModal({ videoId, title, onClose }: { videoId: string; title: string; onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Video: ${title}`}
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          aria-label="Close video"
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors duration-300"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </motion.button>
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onVideoClick }: { project: any, index: number, onVideoClick?: (videoId: string, title: string) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const isVideo = project.type === 'video';

  const handleClick = () => {
    if (isVideo && onVideoClick && project.videoId) {
      onVideoClick(project.videoId, project.title);
    } else if (project.projectUrl) {
      window.open(project.projectUrl, '_blank');
    }
  };

  const accentColor =
    project.accent === "#c0c0c0" ? "#c0c0c0" :
    project.accent === "#ffd700" ? "#ffd700" :
    "#ffffff";

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      style={{ border: `1px solid rgba(255,255,255,0.08)` }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ y: -6, borderColor: `${accentColor}30` }}
    >
      {/* Thumbnail */}
      <div className="relative h-52 sm:h-60 overflow-hidden bg-black/40">
        {project.thumbnailUrl ? (
          <>
            <motion.img
              src={project.thumbnailUrl}
              alt={`${project.title} screenshot`}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.07 : 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          </>
        ) : (
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, ${accentColor}15 0%, transparent 50%),
                radial-gradient(circle at 70% 70%, ${accentColor}10 0%, transparent 50%)
              `
            }}
          />
        )}

        {/* Hover reveal overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
        >
          <motion.div
            className="w-14 h-14 rounded-full border-2 flex items-center justify-center backdrop-blur-sm"
            style={{ borderColor: accentColor }}
            animate={{ scale: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {isVideo
              ? <Play className="w-6 h-6 ml-1" style={{ color: accentColor }} />
              : <Eye className="w-6 h-6" style={{ color: accentColor }} />
            }
          </motion.div>
        </motion.div>

        {/* Video badge */}
        {isVideo && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-red-600/90 backdrop-blur-sm rounded-full text-white text-xs font-semibold flex items-center space-x-1">
            <Youtube className="w-3 h-3" />
            <span>VIDEO</span>
          </div>
        )}

        {/* Accent dot */}
        <div
          className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
        />
      </div>

      {/* Card body */}
      <div className="p-5 sm:p-6 space-y-3" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(0,0,0,0.4))' }}>
        {/* Category + year */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest" style={{ color: accentColor, fontFamily: 'var(--font-sans)' }}>
            {project.category}
          </span>
          <span className="text-xs text-white/30" style={{ fontFamily: 'var(--font-sans)' }}>
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-glow-white transition-all duration-300 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/60 leading-relaxed line-clamp-2" style={{ fontFamily: 'var(--font-sans)' }}>
          {project.description}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-3 border-t border-white/8">
          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies?.slice(0, 3).map((tech: string, i: number) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[10px] rounded-full border text-white/50"
                style={{ borderColor: 'rgba(255,255,255,0.1)', fontFamily: 'var(--font-sans)' }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="flex items-center space-x-1 text-xs font-medium flex-shrink-0"
            style={{ color: accentColor, fontFamily: 'var(--font-sans)' }}
            animate={{ x: isHovered ? 3 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <span>{isVideo ? 'Watch' : 'View'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.div>
        </div>
      </div>

      {/* Bottom accent glow on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)` }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export function PortfolioSection() {
  const sectionRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState<{ videoId: string; title: string } | null>(null);

  const bgParticles = useMemo(() =>
    [...Array(8)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 100 + 50}px`,
      height: `${Math.random() * 100 + 50}px`,
      colorIndex: i % 3,
      duration: 6 + Math.random() * 4,
      delay: Math.random() * 3,
    })), []);

  const handleVideoClick = (videoId: string, title: string) => {
    setSelectedVideo({ videoId, title });
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="min-h-screen py-20 sm:py-32 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(255, 215, 0, 0.02) 0%, transparent 50%),
          linear-gradient(135deg, #1a1a1a 0%, #000000 50%, #1a1a1a 100%)
        `
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        {bgParticles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              left: p.left,
              top: p.top,
              width: p.width,
              height: p.height,
              background: p.colorIndex === 0 ?
                "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)" :
                p.colorIndex === 1 ?
                "radial-gradient(circle, rgba(192,192,192,0.1) 0%, transparent 70%)" :
                "radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)",
              willChange: "transform, opacity",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Section badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
            <span className="text-white/70 text-xs font-semibold uppercase tracking-widest" style={{ fontFamily: 'var(--font-sans)' }}>
              Portfolio
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-none mb-6 sm:mb-8">
            <span className="text-white">Selected</span>
            <br />
            <span className="bg-gradient-to-r from-white via-[#c0c0c0] to-[#ffd700] bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <div className="w-32 h-1 bg-gradient-to-r from-[#ffd700] via-white to-transparent mx-auto mb-6 sm:mb-8 rounded-full" />

          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed px-2" style={{ fontFamily: 'var(--font-sans)' }}>
            A curated collection of my{" "}
            <span className="text-[#ffd700]">web development</span> and{" "}
            <span className="text-white">graphic design</span> work
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8">
          {siteConfig.portfolio.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onVideoClick={handleVideoClick}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-white/40 text-sm mb-6" style={{ fontFamily: 'var(--font-sans)' }}>
            Interested in working together?
          </p>
          <motion.button
            className="group relative px-8 sm:px-12 py-4 sm:py-5 rounded-full text-black font-semibold overflow-hidden text-sm sm:text-base"
            style={{
              background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
              fontFamily: 'var(--font-sans)',
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 215, 0, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            videoId={selectedVideo.videoId}
            title={selectedVideo.title}
            onClose={closeVideoModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

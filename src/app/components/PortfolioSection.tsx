"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ExternalLink, Play, Star, Eye, X, Youtube } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

// Video Player Modal Component
function VideoModal({ videoId, title, onClose }: { videoId: string; title: string; onClose: () => void }) {
  return (
    <motion.div
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
        {/* Close button */}
        <motion.button
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors duration-300"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5" />
        </motion.button>

        {/* YouTube embed */}
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

  const gradient = isVideo ? 
    project.accent === "#ffffff" ? "from-white/20 to-white/5" :
    project.accent === "#c0c0c0" ? "from-[#c0c0c0]/20 to-[#c0c0c0]/5" :
    "from-[#ffd700]/20 to-[#ffd700]/5" :
    "from-white/20 to-white/5";

  return (
    <motion.div
      className="relative flex-shrink-0 w-[450px] h-[550px] perspective-1000"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d group cursor-pointer"
        whileHover={{ 
          rotateX: 5,
          rotateY: 10,
          z: 50,
          transition: { duration: 0.4 }
        }}
        onClick={handleClick}
      >
        {/* Main project card */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden backface-hidden`}>
          
          {/* Project preview area */}
          <div className="relative h-64 bg-black/30 overflow-hidden">
            {isVideo && project.thumbnailUrl ? (
              // Video thumbnail
              <div className="absolute inset-0">
                <img 
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ) : (
              // Animated preview background for non-video projects
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, ${project.accent}15 0%, transparent 50%),
                    radial-gradient(circle at 70% 70%, ${project.accent}10 0%, transparent 50%),
                    linear-gradient(45deg, transparent 40%, ${project.accent}05 50%, transparent 60%)
                  `
                }}
                animate={{
                  backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : ["0% 0%", "0% 0%"],
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            )}

            {/* Floating geometric shapes for non-video projects */}
            {!isVideo && [...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full opacity-20"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${30 + Math.sin(i) * 20}%`,
                  width: `${10 + Math.random() * 20}px`,
                  height: `${10 + Math.random() * 20}px`,
                  backgroundColor: project.accent,
                }}
                animate={{
                  y: isHovered ? [0, -20, 0] : [0, 0, 0],
                  opacity: isHovered ? [0.2, 0.6, 0.2] : [0.2, 0.2, 0.2],
                  scale: isHovered ? [1, 1.2, 1] : [1, 1, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}

            {/* Play button overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                opacity: isHovered ? 1 : 0.8,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={`w-20 h-20 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center ${
                  isVideo ? 'bg-red-600/80 hover:bg-red-600' : 'bg-white/10'
                }`}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: isVideo ? '#dc2626' : `${project.accent}20`
                }}
              >
                {isVideo ? (
                  <Youtube className="w-10 h-10 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </motion.div>
            </motion.div>

            {/* Video indicator */}
            {isVideo && (
              <div className="absolute top-6 left-6 px-3 py-1 bg-red-600 rounded-full text-white text-xs font-semibold flex items-center space-x-1">
                <Youtube className="w-3 h-3" />
                <span>VIDEO</span>
              </div>
            )}

            {/* Corner accent */}
            <div 
              className="absolute top-6 right-6 w-3 h-3 rounded-full opacity-60"
              style={{ backgroundColor: project.accent }}
            />
          </div>

          {/* Project info */}
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-2xl font-black text-white group-hover:text-glow-white transition-all duration-300">
                    {project.title}
                  </h3>
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: project.accent }}
                  />
                </div>
                
                <p className="text-sm text-white/60 uppercase tracking-wider mb-4">
                  {project.category} • {project.year}
                </p>
                
                <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {project.description}
                </p>
              </div>

              <motion.div
                className="ml-4"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                {isVideo ? (
                  <Youtube className="w-6 h-6 text-white/40 group-hover:text-red-500 transition-colors duration-300" />
                ) : (
                  <ExternalLink className="w-6 h-6 text-white/40 group-hover:text-white transition-colors duration-300" />
                )}
              </motion.div>
            </div>

            {/* Bottom row with technologies and action button */}
            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <div className="flex items-center space-x-2">
                {project.technologies?.slice(0, 3).map((tech: string, i: number) => (
                  <span 
                    key={i}
                    className="px-2 py-1 text-xs bg-white/10 text-white/70 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <motion.div
                className="px-4 py-2 rounded-full text-xs uppercase tracking-wider border"
                style={{ 
                  borderColor: `${project.accent}30`,
                  backgroundColor: `${project.accent}10`,
                  color: project.accent
                }}
                whileHover={{
                  backgroundColor: `${project.accent}20`,
                  borderColor: `${project.accent}50`,
                }}
              >
                {isVideo ? 'Watch Video' : 'View Details'}
              </motion.div>
            </div>
          </div>

          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl -z-10"
            style={{ 
              background: `linear-gradient(135deg, ${project.accent}20, transparent)`,
            }}
          />
        </div>

        {/* Card shadow */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-2xl -z-20"
          style={{ 
            backgroundColor: `${project.accent}30`,
            transform: "translateY(30px) scale(0.9)" 
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export function PortfolioSection() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState<{ videoId: string; title: string } | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -400]);

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
      className="min-h-screen py-32 relative overflow-hidden"
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
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              background: i % 3 === 0 ? 
                "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)" :
                i % 3 === 1 ?
                "radial-gradient(circle, rgba(192,192,192,0.1) 0%, transparent 70%)" :
                "radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl lg:text-8xl font-black leading-none mb-8">
            <span className="text-white">Our</span>
            <br />
            <span className="bg-gradient-to-r from-white via-[#c0c0c0] to-[#ffd700] bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>

          <div className="w-32 h-1 bg-gradient-to-r from-[#ffd700] via-white to-transparent mx-auto mb-8" />
          
          <p className="text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            Showcasing our most <span className="text-[#ffd700]">creative video content</span> and 
            <span className="text-white"> innovative digital experiences</span>
          </p>
        </motion.div>
      </div>

      {/* Horizontal scrolling portfolio */}
      <div className="relative">
        <motion.div 
          ref={scrollRef}
          className="flex space-x-8 px-6"
          style={{ x }}
        >
          {siteConfig.portfolio.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              onVideoClick={handleVideoClick}
            />
          ))}
        </motion.div>

        {/* Scroll indicators */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-white/40 text-sm uppercase tracking-wider mb-4">
            Scroll to explore our creative universe
          </p>
          <div className="flex justify-center space-x-2">
            {siteConfig.portfolio.map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-white/20"
                animate={{
                  backgroundColor: i % 3 === 0 ? "#ffffff40" : i % 3 === 1 ? "#c0c0c040" : "#ffd70040",
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          videoId={selectedVideo.videoId}
          title={selectedVideo.title}
          onClose={closeVideoModal}
        />
      )}
    </section>
  );
}
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Palette, Code, Zap, Globe, Eye, Diamond, Sparkles } from "lucide-react";
import { useRef } from "react";
import { siteConfig } from "../config/siteConfig";

const iconSequence = [Code, Eye, Palette, Globe, Zap, Diamond];
const gradientMap: Record<string, string> = {
  "#ffffff": "from-white/20 to-white/5",
  "#c0c0c0": "from-[#c0c0c0]/20 to-[#c0c0c0]/5",
  "#ffd700": "from-[#ffd700]/20 to-[#ffd700]/5",
};

const services = siteConfig.services.map((s, i) => ({
  icon: iconSequence[i % iconSequence.length],
  title: s.title,
  description: s.description,
  accent: s.accent,
  gradient: gradientMap[s.accent] ?? "from-white/20 to-white/5",
}));

function ServiceCard({ service, index }: { service: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [15, -15]), { damping: 20, stiffness: 300 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-15, 15]), { damping: 20, stiffness: 300 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(event.clientX - centerX);
      mouseY.set(event.clientY - centerY);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative perspective-1000"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative h-80 sm:h-96 preserve-3d cursor-pointer"
        style={{ rotateX, rotateY }}
        whileHover={{ 
          z: 50,
          transition: { duration: 0.3 }
        }}
      >
        {/* Main card */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between backface-hidden overflow-hidden`}>
          
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 20% 20%, ${service.accent}40 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${service.accent}20 0%, transparent 50%)`
            }} />
          </div>

          {/* Top section */}
          <div className="relative z-10">
            <motion.div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 relative overflow-hidden"
              style={{ backgroundColor: `${service.accent}15` }}
              whileHover={{ 
                scale: 1.1,
                rotateY: 180,
                transition: { duration: 0.6 }
              }}
            >
              <service.icon 
                className="w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300 group-hover:scale-110"
                style={{ color: service.accent }}
              />
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                style={{ backgroundColor: `${service.accent}20` }}
              />
            </motion.div>

            <h3 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 group-hover:text-glow-white transition-all duration-300">
              {service.title}
            </h3>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
              {service.description}
            </p>
          </div>

          {/* Bottom decorative elements */}
          <div className="relative z-10 flex justify-between items-end">
            <motion.div
              className="w-8 h-8 rounded-full border-2 opacity-40 group-hover:opacity-100 transition-opacity duration-300"
              style={{ borderColor: service.accent }}
              whileHover={{ scale: 1.2, rotate: 180 }}
            >
              <div 
                className="w-full h-full rounded-full opacity-20"
                style={{ backgroundColor: service.accent }}
              />
            </motion.div>

            <motion.div
              className="flex space-x-1"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-12 rounded-full"
                  style={{ backgroundColor: `${service.accent}40` }}
                  animate={{
                    height: [12, 24, 12],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Hover effect overlay */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${service.accent}10, transparent, ${service.accent}05)`,
            }}
          />

          {/* Animated particles on hover */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-100"
                style={{
                  backgroundColor: service.accent,
                  left: `${20 + i * 15}%`,
                  top: `${30 + Math.sin(i) * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        </div>

        {/* Card shadow */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-2xl -z-10"
          style={{ 
            backgroundColor: `${service.accent}20`,
            transform: "translateY(20px) scale(0.9)" 
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="min-h-screen py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#000000] to-[#1a1a1a]">
      {/* Background elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor: i % 3 === 0 ? "#ffffff40" : i % 3 === 1 ? "#c0c0c040" : "#ffd70040",
              willChange: "transform, opacity",
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center justify-center mb-4 sm:mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-[#ffd700]" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-none mb-6 sm:mb-8">
            <span className="text-white">Our</span>
            <br />
            <span className="bg-gradient-to-r from-white via-[#c0c0c0] to-[#ffd700] bg-clip-text text-transparent">
              Services
            </span>
          </h2>

          <div className="w-32 h-1 bg-gradient-to-r from-[#ffd700] via-white to-transparent mx-auto mb-6 sm:mb-8" />
          
          <p className="text-base sm:text-lg md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed px-2">
            Delivering <span className="text-[#ffd700]">full-stack solutions</span> and 
            <span className="text-white"> creative design</span> from Nepal to the world
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12 sm:mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="group relative w-full sm:w-auto px-8 sm:px-16 py-4 sm:py-6 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-full text-white text-base sm:text-xl overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 50px rgba(255, 255, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10 flex items-center justify-center space-x-3 sm:space-x-4">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Let's Work Together</span>
            </span>
            
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#ffd700]/20 via-white/20 to-[#c0c0c0]/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

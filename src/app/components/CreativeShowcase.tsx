"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useRef, useEffect, useMemo } from "react";
import { Sparkles, Zap, Diamond } from "lucide-react";

export function CreativeShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const particles = useMemo(() =>
    [...Array(15)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 6 + 2}px`,
      height: `${Math.random() * 6 + 2}px`,
      colorIndex: i % 4,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
    })), []);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -720]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1.3, 1.3, 0.6]);

  const springConfig = { damping: 15, stiffness: 300 };
  const rotateXSpring = useSpring(useTransform(mouseY, [-400, 400], [20, -20]), springConfig);
  const rotateYSpring = useSpring(useTransform(mouseX, [-400, 400], [-20, 20]), springConfig);

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
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-32 px-6 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 60%),
          radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.02) 0%, transparent 60%),
          radial-gradient(circle at 50% 50%, rgba(192, 192, 192, 0.01) 0%, transparent 70%),
          linear-gradient(135deg, #000000 0%, #1a1a1a 30%, #2c2c2c 50%, #1a1a1a 70%, #000000 100%)
        `
      }}
    >
      {/* Advanced particle system */}
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
              background: p.colorIndex === 0 ? 
                "linear-gradient(45deg, #ffffff, #e5e4e2)" :
                p.colorIndex === 1 ?
                "linear-gradient(45deg, #ffd700, #ffed4e)" :
                p.colorIndex === 2 ?
                "linear-gradient(45deg, #c0c0c0, #a8a8a8)" :
                "linear-gradient(45deg, #ffffff, #ffd700)",
              willChange: "transform, opacity",
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [0.5, 2, 0.5],
              y: [0, -150, -300],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div
            className="flex items-center justify-center mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <Diamond className="w-16 h-16 text-[#ffd700]" />
          </motion.div>

          <h2 className="text-6xl lg:text-8xl font-black leading-none mb-8">
            <span className="text-white">Creative</span>
            <br />
            <span className="bg-gradient-to-r from-white via-[#c0c0c0] to-[#ffd700] bg-clip-text text-transparent">
              Showcase
            </span>
          </h2>

          <div className="w-40 h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent mx-auto mb-8" />
          
          <p className="text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            Experience the <span className="text-[#ffd700]">intersection of art and technology</span> through my 
            <span className="text-white"> interactive installations</span>
          </p>
        </motion.div>

        {/* Central Interactive 3D Element */}
        <motion.div
          className="relative perspective-2000 flex items-center justify-center"
          style={{ 
            rotateX: rotateXSpring,
            rotateY: rotateYSpring,
          }}
        >
          <motion.div
            className="relative w-[500px] h-[500px] preserve-3d"
            style={{ 
              rotateX,
              rotateY,
              scale,
            }}
          >
            {/* Multi-layered geometric structure */}
            
            {/* Outer crystalline shell */}
            <motion.div
              className="absolute inset-0 preserve-3d"
              animate={{
                rotateZ: [0, 360],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-8 preserve-3d border border-white/20"
                  style={{ 
                    rotateZ: rotation,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,215,0,0.05) 100%)",
                    clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                  }}
                  animate={{
                    rotateX: [0, 360],
                  }}
                  transition={{
                    duration: 20 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Middle prismatic layer */}
            <motion.div
              className="absolute inset-12 preserve-3d"
              animate={{
                rotateY: [0, 360],
                rotateX: [0, 360],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-20 h-20 preserve-3d"
                  style={{
                    left: "50%",
                    top: "50%",
                    marginLeft: "-40px",
                    marginTop: "-40px",
                    rotateY: i * 30,
                    transformOrigin: "center center 100px",
                  }}
                  animate={{
                    rotateZ: [0, 360],
                  }}
                  transition={{
                    duration: 15 + i,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div 
                    className="w-full h-full bg-gradient-to-br from-white/15 to-[#ffd700]/10 border border-white/25 glass-effect"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    }}
                  >
                    <div className="absolute inset-2 bg-gradient-to-tl from-transparent to-white/10 rounded-sm" />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Inner core sphere */}
            <motion.div
              className="absolute inset-32 preserve-3d"
              animate={{
                rotateX: [0, 360],
                rotateY: [360, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#ffd700]/30 via-white/20 to-[#c0c0c0]/10 border border-[#ffd700]/40 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <div className="absolute inset-4 rounded-full bg-gradient-radial from-[#ffd700]/20 to-transparent animate-pulse-glow" />
              </div>
            </motion.div>

            {/* Orbiting satellites */}
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 preserve-3d"
                style={{
                  left: "50%",
                  top: "50%",
                  marginLeft: "-8px",
                  marginTop: "-8px",
                  transformOrigin: `${120 + i * 15}px center`,
                }}
                animate={{
                  rotateY: [0, 360],
                  rotateZ: [360, 0],
                }}
                transition={{
                  duration: 8 + i * 0.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div 
                  className="w-full h-full rounded-full"
                  style={{
                    background: i % 3 === 0 ? 
                      "linear-gradient(45deg, #ffd700, #ffed4e)" :
                      i % 3 === 1 ?
                      "linear-gradient(45deg, #ffffff, #e5e4e2)" :
                      "linear-gradient(45deg, #c0c0c0, #a8a8a8)",
                    boxShadow: `0 0 10px ${i % 3 === 0 ? "#ffd700" : i % 3 === 1 ? "#ffffff" : "#c0c0c0"}40`,
                  }}
                />
              </motion.div>
            ))}

            {/* Energy rings */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border-2 rounded-full preserve-3d"
                style={{
                  left: "50%",
                  top: "50%",
                  width: `${300 + i * 60}px`,
                  height: `${300 + i * 60}px`,
                  marginLeft: `-${150 + i * 30}px`,
                  marginTop: `-${150 + i * 30}px`,
                  borderColor: i % 2 === 0 ? "#ffffff20" : "#ffd70020",
                }}
                animate={{
                  rotateX: [0, 360],
                  rotateY: [360, 0],
                  rotateZ: [0, 360],
                }}
                transition={{
                  duration: 30 + i * 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(transparent, ${i % 2 === 0 ? "#ffffff" : "#ffd700"}30, transparent)`,
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Surrounding light beams */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 bg-gradient-to-t from-transparent via-white/20 to-transparent"
              style={{
                height: "300px",
                left: "50%",
                top: "50%",
                transformOrigin: "center -150px",
                rotate: i * 30,
              }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
                scaleY: [0.8, 1.5, 0.8],
                scaleX: [0.5, 2, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Massive glow effect */}
          <div className="absolute inset-0 bg-gradient-radial from-white/10 via-[#ffd700]/5 to-transparent rounded-full blur-3xl scale-[2]" />
          <div className="absolute inset-0 bg-gradient-radial from-[#ffd700]/10 via-white/5 to-transparent rounded-full blur-2xl scale-150 animate-pulse-glow" />
        </motion.div>

        {/* Interactive instructions and CTA */}
        <motion.div
          className="mt-20 space-y-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-white/50 text-lg uppercase tracking-wider">
            Move your mouse to control the universe
          </p>
          
          <motion.div
            className="flex items-center justify-center space-x-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="group relative px-12 py-6 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-full text-white text-xl overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 60px rgba(255, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="View my work"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10 flex items-center space-x-4">
                <Sparkles className="w-6 h-6" />
                <span>Experience Magic</span>
              </span>
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#ffd700]/20 via-white/20 to-[#c0c0c0]/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </motion.button>

            <motion.button
              className="px-8 py-6 border-2 border-[#ffd700]/30 rounded-full text-[#ffd700] hover:text-white hover:border-white/50 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0 0 30px rgba(255, 215, 0, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Contact me"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Zap className="w-6 h-6" aria-hidden="true" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
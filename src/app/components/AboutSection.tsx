"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Award, Users, Lightbulb, Target } from "lucide-react";

export function AboutSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1.1, 1.1, 0.8]);

  const stats = [
    { icon: Award, value: "150+", label: "Awards Won", color: "#ffd700" },
    { icon: Users, value: "500+", label: "Happy Clients", color: "#ffffff" },
    { icon: Lightbulb, value: "1000+", label: "Ideas Realized", color: "#c0c0c0" },
    { icon: Target, value: "99%", label: "Success Rate", color: "#ffd700" },
  ];

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-32 px-6 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 25% 75%, rgba(255, 215, 0, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
          linear-gradient(135deg, #1a1a1a 0%, #000000 50%, #1a1a1a 100%)
        `
      }}
    >
      {/* Floating background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              background: i % 2 === 0 ? 
                "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)" :
                "radial-gradient(circle, rgba(255,215,0,0.05) 0%, transparent 70%)",
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Content side */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl lg:text-8xl font-black leading-none mb-8">
              <span className="text-white">About</span>
              <br />
              <span className="bg-gradient-to-r from-white via-[#c0c0c0] to-[#ffd700] bg-clip-text text-transparent">
                KONCEPT
              </span>
            </h2>
            
            <div className="w-24 h-1 bg-gradient-to-r from-[#ffd700] to-transparent mb-8" />
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-xl text-white/80 leading-relaxed">
              We are <span className="text-[#ffd700]">visionaries</span> who transform the impossible into reality. 
              Our journey began with a simple belief: that creativity combined with cutting-edge technology 
              can reshape entire industries.
            </p>

            <p className="text-xl text-white/70 leading-relaxed">
              Every project is a <span className="text-white glow-white">masterpiece</span> in the making. 
              We don't just build applications—we craft experiences that transcend expectations and 
              redefine what's possible in the digital realm.
            </p>

            <p className="text-xl text-white/70 leading-relaxed">
              From <span className="text-[#c0c0c0]">concept to creation</span>, we are your partners in innovation, 
              pushing boundaries and setting new standards for excellence in every pixel, every interaction, 
              and every moment of user delight.
            </p>
          </motion.div>

          {/* Statistics */}
          <motion.div
            className="grid grid-cols-2 gap-8 pt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group text-center p-6 rounded-2xl glass-effect border border-white/10"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `0 0 30px ${stat.color}30`
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <stat.icon 
                  className="w-8 h-8 mx-auto mb-3 transition-colors duration-300"
                  style={{ color: stat.color }}
                />
                <div className="text-3xl font-black mb-2" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* 3D Visual Element */}
        <motion.div
          className="relative flex items-center justify-center perspective-2000"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Central rotating structure */}
          <motion.div
            className="relative w-96 h-96 preserve-3d"
            style={{ rotateY, rotateX, scale }}
          >
            {/* Main crystalline structure */}
            <div className="absolute inset-8 preserve-3d">
              {/* Multiple faces of the crystal */}
              {[0, 60, 120, 180, 240, 300].map((rotation, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 preserve-3d"
                  style={{ rotateY: rotation }}
                  animate={{
                    rotateZ: [0, 360],
                  }}
                  transition={{
                    duration: 15 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent border border-white/20 glass-effect"
                    style={{
                      transform: `translateZ(${60 + i * 10}px)`,
                      clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Orbiting elements */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-6 h-6 rounded-full preserve-3d"
                style={{
                  background: i % 3 === 0 ? 
                    "linear-gradient(45deg, #ffd700, #ffed4e)" :
                    i % 3 === 1 ?
                    "linear-gradient(45deg, #ffffff, #e5e4e2)" :
                    "linear-gradient(45deg, #c0c0c0, #808080)",
                }}
                animate={{
                  rotateY: [0, 360],
                  rotateZ: [360, 0],
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  transformOrigin: `${150 + i * 20}px center`,
                  left: "50%",
                  top: "50%",
                }}
              >
                <div className="absolute inset-0 rounded-full glow-white animate-pulse-glow" />
              </motion.div>
            ))}

            {/* Inner core */}
            <motion.div
              className="absolute inset-24 bg-gradient-to-br from-[#ffd700]/30 to-white/10 rounded-full border border-[#ffd700]/30"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-2 bg-gradient-radial from-white/20 to-transparent rounded-full animate-pulse-glow" />
            </motion.div>
          </motion.div>

          {/* Ambient lighting */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/5 to-transparent blur-3xl" />
            <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-radial from-[#ffd700]/10 to-transparent blur-2xl animate-float" />
          </div>
        </motion.div>
      </div>

      {/* Section divider */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        viewport={{ once: true }}
      />
    </section>
  );
}
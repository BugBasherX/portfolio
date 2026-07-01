"use client";

import { motion } from "motion/react";
import { Award, Users, Lightbulb, Target } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

const iconMap: Record<string, React.ElementType> = {
  Award,
  Users,
  Lightbulb,
  Target,
};

const techStack = [
  { category: "Frontend", skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"] },
  { category: "Backend", skills: ["Node.js", "Express.js", "Python", "REST API", "GraphQL"] },
  { category: "Database", skills: ["MongoDB", "MySQL", "PostgreSQL"] },
  { category: "Design", skills: ["Figma", "Adobe XD", "Photoshop", "Illustrator"] },
];

export function AboutSection() {
  const stats = siteConfig.company.about.statistics.map((s) => ({
    icon: iconMap[s.icon] ?? Award,
    value: s.value,
    label: s.label,
    color: s.color,
  }));

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20 sm:py-32 px-4 sm:px-6 bg-black relative"
      style={{
        background: `
          radial-gradient(circle at 75% 30%, rgba(255, 215, 0, 0.02) 0%, transparent 50%),
          #000000
        `
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start w-full">
        
        {/* Left Side: Editorial Bio (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:col-span-7 space-y-8"
        >
          {/* Section badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-white/10 bg-white/2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="text-white/70 text-xs font-semibold uppercase tracking-widest" style={{ fontFamily: 'var(--font-sans)' }}>
              About Me
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-none" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="text-white">Meet</span>
            <br />
            <span className="bg-gradient-to-r from-white via-[#c0c0c0] to-[#ffd700] bg-clip-text text-transparent">
              {siteConfig.company.about.title}
            </span>
          </h2>
          
          <div className="w-20 h-1 bg-gradient-to-r from-[#ffd700] to-transparent rounded-full" />

          {/* Bio paragraphs */}
          <div className="space-y-6 text-base sm:text-lg text-white/70 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
            <p>{siteConfig.company.about.paragraphs[0]}</p>
            <p>{siteConfig.company.about.paragraphs[1]}</p>
            <p>{siteConfig.company.about.paragraphs[2]}</p>
          </div>

          {/* Tech Stack organized neatly */}
          <div className="pt-4 space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40" style={{ fontFamily: 'var(--font-sans)' }}>
              Core Technologies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {techStack.map((group) => (
                <div key={group.category} className="space-y-2">
                  <h4 className="text-xs uppercase tracking-widest text-[#ffd700]" style={{ fontFamily: 'var(--font-sans)' }}>
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs rounded-full border border-white/10 text-white/75 bg-white/2 transition-colors duration-300 hover:border-white/30"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side: Visual Metrics & Statistics (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full lg:sticky lg:top-24"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 sm:p-8 rounded-2xl border bg-gradient-to-br from-white/4 to-transparent flex flex-col justify-between"
              style={{
                borderColor: `${stat.color}15`,
              }}
            >
              <stat.icon
                className="w-6 h-6 sm:w-8 sm:h-8 mb-4"
                style={{ color: stat.color }}
              />
              <div className="space-y-2">
                <div className="text-3xl sm:text-4xl font-black" style={{ color: stat.color, fontFamily: 'var(--font-display)' }}>
                  {stat.value}
                </div>
                <div className="text-white/50 text-xs sm:text-sm uppercase tracking-wider leading-snug" style={{ fontFamily: 'var(--font-sans)' }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

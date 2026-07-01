"use client";

import { motion } from "motion/react";
import { Github, Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

export function Footer() {
  const socialLinks = [
    { icon: Github, href: siteConfig.social.github, label: "GitHub", color: "#ffffff" },
    { icon: Twitter, href: siteConfig.social.twitter, label: "Twitter", color: "#c0c0c0" },
    { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn", color: "#ffffff" },
    { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram", color: "#ffd700" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 sm:py-24 px-4 sm:px-6 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main content container */}
        <div className="text-center space-y-10 sm:space-y-12">
          
          {/* Status Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-green-400 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: 'var(--font-sans)' }}>
                Available for freelance work
              </span>
            </div>
          </div>

          {/* Logo & Headline */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black tracking-widest text-white" style={{ fontFamily: 'var(--font-display)' }}>
              {siteConfig.company.name}
            </h3>

            <p className="text-base sm:text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed px-2" style={{ fontFamily: 'var(--font-sans)' }}>
              <span className="text-[#ffd700]">{siteConfig.footerTagline.phrase1}</span>{" "}
              <span className="text-white">{siteConfig.footerTagline.phrase2}</span>{" "}
              <span className="text-[#c0c0c0]">{siteConfig.footerTagline.phrase3}</span>
            </p>

            <p className="text-sm text-white/40 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
              {siteConfig.company.description}
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center justify-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="relative flex w-12 h-12 border border-white/10 rounded-xl items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 bg-white/2"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Simple Animated Divider */}
          <div className="py-4">
            <div className="w-40 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto" />
          </div>

          {/* Copyright Signature */}
          <p className="text-white/30 text-xs tracking-wider" style={{ fontFamily: 'var(--font-sans)' }}>
            © {siteConfig.legal.copyrightYear} {siteConfig.legal.copyrightHolder}. {siteConfig.legal.rightsText}
          </p>

        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="absolute top-4 right-4 sm:top-12 sm:right-12 w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center text-white/60 hover:text-[#ffd700] hover:border-[#ffd700]/30 transition-all duration-300"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

      </div>
    </footer>
  );
}

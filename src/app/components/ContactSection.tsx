"use client";

import { motion } from "motion/react";
import { useState, useMemo } from "react";
import { Send, Mail, Phone, MapPin, MessageSquare, User, AtSign } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

type FieldErrors = { name?: string; email?: string; subject?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateFields(data: { name: string; email: string; subject: string; message: string }): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  else if (data.name.trim().length < 2) errors.name = "Name must be at least 2 characters.";
  if (!data.email.trim()) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(data.email.trim())) errors.email = "Please enter a valid email address.";
  if (!data.subject.trim()) errors.subject = "Subject is required.";
  else if (data.subject.trim().length < 3) errors.subject = "Subject must be at least 3 characters.";
  if (!data.message.trim()) errors.message = "Message is required.";
  else if (data.message.trim().length < 20) errors.message = "Message must be at least 20 characters.";
  return errors;
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const particles = useMemo(() =>
    [...Array(50)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 4 + 2}px`,
      height: `${Math.random() * 4 + 2}px`,
      colorIndex: i % 3,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 4,
    })), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) return;

    const errors = validateFields(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setTouched({ name: true, email: true, subject: true, message: true });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setFieldErrors({});

    try {
      const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || "";

      if (FORMSPREE_ID) {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
          }),
        });
        const json = await response.json();
        if (!response.ok) throw new Error(json?.error ?? "Submission failed");
      } else {
        await new Promise(resolve => setTimeout(resolve, 1800));
      }

      setFormData({ name: "", email: "", subject: "", message: "" });
      setTouched({});
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus('idle'), 7000);

    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 7000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const next = { ...formData, [name]: value };
    setFormData(next);
    if (touched[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: validateFields(next)[name as keyof FieldErrors] }));
    }
  };

  const handleBlur = (name: string) => {
    setFocusedField(null);
    setTouched(prev => ({ ...prev, [name]: true }));
    setFieldErrors(prev => ({ ...prev, [name]: validateFields(formData)[name as keyof FieldErrors] }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.contact.email,
      accent: "#ffffff",
      href: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: siteConfig.contact.phone,
      accent: "#c0c0c0",
      href: `tel:${siteConfig.contact.phone}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: siteConfig.contact.location,
      accent: "#ffd700",
      href: `https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.location)}`,
    },
  ];

  return (
    <section id="contact" className="min-h-screen py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#000000] to-[#1a1a1a]">
      {/* Background elements */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              left: p.left,
              top: p.top,
              width: p.width,
              height: p.height,
              background: p.colorIndex === 0 ? 
                "linear-gradient(45deg, #ffffff, #e5e4e2)" :
                p.colorIndex === 1 ?
                "linear-gradient(45deg, #c0c0c0, #a8a8a8)" :
                "linear-gradient(45deg, #ffd700, #ffed4e)",
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1],
              y: [0, -50, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
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
            className="flex items-center justify-center mb-6 sm:mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <MessageSquare className="w-10 h-10 sm:w-16 sm:h-16 text-[#ffd700]" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-none mb-6 sm:mb-8">
            <span className="text-white">Get In</span>
            <br />
            <span className="bg-gradient-to-r from-white via-[#c0c0c0] to-[#ffd700] bg-clip-text text-transparent">
              Touch
            </span>
          </h2>

          <div className="w-32 h-1 bg-gradient-to-r from-[#ffd700] via-white to-transparent mx-auto mb-6 sm:mb-8" />
          
          <p className="text-base sm:text-lg md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed px-2">
            Ready to <span className="text-[#ffd700]">bring your idea to life?</span> 
            <span className="text-white"> Let's build something great together.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8" noValidate>
              {/* Honeypot */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name and Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <motion.div className="relative group" whileFocus={{ scale: 1.02 }}>
                    <label htmlFor="contact-name" className="sr-only">Your Name</label>
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 group-focus-within:text-white transition-colors duration-300" aria-hidden="true" />
                    </div>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => handleBlur('name')}
                      placeholder="Your Name"
                      required
                      autoComplete="name"
                      aria-invalid={touched.name && !!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? "err-name" : undefined}
                      className={`w-full pl-12 pr-4 py-4 sm:pl-14 sm:pr-6 sm:py-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border rounded-2xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 text-sm sm:text-base ${touched.name && fieldErrors.name ? 'border-red-500/60' : 'border-white/10 focus:border-white/30'}`}
                    />
                    {focusedField === 'name' && !fieldErrors.name && (
                      <motion.div className="absolute inset-0 rounded-2xl border border-white/30 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
                    )}
                  </motion.div>
                  {touched.name && fieldErrors.name && (
                    <p id="err-name" role="alert" className="text-red-400 text-xs pl-2">{fieldErrors.name}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <motion.div className="relative group" whileFocus={{ scale: 1.02 }}>
                    <label htmlFor="contact-email" className="sr-only">Your Email</label>
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                      <AtSign className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 group-focus-within:text-white transition-colors duration-300" aria-hidden="true" />
                    </div>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => handleBlur('email')}
                      placeholder="Your Email"
                      required
                      autoComplete="email"
                      aria-invalid={touched.email && !!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? "err-email" : undefined}
                      className={`w-full pl-12 pr-4 py-4 sm:pl-14 sm:pr-6 sm:py-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border rounded-2xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 text-sm sm:text-base ${touched.email && fieldErrors.email ? 'border-red-500/60' : 'border-white/10 focus:border-white/30'}`}
                    />
                    {focusedField === 'email' && !fieldErrors.email && (
                      <motion.div className="absolute inset-0 rounded-2xl border border-white/30 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
                    )}
                  </motion.div>
                  {touched.email && fieldErrors.email && (
                    <p id="err-email" role="alert" className="text-red-400 text-xs pl-2">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <motion.div className="relative group" whileFocus={{ scale: 1.02 }}>
                  <label htmlFor="contact-subject" className="sr-only">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => handleBlur('subject')}
                    placeholder="Subject"
                    required
                    aria-invalid={touched.subject && !!fieldErrors.subject}
                    aria-describedby={fieldErrors.subject ? "err-subject" : undefined}
                    className={`w-full px-4 py-4 sm:px-6 sm:py-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border rounded-2xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 text-sm sm:text-base ${touched.subject && fieldErrors.subject ? 'border-red-500/60' : 'border-white/10 focus:border-white/30'}`}
                  />
                  {focusedField === 'subject' && !fieldErrors.subject && (
                    <motion.div className="absolute inset-0 rounded-2xl border border-white/30 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
                  )}
                </motion.div>
                {touched.subject && fieldErrors.subject && (
                  <p id="err-subject" role="alert" className="text-red-400 text-xs pl-2">{fieldErrors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1">
                <motion.div className="relative group" whileFocus={{ scale: 1.02 }}>
                  <label htmlFor="contact-message" className="sr-only">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => handleBlur('message')}
                    placeholder="Tell me about your project... (min. 20 characters)"
                    required
                    rows={5}
                    aria-invalid={touched.message && !!fieldErrors.message}
                    aria-describedby={fieldErrors.message ? "err-message" : undefined}
                    className={`w-full px-4 py-4 sm:px-6 sm:py-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border rounded-2xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 resize-none text-sm sm:text-base ${touched.message && fieldErrors.message ? 'border-red-500/60' : 'border-white/10 focus:border-white/30'}`}
                  />
                  {focusedField === 'message' && !fieldErrors.message && (
                    <motion.div className="absolute inset-0 rounded-2xl border border-white/30 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
                  )}
                </motion.div>
                {touched.message && fieldErrors.message && (
                  <p id="err-message" role="alert" className="text-red-400 text-xs pl-2">{fieldErrors.message}</p>
                )}
              </div>

              {/* Inline status messages */}
              {submitStatus === 'success' && (
                <motion.div
                  role="status"
                  aria-live="polite"
                  className="flex items-center space-x-3 px-4 py-3 sm:px-6 sm:py-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 text-sm sm:text-base"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="text-xl">✓</span>
                  <span>Message sent! I'll get back to you soon.</span>
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  role="alert"
                  aria-live="assertive"
                  className="flex items-center space-x-3 px-4 py-3 sm:px-6 sm:py-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm sm:text-base"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="text-xl">✗</span>
                  <span>Failed to send message. Please try again.</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="group relative w-full px-6 py-4 sm:px-8 sm:py-6 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl text-white text-base sm:text-lg overflow-hidden transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 50px rgba(255, 255, 255, 0.2)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                      <span>Send Message</span>
                    </>
                  )}
                </span>
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#ffd700]/20 via-white/20 to-[#c0c0c0]/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & 3D Element */}
          <motion.div
            className="space-y-10 sm:space-y-16"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.label === 'Location' ? '_blank' : undefined}
                  rel={info.label === 'Location' ? 'noopener noreferrer' : undefined}
                  className="group flex items-center space-x-4 sm:space-x-6 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-white/10"
                  whileHover={{ 
                    x: 10,
                    borderColor: `${info.accent}30`,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center relative overflow-hidden flex-shrink-0"
                    style={{ backgroundColor: `${info.accent}15` }}
                    whileHover={{ 
                      scale: 1.1,
                      rotateY: 180,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <info.icon 
                      className="w-6 h-6 sm:w-8 sm:h-8 relative z-10"
                      style={{ color: info.accent }}
                    />
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                      style={{ backgroundColor: `${info.accent}20` }}
                    />
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-white/60 text-xs sm:text-sm uppercase tracking-wider mb-1">
                      {info.label}
                    </p>
                    <p 
                      className="text-base sm:text-lg group-hover:scale-105 transition-transform duration-300 truncate"
                      style={{ color: info.accent }}
                    >
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* 3D Element — hidden on small mobile */}
            <div className="relative flex items-center justify-center perspective-1000 hidden sm:flex">
              <motion.div
                className="relative w-64 h-64 sm:w-80 sm:h-80 preserve-3d"
                animate={{
                  rotateY: [0, 360],
                  rotateX: [0, 15, 0, -15, 0],
                }}
                transition={{
                  rotateY: { duration: 25, repeat: Infinity, ease: "linear" },
                  rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <motion.div
                  className="absolute inset-8 preserve-3d"
                  animate={{ rotateZ: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/5 rounded-3xl border border-white/20 backdrop-blur-sm">
                    <Send className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 text-white/60" />
                  </div>
                  
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#ffd700]/10 to-transparent rounded-3xl"
                    style={{ transform: "translateZ(-30px)" }}
                  />
                </motion.div>

                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                    style={{
                      background: i % 3 === 0 ? "linear-gradient(45deg, #ffd700, #ffed4e)" :
                        i % 3 === 1 ? "linear-gradient(45deg, #ffffff, #e5e4e2)" :
                        "linear-gradient(45deg, #c0c0c0, #808080)",
                      transformOrigin: `${100 + i * 12}px center`,
                      left: "50%",
                      top: "50%",
                    }}
                    animate={{ rotateY: [0, 360], rotateZ: [360, 0] }}
                    transition={{ duration: 8 + i, repeat: Infinity, ease: "linear" }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

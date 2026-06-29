"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Send, Mail, Phone, MapPin, MessageSquare, User, AtSign } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Replace this with your actual form handling service
      // Examples: Formspree, EmailJS, Netlify Forms, or your own API
      
      // Example with Formspree (uncomment and replace YOUR_FORM_ID):
      /*
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      */
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Reset form on success
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // You can add a success notification here
      alert('Message sent! I\'ll get back to you soon.');
      
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    <section id="contact" className="min-h-screen py-32 px-6 relative overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#000000] to-[#1a1a1a]">
      {/* Background elements */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: i % 3 === 0 ? 
                "linear-gradient(45deg, #ffffff, #e5e4e2)" :
                i % 3 === 1 ?
                "linear-gradient(45deg, #c0c0c0, #a8a8a8)" :
                "linear-gradient(45deg, #ffd700, #ffed4e)",
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center justify-center mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <MessageSquare className="w-16 h-16 text-[#ffd700]" />
          </motion.div>

          <h2 className="text-6xl lg:text-8xl font-black leading-none mb-8">
            <span className="text-white">Get In</span>
            <br />
            <span className="bg-gradient-to-r from-white via-[#c0c0c0] to-[#ffd700] bg-clip-text text-transparent">
              Touch
            </span>
          </h2>

          <div className="w-32 h-1 bg-gradient-to-r from-[#ffd700] via-white to-transparent mx-auto mb-8" />
          
          <p className="text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            Ready to <span className="text-[#ffd700]">bring your idea to life?</span> 
            <span className="text-white"> Let's build something great together.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="relative group"
                  whileFocus={{ scale: 1.02 }}
                >
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <User className="w-5 h-5 text-white/40 group-focus-within:text-white transition-colors duration-300" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your Name"
                    required
                    className="w-full pl-14 pr-6 py-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-white/40 focus:border-white/30 focus:outline-none focus:glow-white transition-all duration-300"
                  />
                  {focusedField === 'name' && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl border border-white/30 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.div>

                <motion.div
                  className="relative group"
                  whileFocus={{ scale: 1.02 }}
                >
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <AtSign className="w-5 h-5 text-white/40 group-focus-within:text-white transition-colors duration-300" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your Email"
                    required
                    className="w-full pl-14 pr-6 py-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-white/40 focus:border-white/30 focus:outline-none focus:glow-white transition-all duration-300"
                  />
                  {focusedField === 'email' && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl border border-white/30 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.div>
              </div>

              {/* Subject */}
              <motion.div
                className="relative group"
                whileFocus={{ scale: 1.02 }}
              >
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Subject"
                  required
                  className="w-full px-6 py-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-white/40 focus:border-white/30 focus:outline-none focus:glow-white transition-all duration-300"
                />
                {focusedField === 'subject' && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl border border-white/30 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>

              {/* Message */}
              <motion.div
                className="relative group"
                whileFocus={{ scale: 1.02 }}
              >
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Tell me about your project..."
                  required
                  rows={6}
                  className="w-full px-6 py-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-white/40 focus:border-white/30 focus:outline-none focus:glow-white transition-all duration-300 resize-none"
                />
                {focusedField === 'message' && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl border border-white/30 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full px-8 py-6 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl text-white text-lg overflow-hidden transition-all duration-300"
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
                        className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                      <span>Send Message</span>
                    </>
                  )}
                </span>
                
                {/* Animated background */}
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
            className="space-y-16"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Contact Information */}
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.label === 'Location' ? '_blank' : undefined}
                  rel={info.label === 'Location' ? 'noopener noreferrer' : undefined}
                  className="group flex items-center space-x-6 p-6 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-white/10"
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
                    className="w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: `${info.accent}15` }}
                    whileHover={{ 
                      scale: 1.1,
                      rotateY: 180,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <info.icon 
                      className="w-8 h-8 relative z-10"
                      style={{ color: info.accent }}
                    />
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                      style={{ backgroundColor: `${info.accent}20` }}
                    />
                  </motion.div>
                  
                  <div className="flex-1">
                    <p className="text-white/60 text-sm uppercase tracking-wider mb-1">
                      {info.label}
                    </p>
                    <p 
                      className="text-lg group-hover:scale-105 transition-transform duration-300"
                      style={{ color: info.accent }}
                    >
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Enhanced 3D Element */}
            <div className="relative flex items-center justify-center perspective-1000">
              <motion.div
                className="relative w-80 h-80 preserve-3d"
                animate={{
                  rotateY: [0, 360],
                  rotateX: [0, 15, 0, -15, 0],
                }}
                transition={{
                  rotateY: { duration: 25, repeat: Infinity, ease: "linear" },
                  rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                {/* Message envelope structure */}
                <motion.div
                  className="absolute inset-8 preserve-3d"
                  animate={{
                    rotateZ: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {/* Envelope faces */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/5 rounded-3xl border border-white/20 backdrop-blur-sm">
                    <Send className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-white/60" />
                  </div>
                  
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-[#ffd700]/15 to-[#ffd700]/5 rounded-3xl border border-[#ffd700]/20 backdrop-blur-sm"
                    style={{ transform: "rotateY(180deg) translateZ(-2px)" }}
                  >
                    <MessageSquare className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-[#ffd700]/60" />
                  </div>
                </motion.div>

                {/* Orbiting communication symbols */}
                {[Mail, Phone, MessageSquare, AtSign].map((Icon, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: i % 2 === 0 ? "#ffffff15" : "#ffd70015",
                      border: `1px solid ${i % 2 === 0 ? "#ffffff20" : "#ffd70020"}`,
                    }}
                    animate={{
                      rotateZ: [0, 360],
                    }}
                    transition={{
                      duration: 12 + i * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      transformOrigin: `${120 + i * 30}px center`,
                      left: "50%",
                      top: "50%",
                    }}
                  >
                    <Icon 
                      className="w-6 h-6"
                      style={{ color: i % 2 === 0 ? "#ffffff" : "#ffd700" }}
                    />
                  </motion.div>
                ))}

                {/* Central glow */}
                <div className="absolute inset-16 bg-gradient-radial from-white/20 via-[#ffd700]/10 to-transparent rounded-full blur-xl animate-pulse-glow" />
              </motion.div>

              {/* Surrounding energy field */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-white/5 to-transparent rounded-full blur-3xl" />
                <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-radial from-[#ffd700]/10 to-transparent rounded-full blur-2xl animate-float" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
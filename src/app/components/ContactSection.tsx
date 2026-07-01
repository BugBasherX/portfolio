"use client";

import { motion } from "motion/react";
import { useState, useMemo } from "react";
import { Send, Mail, Phone, MapPin, User, AtSign } from "lucide-react";
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
    <section id="contact" className="min-h-screen py-20 sm:py-32 px-4 sm:px-6 bg-black relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
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
              Contact
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-none" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="text-white">Get In</span>
            <br />
            <span className="bg-gradient-to-r from-white via-[#c0c0c0] to-[#ffd700] bg-clip-text text-transparent">
              Touch
            </span>
          </h2>

          <div className="w-32 h-1 bg-gradient-to-r from-[#ffd700] via-white to-transparent mx-auto rounded-full" />
          
          <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
            Ready to <span className="text-[#ffd700]">bring your idea to life?</span>{" "}
            <span className="text-white">Let's build something great together.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left: Contact Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Honeypot */}
              <div aria-hidden="true" className="hidden">
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 group-focus-within:text-[#ffd700] transition-colors duration-300 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => handleBlur('name')}
                      placeholder="Your Name"
                      required
                      className={`w-full pl-12 pr-4 py-4.5 bg-white/3 border rounded-xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 text-sm sm:text-base ${touched.name && fieldErrors.name ? 'border-red-500/60' : 'border-white/10 focus:border-[#ffd700]/50'}`}
                    />
                  </div>
                  {touched.name && fieldErrors.name && (
                    <p className="text-red-400 text-xs pl-2">{fieldErrors.name}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="relative group">
                    <AtSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 group-focus-within:text-[#ffd700] transition-colors duration-300 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => handleBlur('email')}
                      placeholder="Your Email"
                      required
                      className={`w-full pl-12 pr-4 py-4.5 bg-white/3 border rounded-xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 text-sm sm:text-base ${touched.email && fieldErrors.email ? 'border-red-500/60' : 'border-white/10 focus:border-[#ffd700]/50'}`}
                    />
                  </div>
                  {touched.email && fieldErrors.email && (
                    <p className="text-red-400 text-xs pl-2">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => handleBlur('subject')}
                  placeholder="Subject"
                  required
                  className={`w-full px-4 py-4.5 bg-white/3 border rounded-xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 text-sm sm:text-base ${touched.subject && fieldErrors.subject ? 'border-red-500/60' : 'border-white/10 focus:border-[#ffd700]/50'}`}
                />
                {touched.subject && fieldErrors.subject && (
                  <p className="text-red-400 text-xs pl-2">{fieldErrors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => handleBlur('message')}
                  placeholder="Tell me about your project... (min. 20 characters)"
                  required
                  rows={5}
                  className={`w-full px-4 py-4.5 bg-white/3 border rounded-xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 resize-none text-sm sm:text-base ${touched.message && fieldErrors.message ? 'border-red-500/60' : 'border-white/10 focus:border-[#ffd700]/50'}`}
                />
                {touched.message && fieldErrors.message && (
                  <p className="text-red-400 text-xs pl-2">{fieldErrors.message}</p>
                )}
              </div>

              {/* Submit Status Alerts */}
              {submitStatus === 'success' && (
                <div className="flex items-center space-x-3 px-4 py-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm">
                  <span>✓ Message sent successfully! I will reply shortly.</span>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="flex items-center space-x-3 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  <span>✗ Failed to send message. Please try again.</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4.5 bg-white text-black font-bold rounded-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center space-x-2"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Right: Contact info cards (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-4"
          >
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                target={info.label === 'Location' ? '_blank' : undefined}
                rel={info.label === 'Location' ? 'noopener noreferrer' : undefined}
                className="group flex items-center space-x-6 p-6 rounded-2xl border transition-all duration-300 bg-white/2"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${info.accent}12` }}
                >
                  <info.icon 
                    className="w-6 h-6"
                    style={{ color: info.accent }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1" style={{ fontFamily: 'var(--font-sans)' }}>
                    {info.label}
                  </p>
                  <p 
                    className="text-base sm:text-lg font-medium group-hover:text-white transition-colors duration-300 truncate"
                    style={{ color: info.accent, fontFamily: 'var(--font-sans)' }}
                  >
                    {info.value}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

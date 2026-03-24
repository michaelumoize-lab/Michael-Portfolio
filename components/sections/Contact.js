"use client";

import { useState } from "react";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Send,
  MessageSquare,
  Phone,
  PhoneCall,
} from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/data/constants";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  whatsapp: PhoneCall,
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "Please fill in all fields" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: "error", message: "Please enter a valid email" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", message: data.error || "Failed to send message" });
      }
    } catch {
      setStatus({ type: "error", message: "Server error, try again later" });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ type: "", message: "" }), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-20 bg-black overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 opacity-30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 opacity-30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 opacity-30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6 text-primary">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">
                Get In Touch
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4">
              Let&apos;s Work <span className="text-primary">Together</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Have a project in mind? Let&apos;s discuss how we can bring your
              ideas to life.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <FadeIn delay={100}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm block font-medium text-white/80 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/50 transition-all duration-300 placeholder-white/40"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm block font-medium text-white/80 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/50 transition-all duration-300 placeholder-white/40"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm block font-medium text-white/80 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={10}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/50 transition-all duration-300 placeholder-white/40 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-black font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                </button>

                {status.message && (
                  <FadeIn delay={0}>
                    <div
                      className={`p-4 rounded-xl text-center text-sm font-medium ${
                        status.type === "success"
                          ? "bg-green-500/10 border border-green-500/20 text-green-400"
                          : "bg-red-500/10 border border-red-500/20 text-red-400"
                      }`}
                    >
                      {status.message}
                    </div>
                  </FadeIn>
                )}
              </form>
            </div>
          </FadeIn>

          {/* Contact Info */}
          <FadeIn delay={200}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Let&apos;s Connect
                </h3>
                <p className="text-white/60 leading-relaxed">
                  I&apos;m always open to discussing new projects, creative
                  ideas, or opportunities to be a part of your visions.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", href: `mailto:${PERSONAL_INFO.email}`, text: PERSONAL_INFO.email },
                  { icon: Phone, label: "Phone", href: `tel:${PERSONAL_INFO.phone}`, text: PERSONAL_INFO.phone },
                  { icon: MapPin, label: "Location", href: null, text: PERSONAL_INFO.location },
                ].map(({ icon: Icon, label, href, text }) => (
                  <div
                    key={label}
                    className="group relative p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/20 border border-primary/30 rounded-xl">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white/60 uppercase mb-1">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="text-white hover:text-[#A8FF8D] transition-colors font-medium"
                          >
                            {text}
                          </a>
                        ) : (
                          <p className="text-white font-medium">{text}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div>
                  <p className="text-sm font-medium text-white/60 mb-4 uppercase">
                    Connect with me
                  </p>
                  <div className="flex gap-4">
                    {Object.entries(SOCIAL_LINKS)
                      .slice(0, 3)
                      .map(([platform, url]) => {
                        const Icon = socialIcons[platform];
                        return Icon ? (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-primary/50 hover:scale-110 transition-all duration-300 group"
                          >
                            <Icon className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
                          </a>
                        ) : null;
                      })}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

"use client";

import {
  Github,
  Linkedin,
  Twitter,
  PhoneCall,
  Heart,
  Mail,
  MapPin,
  ArrowUp,
  Instagram,
  Code2,
} from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { NAV_LINKS, PERSONAL_INFO, SOCIAL_LINKS } from "@/data/constants";
import { scrollToSection } from "@/hooks/useScrollSpy";
import { useState, useEffect } from "react";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  whatsapp: PhoneCall,
  instagram: Instagram,
};

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();
  const firstName = PERSONAL_INFO.name.split(" ")[0];

  return (
    <footer className="relative bg-gradient-to-b from-black to-gray-950 overflow-hidden border-t border-white/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 opacity-30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 opacity-30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-12">
          {/* Column 1 - Personal Info */}
          <FadeIn delay={0}>
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-4">
                  {firstName}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {PERSONAL_INFO.tagline}
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="group flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-primary/40 transition-all duration-300 hover:translate-x-1"
                >
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                    {PERSONAL_INFO.email}
                  </span>
                </a>

                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="group flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-primary/40 transition-all duration-300 hover:translate-x-1"
                >
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <PhoneCall className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                    {PERSONAL_INFO.phone}
                  </span>
                </a>

                <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white/70 text-sm">
                    {PERSONAL_INFO.location}
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Column 2 - Quick Links */}
          <FadeIn delay={100}>
            <div>
              <h4 className="text-white font-semibold mb-6 text-lg flex items-center gap-2">
                <div className="w-1 h-5 bg-primary rounded-full" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link, index) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="group flex items-center gap-2 text-white/60 hover:text-primary transition-all duration-300 w-full"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-primary group-hover:w-2 transition-all duration-300" />
                      <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                        {link.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Newsletter or CTA could go here */}
              <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-white/70 text-xs mb-2">Available for work</p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Open to opportunities
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Column 3 - Social Connect */}
          <FadeIn delay={200}>
            <div>
              <h4 className="text-white font-semibold mb-6 text-lg flex items-center gap-2">
                <div className="w-1 h-5 bg-primary rounded-full" />
                Connect With Me
              </h4>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                Let&apos;s connect and build something amazing together! Feel
                free to reach out for collaborations or just a chat.
              </p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
                  const Icon = socialIcons[platform];
                  return Icon ? (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-primary/50 hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                      aria-label={`Connect on ${platform}`}
                    >
                      <Icon className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors duration-300" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black/90 text-white/80 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </span>
                    </a>
                  ) : null;
                })}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Footer bottom */}
        <FadeIn delay={300}>
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/50 text-sm flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary/50" />
                &copy; {currentYear} {PERSONAL_INFO.name}. All rights reserved.
              </p>
              <p className="flex items-center gap-2 text-white/50 text-sm">
                Built with{" "}
                <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />{" "}
                using Next.js, Tailwind CSS & MongoDB
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-primary/90 hover:bg-primary text-white rounded-full shadow-lg transition-all duration-300 z-50 backdrop-blur-sm ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}

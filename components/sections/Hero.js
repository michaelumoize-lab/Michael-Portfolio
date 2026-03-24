"use client";

import Image from "next/image";
import RadialGradientBackground from "@/components/backgrounds/RadialGradientBackground";
import { PERSONAL_INFO } from "@/data/constants";
import { scrollToSection } from "@/hooks/useScrollSpy";
import FadeIn from "@/components/animations/FadeIn";
import { ChevronDown, Star } from "lucide-react";
import {
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
} from "react-icons/si";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden mt-4 bg-black">
      <RadialGradientBackground variant="hero" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Left Column */}
          <div className="text-left">
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 mb-8 bg-linear-to-t from-primary/10 via-primary/15 to-primary/20 border border-primary/20 rounded-full">
                <Star className="w-4 h-4 text-white fill-white" />
                <span className="text-xs md:text-sm text-white tracking-[1.2px]">
                  {PERSONAL_INFO.title} | Based in {PERSONAL_INFO.location}
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-6 leading-tight">
                {PERSONAL_INFO.name}&apos;s Portfolio
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="text-lg text-white/70 max-w-[34.375rem] mb-8">
                Building innovative and efficient web applications using a range
                of technologies, including React, Node.js, Express.js, Next.js,
                MongoDB, and PostgreSQL. Transforming ideas into functional and
                user-friendly digital experiences.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center gap-0 mb-12 group"
              >
                <div className="relative z-10 bg-white text-[#212121] rounded-[17px] px-6 py-3 text-base font-medium border border-white">
                  Get in Touch
                </div>
              </button>
            </FadeIn>
          </div>

          {/* Right Column - Profile Image */}
          <FadeIn delay={200}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] max-w-[25rem] ml-auto group">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0.5 bg-linear-to-r from-primary/20 via-primary/10 to-primary animate-spin-slow rounded-2xl" />
                </div>

                <div className="relative rounded-2xl overflow-hidden mx-px h-[calc(100%-2px)]">
                  <Image
                    src="/images/profile-image.webp"
                    alt="Michael Umoize - Full Stack Developer"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Technology Logos */}
                <div className="absolute bottom-6 left-6 z-20">
                  <FadeIn delay={500}>
                    <div className="flex items-center gap-4 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
                      {[
                        SiReact,
                        SiNextdotjs,
                        SiNodedotjs,
                        SiTailwindcss,
                        SiMongodb,
                        SiPostgresql,
                      ].map((Icon, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300"
                        >
                          <Icon className="w-full h-full text-primary" />
                        </div>
                      ))}
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="w-6 h-6 text-primary" />
      </button>
    </section>
  );
}

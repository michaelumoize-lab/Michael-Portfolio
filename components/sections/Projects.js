"use client";

import { useState, useRef, useEffect } from "react";
import {
  Briefcase,
  Sparkles,
  Target,
  Globe,
  Palette,
  Zap,
  ChevronLeft,
  ChevronRight,
  BriefcaseBusinessIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import FadeIn from "@/components/animations/FadeIn";
import { projects, categories } from "@/data/projects";

const categoryIcons = {
  All: Target,
  "Web Apps": Globe,
  "Mobile Apps": Briefcase,
  Websites: Sparkles,
  "UI Components": Palette,
  "Full Stack": Zap,
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const scrollContainerRef = useRef(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentIndex(0);
    setIsAtStart(true);
    setIsAtEnd(false);
    scrollContainerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [activeCategory]);

  const getCardWidth = () => {
    const container = scrollContainerRef.current;
    const card = container?.querySelector("[data-card]");
    return card ? card.offsetWidth + 24 : 0;
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, offsetWidth } = container;
    setIsAtStart(scrollLeft <= 5);
    setIsAtEnd(scrollLeft >= scrollWidth - offsetWidth - 5);
    const cardWidth = getCardWidth();
    if (cardWidth) setCurrentIndex(Math.round(scrollLeft / cardWidth));
  };

  const scrollToIndex = (index) => {
    setCurrentIndex(index);
    const cardWidth = getCardWidth();
    scrollContainerRef.current?.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });
  };

  const nextSlide = () =>
    scrollContainerRef.current?.scrollBy({ left: getCardWidth(), behavior: "smooth" });

  const prevSlide = () =>
    scrollContainerRef.current?.scrollBy({ left: -getCardWidth(), behavior: "smooth" });

  const showNav = filteredProjects.length > 3;

  return (
    <section id="projects" className="relative py-20 bg-black overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <BriefcaseBusinessIcon className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">My Work</span>
            </div>
            <h2 className="text-3xl font-normal lg:text-5xl text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg mx-auto text-white/60">
              Showcasing my best work and achievements
            </p>
          </div>
        </FadeIn>

        {/* Category Filter */}
        <FadeIn delay={100}>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => {
              const Icon = categoryIcons[category];
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-primary/10 opacity-100"
                        : "bg-white/5 border border-white/10 group-hover:bg-white/10"
                    }`}
                  />
                  <div className="relative flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4" />}
                    <span className="text-sm">{category}</span>
                  </div>
                  {activeCategory === category && (
                    <div className="absolute inset-0 rounded-full bg-primary blur-xl opacity-50 -z-10" />
                  )}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Carousel */}
        <FadeIn delay={200}>
          <div className="relative px-12 lg:px-16">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
            >
              <div className="flex gap-6 pb-4">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project) => (
                    <motion.div
                      layout
                      key={project.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      data-card
                      className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start"
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Arrows */}
            {showNav && (
              <>
                <button
                  onClick={prevSlide}
                  disabled={isAtStart}
                  className="flex absolute left-0 top-1/2 -translate-y-1/2 translate-x-1/2 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-20"
                  aria-label="Previous Projects"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={isAtEnd}
                  className="flex absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-20"
                  aria-label="Next Projects"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* Dots */}
            {showNav && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {Array.from({ length: Math.max(0, filteredProjects.length - 2) }).map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToIndex(index)}
                      className={`transition-all duration-300 rounded-full ${
                        currentIndex === index
                          ? "bg-primary w-6 h-2"
                          : "bg-white/30 w-2 h-2 hover:bg-white/50"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  )
                )}
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

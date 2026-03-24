import { Download, Code2, Sparkles } from "lucide-react";
import RadialGradientBackground from "@/components/backgrounds/RadialGradientBackground";
import { PERSONAL_INFO } from "@/data/constants";
import FadeIn from "@/components/animations/FadeIn";
import {
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiApollographql,
  SiTailwindcss,
  SiJavascript,
  SiMongodb,
  SiTypescript,
  SiPostgresql,
  SiVite,
  SiFigma,
  SiGithub,
  SiCss,
} from "react-icons/si";

const skills = [
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React.js", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "REST APIs", icon: SiApollographql, color: "#E535AB" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "Git & GitHub", icon: SiGithub, color: "#181717" },
  { name: "Responsive Design", icon: SiCss, color: "#1572B6" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Vite", icon: SiVite, color: "#646CFF" },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 bg-black overflow-hidden">
      <RadialGradientBackground variant="about" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center mb-20 gap-16">
          {/* Left Column */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-8">
              <FadeIn delay={60}>
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-primary/30 bg-primary/10 rounded-full w-fit">
                  <Code2 className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">
                    Full-Stack Developer
                  </span>
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
              </FadeIn>

              <FadeIn delay={100}>
                <h2 className="text-4xl lg:text-5xl font-normal text-white leading-tight">
                  Crafting Digital Experiences That Matter
                </h2>
              </FadeIn>

              <FadeIn delay={200}>
                <div className="flex flex-col gap-4">
                  {PERSONAL_INFO.bio.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base text-white/70 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Right Column */}
          <FadeIn delay={200}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 relative group">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Code2 className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Expertise
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Specialize in building scalable and user-friendly web
                        applications with modern technologies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {[
                {
                  icon: Sparkles,
                  title: "Clean Code",
                  desc: "Writing maintainable, well documented code that scales.",
                },
                {
                  icon: Download,
                  title: "Performance",
                  desc: "Delivering fast and efficient web applications.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="relative group">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                  <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 h-full">
                    <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}

              <div className="col-span-2 relative group">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    {[
                      { value: "100%", label: "Client Satisfaction" },
                      { value: "24/7", label: "Support Available" },
                      { value: "Fast", label: "Delivery Time" },
                    ].map(({ value, label }) => (
                      <div key={label}>
                        <div className="text-2xl font-bold text-primary mb-1">
                          {value}
                        </div>
                        <div className="text-xs text-white/60">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Skills Grid */}
        <FadeIn delay={500}>
          <div className="flex flex-col gap-8 items-center">
            <div className="text-center">
              <h3 className="text-2xl font-normal text-white mb-2">
                Tech Stack &amp; Expertise
              </h3>
              <p className="text-sm text-white/60">
                Technologies I work with to build amazing products
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-4xl">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 transition-all duration-300 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:scale-105"
                >
                  <skill.icon className="text-3xl text-primary" />
                  <div className="text-sm text-white/80 font-medium text-center">
                    {skill.name}
                  </div>
                  <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-primary/10 rounded-2xl transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

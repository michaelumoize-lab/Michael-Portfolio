import { Sparkles } from "lucide-react";
import * as Icons from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { skills } from "@/data/skills";

const skillCategories = {
  "Frontend Development": [
    "React.js",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
  ],
  "Backend & APIs": ["Node.js", "REST APIs"],
  "Tools & Others": ["Git & GitHub", "Responsive Design", "Figma", "Vite"],
};

function getProficiencyLevel(level) {
  return { Expert: 95, Advanced: 80, Intermediate: 65, Beginner: 40 }[level] ?? 50;
}

function getLevelColor(level) {
  return (
    {
      Expert: "text-[#8DFF69] bg-[#8DFF69]/20 border-[#8DFF69]/30",
      Advanced: "text-cyan-400 bg-cyan-400/20 border-cyan-400/20",
      Intermediate: "text-emerald-400 bg-emerald-500/20 border-emerald-500/30",
      Beginner: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    }[level] ?? "text-gray-400 bg-gray-500/20 border-gray-500/30"
  );
}

export default function Skills() {
  const categorized = Object.entries(skillCategories).map(
    ([category, names]) => ({
      category,
      items: names
        .map((name) => skills.find((s) => s.name === name))
        .filter(Boolean),
    })
  );

  return (
    <section id="skills" className="relative py-20 bg-black overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={100}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 bg-primary/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                My Expertise
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4">
              Skills &amp; Technologies
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              A comprehensive overview of my technical skills, showcasing my
              expertise in various areas of web development.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categorized.map(({ category, items }, categoryIndex) => (
            <FadeIn key={category} delay={categoryIndex * 100}>
              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-primary/30 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <div className="w-1 h-8 bg-linear-to-b from-primary/30 to-primary/10 rounded-full" />
                  <h3 className="text-xl font-medium">{category}</h3>
                </div>

                <div className="space-y-5">
                  {items.map((skill) => {
                    const IconComponent = Icons[skill.icon] || Icons.Code2;
                    const proficiency = getProficiencyLevel(skill.level);

                    return (
                      <div key={skill.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/5 rounded-lg">
                              <IconComponent className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">
                                {skill.name}
                              </div>
                              <div className="text-xs text-white/50">
                                {skill.experience}
                              </div>
                            </div>
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded-full border ${getLevelColor(
                              skill.level
                            )}`}
                          >
                            {skill.level}
                          </span>
                        </div>

                        <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-linear-to-r from-primary/10 to-primary/80 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${proficiency}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-primary/5 group-hover:from-primary/5 group-hover:to-primary/5 rounded-2xl transition-all duration-300 pointer-events-none" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function ProjectCard({ project }) {
  const { title, description, image, technologies, demoUrl, category, status } =
    project;

  return (
    <div className="group relative w-full bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(141,255,105,0.1)]">
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white font-medium">
            {category}
          </span>
        </div>

        {/* Status Badge */}
        {status && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 bg-yellow-500/80 backdrop-blur-md border border-yellow-700/30 rounded-full text-[10px] uppercase tracking-widest text-white font-medium">
              {status}
            </span>
          </div>
        )}

        {/* Demo Link */}
        <div className="absolute bottom-4 right-4 flex gap-3 z-10">
          {demoUrl && demoUrl !== "#" && (
            <a
              target="_blank"
              href={demoUrl}
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-primary hover:border-primary transition-all duration-300"
              title="View Demo"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-medium text-white group-hover:text-primary transition-colors mb-2">
            {title}
          </h3>
          <p className="text-white/60 text-sm line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors duration-200 whitespace-nowrap"
            >
              #{tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

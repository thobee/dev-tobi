import { ExternalLink, Github, ArrowRight, ChevronDown } from 'lucide-react';
import justhome from '../assets/justhome.png';
import { SiHtml5, SiJavascript, SiFirebase, SiReact, SiNodedotjs, SiMongodb, SiTypescript, SiNextdotjs, SiTailwindcss, SiRedux } from 'react-icons/si';

const Projects = () => {

  // Tech icon mapping
  const techIcons = {
    'html': { icon: SiHtml5, color: '#E34F26' },
    'javascript': { icon: SiJavascript, color: '#F7DF1E' },
    'firebase': { icon: SiFirebase, color: '#FFCA28' },
    'React': { icon: SiReact, color: '#61DAFB' },
    'Node.js': { icon: SiNodedotjs, color: '#339933' },
    'MongoDB': { icon: SiMongodb, color: '#47A248' },
    'TypeScript': { icon: SiTypescript, color: '#3178C6' },
    'Next.js': { icon: SiNextdotjs, color: '#000000' },
    'Tailwind': { icon: SiTailwindcss, color: '#06B6D4' },
    'Redux': { icon: SiRedux, color: '#764ABC' },
  };

  const projects = [
    {
      title: 'Real estate Website',
      description: 'A full-stack real estate website with html , javascript and firebase featuring real-time inventory management and secure payment processing.',
      tech: ['html', 'javascript', 'firebase'],
      link: 'https://justhome-estate.vercel.app',
      github: 'https://github.com/mubarak-tobi/justhome-estate',
      category: 'Full Stack',
      year: '2025',
      image: justhome
    },
    {
      title: 'Coming Soon',
      description: 'An exciting new project is currently in development. Stay tuned for updates on this innovative solution.',
      tech: ['React', 'Node.js', 'MongoDB'],
      link: null,
      github: null,
      category: 'In Progress',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
      isPlaceholder: true
    },
    {
      title: 'Coming Soon',
      description: 'Another amazing project is on the way. Check back soon to see what I\'m working on next.',
      tech: ['TypeScript', 'Next.js', 'Tailwind'],
      link: null,
      github: null,
      category: 'In Progress',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      isPlaceholder: true
    },
    {
      title: 'Coming Soon',
      description: 'More projects coming soon. I\'m constantly working on new and exciting ideas to showcase here.',
      tech: ['React', 'Firebase', 'Tailwind'],
      link: null,
      github: null,
      category: 'In Progress',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      isPlaceholder: true
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-800 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          {/* Section Header */}
          <div className="text-center mb-12">
            <div>
              <div className="inline-block mb-4">
              
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-white mb-3 tracking-tight">
                Featured Projects
              </h2>
              <p className="text-gray-300 dark:text-gray-400 text-base max-w-2xl mx-auto">
                A collection of my recent work and side projects
              </p>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                {/* Image Preview with rounded corners */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Category badge on image */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-xs font-semibold text-gray-900 dark:text-white rounded-full shadow-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Year badge on image */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 bg-blue-600/95 backdrop-blur-md text-xs font-semibold text-white rounded-full shadow-md">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack Icons */}
                  <div className="flex items-center gap-3 mb-4">
                    {project.tech.map((tech, techIndex) => {
                      const techInfo = techIcons[tech];
                      if (!techInfo) return null;
                      const Icon = techInfo.icon;
                      return (
                        <div
                          key={techIndex}
                          className="group/icon relative"
                          title={tech}
                        >
                          <Icon 
                            size={24} 
                            className="text-gray-700 dark:text-white transition-transform duration-300 group-hover/icon:scale-110"
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {project.isPlaceholder ? (
                      <div className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-500 font-semibold text-xs rounded-lg cursor-not-allowed opacity-60">
                        <span>Coming Soon</span>
                      </div>
                    ) : (
                      <>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-xs rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          <ExternalLink size={14} />
                          <span>View Live</span>
                        </a>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                          title="View on GitHub"
                        >
                          <Github size={16} />
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Projects Button */}
          <div className="text-center mt-10">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 dark:bg-gray-800 text-white dark:text-white font-semibold text-sm rounded-full border border-gray-600 dark:border-gray-700 hover:bg-gray-600 dark:hover:bg-gray-700 transition-all shadow-sm hover:shadow-md"
            >
              Show More Projects (4)
              <ChevronDown size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
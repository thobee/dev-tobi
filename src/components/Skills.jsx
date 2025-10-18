import { motion } from 'framer-motion';
import { SiJavascript, SiReact, SiNodedotjs, SiTailwindcss, SiNextdotjs, SiFramer } from 'react-icons/si';

const Skills = () => {
  const skillData = [
    {
      name: 'React',
      icon: SiReact,
      gradient: 'from-blue-400 via-blue-500 to-blue-600'
    },
    {
      name: 'JavaScript',
      icon: SiJavascript,
      gradient: 'from-yellow-400 via-orange-400 to-orange-500'
    },
    {
      name: 'Next.js',
      icon: SiNextdotjs,
      gradient: 'from-gray-800 via-gray-700 to-gray-600'
    },
    {
      name: 'Framer Motion',
      icon: SiFramer,
      gradient: 'from-purple-400 via-purple-500 to-purple-600'
    },
    {
      name: 'Tailwind CSS',
      icon: SiTailwindcss,
      gradient: 'from-cyan-400 via-cyan-500 to-cyan-600'
    },
    {
      name: 'Node.js',
      icon: SiNodedotjs,
      gradient: 'from-green-400 via-green-500 to-green-600'
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4"
            >
              Tech Stack
            </motion.h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Modern technologies I work with to build exceptional applications
            </p>
          </div>

          {/* Tech Stack Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {skillData.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 80
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    transition: { duration: 0.2, type: "spring", stiffness: 300 }
                  }}
                  className={`group relative bg-gradient-to-br ${skill.gradient} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/20" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/20" />
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 text-center mb-6">
                    <div className="w-16 h-16 mx-auto rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon
                        size={32}
                        className="text-white drop-shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Tech Name */}
                  <div className="relative z-10 text-center">
                    <h3 className="font-bold text-white text-lg tracking-wide drop-shadow-sm">
                      {skill.name}
                    </h3>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </motion.div>
              );
            })}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Always learning and exploring new technologies to stay current with industry trends
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
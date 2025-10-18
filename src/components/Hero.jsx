import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { Github, Code2, Terminal, Database, FileText, Layers } from 'lucide-react';
import vintage from '../assets/vintage.png';

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [headingChars, setHeadingChars] = useState([]);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = ["Software Engineer.", "Fullstack Web Developer."];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayedText === currentTitle) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      } else if (isDeleting) {
        setDisplayedText(currentTitle.substring(0, displayedText.length - 1));
      } else {
        setDisplayedText(currentTitle.substring(0, displayedText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, titleIndex]);

  useEffect(() => {
    setHeadingChars("Hey, I'm Mubarak Tobi.".split(''));
  }, []);

  // Coding icons for background
  const codingIcons = [
    { icon: Code2, x: "10%", y: "20%", delay: 0 },
    { icon: Terminal, x: "80%", y: "30%", delay: 1 },
    { icon: Database, x: "20%", y: "70%", delay: 2 },
    { icon: FileText, x: "70%", y: "60%", delay: 0.5 },
    { icon: Layers, x: "40%", y: "10%", delay: 1.5 },
    { icon: Code2, x: "90%", y: "80%", delay: 2.5 },
  ];

  return (
    <section id="home" className="relative min-h-screen bg-white dark:bg-gray-900 font-satoshi overflow-hidden flex items-center justify-center">
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 dark:opacity-100 opacity-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Background Coding Icons */}
      {codingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-500/10 dark:text-blue-400/10 pointer-events-none hidden xl:block"
          style={{ 
            left: item.x, 
            top: item.y 
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0, 1, 0.3],
            scale: [0.5, 1, 0.8],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            delay: item.delay,
            ease: "easeInOut" 
          }}
        >
          <item.icon size={48} />
        </motion.div>
      ))}

      {/* Floating Code Symbols */}
      <motion.div
        className="absolute top-20 left-20 text-4xl text-gray-700 dark:text-gray-600 opacity-20 pointer-events-none hidden lg:block"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {'</>'}
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-32 text-3xl text-gray-700 dark:text-gray-600 opacity-20 pointer-events-none hidden lg:block"
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        {'{}'}
      </motion.div>

      {/* Main Content Container - Moved Down */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            
            {/* Avatar Section - Left Side */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <motion.div
                  className="relative w-52 h-72 md:w-64 md:h-88 lg:w-68 lg:h-96"
                  // Subtle bouncing animation
                  animate={{ 
                    y: [0, -3, 0],
                    transition: { 
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }
                  }}
                  // Hover animation
                  whileHover={{ 
                    scale: 1.03, 
                    y: -8,
                    transition: { 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 25 
                    }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={vintage}
                    alt="Mubarak Tobi - Software Engineer"
                    className="w-full h-full object-cover shadow-2xl border-4 border-white dark:border-gray-800 ring-2 ring-blue-700/20 rounded-xl cursor-pointer"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Text Content Section - Right Side */}
            <div className="flex-1 text-center md:text-left space-y-3">
              {/* Animated Heading with GSAP */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-gray-900 dark:text-white">
                  Hey, I'm Mubarak Tobi.
                </span>
              </h1>

              {/* Typewriter Title - Blue Theme */}
              <div className="relative h-9 md:h-11 flex items-center justify-center md:justify-start">
                <p className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-600 dark:from-blue-400 dark:via-blue-500 dark:to-cyan-500">
                  {displayedText}
                  <span className="inline-block w-0.5 h-6 md:h-7 ml-1 bg-gradient-to-b from-blue-500 to-cyan-600 dark:from-blue-400 dark:to-cyan-500 animate-pulse"></span>
                </p>
              </div>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl pt-1">
                Crafting innovative solutions and captivating designs with a passion for technology. A dedicated developer with a vision to create meaningful digital experiences.
              </p>

              {/* Availability Badge - Green Theme */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 backdrop-blur-sm rounded-full border border-green-300 dark:border-green-700 shadow-sm"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-sm font-semibold text-green-700 dark:text-green-300">Available for new projects</span>
              </motion.div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 pt-4">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-7 py-3 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white rounded-lg font-semibold shadow-lg shadow-blue-800/40 hover:shadow-xl hover:shadow-blue-900/50 transition-all duration-300 w-full sm:w-auto text-center overflow-hidden group"
                >
                  <span className="relative z-10">Hire Me!</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 border-2 border-blue-500/30 rounded-lg pointer-events-none"></div>
                </motion.a>
                
                <motion.a
                  href="https://github.com/thobee"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center justify-center gap-2 px-7 py-3 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white rounded-lg font-semibold shadow-lg shadow-blue-800/40 hover:shadow-xl hover:shadow-blue-900/50 transition-all duration-300 w-full sm:w-auto overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Github size={18} />
                    GitHub Profile
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 border-2 border-blue-500/30 rounded-lg pointer-events-none"></div>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
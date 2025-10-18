import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import devTobiPdf from '../assets/dev-tobi.pdf';

const Navigation = () => {
  const [active, setActive] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1));
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = devTobiPdf;
    link.download = 'dev-tobi.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Magnetic effect component
  const MagneticItem = ({ children, href, onClick, className, isActive }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      x.set((e.clientX - centerX) * 0.3);
      y.set((e.clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.a
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        className={className}
      >
        {children}
        {isActive && (
          <motion.div
            layoutId="active-underline"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </motion.a>
    );
  };

  // Magnetic button component
  const MagneticButton = ({ children, onClick, className, href }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      x.set((e.clientX - centerX) * 0.3);
      y.set((e.clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const Component = href ? motion.a : motion.button;

    return (
      <Component
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        className={className}
      >
        {children}
      </Component>
    );
  };

  const navItems = ['Home', 'About', 'Projects', 'Skills', 'Contact'];

  const handleLinkClick = (item) => {
    setActive(item);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            maxWidth: scrolled ? '100%' : '64rem'
          }}
          transition={{ duration: 0.6, maxWidth: { duration: 0.4, ease: 'easeInOut' } }}
          className="relative w-full"
        >
          <div className="absolute inset-0 bg-white/60 dark:bg-gray-950/60 backdrop-blur-xl border border-white/20 dark:border-gray-800/20 rounded-2xl shadow-lg"></div>
          
          <div className="relative px-6 sm:px-8">
            <div className="flex items-center justify-between h-16">
            
              {/* Logo */}
              <motion.a
                href="#home"
                className="flex items-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  TOBILOBA.
                </span>
              </motion.a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6 lg:gap-8">
                {navItems.map((item) => (
                  <MagneticItem
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => handleLinkClick(item)}
                    isActive={active === item}
                    className={`relative text-sm font-medium transition-colors ${
                      active === item
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {item}
                  </MagneticItem>
                ))}
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-4">
                {/* Download CV Button */}
                <MagneticButton
                  onClick={handleDownload}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-gray-700/30 text-gray-900 dark:text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Download size={16} />
                  <span className="hidden md:inline">Download CV</span>
                  <span className="md:hidden">CV</span>
                </MagneticButton>

                {/* Mobile Menu Button */}
                <motion.button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-white/10 dark:hover:bg-gray-800/20 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 md:hidden w-80 max-w-[90vw] 
              bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl 
              border border-white/20 dark:border-gray-800/20 
              rounded-2xl shadow-2xl"
            >
              <div className="py-4 px-6">
                <div className="flex flex-col gap-1">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={() => handleLinkClick(item)}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`relative px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                        active === item
                          ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }`}
                      whileHover={{ x: 4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item}
                      {active === item && (
                        <motion.div
                          layoutId="mobile-active"
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-1 h-6 bg-gray-900 dark:bg-white rounded-r-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.a>
                  ))}
                  
                  {/* Mobile CV Button */}
                  <motion.a
                    onClick={handleDownload}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 flex items-center justify-center gap-2 px-4 py-3 
                    bg-gray-100 dark:bg-gray-800 backdrop-blur-md 
                    border border-gray-200 dark:border-gray-700 
                    text-gray-900 dark:text-white text-sm font-medium rounded-xl 
                    shadow-lg hover:shadow-xl hover:bg-gray-50 dark:hover:bg-gray-800/80 
                    transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download size={16} />
                    Download CV
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
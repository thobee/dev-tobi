import { useState, useEffect } from 'react';
import { FaXTwitter, FaInstagram, FaTiktok, FaLinkedin, FaWhatsapp } from 'react-icons/fa6';

const SocialSidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll detection for Hero section
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Show sidebar if Hero section is at least partially visible
        const isHeroVisible = heroRect.top < windowHeight && heroRect.bottom > 0;
        setIsVisible(isHeroVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    { name: 'X', icon: FaXTwitter, url: 'https://x.com/devtobiloba', color: '#1DA1F2' },
    { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com/babavintage1', color: '#E4405F' },
    { name: 'TikTok', icon: FaTiktok, url: 'https://tiktok.com/@dev_tobi', color: '#000000' },
    { name: 'LinkedIn', icon: FaLinkedin, url: 'https://linkedin.com/in/mubarak-oyewole-529b6a191', color: '#0A66C2' },
    { name: 'WhatsApp', icon: FaWhatsapp, url: 'https://wa.me/+2348102877413', color: '#25D366' },
  ];

  const handleIconClick = (social) => {
    window.open(social.url, '_blank', 'noopener,noreferrer');
    setExpanded(true);
    setTimeout(() => setExpanded(false), 1200);
  };

  return (
    <div 
      className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden xl:block transition-opacity duration-500 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={() => setExpanded(false)}
    >
      {/* Larger minimal container glued to side */}
      <div 
        className={`
          bg-white dark:bg-gray-900 
          border-r-2 border-blue-500 dark:border-blue-400
          rounded-r-lg 
          shadow-md 
          transition-all duration-300 ease-in-out
          overflow-hidden
          ${expanded ? 'w-64' : 'w-16'}
          h-67 flex flex-col justify-center py-8 px-4
        `}
      >
        {/* Social Icons */}
        <div className="space-y-1">
          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              onClick={(e) => {
                e.stopPropagation();
                handleIconClick(social);
              }}
              className={`
                inline-flex items-center gap-3 
                p-3 rounded-lg 
                border border-transparent 
                hover:border-blue-500/30 
                transition-all duration-200
                cursor-pointer
                group
                ${expanded ? 'pl-4' : 'justify-center'}
                hover:bg-blue-50 dark:hover:bg-gray-800/60
              `}
              style={{
                color: expanded ? social.color : 'white'
              }}
              onMouseEnter={() => !expanded && setHoveredIcon(social.name)}
              onMouseLeave={() => !expanded && setHoveredIcon(null)}
            >
              {/* Larger Icon */}
              <social.icon 
                size={22}
                className={`
                  transition-all duration-200
                  ${expanded ? 'text-current' : 'text-white'}
                `}
                style={{
                  color: expanded ? social.color : 'white',
                  filter: !expanded ? 'drop-shadow(0 0 3px rgba(255,255,255,0.9))' : 'none'
                }}
              />
              
              {/* Label */}
              <span 
                className={`
                  text-base font-medium 
                  text-gray-700 dark:text-gray-300
                  whitespace-nowrap
                  transition-all duration-200
                  ${expanded ? 'block' : 'hidden'}
                `}
                style={{ color: social.color }}
              >
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialSidebar;
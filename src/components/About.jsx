import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import tobi from '../assets/tobi.png';
import image from '../assets/image.png'


const HoverCard = ({ image, title, description }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    setMousePosition({ x: mouseX, y: mouseY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTimeout(() => {
      setMousePosition({ x: 0, y: 0 });
    }, 300);
  };

  const mousePX = mousePosition.x / 240;
  const mousePY = mousePosition.y / 320;
  const tX = mousePX * -20;
  const tY = mousePY * -20;

  return (
    <div
      ref={cardRef}
      className="card-wrap m-2.5 cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="card relative w-60 h-80 bg-gray-800 overflow-hidden rounded-xl"
        style={{
          boxShadow: isHovered
            ? 'rgba(255, 255, 255, 0.2) 0 0 40px 5px, rgba(255, 255, 255, 1) 0 0 0 1px, rgba(0, 0, 0, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px, inset white 0 0 0 6px'
            : 'rgba(0, 0, 0, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px, inset rgba(255, 255, 255, 0.5) 0 0 0 6px',
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ 
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}
      >
        {/* Background Image */}
        <motion.div
          className="card-bg absolute top-0 left-0 w-full h-full bg-center bg-cover bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: `url(${image})`,
            opacity: isHovered ? 1 : 0.9,
          }}
          animate={{
            translateX: tX,
            translateY: tY,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ 
            type: 'spring',
            stiffness: 300,
            damping: 30
          }}
        />

        {/* Card Info */}
        <motion.div
          className="card-info absolute bottom-0 p-5 text-white"
          animate={{
            translateY: isHovered ? 0 : '40%',
          }}
          transition={{ 
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1]
          }}
        >
          <div className="relative z-10">
            <h1 className="font-playfair text-4xl font-bold mb-2" style={{ textShadow: 'rgba(0, 0, 0, 0.5) 0 10px 10px' }}>
              {title}
            </h1>
            <motion.p
              className="text-sm leading-relaxed"
              style={{ textShadow: 'rgba(0, 0, 0, 1) 0 2px 3px' }}
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ 
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1]
              }}
            >
              {description}
            </motion.p>
          </div>
          
          {/* Gradient Overlay */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full z-0"
            style={{
              backgroundImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.6) 100%)',
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
              translateY: isHovered ? 0 : '100%',
            }}
            transition={{ 
              duration: 0.6,
              ease: [0.23, 1, 0.32, 1]
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

const About = () => {
  const scrollRef = useRef(null);

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
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const containerWidth = scrollContainer.offsetWidth;

    // GSAP infinite scroll animation
    gsap.to(scrollContainer, {
      x: -(scrollWidth / 2),
      duration: 20,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % (scrollWidth / 2))
      }
    });
  }, []);

  const cards = [
    {
      image: image,
     
    },
  ];

  const techStack = [
    { 
      name: 'React', 
      color: '#61DAFB',
      svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9z"/></svg>
    },
    { 
      name: 'Next.js', 
      color: '#000000',
      svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/></svg>
    },
    { 
      name: 'Tailwind CSS', 
      color: '#06B6D4',
      svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>
    },
    { 
      name: 'JavaScript', 
      color: '#F7DF1E',
      svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>
    },
    { 
      name: 'Node.js', 
      color: '#339933',
      svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.197.045.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.192-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.085.05-.139.146-.139.243v10.15c0 .097.054.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.944-.922-1.604V6.921c0-.659.353-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.944.924 1.603v10.15c0 .659-.354 1.273-.924 1.604l-8.794 5.078c-.28.163-.599.247-.925.247zm7.100-8.139c0-1.916-1.293-2.426-4.029-2.784-2.767-.362-3.044-.548-3.044-1.188 0-.528.235-1.233 2.258-1.233 1.807 0 2.473.389 2.747 1.607.024.105.115.182.221.182h1.141c.063 0 .124-.025.169-.069.045-.045.069-.106.063-.169-.174-2.062-1.505-3.019-4.341-3.019-2.484 0-3.963 1.048-3.963 2.805 0 1.947 1.51 2.489 3.935 2.727 2.898.283 3.138.707 3.138 1.26 0 .977-.785 1.39-2.633 1.39-2.326 0-2.838-.583-3.011-1.742-.021-.11-.111-.191-.221-.191h-1.141c-.118 0-.213.096-.213.214 0 1.256.683 2.755 4.586 2.755 2.746-.001 4.339-1.08 4.339-2.965z"/></svg>
    },
    { 
      name: 'MongoDB', 
      color: '#47A248',
      svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/></svg>
    },
    { 
      name: 'Git', 
      color: '#F05032',
      svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg>
    },
    { 
      name: 'GitHub', 
      color: '#181717',
      svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
    },
    { 
      name: 'Framer Motion', 
      color: '#0055FF',
      svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/></svg>
    },
    { 
      name: 'GSAP', 
      color: '#88CE02',
      svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 15.734c-.394.787-1.331 1.05-2.118.656-.787-.394-1.05-1.331-.656-2.118.394-.787 1.331-1.05 2.118-.656.787.394 1.05 1.331.656 2.118zm-2.362-7.577c-.394.787-1.331 1.05-2.118.656-.787-.394-1.05-1.331-.656-2.118.394-.787 1.331-1.05 2.118-.656.787.394 1.05 1.331.656 2.118zm-7.064 0c-.394.787-1.331 1.05-2.118.656-.787-.394-1.05-1.331-.656-2.118.394-.787 1.331-1.05 2.118-.656.787.394 1.05 1.331.656 2.118zm0 7.577c-.394.787-1.331 1.05-2.118.656-.787-.394-1.05-1.331-.656-2.118.394-.787 1.331-1.05 2.118-.656.787.394 1.05 1.331.656 2.118z"/></svg>
    },
    { 
      name: 'Vercel', 
      color: '#000000',
      svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>
    },
    { 
      name: 'Netlify', 
      color: '#00C7B7',
      svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.13 9.68 22 7.39v-.11l-.26-.32c-.78-.77-2.6-1.61-4.34-2.27L15.06 6l-2.06 2.06 2.06 2.06 2.07-2.06v1.62zm-4.93 4.93-2.06-2.06-2.06 2.06 2.06 2.06 2.06-2.06zm-5.07-5.07L5.07 7.48 2.01 10.54l2.06 2.06 2.06-2.06 1.0-1.0zm7.13 7.13 2.06 2.06 3.06-3.06-2.06-2.06-2.06 2.06-1.0 1.0zm-9.19-9.19L2.01 4.42 0 6.43v.11l.26.32c.78.77 2.6 1.61 4.34 2.27L6.94 8l2.06-2.06-2.06-2.06-1.87 1.87zm14.26 14.26 3.06-3.06V18.5l-.26.32c-.78.77-2.6 1.61-4.34 2.27L15.06 20l-2.06-2.06 2.06-2.06 2.07 2.06v-1.62zm-7.13-7.13 2.06-2.06L12 7.48 9.94 9.54l2.06 2.06 2.06-2.06-1.0-1.0zm-4.93 4.93 2.06 2.06 3.06-3.06-2.06-2.06-2.06 2.06-1.0 1.0z"/></svg>
    },
  ];

  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Meet Tobiloba
          </h2>
          
          <div className="grid md:grid-cols-2  items-center">
            {/* Hover Card - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <HoverCard
                image={cards[0].image}
                title={cards[0].title}
                description={cards[0].description}
              />
            </motion.div>

            {/* Text Content - Right Side */}
            <div className="flex flex-col justify-center text-center flex-1">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                A Computer Science graduate from <span className="font-semibold text-gray-900 dark:text-gray-100">Sokoto State University</span> and a passionate <span className="font-semibold text-gray-900 dark:text-gray-100">Full Stack Web Developer</span>. I enjoy transforming ideas into scalable, user-centric products that blend innovation, clean design, and practical problem-solving to create lasting impact. Outside of coding, I'm into <span className="font-semibold">movies, anime, and music</span>. I'm also passionate about continuous learning, staying consistent, and constantly improving my craft.
              </p>

             
            </div>
          </div>

          {/* Tech Stack Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-block"
              >
            

              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-600 dark:text-gray-400 text-xs uppercase tracking-widest mt-3 font-semibold"
              >
               
              </motion.p>
            </div>
            
            <div className="relative overflow-hidden py-8">
              {/* Scrolling container with GSAP */}
              <div
                ref={scrollRef}
                className="flex gap-8 will-change-transform"
              >
                {/* Double the array for seamless infinite loop */}
                {[...techStack, ...techStack].map((tech, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0"
                  >
                    <div 
                      className="w-16 h-16 text-white dark:text-white" 
                    >
                      {tech.svg}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
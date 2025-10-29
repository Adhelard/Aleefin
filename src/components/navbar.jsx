import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
// Impor hook yang diperlukan dari Framer Motion
import { motion, useScroll, useSpring } from 'framer-motion'; 
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Navbar = ({ toggleTheme, theme }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // === EFEK SCROLL PROGRESS DIMULAI ===
  // 1. Hook useScroll untuk mendeteksi progres scroll halaman
  const { scrollYProgress } = useScroll();
  
  // 2. Gunakan useSpring untuk membuat animasi progress bar lebih halus
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  // === EFEK SCROLL PROGRESS SELESAI ===

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = isScrolled 
    ? 'bg-cream/80 dark:bg-navy/80 backdrop-blur-md shadow-lg' // Gunakan dark:
    : 'bg-transparent';

  return (
    <motion.nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 py-4 ${navClasses}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 3. Tambahkan elemen progress bar di sini */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 bg-accent-yellow origin-left" 
        style={{ scaleX }} // Terapkan spring
      />

      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* ... (sisa kode navbar Anda tetap sama) ... */}
        <div className="text-2xl font-bold font-heading text-black-text dark:text-white-text">
          Aleefin
        </div>
        <div className="flex items-center space-x-6">
          <ul className="hidden md:flex space-x-6">
            {['hero', 'about', 'skills', 'experience', 'projects', 'contact'].map((section) => (
              <li key={section}>
                <motion.div
                  whileHover={{ scale: 1.1, textShadow: "0px 0px 8px #F5C600" }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={section}
                    smooth={true}
                    duration={500}
                    className="text-black-text dark:text-white-text hover:text-accent-yellow cursor-pointer transition-colors capitalize"
                  >
                    {section}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full text-black-text dark:text-navy bg-accent-yellow hover:opacity-80 transition-opacity"
          >
            {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
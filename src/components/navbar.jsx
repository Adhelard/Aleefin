// components/navbar.jsx
import React from 'react'; // Menghapus useState, useEffect
import { Link } from 'react-scroll';
// Menghapus useScroll dan useSpring
import { motion } from 'framer-motion'; 
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Navbar = ({ toggleTheme, theme }) => {
  // Menghapus logic isScrolled

  return (
    <motion.nav
      // Mengubah posisi dari 'fixed top-0' ke 'fixed bottom-8'
      // Menambahkan 'left-1/2 -translate-x-1/2' untuk memusatkan
      // Menambahkan 'rounded-full shadow-xl' untuk efek "island"
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-xl rounded-full`}
      initial={{ y: 100, opacity: 0 }} // Animasi masuk dari bawah
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {/* Progress bar dihapus */}

      {/* Mengubah container agar sesuai dengan 'island' */}
      <div className="px-6 py-3 flex items-center space-x-6">
        {/* Logo 'Aleefin' dihapus agar navbar tetap ringkas */}
        
        {/* Tautan navigasi dan tombol digabungkan */}
        <ul className="hidden md:flex space-x-6">
          {['hero', 'about', 'skills', 'experience', 'projects', 'contact'].map((section) => (
            <li key={section}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={section}
                  smooth={true}
                  duration={500}
                  // Mengganti warna teks agar lebih halus
                  className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white cursor-pointer transition-colors capitalize text-sm font-medium"
                >
                  {section}
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
        <button 
          onClick={toggleTheme} 
          // Mengubah style tombol agar lebih menyatu dengan desain
          className="p-2 rounded-full text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
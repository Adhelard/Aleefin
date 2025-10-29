import React, { useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Impor ScrollTrigger
import { motion } from 'framer-motion';
// components/hero.jsx
// ... (imports tetap sama)

const Hero = () => {
  // ... (hooks useRef dan useEffect tetap sama)

  return (
    <section id="hero" ref={heroRef} className="h-screen min-h-[700px] flex items-center justify-center relative overflow-hidden">
      {/* ... (SVG wave Anda tetap di sini) ... */}
      
      <div className="text-center z-10 max-w-3xl mx-auto px-6">
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6 text-black-text dark:text-white-text">
          {/* font-pixel dihapus */}
          hello there,I'm Arifin Ali 🖐️
        </h1>
        <p ref={descRef} className="text-xl md:text-2xl text-black-text/80 dark:text-white-text/80 mb-10 font-body">
                  Software Developer & UI/UX Enthusiast. 
                  or, just student?.
        </p>
        {/* ... (sisa kode tombol tetap sama) ... */}
      </div>
    </section>
  );
};

export default Hero;
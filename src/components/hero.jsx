import React, { useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Impor ScrollTrigger
import { motion } from 'framer-motion';

// Pastikan ScrollTrigger terdaftar (meskipun sudah di App.jsx, ini praktik yang baik)
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrambleTextPlugin) 

const Hero = () => {
  const heroRef = useRef(null); // Ref untuk seluruh section
  const titleRef = useRef(null); // Ref untuk judul (h1)
  const descRef = useRef(null); // Ref untuk deskripsi (p)
  const buttonsRef = useRef(null); // Ref untuk grup tombol

  useEffect(() => {
    // Animasi fade-in standar
    gsap.fromTo(
      [titleRef.current, descRef.current, buttonsRef.current],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, delay: 0.5, ease: "power3.out" }
      );
      
    gsap.to(titleRef.current, {
        duration: 2, 
        scrambleText: "hello there,I'm Arifin Ali 🖐️"
    });

    // === EFEK PARALLAX DIMULAI ===
    gsap.to(titleRef.current, {
      y: -150, // Gerakkan judul ke atas sejauh 150px
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current, // Pemicu adalah section hero
        start: "top top", // Mulai saat bagian atas hero bertemu bagian atas viewport
        end: "bottom top", // Selesai saat bagian bawah hero bertemu bagian atas viewport
        scrub: 1, // Buat animasi terikat langsung dengan scroll (1 detik 'delay')
      },
    });

    gsap.to([descRef.current, buttonsRef.current], {
      y: -100, // Gerakkan deskripsi & tombol lebih lambat
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5, // 'Delay' lebih lama = gerakan lebih lambat
      },
    });
    // === EFEK PARALLAX SELESAI ===

  }, []);

  return (
    <section id="hero" ref={heroRef} className="h-screen min-h-[700px] flex items-center justify-center relative overflow-hidden">
      {/* ... (SVG wave Anda tetap di sini) ... */}
      
      <div className="text-center z-10 max-w-3xl mx-auto px-6">
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-pixel font-bold mb-6 text-black-text dark:text-white-text">
          hello there,I'm Arifin Ali 🖐️
        </h1>
        <p ref={descRef} className="text-xl md:text-2xl text-black-text/80 dark:text-white-text/80 mb-10 font-body">
                  Software Developer & UI/UX Enthusiast. 
                  or, just student?.
        </p>
        <div ref={buttonsRef} className="space-x-4">
          
          <Link to="projects" smooth={true} duration={500}>
            <motion.button
              className="bg-accent-yellow text-black-text px-8 py-3 rounded-md font-semibold hover:bg-amber-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Lihat Proyek Saya
            </motion.button>
          </Link>
          <Link to="contact" smooth={true} duration={500}>
            <motion.button
              className="border border-accent-yellow text-accent-yellow px-8 py-3 rounded-md font-semibold hover:bg-accent-yellow hover:text-black-text transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Hubungi Saya
            </motion.button>
          </Link>
        
        </div>
      </div>
    </section>
  );
};

export default Hero;
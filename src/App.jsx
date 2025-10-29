// App.jsx
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Impor ScrollTrigger
import Lenis from '@studio-freight/lenis'; // Impor Lenis

// Impor Komponen Anda
import SplashScreen from './components/splashscreen';
import Navbar from './components/navbar';
import Hero from './components/hero';
import About from './components/about';
import Skills from './components/skills';
import Experience from './components/experience';
import Projects from './components/projects';
import Contact from './components/contact';
import CursorFollower from './components/Cursorfollower';
import { ThemeProvider, useTheme } from './Themecontext';

// Daftarkan plugin GSAP
gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // === EFEK SCROLL DIMULAI DI SINI ===
  useEffect(() => {
    if (showSplash) return; // Jangan jalankan lenis jika splash masih ada

    // 1. Inisialisasi Lenis
    const lenis = new Lenis({
      duration: 1.2, // Durasi animasi scroll (lebih lambat = lebih halus)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing
      smoothTouch: true,
    });

    // 2. Hubungkan Lenis dengan ScrollTrigger GSAP
    // Ini memberi tahu ScrollTrigger untuk menggunakan nilai scroll dari Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Jalankan lenis pada setiap frame
    });
    gsap.ticker.lagSmoothing(0);

    // 3. Buat proxy untuk ScrollTrigger (PENTING)
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    // Refresh ScrollTrigger setelah semuanya dimuat
    ScrollTrigger.refresh();

    return () => {
      // Cleanup
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [showSplash]); // Jalankan hanya setelah splash hilang
  // === EFEK SCROLL SELESAI ===


  // ... (Efek particle Anda tetap di sini)
  useEffect(() => {
    if (showSplash) return;
    const particlesContainer = document.querySelector('.particle-bg');
    if (particlesContainer && particlesContainer.children.length === 0) {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        const size = Math.random() * 40 + 20 + 'px';
        particle.style.width = size;
        particle.style.height = size;
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = Math.random() * 10 + 10 + 's';
        particlesContainer.appendChild(particle);
      }
    }
  }, [showSplash]);

  return (
    <div
      className={`
        font-body transition-colors duration-500 
        bg-cream text-black-text 
        dark:bg-navy dark:text-white-text
      `}
    >
      <div className="particle-bg"></div>
      <CursorFollower />
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          <Navbar toggleTheme={toggleTheme} theme={theme} />
          {/* Kita bungkus konten utama dalam <main> untuk Lenis */}
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
}

// ... (Komponen App utama tetap sama)
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
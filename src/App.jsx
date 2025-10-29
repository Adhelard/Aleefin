// App.jsx
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

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

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showSplash) return; 

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

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

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [showSplash]); 

  return (
    <div
      className={`
        font-body transition-colors duration-500 
        bg-white text-gray-900
        dark:bg-gray-950 dark:text-gray-100
      `}
    >
      {/* <div className="particle-bg"></div> (Dihapus agar lebih bersih) */}
      <CursorFollower />
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          <Navbar toggleTheme={toggleTheme} theme={theme} />
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

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
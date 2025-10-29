import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrambleTextPlugin) 



const SplashScreen = () => {
  const containerRef = useRef();
  const logoRef = useRef();

  useEffect(() => {
      const tl = gsap.timeline();
      
      gsap.to(logoRef.current, {
          duration: 2,
          scrambleText: 'Hola!, yo soy Arifin!.',
      })
    // Animasi logo masuk
    tl.fromTo(logoRef.current, 
      { scale: 0.5, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 3, ease: "back.out(1.7)" })
    // Animasi logo dan background fade out
    .to([logoRef.current, containerRef.current], 
      { opacity: 0, duration: 2, delay: 1, ease: "power2.inOut" }); 
  }, []);

  return (
    // Gunakan warna navy (gelap) untuk splash
    <div ref={containerRef} className="fixed inset-0 bg-navy flex items-center justify-center z-50">
      <div ref={logoRef} className="text-white-text font-pixel text-6xl font-heading"> {/* Terapkan font-heading */}
        Hola!, yo soy Aleefin!
      </div>
    </div>
  );
};

export default SplashScreen;
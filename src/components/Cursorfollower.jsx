// components/Cursorfollower.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CursorFollower = () => {
  const cursorRef = useRef(null);

  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  
  const speed = 0.15; 
  
  // Mengubah ukuran cursor agar jauh lebih kecil (w-3 = 12px)
  const cursorSize = 12; 
  const cursorHalf = cursorSize / 2;

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    const updateCursor = () => {
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;

      pos.current.x += dx * speed;
      pos.current.y += dy * speed;
      
      xSet(pos.current.x - cursorHalf);
      ySet(pos.current.y - cursorHalf);
    };

    gsap.ticker.add(updateCursor);

    const moveMouse = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', moveMouse);

    // --- Efek Hover Dihapus ---
    // Efek hover (scale/opacity) dihilangkan agar lebih minimalis

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      gsap.ticker.remove(updateCursor);
    };
  }, []); 

  return (
    <div 
      ref={cursorRef} 
      // Mengubah w-32 h-32 menjadi w-3 h-3
      // Menghapus mix-blend-difference
      className="fixed top-0 left-0 w-3 h-3 bg-accent-yellow rounded-full pointer-events-none z-50" 
    ></div>
  );
};

export default CursorFollower;
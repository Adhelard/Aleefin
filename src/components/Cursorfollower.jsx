// components/Cursorfollower.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CursorFollower = () => {
  const cursorRef = useRef(null);

  // Kita simpan posisi 'halus' (pos) dan posisi 'target' (mouse)
  // Gunakan ref agar nilainya tetap ada di antara render
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  
  // === INI KUNCINYA ===
  // Faktor 'kehalusan'. Semakin kecil, semakin 'mengikuti' (laggy)
  // 1.0 = kaku (instan), 0.1 = sangat halus
  const speed = 0.15; 
  
  // Ukuran cursor Anda (w-32 = 8rem = 128px). 
  // Kita butuh setengahnya untuk offset agar cursor pas di tengah.
  const cursorSize = 128; 
  const cursorHalf = cursorSize / 2;

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // 1. GSAP QuickSetter sangat efisien untuk update di tiap frame
    // Ini menggantikan `gsap.to()` yang lama
    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    // 2. Fungsi yang berjalan di setiap frame (ticker)
    const updateCursor = () => {
      // Hitung 'jarak' antara posisi mouse (target) dan posisi cursor (saat ini)
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;

      // 'Lerp' (Linear Interpolation)
      // Gerakkan cursor 'speed' persen mendekati mouse di setiap frame
      pos.current.x += dx * speed;
      pos.current.y += dy * speed;
      
      // 3. Terapkan posisi yang sudah 'dihaluskan' DENGAN OFFSET
      // Ini akan membuat mouse berada di TENGAH lingkaran, bukan di pojok kiri atas
      xSet(pos.current.x - cursorHalf);
      ySet(pos.current.y - cursorHalf);
    };

    // 4. Tambahkan fungsi update kita ke 'ticker' global GSAP
    gsap.ticker.add(updateCursor);

    // 5. Update posisi mouse 'target' saat mouse bergerak
    const moveMouse = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', moveMouse);

    // --- Efek Hover (Kode ini tetap sama) ---
    const handleMouseEnter = () => gsap.to(cursor, { scale: 1.5, opacity: 0.5, duration: 0.3 });
    const handleMouseLeave = () => gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });

    const interactables = document.querySelectorAll('a, button, [role="button"]');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // --- Cleanup ---
    return () => {
      window.removeEventListener('mousemove', moveMouse);
      gsap.ticker.remove(updateCursor); // Penting untuk membersihkan ticker
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []); // Dijalankan sekali saat mount

  return (
    <div 
      ref={cursorRef} 
      // Posisi 'fixed' di 'top-0 left-0' penting
      // agar GSAP 'x' dan 'y' bekerja dari (0,0) viewport
      className="fixed top-0 left-0 w-32 h-32 bg-accent-yellow rounded-full pointer-events-none z-50 mix-blend-difference" 
    ></div>
  );
};

export default CursorFollower;
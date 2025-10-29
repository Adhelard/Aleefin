import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    { title: 'Frontend & App Developer', company: 'PT. Alkhwarizmi Kreatif Produktif', period: '2025 - Sekarang' },
    { title: 'Official Team Developer', company: 'Sekolah impian', period: '2025' },
];

const Experience = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const timelineRef = useRef(null); // Ref untuk garis vertikal

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%", // Mulai sedikit lebih awal
      }
    });

    // 1. Animasikan garis timeline agar "tumbuh"
    tl.fromTo(timelineRef.current,
      { scaleY: 0, transformOrigin: 'top' },
      { scaleY: 1, duration: 1, ease: 'power2.out' }
    );

    // 2. Animasikan setiap item pengalaman (stagger)
    tl.fromTo(itemsRef.current,
      { opacity: 0, x: -50 }, // Masuk dari kiri
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.4, // Beri jeda lebih lama antar pengalaman
        ease: 'power3.out'
      },
      "-=0.5" // Mulai animasi ini 0.5 detik sebelum animasi garis selesai
    );

  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-6xl font-bold text-center mb-16 text-black-text dark:text-white-text">
          {/* font-pixel dihapus */}
          Experience ⌛
        </h2>
        <div className="relative space-y-10">
          
          {/* Garis Waktu Vertikal - tambahkan ref di sini */}
          <div 
            ref={timelineRef} 
            className="absolute left-2.5 top-2 h-full w-0.5 bg-accent-yellow" // Ubah warna ke aksen
          ></div>

          {experiences.map((exp, index) => (
            <div 
              key={index} 
              ref={el => itemsRef.current[index] = el} 
              className="flex items-start relative pl-10"
              style={{ opacity: 0 }} // Set opacity awal ke 0
            >
              {/* Titik di Garis Waktu */}
              <div className="absolute left-0 top-1.5 w-5 h-5 bg-accent-yellow rounded-full border-4 border-white-card dark:border-gray-card z-10"></div>
              <div>
                <h3 className="text-xl font-semibold text-black-text dark:text-white-text">{exp.title}</h3>
                <p className="text-md text-accent-yellow font-medium">{exp.company}</p>
                <p className="text-sm text-black-text/70 dark:text-white-text/70 mt-1">{exp.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap'; // Impor GSAP
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Impor ScrollTrigger

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'Flutter' },
  { name: 'Tailwind' },
  { name: 'HTML' },
  { name: 'CSS' },
    { name: 'PHP' },
    { name: 'SQL' },
  { name: 'react'},
  { name: 'Firebase' },
  { name: 'JavaScript' },
  { name: 'Arduino (IoT)' },
  { name: 'Machine Learning' },
  { name: 'Desain Grafis' },
  { name: 'Video Editing' },
];

const Skills = () => {
  const sectionRef = useRef(null); // Ref untuk section
  const itemsRef = useRef([]); // Ref untuk array kartu

  useEffect(() => {
    // === EFEK STAGGER DIMULAI ===
    gsap.fromTo(itemsRef.current, 
      { opacity: 0, y: 50, scale: 0.9 }, // Mulai dari
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.5, 
        stagger: 0.1, // Jeda 0.1 detik antar kartu
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current, // Pemicu adalah section
          start: "top 75%", // Mulai saat 75% section terlihat
          toggleActions: "play none none none" // Hanya mainkan sekali saat masuk
        }
      }
    );
    // === EFEK STAGGER SELESAI ===
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 ">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-black-text dark:text-white-text">
          {/* font-pixel dihapus */}
          What can i do? 🕹️
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              ref={el => itemsRef.current[index] = el} 
              style={{ opacity: 0 }} 
              // Mengganti style kartu dari 'bg-amber-200' dan 'border-b-4'
              // menjadi 'border' tipis yang bersih
              className="flex flex-col items-center justify-center p-6 border border-gray-200 dark:border-gray-700 rounded-lg"
              whileHover={{ 
                scale: 1.05, 
                // Mengganti shadow kuning menjadi shadow standar
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                y: -5 
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
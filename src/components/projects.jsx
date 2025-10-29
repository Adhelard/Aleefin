import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: 'QCB A.I', desc: 'Mengembangkan chatbot Islami berbasis materi QCB (Quran, Character Building) dan MK (Materi Kemandirian) di Sekolah Impian.', img: '/assets/', link: '#' },
  { title: 'Jogja Love Palestine', desc: 'Membangun aplikasi filantropi untuk Palestina, berkolaborasi dengan UMKM di Yogyakarta. (Bagaian apps)', img: '/assets/jlp.png', link: '#' },
  { title: 'Smart Islamic Clock', desc: 'Merancang jam pintar berbasis IoT dengan fitur alarm ibadah, puzzle edukatif, dan fitur keluarga lainnya.', img: '/assets/IMG_4051.JPG', link: '../assets/img_4051.jpg' }, // <-- GANTI GAMBAR INI
  { title: 'Portal Sekolah Impian', desc: 'Mengembangkan media sosial internal yang terfokus untuk lingkungan Sekolah Impian.', img: '/assets/psi.png', link: '../assets/psi.png' }, // <-- GANTI GAMBAR INI
  { title: 'Layanan Akun RG', desc: 'Membangun layanan akun untuk lingkungan pengembangan software di Sekolah Impian.', img: '/assets/Akun.png', link: '../assets/akun.png' }, // <-- GANTI GAMBAR INI
  
];

const Projects = () => {
  const cardsRef = useRef([]);
  const sectionRef = useRef();

  useEffect(() => {
    gsap.fromTo(cardsRef.current, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.2, 
      scrollTrigger: { 
        trigger: sectionRef.current, 
        start: "top 70%" 
      }
    });
  }, []);

  return (
    // Gunakan warna dasar (cream/navy)
    <section id="projects" ref={sectionRef} className="py-24 ">
      <div className="container mx-auto px-6">
        <h2 className="text-6xl font-bold font-pixel text-center mb-16 text-black-text dark:text-white-text">Project 👾</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              ref={el => cardsRef.current[index] = el}
              // Gunakan warna kartu (white/gray-card)
              className="bg-white-card dark:bg-gray-card rounded-lg shadow-lg overflow-hidden flex flex-col"
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 40px -15px rgba(245, 198, 0, 0.3)" // Shadow kuning lebih kuat
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <img src={project.img} alt={project.title} className="w-full h-56 object-cover" />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-black-text dark:text-white-text">{project.title}</h3>
                <p className="text-black-text/80 dark:text-white-text/80 mb-4 flex-grow">{project.desc}</p>
                <a 
                  href={project.link} 
                  className="text-accent-yellow font-semibold hover:underline self-start"
                >
                  Lihat Lebih &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
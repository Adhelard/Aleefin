import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion'; // Impor framer-motion
import { BookOpenIcon, CpuChipIcon, SparklesIcon } from '@heroicons/react/24/outline'; // Impor ikon

gsap.registerPlugin(ScrollTrigger);

// --- DATA BARU DARI CV ---
const achievements = [
  {
    icon: <BookOpenIcon className="w-10 h-10 text-accent-yellow" />,
    title: 'Tahfidz & Studi Islam',
    desc: 'Menyelesaikan Ziadah (Hafalan) 30 Juz Al-Qur\'an dan memperoleh Sanad 5 Juz. [cite: 33, 34]',
  },
  {
    icon: <CpuChipIcon className="w-10 h-10 text-accent-yellow" />,
    title: 'Prestasi IT',
    desc: 'Juara 1 Lomba ‘Taqwa.i’ di ARQtion dan Hakesi 2025. [cite: 38]',
  },
  {
    icon: <SparklesIcon className="w-10 h-10 text-accent-yellow" />,
    title: 'Bahasa & Kepemimpinan',
    desc: 'Penghargaan "Zero to Hero" (Bahasa Arab) di Language Fest 2024. [cite: 40]',
  },
];

const pendidikan = [
  { title: 'Tk Al-Istiqamah', location: 'East Jakarta, Indonesia', period: '2014 - 2016' },
  { title: 'SDN Penggilingan 01 Pagi', location: 'East Jakarta, Indonesia', period: '2017 - 2023' },
  { title: 'Quadrant Boarding School ( Sekolah impian )', location: 'Bogor, Indonesia', period: '2023 - Sekarang' },
];
// --- SELESAI DATA BARU ---


const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const achievementsRef = useRef(null);
  const eduTimelineRef = useRef(null);
  const eduItemsRef = useRef([]);

  useEffect(() => {
    // 1. Animasi Judul dan Deskripsi
    gsap.fromTo([titleRef.current, descRef.current],
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
      }
    );

    // 2. Animasi Kartu Pencapaian (Stagger)
    gsap.fromTo(achievementsRef.current.children,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1, scale: 1, duration: 0.5, stagger: 0.2,
        scrollTrigger: { trigger: achievementsRef.current, start: "top 75%" }
      }
    );

    // 3. Animasi Timeline Pendidikan (Mirip Experience)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: eduTimelineRef.current,
        start: "top 80%"
      }
    });

    tl.fromTo(eduTimelineRef.current, // Garis vertikal
      { scaleY: 0, transformOrigin: 'top' },
      { scaleY: 1, duration: 1, ease: 'power2.out' }
    );
    tl.fromTo(eduItemsRef.current, // Item-item
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.3, ease: 'power3.out'
      },
      "-=0.5" // Mulai 0.5 detik sebelum garis selesai
    );

  }, []);

  return (
    // Mengganti background agar sedikit kontras dari section lain
    <section ref={sectionRef} id="about" className="py-32 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-8 max-w-6xl">
        
        {/* --- BAGIAN 1: DESKRIPSI DIRI --- */}
        <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold font-pixel mb-8 text-center text-black-text dark:text-white-text">
          About me? Really?👤
        </h2>
        <p ref={descRef} className="text-black-text/80 dark:text-white-text/80 mb-24 text-lg md:text-xl text-center max-w-4xl mx-auto leading-relaxed">
          {/* (Saya perbaiki typo "aya" menjadi "Saya") */}
          Saya adalah seorang software developer yang antusias dengan teknologi, dengan fokus pada Front-End (Flutter, Tailwind) dan Back-End (PHP, Firebase, SQL). Saya juga memiliki pengalaman dalam pengembangan IoT (Arduino) dan Machine Learning sederhana. Saat ini saya aktif sebagai Anggota Tim Developer di Sekolah Impian dan sedang magang di PT Al Khawarizmi.
        </p>

        {/* --- BAGIAN 2: KARTU PENCAPAIAN --- */}
        <h3 className="text-4xl font-bold font-pixel mb-12 text-black-text dark:text-white-text">
          Pencapaian
        </h3>
        <div ref={achievementsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white-card dark:bg-gray-card p-8 rounded-lg shadow-lg border-2 border-b-4"
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <div className="mb-4">{item.icon}</div>
              <h4 className="text-xl font-semibold mb-2 text-black-text dark:text-white-text">{item.title}</h4>
              <p className="text-black-text/80 dark:text-white-text/80">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* --- BAGIAN 3: TIMELINE PENDIDIKAN --- */}
        <h3 className="text-4xl font-bold font-pixel mb-12 text-black-text dark:text-white-text">
          Pendidikan
        </h3>
        <div className="relative max-w-2xl">
          {/* Garis Waktu Vertikal */}
          <div
            ref={eduTimelineRef}
            className="absolute left-2.5 top-2 h-full w-0.5 bg-accent-yellow"
          ></div>

          <div className="space-y-10">
            {pendidikan.map((edu, index) => (
              <div
                key={edu.title}
                ref={el => eduItemsRef.current[index] = el}
                className="flex items-start relative pl-10"
                style={{ opacity: 0 }} // Opacity awal untuk GSAP
              >
                {/* Titik di Garis Waktu */}
                <div className="absolute left-0 top-1.5 w-5 h-5 bg-accent-yellow rounded-full border-4 border-white dark:border-gray-900 z-10"></div>
                
                <div>
                  <h4 className="text-xl font-semibold text-black-text dark:text-white-text">{edu.title}</h4>
                  <p className="text-sm text-black-text/70 dark:text-white-text/70">{edu.location}</p>
                  <p className="text-md font-medium text-accent-yellow mt-1">{edu.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default About;
import React, { useState } from 'react'; // Import useState
import { motion } from 'framer-motion';
import { EnvelopeIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

const Contact = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // 1. Buat state untuk menampung data form
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    pesan: '',
  });
  const [status, setStatus] = useState(''); // Untuk pesan sukses/error

  // 2. Buat fungsi untuk handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Buat fungsi untuk handle submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah form refresh halaman
    setStatus('Mengirim...');

    try {
      // 4. Kirim data ke API (backend) kita
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('Pesan berhasil terkirim!');
        setFormData({ nama: '', email: '', pesan: '' }); // Kosongkan form
      } else {
        setStatus(`Gagal mengirim: ${result.message}`);
      }
    } catch (error) {
      setStatus('Terjadi kesalahan. Coba lagi nanti.');
    }
    };
  return  (
    // Gunakan warna sekunder (white-card/gray-card)
    <section id="contact" className="p-24 bg-white-card dark:bg-gray-card">
          <div className="rounded-2xl bg-amber-200 border-2 border-b-4 p-16">
          <div className="container mx-auto px-6">
        <motion.h2
          className="text-5xl font-bold font-pixel text-center mb-16 text-black"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Hubungi Saya ☎️
        </motion.h2>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Bagian Kiri: Info Kontak */}
          <motion.div 
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg text-black/80">
              Saya terbuka untuk kolaborasi atau sekadar berdiskusi. Jangan ragu untuk menghubungi saya melalui formulir atau detail kontak di bawah ini.
            </p>
            <a href="mailto:Blackarifin15@gmail.com" className="flex items-center space-x-3 group">
              <EnvelopeIcon className="w-6 h-6 text-accent-yellow"/>
              <span className="text-lg text-black group-hover:underline">Blackarifin15@gmail.com</span>
            </a>
            <a href="https://www.linkedin.com/in/muhammad-arifin-740588386/" className="flex items-center space-x-3 group"> {/* Ganti dengan link LinkedIn */}
              <svg className="w-6 h-6 text-accent-yellow" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span className="text-lg text-black group-hover:underline">LinkedIn</span>
            </a>
          </motion.div>

          {/* Bagian Kanan: Form */}
        <motion.form 
            onSubmit={handleSubmit}
            className="space-y-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <input 
              type="text"
              name="nama" // <-- samakan dengan state
              placeholder="Nama Anda"
              value={formData.nama} // <-- hubungkan ke state
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-cream dark:bg-navy text-black-text dark:text-white-text focus:outline-none focus:ring-2 focus:ring-accent-yellow" 
            />
            <input 
              type="email"
              name="email" // <-- samakan dengan state
              placeholder="Email Anda"
              value={formData.email} // <-- hubungkan ke state
             onChange={handleChange}
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-cream dark:bg-navy text-black-text dark:text-white-text focus:outline-none focus:ring-2 focus:ring-accent-yellow" 
            />
            <textarea 
              name="pesan" // <-- samakan dengan state
              placeholder="Pesan Anda"
              value={formData.pesan} // <-- hubungkan ke state
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg h-36 bg-cream dark:bg-navy text-black-text dark:text-white-text focus:outline-none focus:ring-2 focus:ring-accent-yellow"
            ></textarea>
            <button 
              type="submit" 
              className="w-full bg-accent-yellow text-black-text py-4 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-colors"
            >
              Kirim Pesan
            </button>
            {status && <p className="text-center text-black-text dark:text-white-text">{status}</p>}
          </motion.form>
        </div>
      </div>
        </div>  
    </section>
  );
};

export default Contact;
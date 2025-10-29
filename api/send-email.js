import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { nama, email, pesan } = req.body;

  if (!nama || !email || !pesan) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  try {
    const data = await resend.emails.send({
      from: 'Pesan Portofolio <onboarding@resend.dev>', // Email ini HANYA untuk development
      to: ['Blackarifin15@gmail.com'], // Email Anda
      subject: `Pesan Baru dari ${nama}`,
      html: `
        <p>Anda mendapat pesan baru dari portofolio:</p>
        <p><strong>Nama:</strong> ${nama}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Pesan:</strong></p>
        <p>${pesan}</p>
      `,
    });

    res.status(200).json({ message: 'Email terkirim', data });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengirim email', error });
  }
}
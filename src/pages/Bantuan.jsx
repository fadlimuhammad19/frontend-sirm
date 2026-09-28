import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  { q: "Bagaimana cara menambah data pasien baru?", a: "Buka menu 'Data Pasien' di sidebar, lalu klik tombol 'Tambah Pasien' di kanan atas. Isi form yang muncul, lalu klik Simpan." },
  { q: "Bagaimana cara mencetak kartu identitas pasien?", a: "Buka detail pasien dengan klik nama pasien di tabel, lalu klik tombol 'Cetak Kartu' di halaman detail." },
  { q: "Bagaimana cara mengganti password saya?", a: "Klik menu 'Ganti Password' di sidebar, isi password lama dan password baru, lalu klik Perbarui Password." },
  { q: "Apa bedanya role Admin, Dokter, dan Kasir?", a: "Tiap role punya akses menu berbeda. Admin bisa akses semua menu, sedangkan Dokter dan Kasir hanya bisa akses menu yang relevan dengan tugasnya." },
  { q: "Bagaimana cara import data pasien dari Excel?", a: "Di halaman Data Pasien, klik tombol 'Import Excel', lalu pilih file Excel kamu. Pastikan kolom sesuai dengan yang diminta (nama, nik, no_bpjs)." },
  { q: "Kenapa saya tidak bisa mengakses menu tertentu?", a: "Setiap role punya batasan akses menu masing-masing. Kalau merasa seharusnya bisa akses, hubungi Admin sistem." },
];

export default function Bantuan() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>
      <PageHeader
        title="Bantuan / FAQ"
        subtitle="Pertanyaan yang sering diajukan seputar penggunaan SIMRS"
        gradient="from-sky-600 via-cyan-600 to-teal-600"
      />

      <div className="bg-white rounded-2xl shadow-md border border-slate-100 divide-y divide-slate-100">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex justify-between items-center px-5 py-4 text-left hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <HelpCircle size={18} className="text-sky-600 flex-shrink-0" />
                <span className="font-medium text-slate-700">{faq.q}</span>
              </div>
              <ChevronDown size={18} className={`text-slate-400 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
            </button>
            {openIndex === i && <div className="px-5 pb-4 pl-11 text-sm text-slate-600">{faq.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
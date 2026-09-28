const dummyKamar = [
  {
    id: 1, nama: "VIP 101", tipe: "VIP", lantai: 1,
    tempatTidur: [{ id: "101-A", status: "kosong", pasien: null }],
  },
  {
    id: 2, nama: "Kelas 1 - 201", tipe: "Kelas 1", lantai: 2,
    tempatTidur: [
      { id: "201-A", status: "terisi", pasien: "Budi Santoso" },
      { id: "201-B", status: "kosong", pasien: null },
    ],
  },
  {
    id: 3, nama: "Kelas 2 - 202", tipe: "Kelas 2", lantai: 2,
    tempatTidur: [
      { id: "202-A", status: "terisi", pasien: "Siti Aminah" },
      { id: "202-B", status: "dibersihkan", pasien: null },
      { id: "202-C", status: "kosong", pasien: null },
    ],
  },
  {
    id: 4, nama: "Kelas 3 - 301", tipe: "Kelas 3", lantai: 3,
    tempatTidur: [
      { id: "301-A", status: "kosong", pasien: null },
      { id: "301-B", status: "kosong", pasien: null },
      { id: "301-C", status: "terisi", pasien: "Agus Hidayat" },
      { id: "301-D", status: "kosong", pasien: null },
    ],
  },
];

export default dummyKamar;
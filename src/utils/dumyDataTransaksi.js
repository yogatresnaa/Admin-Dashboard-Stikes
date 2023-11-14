const getDataTransaksi = () => {
  return [
    {
      id: 1,
      title: 'Penerimaan Kas',
      thisMonth: '0',
      thisYear: '20.000.000',
    },
    {
      id: 2,
      title: 'Pengeluaran Kas',
      thisMonth: '0',
      thisYear: '70.000.000',
    },
    {
      id: 3,
      title: 'Pemasukan Kas',
      thisMonth: '0',
      thisYear: '90.000.000',
    },
  ];
};

const dataPosBayar = [
  {
    id: 1,
    KodeAkun: '4-40102 - Catering TK',
    AkunPiutang: '1-11101 - Piutang Siswa TK',
    NamaPos: 'Catering TK',
    Keterangan: 'Uang Catering Siswa',
  },
  {
    id: 2,
    KodeAkun: '4-40305 - Buku Paket SMP',
    AkunPiutang: '1-11501 - Piutang Siswa SMP',
    NamaPos: 'BP SMAN 1',
    Keterangan: 'SP ( SUMBANGAN PENDIDIKAN)',
  },
  {
    id: 3,
    KodeAkun: '4-40305 - Buku Paket SMK',
    AkunPiutang: '1-11501 - Piutang Siswa SMP',
    NamaPos: 'BP SMAN 1',
    Keterangan: 'SP ( SUMBANGAN PENDIDIKAN)',
  },

  {
    id: 4,
    KodeAkun: '4-40102 - Catering TK',
    AkunPiutang: '1-11101 - Piutang Siswa TK',
    NamaPos: 'Catering TK',
    Keterangan: 'Uang Catering Siswa',
  },
  {
    id: 5,
    KodeAkun: '4-40305 - Buku Paket SMP',
    AkunPiutang: '1-11501 - Piutang Siswa SMP',
    NamaPos: 'BP SMAN 1',
    Keterangan: 'SP ( SUMBANGAN PENDIDIKAN)',
  },
  {
    id: 6,
    KodeAkun: '4-40305 - Buku Paket SMK',
    AkunPiutang: '1-11501 - Piutang Siswa SMP',
    NamaPos: 'BP SMAN 1',
    Keterangan: 'SP ( SUMBANGAN PENDIDIKAN)',
  },

  {
    id: 7,
    KodeAkun: '4-40102 - Catering TK',
    AkunPiutang: '1-11101 - Piutang Siswa TK',
    NamaPos: 'Catering TK',
    Keterangan: 'Uang Catering Siswa',
  },
  {
    id: 8,
    KodeAkun: '4-40305 - Buku Paket SMP',
    AkunPiutang: '1-11501 - Piutang Siswa SMP',
    NamaPos: 'BP SMAN 1',
    Keterangan: 'SP ( SUMBANGAN PENDIDIKAN)',
  },
  {
    id: 9,
    KodeAkun: '4-40305 - Buku Paket SMK',
    AkunPiutang: '1-11501 - Piutang Siswa SMP',
    NamaPos: 'BP SMAN 1',
    Keterangan: 'SP ( SUMBANGAN PENDIDIKAN)',
  },
];

const dataAkunBiaya = [
  {
    id: 1,
    KodeAkun: '1-10000',
    Keterangan: 'Kas Bank BRI Syariah SMA',
    JenisAkun: 'Sub Akun 2',
    Kategori: 'Keuangan',
    UnitSekolah: 'Uang Catering Siswa',
  },
  {
    id: 2,
    KodeAkun: '1-10800',
    Keterangan: 'Aktiva SMA',
    JenisAkun: 'Sub Akun 1',
    Kategori: '#',
    UnitSekolah: 'SMA',
  },
];

export { getDataTransaksi, dataPosBayar, dataAkunBiaya };

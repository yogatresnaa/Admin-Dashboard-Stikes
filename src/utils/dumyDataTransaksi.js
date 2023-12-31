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

const saldoAwal = [
  {
    id: 1,
    KodeAkun: '1-1000',
    Keterangan: 'AKTIVA',
    Debit: '-',
    Kredit: '-',
  },
  {
    id: 2,
    KodeAkun: 'Kas Tunai',
    Keterangan: 'Aktiva SMK',
    Debit: '-',
    Kredit: '-',
  },
  {
    id: 3,
    KodeAkun: '1-3000',
    Keterangan: 'Kas SMK',
    Debit: '0',
    Kredit: '0',
  },
];

const kasKeluar = [
  {
    id: 1,
    Kas: 'Kas Tunai',
    NoRef: 'GKTK000356745421122302',
    Tanggal: '30/12/2023',
    KodeAkun: '5-50105 - Biaya Biaya ',
    Keterangan: 'Gaji y',
    Nominal: ' 2.115.000',

    Pajak: '0%',
    UnitPos: '...',
    Total: '2.115.000',
  },
  {
    id: 2,
    Kas: 'Kas Tunai',
    NoRef: 'GKSMPx30122301',
    Tanggal: '29/12/2023',
    KodeAkun: '5-50103 - Biaya Kirim Setoran',
    Keterangan: 'Transfer Kas ke akun Kas Bank BRI Syariah SMA',
    Nominal: 'Rp. 2.115.000',

    Pajak: '0%',
    UnitPos: '...',
    Total: '2.115.000',
  },
  {
    id: 3,
    Kas: 'Kas Tunai',
    NoRef: 'JKTK2912230001',
    Tanggal: '21/12/2023',
    KodeAkun: '5-50201 - Biaya Gaji',
    Keterangan: 'Gaji Kepala Sekolah',
    Nominal: 'Rp. 1.000.000',

    Pajak: '0%',
    UnitPos: '...',
    Total: 'Rp. 1.000.000',
  },
];

export { getDataTransaksi, dataPosBayar, dataAkunBiaya, saldoAwal, kasKeluar };

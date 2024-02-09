import React from 'react';
import DataTable from 'react-data-table-component';
import { kasKeluar } from '../../../../utils/dumyDataTransaksi';

function TableKasMasuk() {
  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: true,
      width: '65px',
    },
    {
      name: 'Kas',
      selector: (row) => row.Kas,
      sortable: true,
    },
    {
      name: 'No.Ref',
      selector: (row) => row.NoRef,
      sortable: true,
    },

    {
      name: 'Tanggal',
      selector: (row) => row.Tanggal,
      sortable: true,
    },
    {
      name: 'Kode AKun',
      selector: (row) => row.KodeAkun,
      sortable: true,
    },
    {
      name: 'Keterangan',
      selector: (row) => row.Keterangan,
      sortable: true,
    },
    {
      name: 'Nominal',
      selector: (row) => row.Nominal,
      sortable: true,
    },
    {
      name: 'Pajak',
      selector: (row) => row.Pajak,
      sortable: true,
    },

    {
      name: 'Unit Pos',
      selector: (row) => row.UnitPos,
      sortable: true,
    },
    {
      name: 'Total(Rp)',
      selector: (row) => row.Total,
      sortable: true,
    },
    {
      name: 'Aksi',
      selector: (row) => row.Kredit,
      sortable: true,
    },
  ];
  return (
    <div>
      <DataTable columns={columns} data={kasKeluar} pagination />
    </div>
  );
}

export default TableKasMasuk;

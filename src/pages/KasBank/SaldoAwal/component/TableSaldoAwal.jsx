import React from 'react';
import DataTable from 'react-data-table-component';
import { saldoAwal } from '../../../../utils/dumyDataTransaksi';

function TableSaldoAwal() {
  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: 'Kode Akun',
      selector: (row) => row.KodeAkun,
      sortable: true,
    },
    {
      name: 'Keterangan',
      selector: (row) => row.Keterangan,
      sortable: true,
    },

    {
      name: 'Debit',
      selector: (row) => row.Debit,
      sortable: true,
    },
    {
      name: 'Kredit',
      selector: (row) => row.Kredit,
      sortable: true,
    },
  ];
  return (
    <div>
      <DataTable columns={columns} data={saldoAwal} pagination />
    </div>
  );
}

export default TableSaldoAwal;

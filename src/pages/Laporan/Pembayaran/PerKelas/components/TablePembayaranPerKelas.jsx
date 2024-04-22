import React from 'react';
import DataTable from 'react-data-table-component';
import { PembayaranPerkelas } from '../../../../../utils/dumyDataTransaksi';
import Table from 'react-bootstrap/Table';


function TablePembayaranPerKelas() {

      const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: 'NIS',
      selector: (row) => row.NIS,
      sortable: true,
    },
    {
      name: 'Nama',
      selector: (row) => row.Nama,
      sortable: true,
    },

    {
      name: 'Tagihan',
      selector: (row) => row.Tagihan,
      sortable: true,
    },
    {
      name: 'Sudah Dibayar',
      selector: (row) => row.SudahDibayar,
      sortable: true,
    },

       {
      name: 'Kekurangan',
      selector: (row) => row.Kekurangan,
      sortable: true,
    },

    {
      name: 'Keterangan',
      selector: (row) => row.Keterangan,
      sortable: true,
    },

  ];
    return(
        <div>
            <DataTable columns={columns} data={PembayaranPerkelas} pagination  />
        </div>
    )
}

export default TablePembayaranPerKelas
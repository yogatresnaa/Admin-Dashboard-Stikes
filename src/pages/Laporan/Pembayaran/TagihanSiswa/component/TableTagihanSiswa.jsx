import React from 'react';
import DataTable from 'react-data-table-component';
import { dataTagihanSiswa } from '../../../../../utils/dumyDataTransaksi';
import { FaFilePdf, FaAlignJustify } from "react-icons/fa";
import Button from "react-bootstrap/Button";

function TableTagihanSiswa() {




    const renderActionButton = (row) => (
    <div className='d-flex gap-1'>
      <Button
        color="warning"
        size="sm"
        data-tooltip-id="my-tooltip" data-tooltip-content="Ubah"

        id={row.ID}>
        <span style={{ fontSize: "0.8em", color: "white" }}><FaAlignJustify/> Rincian</span>
       
      </Button>
      <Button
        variant="info"
        className="text-white"
        color="danger"
        size="sm"
        data-tooltip-id="my-tooltip" data-tooltip-content="Hapus"

       
        id={row.ID}>
        <span style={{ fontSize: "0.8em", color: "white" }}><FaFilePdf/> Cetak</span>
      </Button>
    </div>
  );



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
      name: 'Kelas',
      selector: (row) => row.Kelas,
      sortable: true,
    },
    {
      name: 'Total Tagihan',
      selector: (row) => row.TotalTagihan,
      sortable: true,
    },

    {
 
      name: 'Aksi',
      cell: (row) => renderActionButton(row), 
      width: "250px",

    }
  ];
  return (
    <div>
      <DataTable columns={columns} data={dataTagihanSiswa} selectableRows  />
    </div>
  );
}

export default TableTagihanSiswa;

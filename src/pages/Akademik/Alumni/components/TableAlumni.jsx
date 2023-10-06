import React from 'react';
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function TableAlumni() {
  const columns = [
    {
      name: 'NO',
      selector: (row) => row.no,
    },
    {
      name: 'Kode Akun',
      selector: (row) => row.KodeAkun,
    },
    {
      name: 'Keterangan',
      selector: (row) => row.Keterangan,
    },
    {
      name: 'Jenis Akun',
      selector: (row) => row.JenisAkun,
    },
    {
      name: 'Kategori',
      selector: (row) => row.Kategori,
    },
    {
      name: 'Semester',
      selector: (row) => row.Semester,
    },

    {
      name: 'Aksi',
      // cell: (row) => ActionButton(row),
      // ignoreRowClick: true,
      // allowOverflow: true,
      // button: true,
      // width: '200px',
    },
  ];
  const data = [
    {
      id: 1,
      no: '1',
      KodeAkun: '2021',
      Keterangan: 'ok',
      JenisAkun: 'a',
      Kategori: 'ya',
      Semester: '2',
    },
    {
      id: 2,
      no: '2',
      KodeAkun: '2033',
      Keterangan: 'ok',
      JenisAkun: 'A',
      Kategori: 'ya',
      Semester: '1',
    },
    {
      id: 3,
      no: '3',
      KodeAkun: '433',
      Keterangan: 'ok',
      JenisAkun: 'A',
      Kategori: 'ya',
      Semester: '5',
    },
  ];
  return (
    <div className='table-kelulusan'>
      <DataTable title='Movie List' columns={columns} data={data} pagination />
    </div>
  );
}

export default TableAlumni;

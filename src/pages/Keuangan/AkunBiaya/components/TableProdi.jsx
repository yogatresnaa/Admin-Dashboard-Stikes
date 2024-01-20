import React from 'react';
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';

function TableProdi({ data }) {
  const renderActionButton = (row) => (
    <div className='d-flex gap-1'>
      <Button
        color='warning'
        size='sm'
        onClick={() => {
          onClickEditHandler(row);
        }}
        id={row.ID}>
        <FaRegEdit />
      </Button>
      <Button
        variant='info'
        className='text-white'
        color='danger'
        size='sm'
        onClick={() => {
          onClickDeleteHandler(row);
        }}
        id={row.ID}>
        <FaRegTrashAlt />
      </Button>
    </div>
  );

  const columns = [
    {
      name: 'NO',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Nama Program Keahlian',
      selector: (row) => row.nama_program_studi,
    },
    {
      name: 'Singkatan',
      selector: (row) => row.singkatan,
    },
    {
      name: 'ID Prodi',
      selector: (row) => row.id_program_studi,
    },
    {
      name: 'Nama Prodi',
      selector: (row) => row.nama_prodi,
    },

    {
      name: 'Aksi',
      cell: (row) => renderActionButton(row),
      ignoreRowClick: true,
      allowOverflow: true,
      width: '200px',
    },
  ];
  return (
    <div>
      <DataTable title='Movie List' columns={columns} data={data} pagination />;
    </div>
  );
}

export default TableProdi;

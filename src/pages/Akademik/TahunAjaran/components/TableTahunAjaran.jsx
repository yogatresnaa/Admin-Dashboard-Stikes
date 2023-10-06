import React from 'react';
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FaRegTrashAlt, FaRegEdit, FaCheck } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa6';

function TableTahunAjaran() {
  const ActionButton = (row) => (
    <div className='d-flex gap-1'>
      <OverlayTrigger overlay={<Tooltip id='tooltip-disabled'>Edit</Tooltip>}>
        <span className='d-inline-block'>
          <Button
            color='secondary'
            size='sm'
            onClick={() => {
              onClickDetailShowHandler(row);
            }}
            id={row.ID}>
            <FaRegEdit />
          </Button>
        </span>
      </OverlayTrigger>

      <OverlayTrigger overlay={<Tooltip id='tooltip-disabled'>Hapus</Tooltip>}>
        <span className='d-inline-block'>
          <Button
            color='secondary'
            className='text-white'
            size='sm'
            variant='info'
            onClick={() => {
              onClickDetailShowHandler(row);
            }}
            id={row.ID}>
            <FaRegTrashAlt />
          </Button>
        </span>
      </OverlayTrigger>

      <OverlayTrigger overlay={<Tooltip id='tooltip-disabled'>Aktifkan</Tooltip>}>
        <span className='d-inline-block'>
          <Button
            color='secondary'
            variant='success'
            size='sm'
            onClick={() => {
              onClickDetailShowHandler(row);
            }}
            id={row.ID}>
            <FaCheck />
          </Button>
        </span>
      </OverlayTrigger>
    </div>
  );

  const statusActionButton = (row) => (
    <div className='d-flex gap-1'>
      <Button
        color='secondary'
        size='sm'
        onClick={() => {
          onClickDetailShowHandler(row);
        }}
        id={row.ID}>
        Aktif
      </Button>
    </div>
  );

  const columns = [
    {
      name: 'NO',
      selector: (row) => row.no,
    },
    {
      name: 'Tahun Ajaran',
      selector: (row) => row.TahunAjaran,
    },
    {
      name: 'Status',
      cell: (row) => statusActionButton(row),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '250px',
    },

    {
      name: 'Aksi',
      cell: (row) => ActionButton(row),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '200px',
    },
  ];

  const data = [
    {
      id: 1,
      no: '1',
      TahunAjaran: '2021',
    },
    {
      id: 2,
      no: '2',
      TahunAjaran: '2021',
    },
    {
      id: 3,
      no: '3',
      TahunAjaran: '2021',
    },
  ];

  return (
    <>
      <div>
        <DataTable title='Tahun Ajaran' columns={columns} data={data} pagination />;
      </div>
    </>
  );
}

export default TableTahunAjaran;

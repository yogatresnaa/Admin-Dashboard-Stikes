import React from 'react';
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FaUnlockAlt, FaRegEdit, FaPrint } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa6';

function TableAlumni() {
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

      <OverlayTrigger overlay={<Tooltip id='tooltip-disabled'>Lihat</Tooltip>}>
        <span className='d-inline-block'>
          <Button
            color='secondary'
            variant='dark'
            size='sm'
            onClick={() => {
              onClickDetailShowHandler(row);
            }}
            id={row.ID}>
            <FaRegEye />
          </Button>
        </span>
      </OverlayTrigger>
    </div>
  );
  const columns = [
    {
      name: 'NO',
      selector: (row) => row.no,
    },
    {
      name: 'NIS',
      selector: (row) => row.NIS,
    },
    {
      name: 'Nama',
      selector: (row) => row.Nama,
    },
    {
      name: 'Unit',
      selector: (row) => row.Unit,
    },
    {
      name: 'Prodi',
      selector: (row) => row.Prodi,
    },
    {
      name: 'Aksi',
      cell: (row) => ActionButton(row),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '250px',
    },
  ];
  const data = [
    {
      id: 1,
      no: '1',
      NIS: '2021',
      Nama: 'ok',
      Unit: 'a',
      Prodi: 'ya',
    },
    {
      id: 2,
      no: '2',
      NIS: '2021',
      Nama: 'ok',
      Unit: 'a',
      Prodi: 'ya',
    },
    {
      id: 3,
      no: '3',
      NIS: '2021',
      Nama: 'ok',
      Unit: 'a',
      Prodi: 'ya',
    },
  ];
  return (
    <div className='table-kelulusan'>
      <DataTable title='Movie List' columns={columns} data={data} pagination />
    </div>
  );
}

export default TableAlumni;

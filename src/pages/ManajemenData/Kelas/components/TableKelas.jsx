import React from 'react';
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
function TableKelas({ data, subHeaderComponent, resetPaginationToggle, isLoading, onClickEditHandler, onClickDeleteHandler }) {
  const renderActionButton = (row) => (
    <div className='d-flex gap-1'>
      <Button
        color='warning'
        size='sm'
        data-tooltip-id='my-tooltip'
        data-tooltip-content='Ubah'
        onClick={() => {
          console.log('ubah');
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
        data-tooltip-id='my-tooltip'
        data-tooltip-content='Hapus'
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
      sortable: true,
    },
    {
      name: 'ID Kelas',
      selector: (row) => row.class_id,
      sortable: true,
    },
    {
      name: 'Nama Kelas',
      selector: (row) => row.class_name,
      sortable: true,
    },

    {
      name: 'Aksi',
      cell: (row) => renderActionButton(row),

      width: '200px',
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={data} pagination subHeader subHeaderComponent={subHeaderComponent} paginationResetDefaultPage={resetPaginationToggle} progressPending={isLoading} />
      <Tooltip id='my-tooltip' />
    </div>
  );
}

export default TableKelas;

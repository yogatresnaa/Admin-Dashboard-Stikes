import React from 'react';
import DataTable from 'react-data-table-component';
import { columns, data } from '../templateColumnKelas';

function TableKelas() {
  return (
    <>
      <div>
        <DataTable columns={columns} data={data} pagination />;
      </div>
    </>
  );
}

export default TableKelas;

import React from 'react';
import DataTable from 'react-data-table-component';
import { columns, data } from '../templateColumSiswa';

function TableSiswa() {
  return (
    <>
      <div>
        <DataTable columns={columns} data={data} selectableRows pagination />;
      </div>
    </>
  );
}

export default TableSiswa;

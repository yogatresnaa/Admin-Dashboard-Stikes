import React from 'react';
import DataTable from 'react-data-table-component';
import { columns, data } from '../../../../utils/data';

function TableAlumni() {
  return (
    <div className='table-kelulusan'>
      <DataTable title='Movie List' columns={columns} data={data} pagination />
    </div>
  );
}

export default TableAlumni;

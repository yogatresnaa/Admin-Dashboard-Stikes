import React from 'react';
import TableKelas from '../../Kesiswaan/TableKelas';
import AddAction from '../../../component/ActionButton/AcctionAddButoon';

function PageKelas() {
  return (
    <>
      <div className='page-kelas'>
        <h3>Kelas List</h3>

        <div className='table-kelas'>
          <AddAction />
          <TableKelas />
        </div>
      </div>
    </>
  );
}

export default PageKelas;

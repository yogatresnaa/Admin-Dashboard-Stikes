import React from 'react';
import TableKelas from './components/TableKelas';
import AddAction from '../../../component/ActionButton/AcctionAddButoon';
import SelectBasicExample from '../../../component/ActionButton/SelectMenu';
import ShowDataEnteris from '../../../component/ActionButton/showEntries';

function PageKelas() {
  return (
    <>
      <div className='page-kelas'>
        <h3>Kelas List</h3>

        <div className='table-kelas'>
          <AddAction />
          <SelectBasicExample />
          <ShowDataEnteris />
          <TableKelas />
        </div>
      </div>
    </>
  );
}

export default PageKelas;

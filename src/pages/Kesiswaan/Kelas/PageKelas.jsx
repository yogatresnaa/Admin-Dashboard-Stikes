import React from 'react';
import TableKelas from './components/TableKelas';
import AddAction from '../../../component/ActionButton/AcctionAddButoon';
import SelectBasicExample from '../../../component/ActionButton/SelectMenu';
import ShowDataEnteris from '../../../component/ActionButton/showEntries';
import SearchInput from '../../../component/ActionButton/SearchInput';

function PageKelas() {
  return (
    <>
      <div className='page-kelas'>
        <span> PAGE PRODI</span>
        <div className='table-kelas'>
          <AddAction />
          <SelectBasicExample />
          <div className='search'>
            <ShowDataEnteris />
            <SearchInput />
          </div>
          <TableKelas />
        </div>
      </div>
    </>
  );
}

export default PageKelas;

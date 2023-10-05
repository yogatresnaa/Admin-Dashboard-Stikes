import React from 'react';
import TableTahunAjaran from './components/TableTahunAjaran';
import AddAction from '../../../component/ActionButton/AcctionAddButoon';
import SearchInput from '../../../component/ActionButton/SearchInput';
import ShowDataEnteris from '../../../component/ActionButton/showEntries';

function PageTahunAjaran() {
  return (
    <>
      <div className='tahun-ajaran'>
        <span>Tahun Ajaran</span>
        <div className='table-ajaran'>
          <AddAction />
          <div className='search'>
            <ShowDataEnteris />
            <SearchInput />
          </div>

          <TableTahunAjaran />
        </div>
      </div>
    </>
  );
}

export default PageTahunAjaran;

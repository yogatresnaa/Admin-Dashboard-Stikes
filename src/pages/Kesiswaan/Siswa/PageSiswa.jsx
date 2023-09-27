import React from 'react';
import TableSiswa from './components/TableSiswa';
import AddAction from '../../../component/ActionButton/AcctionAddButoon';
import ShowDataEnteris from '../../../component/ActionButton/showEntries';
import SearchInput from '../../../component/ActionButton/SearchInput';
import SelectBasicExample from '../../../component/ActionButton/SelectMenu';
import SelectUnitKelas from '../../../component/ActionButton/SelectUnitKelas';
import SelectStatusMahasiswa from '../../../component/ActionButton/SelectStatusMahasiswa';
import MenuBarPageMahasiswa from '../../../component/ActionButton/MenuBarPageMahasiswa';

function PageSiswa() {
  return (
    <>
      <div className='page-siswa'>
        <h1>INI PAGE SISWA</h1>
        <div className='table-siswa'>
          <div className='menu-bar'>
            <AddAction />
            <MenuBarPageMahasiswa />
          </div>

          <div className='select'>
            <SelectUnitKelas />
            <SelectStatusMahasiswa />
            <SelectBasicExample />
          </div>

          <div className='search-siswa'>
            <ShowDataEnteris />
            <SearchInput />
          </div>
          <TableSiswa />
        </div>
      </div>
    </>
  );
}

export default PageSiswa;

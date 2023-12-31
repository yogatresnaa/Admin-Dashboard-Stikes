import React, { useEffect, useMemo, useRef, useState } from 'react';
import TableSaldoAwal from './component/TableSaldoAwal';
import SelectUnitKelas from '../../../component/ActionButton/SelectUnitKelas';
import useRequest from '../../../customHooks/useRequest';
import { getAllKelas } from '../../../utils/http';
import queryString from 'query-string';

import { useSelector } from 'react-redux';

function PageSaldoAwal() {
  // const {
  //   data: dataSiswa,
  //   setData: setDataSiswa,
  //   sendData: sendDataSiswa,
  //   setDataDetail: setDataDetailSiswa,
  //   dataDetail: dataDetailSiswa,
  //   getData: getDataSiswa,
  //   isLoading: isLoadingSiswa,
  //   setIsLoading: setIsLoadingSiswa,
  //   isLoadingSendData: isLoadingSendDataSiswa,
  //   filterText,
  //   onChangeFilterText,
  // } = useRequest();

  const { data: dataKelas, setData: setDataKelas, getData: getDataKelas } = useRequest();
  // const { data: dataProdi, setData: setDataProdi, getData: getDataProdi } = useRequest();

  const dataUser = useSelector(({ authState }) => authState.data);
  const [queryFilter, setQueryFilter] = useState({
    class_id: '',
    status: '',
    majors_id: '',
  });

  useEffect(() => {
    // const query = queryString.stringify(queryFilter);
    getDataKelas(() => getAllKelas(dataUser.token));
  }, []);

  const onQueryFilterChange = (e) => {
    setQueryFilter((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className='page-content'>
      <h3>
        Saldo Awal <span style={{ fontSize: '0.8em', color: 'gray' }}>List</span>
      </h3>
      <div className='table-content'>
        <div style={{ width: '200px' }}>
          <SelectUnitKelas data={dataKelas.data} onProdiFilterChange={onQueryFilterChange} value={queryFilter.class_id} />
        </div>
        <TableSaldoAwal />
      </div>
    </div>
  );
}

export default PageSaldoAwal;

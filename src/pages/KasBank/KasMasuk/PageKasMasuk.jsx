import React, { useEffect, useMemo, useRef, useState } from 'react';
import TableKasMasuk from './components/TableKasMasuk';
import SelectUnitKelas from '../../../component/ActionButton/SelectUnitKelas';
import useRequest from '../../../customHooks/useRequest';
import { getAllKelas } from '../../../utils/http';
import AddAction from '../../../component/ActionButton/AcctionAddButoon';
import queryString from 'query-string';

import { useSelector } from 'react-redux';

function PageKasMasuk() { 
    const { data: dataKelas, setData: setDataKelas, getData: getDataKelas } = useRequest();
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
    return(
         <div className='page-content'>
                <h3>
                    Kas Masuk <span style={{ fontSize: '0.8em', color: 'gray' }}>List</span>
                </h3>
                <div className='table-content'>
                    <AddAction />
                    <div style={{ width: '200px', margin: '10px' }}>
                    <SelectUnitKelas data={dataKelas.data} onProdiFilterChange={onQueryFilterChange} value={queryFilter.class_id} />
                    </div>
                    <TableKasMasuk />
                </div>
    </div>
    )
}

export default PageKasMasuk;
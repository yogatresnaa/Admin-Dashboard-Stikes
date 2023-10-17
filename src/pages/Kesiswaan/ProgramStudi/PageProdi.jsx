import React, { useEffect, useMemo } from 'react';
import TableProdi from './components/TableProdi';
import AddAction from '../../../component/ActionButton/AcctionAddButoon';
import SearchInput from '../../../component/ActionButton/SearchInput';
import useRequest from '../../../customHooks/useRequest';
import { getAllProdi } from '../../../utils/http';
import { useSelector } from 'react-redux';

function PageProdi({ data }) {
  const {
    data: dataProdi,
    setData: setDataProdi,
    getData: getDataProdi,
    isLoading: isLoadingProdi,
    setIsLoading: setIsLoadingProdi,
    resetPaginationToggle,
    filterText,
    setResetPaginationToggle,
    onChangeFilterText,
  } = useRequest({ isFetch: true });
  const dataUser = useSelector(({ authState }) => authState.data);

  useEffect(() => {
    getDataProdi(() => getAllProdi(dataUser.token));
  }, []);

  const subHeaderComponent = useMemo(() => {
    const onClearHandler = () => {
      if (filterText) {
        setFilterText('');
        setResetPaginationToggle(!resetPaginationToggle);
      }
    };

    return <SearchInput filterText={filterText} setFilterText={onChangeFilterText} />;
  });
  return (
    <div className='page-prodi'>
      <h3>
        Prodi <span style={{ fontSize: '0.8em', color: 'gray' }}>List</span>
      </h3>

      <div className='table-prodi'>
        <AddAction />
        <TableProdi data={filterText.length > 0 ? dataProdi.filter : dataProdi.data} subHeaderComponent={subHeaderComponent} resetPaginationToggle={resetPaginationToggle} isLoading={isLoadingProdi} />
      </div>
    </div>
  );
}

export default PageProdi;

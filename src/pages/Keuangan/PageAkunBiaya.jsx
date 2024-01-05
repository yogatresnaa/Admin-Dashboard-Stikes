import React, { useEffect, useMemo, useState, useRef } from 'react';
import TableAkunBiaya from './component/AkunBiaya';
import SearchInput from '../../component/ActionButton/SearchInput';
import SelectProdi from '../../component/ActionButton/SelectProdi';
import SelectUnitKelas from '../../component/ActionButton/SelectUnitKelas';
import { Button } from 'reactstrap';
import { getAllProdi, putProdi, deleteProdi, postProdi, putAlumni, deleteSiswa, postSiswa, getAllKelas, getAllAlumni } from '../../utils/http';
import useRequest from '../../customHooks/useRequest';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import useTable from '../../customHooks/useTable';

function PageAkunBiaya() {
  const {
    data: dataAlumni,
    setData: setDataAlumni,
    sendData: sendDataAlumni,
    setDataDetail: setDataDetailAlumni,
    dataDetail: dataDetailAlumni,
    getData: getDataAlumni,
    isLoading: isLoadingSiswa,
    setIsLoading: setIsLoadingAlumni,
    isLoadingSendData: isLoadingSendDataAlumni,
    filterText,
    onChangeFilterText,
  } = useRequest();
  const { data: dataProdi, setData: setDataProdi, getData: getDataProdi } = useRequest();
  const { data: dataKelas, setData: setDataKelas, getData: getDataKelas } = useRequest();
  const { setIsOpenModalTambah, isOpenModalEdit, isOpenModalTambah, resetPaginationToggle, setResetPaginationToggle, setIsOpenModalEdit, isOpenModalForm, setIsOpenModalForm, isEdit, setIsEdit } = useTable();

  const dataUser = useSelector(({ authState }) => authState.data);
  const [queryFilter, setQueryFilter] = useState({
    class_id: '',
    status: '',
    majors_id: '',
  });

  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  //  const printComponent = useRef();

  useEffect(() => {
    const query = queryString.stringify(queryFilter);
    getDataAlumni(() => getAllAlumni(query, dataUser.token));
    getDataProdi(() => getAllProdi(dataUser.token));
    getDataKelas(() => getAllKelas(dataUser.token));
  }, []);

  const onCLickFilterSubmit = () => {
    const query = queryString.stringify(queryFilter);
    getDataAlumni(() => getAllAlumni(query, dataUser.token));
  };

  const onClickTambahHandler = () => {
    setIsOpenModalForm(!isOpenModalForm);
    setIsEdit(false);
  };
  //   const onClickEditHandler = (item) => {
  //     console.log(item);
  //     setDataDetailAlumni((prevState) => ({
  //       ...prevState,
  //       ...item,
  //       student_born_date: item.student_born_date == '0000-00-00' ? item.student_born_date : dateConvertForDb(item.student_born_date),
  //     }));
  //     setIsEdit(true);
  //     setIsOpenModalForm(!isOpenModalForm);
  //   };

  const onQueryFilterChange = (e) => {
    setQueryFilter((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const subHeaderComponent = useMemo(() => {
    const onClearHandler = () => {
      if (filterText) {
        onChangeFilterText('');
        setResetPaginationToggle(!resetPaginationToggle);
      }
    };

    return <SearchInput filterText={filterText} setFilterText={onChangeFilterText} />;
  }, [filterText, onChangeFilterText, resetPaginationToggle, setResetPaginationToggle]);

  const dataFiltered = useMemo(() => dataKelas.data.filter((item) => item.class_name.toString().toLowerCase().includes(filterText.toLocaleLowerCase())), [filterText, dataKelas.data]);
  return (
    <div className='page-content'>
      <h3>
        Akun Biaya <span style={{ fontSize: '0.8em', color: 'gray' }}>List</span>
      </h3>

      <div className='table-content'>
        <div className='d-flex flex-row gap-1 justify-content-start align-items-center mt-2'>
          <SelectProdi data={dataProdi.data} onProdiFilterChange={onQueryFilterChange} value={queryFilter.majors_id} />
          <SelectUnitKelas data={dataKelas.data} onProdiFilterChange={onQueryFilterChange} value={queryFilter.class_id} />
          <Button size='sm' className='align-self-end'>
            {' '}
            Cari{' '}
          </Button>
        </div>
        <SearchInput />
        <TableAkunBiaya data={filterText.length > 0 ? dataFiltered : dataKelas.data} subHeaderComponent={subHeaderComponent} />
      </div>
    </div>
  );
}

export default PageAkunBiaya;

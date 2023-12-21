import React, { useEffect, useMemo, useState } from 'react'
import { Link, createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { Col, Input, Row, FormGroup, Button } from 'reactstrap';
import CustomSelect from '../../../../component/Select/CustomSelect';
import ErrorComponent from '../../../../component/Form/ErrorComponent';
import { payType } from '../../../../utils/CONSTANT';
import { AiOutlineRollback, AiOutlinePlusCircle, AiFillEdit } from "react-icons/ai";
import './styles/style.css';
import useRequest from '../../../../customHooks/useRequest';
import { useSelector } from 'react-redux';
import { getAllKelas, getAllPaymentRateByPayment } from '../../../../utils/http';
import TableTarifTagihan from './components/TableTarifTagihan';
import useTable from '../../../../customHooks/useTable';
import SearchInput from '../../../../component/ActionButton/SearchInput';
import queryString from 'query-string';
export default function PageTarifTagihan() {

  const location = useLocation();
  const { data } = location.state;
  const navigate = useNavigate();
  const {
    data: dataPaymentRate,
    setData: setDataPaymentRate,
    sendData: sendDataPaymentRate,
    setDataDetail: setDataDetailPaymentRate,
    dataDetail: dataDetailPaymentRate,
    getData: getDataPaymentRate,
    isLoading: isLoadingPaymentRate,
    setIsLoading: setIsLoadingPaymentRate,
    isLoadingSendData: isLoadingSendDataPaymentRate,
    filterText,
    onChangeFilterText,
  } = useRequest();

  const {
    setIsOpenModalTambah,
    isOpenModalEdit,
    isOpenModalTambah,
    resetPaginationToggle,
    setResetPaginationToggle,
    setIsOpenModalEdit,
    isOpenModalForm,
    setIsOpenModalForm,
    isEdit,
    setIsEdit,
  } = useTable();
  const {
    data: dataKelas,
    setData: setDataKelas,
    getData: getDataKelas,
  } = useRequest();
  const dataUser = useSelector(({ authState }) => authState.data);
  const [queryFilter, setQueryFilter] = useState({
    class_id: "",
    period: `${data.period_start}/${data.period_end}`,

  });



  const subHeaderComponent = useMemo(() => {
    const onClearHandler = () => {
      if (filterText) {
        onChangeFilterText("");
        setResetPaginationToggle(!resetPaginationToggle);
      }
    };

    return (
      <SearchInput filterText={filterText} setFilterText={onChangeFilterText} />
    );
  }, [
    filterText,
    onChangeFilterText,
    resetPaginationToggle,
    setResetPaginationToggle,
  ]);

  useEffect(() => {
    getDataKelas(() => getAllKelas(dataUser.token))
    console.log(queryFilter)
    console.log(data)
    getDataPaymentRate(() => getAllPaymentRateByPayment(queryString.stringify(queryFilter), data.payment_id))
  }, [])

  const dataFiltered = useMemo(
    () =>
      dataPaymentRate.data.filter(
        (item) =>
          item.class_name
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase()) ||
          item.student_full_name
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase()) ||
          item.period_start
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase()) ||
          item.period_end
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase()) ||
          item.pos_pay_name
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase()) ||
          item.payment_type
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase())
      ),
    [filterText, dataPaymentRate.data]
  );

  const onBackHandler = () => {
    navigate(-1)
  }
  return (
    <>
      <div className="page-content">
        {/* <ToastContainer /> */}
        <h3>
          Tarif Tagihan <span style={{ fontSize: "0.8em", color: "gray" }}>Detail</span>
        </h3>

        <div className="table-content d-flex flex-column gap-3">
          <h4 style={{ fontSize: '1.1rem' }}>
            Tarif - <span style={{ fontSize: "0.9em", color: "gray" }}>{`${data.pos_pay_name} - T.A ${data.period_start}/${data.period_end}`}</span>
          </h4>
          <Row md={4} noGutters className='gap-3'>
            <Row md={1} noGutters>
              <Col md={3} className='justify-content-center align-items-center d-flex'>
                <p className='section-title'>Tahun</p>
              </Col>
              <Col md={9}>
                <Input style={{ fontSize: '0.8rem', height: '100%' }} value={`${data.period_start} / ${data.period_end}`} disabled />
              </Col>
            </Row>
            <Row md={1} noGutters>
              <Col md={3} className='justify-content-center align-items-center d-flex'>
                <p className='section-title'>Kelas</p>
              </Col>
              <Col md={9}>
                <CustomSelect
                  data={dataKelas.data}
                  labelName="Kelas"
                  optionName="class_name"
                  optionValue={"class_id"}
                  symbol="/"
                  includeAll={true}
                  withLabel={false}
                  onChange={(e) => setQueryFilter(prevState => ({ ...prevState, class_id: e.target.value }))}
                  value={queryFilter.class_id}
                  name="class_id"
                />

              </Col>
            </Row>
            <Row md={1} noGutters>
              <Col md={8} className='justify-content-center align-items-center d-flex'>
                <Button color='success' onClick={() => getDataPaymentRate(() => getAllPaymentRateByPayment(queryString.stringify(queryFilter), data.payment_id))}>Cari / tampilkan</Button>

              </Col>
            </Row>
          </Row>
          <div style={{ borderBottom: '0.5px solid gray' }}></div>
          <Row md={6} noGutters className='gap-1 align-items-center'>
            <Col md={1} >
              <p className='section-title'>Setting Tarif</p>
            </Col>

            <Col md={2} >
              <Link to={{
                pathname: '/admin/tarif-tagihan/91/tambah', search: createSearchParams({
                  type: "tambah"
                }).toString()
              }}>
                <Button size='sm' className='button-setting-tarif d-flex align-items-center text-white justify-content-center  ' color='primary'><AiOutlinePlusCircle size={15} color='white' /> Berdasarkan Kelas</Button>
              </Link>
            </Col>
            <Col md={2} >
              <Button size='sm' className='button-setting-tarif d-flex align-items-center text-white justify-content-center ' color='info'><AiOutlinePlusCircle size={15} color='white' />Berdasarkan Siswa</Button>
            </Col>
            <Col md={2} >
              <Button size='sm' className='button-setting-tarif d-flex align-items-center text-white justify-content-center ' color='warning'><AiFillEdit size={15} color='white' /> Edit Tarif Bebas per Kelas</Button>

            </Col>
            <Col md={1} >
              <Button size='sm' className='button-setting-tarif d-flex align-items-center text-white justify-content-center ' color='secondary'><AiOutlineRollback size={15} color='white' onClick={onBackHandler} /> kembali</Button>
            </Col>
          </Row>

        </div>
        <div className="table-content d-flex flex-column gap-3 mt-4">
          <TableTarifTagihan subHeaderComponent={subHeaderComponent} data={dataFiltered} isLoading={isLoadingPaymentRate} />


        </div>
      </div>

    </>
  )
}

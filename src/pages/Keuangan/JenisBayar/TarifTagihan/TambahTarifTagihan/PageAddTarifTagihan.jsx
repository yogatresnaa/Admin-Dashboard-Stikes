import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Col, Input, Row, FormGroup, Button, InputGroup } from 'reactstrap';
import CustomSelect from '../../../../../component/Select/CustomSelect';
import ErrorComponent from '../../../../../component/Form/ErrorComponent';
import { monthArray, monthField, payType } from '../../../../../utils/CONSTANT';
import { AiOutlineRollback, AiOutlinePlusCircle, AiFillEdit } from "react-icons/ai";
import './styles/style.css';
import useRequest from '../../../../../customHooks/useRequest';
import { useSelector } from 'react-redux';
import { getAllKelas, getAllPaymentRateByPayment, getDetailPaymentRate } from '../../../../../utils/http';
// import TableTarifTagihan from './components/TableTarifTagihan';
import useTable from '../../../../../customHooks/useTable';
import SearchInput from '../../../../../component/ActionButton/SearchInput';

import FormComponent from '../../../../../component/Form/FormComponent';
import { Formik } from 'formik';
import FormInput from './components/FormInputKelas';
import FormInputTarifBulan from './components/FormInputTarifBulan';
import FormInputKelas from './components/FormInputKelas';
import { detailPaymentRateInitialValues, paymentTypeInitialValues } from '../../../../../utils/initialValues';
import { paymentRateSchema } from '../../../../../utils/schema';
import FormInputMonthPayment from './components/FormInputMonthPayment';
import { paymentRateModel } from '../../../../../models/models';
export default function PageAddTarifTagihan() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const {
    data: dataDetailPaymentRate,
    setData: setDataDetailPaymentRate,
    sendData: sendDataPaymentRate,
    getData: getDataDetailPaymentRate,
    isLoading: isLoadingDetailPaymentRate,
    setIsLoading: setIsLoadingDetailPaymentRate,
    isLoadingSendData: isLoadingSendDataDetailPaymentRate,
    filterText,
    onChangeFilterText,
  } = useRequest();
  const {
    data: dataKelas,
    setData: setDataKelas,
    getData: getDataKelas,
  } = useRequest();

  useEffect(() => {
    getDataKelas(() => getAllKelas())
    console.log(location.state.data);
    searchParams.get('type').includes('edit') ? getDataDetailPaymentRate(() => getDetailPaymentRate(location.state.data.payment_rate_id)) : setDataDetailPaymentRate({ data: { ...detailPaymentRateInitialValues, ...location.state.data } })

  }, [])
  console.log(dataDetailPaymentRate)

  const onEnterSameValueHandler = (e, handleChange) => {
    if (e.key == 'Enter') {
      handleChange('fixed_rate', e.target.value)
      for (let key in monthField) {
        const keySplit = key.split('_')
        console.log(keySplit)
        const findMonth = monthArray.filter(item => item.month_name.toLowerCase().includes(keySplit[2].toLowerCase()))
        console.log(findMonth)
        handleChange(`month.month_${findMonth[0].month_name.toLowerCase()}.payment`, e.target.value)
      }
    }
    else {
      return;
    }
  }

  const onAddPaymentRateByClassHandler = async (formBody, { resetForm }) => {
    const newFormBody = paymentRateModel.objectToJSON(formBody)
    // newFormBody.
    console.log(newFormBody)

  }
  console.log(dataDetailPaymentRate.data)
  return (
    <>
      {dataDetailPaymentRate.data.month &&
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{ ...detailPaymentRateInitialValues, ...dataDetailPaymentRate.data }}
          onSubmit={onAddPaymentRateByClassHandler}
          validationSchema={paymentRateSchema}
        >
          {({
            handleChange,
            handleSubmit,

            setFieldValue,
            handleReset,
            values,
            errors,
          }) => (
            <div className="page-content d-flex gap-3 flex-row ">

              <div className='flex-2 flex-column d-flex gap-5'>

                <div className="table-content d-flex flex-column gap-3 ">
                  <h1 className='fs-6 text-start'>Pilih Kelas</h1>
                  <div className='d-flex gap-3 flex-column'>
                    <FormInputKelas
                      btnName={'btnName'}
                      errors={errors}
                      dataKelas={dataKelas.data}
                      dataDetailPaymentRate={dataDetailPaymentRate.data}
                      isEdit={true}
                      values={values}
                      isLoadingSendData={isLoadingSendDataDetailPaymentRate}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                    />



                  </div>
                </div>
                <div className="table-content d-flex flex-column gap-3 ">
                  <h1 className='fs-6 text-start'>Tarif Tiap Bulan Sama</h1>
                  <FormInputTarifBulan
                    btnName={'btnName'}
                    onEnterClickHandler={onEnterSameValueHandler}
                    errors={errors}
                    dataKelas={dataKelas.data}
                    dataDetailPaymentRate={dataDetailPaymentRate.data}
                    isEdit={true}
                    values={values}
                    setFieldValue={setFieldValue}
                    isLoadingSendData={isLoadingSendDataDetailPaymentRate}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                  />
                </div>
              </div>
              <div className="table-content d-flex flex-column gap-3 flex-3 h-auto">
                <h1 className='fs-6 text-start'>Tarif Tiap Bulan Tidak Sama</h1>
                <div className='d-flex gap-3 flex-column'>
                  <FormInputMonthPayment values={values} handleChange={handleChange} errors={errors} setFieldValue={setFieldValue} />



                  <div className='d-flex gap-2'>
                    <Button color='success' onClick={handleSubmit}>Simpan</Button>
                    <Button color='light'>Cancel</Button>
                  </div>


                </div>
              </div>

            </div>
          )}
        </Formik>
      }
    </>
  )
}

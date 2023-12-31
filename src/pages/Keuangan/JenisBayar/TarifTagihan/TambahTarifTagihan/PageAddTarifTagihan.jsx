import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Col, Input, Row, FormGroup, Button, InputGroup } from 'reactstrap';
import CustomSelect from '../../../../../component/Select/CustomSelect';
import ErrorComponent from '../../../../../component/Form/ErrorComponent';
import { monthArray, monthField, payType, paymentType } from '../../../../../utils/CONSTANT';
import { AiOutlineRollback, AiOutlinePlusCircle, AiFillEdit } from "react-icons/ai";
import './styles/style.css';
import useRequest from '../../../../../customHooks/useRequest';
import { useSelector } from 'react-redux';
import { getAllKelas, getAllPaymentRateByPayment, getAllSiswaByQuery, getDetailPaymentRate, postFreePaymentRateByClass, postFreePaymentRateByStudent, postMonthlyPaymentRateByClass, postMonthlyPaymentRateByStudent } from '../../../../../utils/http';
// import TableTarifTagihan from './components/TableTarifTagihan';
import useTable from '../../../../../customHooks/useTable';
import SearchInput from '../../../../../component/ActionButton/SearchInput';
import queryString from 'query-string';
import FormComponent from '../../../../../component/Form/FormComponent';
import { Formik } from 'formik';
import FormInput from './components/FormInputKelas';
import FormInputTarifBulan from './components/FormInputTarifBulan';
import FormInputKelas from './components/FormInputKelas';
import { detailPaymentRateInitialValues, paymentTypeInitialValues } from '../../../../../utils/initialValues';
import { monthlyPaymentRateSchema, freePaymentRateSchema } from '../../../../../utils/schema';
import FormInputMonthPayment from './components/FormInputMonthPayment';
import { monthlyPaymentRateModel, freePaymentRateModel } from '../../../../../models/models';
import { ToastContainer } from 'react-toastify';
import FormInputBebasTagihan from './components/FormInputBebasTagihan';
export default function PageAddTarifTagihan() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const dataUser = useSelector(({ authState }) => authState.data);

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
  const {
    data: dataSiswa,
    setData: setDataSiswa,
    getData: getDataSiswa,
  } = useRequest();
  const [selectedClass, setSelectedClass] = useState({ value: '', isSelected: false })
  useEffect(() => {
    getDataKelas(() => getAllKelas())

    searchParams.get('type').includes('edit') ? getDataDetailPaymentRate(() => getDetailPaymentRate(location.state.data.payment_rate_id)) : setDataDetailPaymentRate({ data: { ...detailPaymentRateInitialValues, ...location.state.data } })

  }, [])

  useEffect(() => {
    if (selectedClass.isSelected) {
      const query = queryString.stringify({ class_id: selectedClass.value })
      getDataSiswa(async () => await getAllSiswaByQuery(query))
      setSelectedClass({ value: '', isSelected: false })
    }
  }, [getDataSiswa, selectedClass.isSelected, selectedClass.value])

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

  const onAddMonthlyPaymentRateByClassHandler = async (formBody, { resetForm }) => {
    const newFormBody = monthlyPaymentRateModel.objectToJSON(formBody)
    newFormBody.type = paymentType.bulanan
    await sendDataPaymentRate(
      () =>
        postMonthlyPaymentRateByClass(
          newFormBody,
          dataUser.token
        ),
      null,
      () => {
        setTimeout(() => {
          navigate(-1)
        }, 2000)
      }
    );
  }

  const onAddMonthlyPaymentRateByStudentHandler = async (formBody, { resetForm }) => {
    const newFormBody = monthlyPaymentRateModel.objectToJSON(formBody)
    newFormBody.type = paymentType.bulanan
    await sendDataPaymentRate(
      () =>
        postMonthlyPaymentRateByStudent(
          newFormBody,
          dataUser.token
        ),
      null,
      () => {
        setTimeout(() => {
          navigate(-1)
        }, 2000)
      }
    );
  }

  const onAddFreePaymentRateByClassHandler = async (formBody, { resetForm }) => {
    const newFormBody = freePaymentRateModel.objectToJSON(formBody)
    newFormBody.type = paymentType.bebas
    await sendDataPaymentRate(
      () =>
        postFreePaymentRateByClass(
          newFormBody,
          dataUser.token
        ),
      null,
      () => {
        setTimeout(() => {
          navigate(-1)
        }, 2000)
      }
    );
  }

  const onAddFreePaymentRateByStudentHandler = async (formBody, { resetForm }) => {
    const newFormBody = freePaymentRateModel.objectToJSON(formBody)
    newFormBody.type = paymentType.bebas
    await sendDataPaymentRate(
      () =>
        postFreePaymentRateByStudent(
          newFormBody,
          dataUser.token
        ),
      null,
      () => {
        setTimeout(() => {
          navigate(-1)
        }, 2000)
      }
    );
  }
  const onChangeClassAndFetchHandler = (handler, value) => {
    handler('student_student_id', '')
    handler('class_class_id', value)
    setSelectedClass(prevState => ({ ...prevState, value: value, isSelected: true }))
  }

  const submitHandler = (formBody, { resetForm }) => {
    console.log(searchParams.get('type'))
    console.log('mantap')

    if (location.state.data?.payment_type.toLowerCase().includes('bulanan')) {
      if (searchParams.get('type').includes('tambah-siswa')) {
        onAddMonthlyPaymentRateByStudentHandler(formBody, { resetForm })
      }
      else if (searchParams.get('type').includes('tambah-kelas')) {
        onAddMonthlyPaymentRateByClassHandler(formBody, { resetForm })
      }
      // else if (searchParams.get('type').includes('edit-kelas')) {
      //   onAddPaymentRateByClassHandler(formBody, { resetForm })
      // }
      // else if (searchParams.get('type').includes('edit-siswa')) {
      //   onAddPaymentRateByClassHandler(formBody, { resetForm })
      // }
    }
    else {
      console.log('mantap')
      console.log(searchParams.get('type'))

      if (searchParams.get('type').includes('tambah-siswa')) {
        onAddFreePaymentRateByStudentHandler(formBody, { resetForm })
      }
      else if (searchParams.get('type').includes('tambah-kelas')) {
        console.log(formBody)

        onAddFreePaymentRateByClassHandler(formBody, { resetForm })
      }
      // else if (searchParams.get('type').includes('edit-kelas')) {
      //   onAddMonthlyPaymentRateByClassHandler(formBody, { resetForm })
      // }
      // else if (searchParams.get('type').includes('edit-siswa')) {
      //   onAddMonthlyPaymentRateByClassHandler(formBody, { resetForm })
      // }
    }
  }
  // console.log(dataSiswa.data)
  return (
    <>
      <ToastContainer />

      {dataDetailPaymentRate.data.month &&
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{ ...dataDetailPaymentRate.data }}
          onSubmit={submitHandler}
          validationSchema={location.state.data?.payment_type.toLowerCase().includes('bulanan') ? monthlyPaymentRateSchema : freePaymentRateSchema}
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
                      locationState={location.state}
                      values={values}
                      type={searchParams.get('type')}
                      isLoadingSendData={isLoadingSendDataDetailPaymentRate}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      dataSiswa={dataSiswa.data}
                      onChangeClassAndFetchHandler={onChangeClassAndFetchHandler}
                      handleSubmit={handleSubmit}
                    />
                  </div>
                </div>
                {location.state.data?.payment_type.toLowerCase().includes('bulanan') &&
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
                }
              </div>
              {location.state.data?.payment_type.toLowerCase().includes('bulanan') ?
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
                :
                <div className="d-flex flex-column gap-3 flex-3" >
                  <div className="table-content">
                    <h1 className='fs-6 text-start'>Tarif Tiap Bulan Tidak Sama</h1>
                    <div className='d-flex gap-3 flex-column'>
                      <FormInputBebasTagihan onChangeClassAndFetchHandler={onChangeClassAndFetchHandler} dataKelas={dataKelas.data} dataSiswa={dataSiswa.data} type={searchParams.get('type')} locationState={location.state} values={values} handleChange={handleChange} errors={errors} setFieldValue={setFieldValue} />
                      <div className='d-flex gap-2'>
                        <Button color='success' onClick={handleSubmit}>Simpan</Button>
                        <Button color='light'>Cancel</Button>
                      </div>
                    </div>
                  </div>
                </div>
              }

            </div>
          )}
        </Formik>
      }
    </>
  )
}

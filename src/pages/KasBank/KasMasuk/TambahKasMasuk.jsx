import React, { useEffect, useMemo, useRef, useState } from 'react'
import SelectUnitKelas from '../../../component/ActionButton/SelectUnitKelas'
import useRequest from '../../../customHooks/useRequest'
import {
    deleteDebit,
    generateCreditNoRef,
    generateDebitNoRef,
    getAllAccountBiayaMasuk,
    getAllAktivaAccountCostPay,
    getAllUnitByUser,
    getDebitNotSubmitted,
    postDebitNotSubmitted,
    postDebitSubmitted,
} from '../../../utils/http'
import { ToastContainer } from 'react-toastify'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import FormTambah from '../components/FormTambah'
import BreadCrumb from '../../../component/BreadCrumb/BreadCrumb'
import FormFilter from '../components/FormFilter'
import TabelTambah from '../components/TabelTambah'
import { Formik } from 'formik'
import { alertConfirmation } from '../../../component/Alert/swalConfirmation'
import { alertType } from '../../../utils/CONSTANT'
import { debitPaymentSchema } from '../../../utils/schema'

const breadCrumbItems = [
    {
        name: 'Kas Masuk',
        linkTo: '/admin/kas-masuk',
    },
    {
        name: 'Tambah Kas',
        // linkTo:'/admin/kas-keluar'
    },
]
function TambahKasMasuk() {
    const navigate = useNavigate()

    const {
        data: dataUnit,
        setData: setDataUnit,
        getData: getDataUnit,
    } = useRequest()
    const { data: dataDebitNotSubmit, getData: getDataDebitNotSubmit } =
        useRequest()
    const {
        data: dataNoRef,
        getData: getDataNoRef,
        setData: setDataNoRef,
    } = useRequest()
    const { data: dataAkunBiaya, getData: getDataAkunBiaya } = useRequest()
    const {
        data: dataAkunKas,
        setData: setDataAkunKas,
        getData: getDataAkunKas,
    } = useRequest()

    const { sendData: sendDataDebitNotSubmitted } = useRequest()
    // const { data: dataProdi, setData: setDataProdi, getData: getDataProdi } = useRequest();

    const dataUser = useSelector(({ authState }) => authState.data)
    const [queryFilter, setQueryFilter] = useState({
        unit_id: '',
    })

    useEffect(() => {
        // const query = queryString.stringify(queryFilter);
        getDataUnit(() => getAllUnitByUser(dataUser.token))
    }, [])

    useEffect(() => {
        if (queryFilter.unit_id) {
            getDataNoRef(() =>
                generateDebitNoRef(
                    {
                        unit_name: dataUnit.data.filter(
                            (item) => item.unit_id == queryFilter.unit_id
                        )[0].unit_name,
                    },
                    dataUser.token
                )
            )
            getDataAkunKas(() =>
                getAllAktivaAccountCostPay(
                    { unit_unit_id: queryFilter.unit_id },
                    dataUser.token
                )
            )
            getDataAkunBiaya(() =>
                getAllAccountBiayaMasuk(
                    { unit_unit_id: queryFilter.unit_id },
                    dataUser.token
                )
            )
        }
    }, [queryFilter.unit_id])

    const fetchDataDebit = () => {
        console.log('fetch')
        getDataDebitNotSubmit(() =>
            getDebitNotSubmitted(
                {
                    unit_id: queryFilter.unit_id,
                    no_ref: dataNoRef.data.no_ref,
                },
                dataUser.token
            )
        )
    }
    useEffect(() => {
        if (dataNoRef?.data?.no_ref && queryFilter.unit_id) fetchDataDebit()
    }, [dataNoRef, queryFilter.unit_id])

    const onQueryFilterChange = (e) => {
        setQueryFilter((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmitTambahHandler = async (formBody, { resetForm }) => {
        const newFormBody = {
            ...formBody,
            unit_unit_id: queryFilter.unit_id,
            debit_no_ref: dataNoRef.data.no_ref,
        }
        console.log(formBody)
        sendDataDebitNotSubmitted(
            () => postDebitNotSubmitted(newFormBody, dataUser.token),
            () => {
                fetchDataDebit(), null
            }
        )
    }
    const onClickDeleteHandler = (id) => {
        alertConfirmation(alertType.delete, async () => {
            await sendDataDebitNotSubmitted(
                () => deleteDebit(id, dataUser.token),
                () => {
                    fetchDataDebit()
                },
                null
            )
        })
    }
    const onClickSubmitAll = (ids) => {
        alertConfirmation(alertType.add, async () => {
            await sendDataDebitNotSubmitted(
                () => postDebitSubmitted({ debit_ids: ids }, dataUser.token),
                () => {
                    getDataNoRef(() =>
                        generateCreditNoRef(
                            {
                                unit_name: dataUnit.data.filter(
                                    (item) =>
                                        item.unit_id == queryFilter.unit_id
                                )[0].unit_name,
                            },
                            dataUser.token
                        )
                    )
                    fetchDataDebit()
                },
                null
            )
        })
    }
    return (
        <div className="page-content d-flex flex-column gap-2">
            <ToastContainer />

            <div className="d-flex justify-content-between">
                <h3>
                    Tambah Kas Masuk{' '}
                    <span style={{ fontSize: '0.8em', color: 'gray' }}>
                        List
                    </span>
                </h3>
                <BreadCrumb items={breadCrumbItems} />
            </div>
            <Formik
                enableReinitialize
                validateOnBlur={false}
                validateOnChange={false}
                initialValues={{
                    debit_date: new Date(),
                    debit_no_ref: '',
                    debit_desc: '',
                    debit_value: '',
                    account_cash_account: '',
                    account_cost_account: '',
                    pos_pos_pay_id: '',
                    debit_tax: '',
                    debit_information: '',
                    unit_unit_id: '',
                }}
                onSubmit={onSubmitTambahHandler}
                validationSchema={debitPaymentSchema}
            >
                {({
                    errors,
                    handleChange,
                    setFieldValue,
                    handleSubmit,
                    values,
                }) => (
                    <>
                        <FormFilter
                            dataUnit={dataUnit.data}
                            dataAkunKas={dataAkunKas}
                            value={values}
                            total={dataDebitNotSubmit.data?.total}
                            error={errors}
                            no_ref={dataNoRef?.data?.no_ref}
                            onQueryFilterChange={onQueryFilterChange}
                            setFieldValue={setFieldValue}
                            queryFilter={queryFilter}
                            type={'debit'}
                            handleChange={handleChange}
                        />
                        <FormTambah
                            dataAkunBiaya={dataAkunBiaya.data}
                            value={values}
                            error={errors}
                            onSubmit={handleSubmit}
                            type={'debit'}
                            setFieldValue={setFieldValue}
                            handleChange={handleChange}
                        />
                        <TabelTambah
                            data={dataDebitNotSubmit.data}
                            type={'debit'}
                            onClickSubmit={onClickSubmitAll}
                            onClickDeleteHandler={onClickDeleteHandler}
                        />
                    </>
                )}
            </Formik>
        </div>
    )
}

export default TambahKasMasuk

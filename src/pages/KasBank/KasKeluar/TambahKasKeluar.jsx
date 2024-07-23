import React, { useEffect, useMemo, useRef, useState } from 'react'
import SelectUnitKelas from '../../../component/ActionButton/SelectUnitKelas'
import useRequest from '../../../customHooks/useRequest'
import {
    deleteKredit,
    generateCreditNoRef,
    getAllAccountBiayaKeluar,
    getAllAktivaAccountCostPay,
    getAllUnitByUser,
    getKreditNotSubmitted,
    postKreditNotSubmitted,
    postKreditSubmitted,
} from '../../../utils/http'
import { ToastContainer } from 'react-toastify'

import AddAction from '../../../component/ActionButton/AcctionAddButoon'
import queryString from 'query-string'
import { useNavigate } from 'react-router-dom'
import Link from '@mui/material/Link'
import { useSelector } from 'react-redux'
import FormTambah from '../components/FormTambah'
import BreadCrumb from '../../../component/BreadCrumb/BreadCrumb'
import FormFilter from '../components/FormFilter'
import TabelTambah from '../components/TabelTambah'
import { Formik } from 'formik'
import { alertConfirmation } from '../../../component/Alert/swalConfirmation'
import { alertType } from '../../../utils/CONSTANT'
import { kreditPaymentSchema } from '../../../utils/schema'

const breadCrumbItems = [
    {
        name: 'Kas Keluar',
        linkTo: '/admin/kas-keluar',
    },
    {
        name: 'Tambah Kas',
        // linkTo:'/admin/kas-keluar'
    },
]
function TambahKasKeluar() {
    const navigate = useNavigate()

    const {
        data: dataUnit,
        setData: setDataUnit,
        getData: getDataUnit,
    } = useRequest()
    const { data: dataKreditNotSubmit, getData: getDataKreditNotSubmit } =
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

    const { sendData: sendDataKreditNotSubmitted } = useRequest()
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
                generateCreditNoRef(
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
                getAllAccountBiayaKeluar(
                    { unit_unit_id: queryFilter.unit_id },
                    dataUser.token
                )
            )
        }
    }, [queryFilter.unit_id])

    const fetchDataKredit = () => {
        getDataKreditNotSubmit(() =>
            getKreditNotSubmitted(
                {
                    unit_id: queryFilter.unit_id,
                    no_ref: dataNoRef.data.no_ref,
                },
                dataUser.token
            )
        )
    }
    useEffect(() => {
        if (dataNoRef?.data?.no_ref && queryFilter.unit_id) fetchDataKredit()
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
            kredit_no_ref: dataNoRef.data.no_ref,
        }
        console.log(dataNoRef.data.no_ref)
        sendDataKreditNotSubmitted(
            () => postKreditNotSubmitted(newFormBody, dataUser.token),
            () => {
                fetchDataKredit()
            }
        )
        // sendDataKredit(()=>)
    }
    const onClickDeleteHandler = (id) => {
        alertConfirmation(alertType.delete, async () => {
            await sendDataKreditNotSubmitted(
                () => deleteKredit(id, dataUser.token),
                () => {
                    fetchDataKredit()
                },
                null
            )
        })
    }
    const onClickSubmitAll = (ids) => {
        alertConfirmation(alertType.add, async () => {
            await sendDataKreditNotSubmitted(
                () => postKreditSubmitted({ kredit_ids: ids }, dataUser.token),
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
                    fetchDataKredit()
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
                    Tambah Kas Keluar{' '}
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
                    kredit_date: new Date(),
                    kredit_no_ref: '',
                    kredit_desc: '',
                    kredit_value: '',
                    account_cash_account: '',
                    account_cost_account: '',
                    pos_pos_pay_id: '',
                    kredit_tax: 0,
                    kredit_information: '',
                    unit_unit_id: '',
                }}
                onSubmit={onSubmitTambahHandler}
                validationSchema={kreditPaymentSchema}
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
                            total={dataKreditNotSubmit.data?.total}
                            error={errors}
                            type={'kredit'}
                            no_ref={dataNoRef?.data?.no_ref}
                            onQueryFilterChange={onQueryFilterChange}
                            setFieldValue={setFieldValue}
                            queryFilter={queryFilter}
                            handleChange={handleChange}
                        />
                        <FormTambah
                            dataAkunBiaya={dataAkunBiaya.data}
                            value={values}
                            error={errors}
                            type={'kredit'}
                            onSubmit={handleSubmit}
                            setFieldValue={setFieldValue}
                            handleChange={handleChange}
                        />
                        <TabelTambah
                            data={dataKreditNotSubmit.data}
                            type={'kredit'}
                            onClickDeleteHandler={onClickDeleteHandler}
                            onClickSubmit={onClickSubmitAll}
                        />
                    </>
                )}
            </Formik>
        </div>
    )
}

export default TambahKasKeluar

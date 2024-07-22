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
    putKreditSubmitted,
} from '../../../utils/http'
import { ToastContainer } from 'react-toastify'

import { useNavigate, useLocation } from 'react-router-dom'
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
        name: 'Page Kas Bank',
        linkTo: '/admin/page-kas-bank',
    },
    {
        name: 'Edit Kas',
        // linkTo:'/admin/kas-keluar'
    },
]
function EditKasKeluar() {
    const navigate = useNavigate()
    const location = useLocation()
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
    const { sendData: sendDataKreditSubmitted } = useRequest()
    // const { data: dataProdi, setData: setDataProdi, getData: getDataProdi } = useRequest();
    console.log(location.state)
    const dataUser = useSelector(({ authState }) => authState.data)
    const [queryFilter, setQueryFilter] = useState({
        unit_id: '',
    })

    useEffect(() => {
        // const query = queryString.stringify(queryFilter);
        getDataUnit(() => getAllUnitByUser(dataUser.token))
    }, [])

    useEffect(() => {
        console.log(location.state.unit_unit_id)
        getDataAkunKas(() =>
            getAllAktivaAccountCostPay(
                { unit_unit_id: location.state.unit_unit_id },
                dataUser.token
            )
        )
        getDataAkunBiaya(() =>
            getAllAccountBiayaKeluar(
                { unit_unit_id: location.state.unit_unit_id },
                dataUser.token
            )
        )
    }, [location.state.unit_unit_id])

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

    const onSubmitEditHandler = async (formBody, { resetForm }) => {
        const newFormBody = {
            ...formBody,
        }
        alertConfirmation(alertType.update, async () => {
            sendDataKreditSubmitted(
                () =>
                    putKreditSubmitted(
                        location.state.kredit_id,
                        newFormBody,
                        dataUser.token
                    ),
                () => {
                    setTimeout(() => navigate('/admin/kas-keluar'), 2000)
                }
            )
        })
    }

    return (
        <div className="page-content d-flex flex-column gap-2">
            <ToastContainer />

            <div className="d-flex justify-content-between">
                <h3>
                    Edit Kas Keluar{' '}
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
                    kredit_date: new Date(location.state.kredit_date),
                    kredit_no_ref: location.state.kredit_no_ref,
                    kredit_desc: location.state.kredit_desc,
                    kredit_value: location.state.kredit_value,
                    account_cash_account: location.state.account_cash_account,
                    account_cost_account: location.state.account_cost_account,
                    pos_pos_pay_id: location.state.pos_pos_pay_id,
                    kredit_tax: location.state.kredit_tax,
                    kredit_information: location.state.kredit_information,
                    unit_unit_id: location.state.unit_unit_id,
                }}
                onSubmit={onSubmitEditHandler}
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
                            isEdit={true}
                            dataUnit={dataUnit.data}
                            dataAkunKas={dataAkunKas}
                            value={values}
                            total={dataKreditNotSubmit.data?.total}
                            error={errors}
                            no_ref={location.state.kredit_no_ref}
                            onQueryFilterChange={onQueryFilterChange}
                            setFieldValue={setFieldValue}
                            type={'kredit'}
                            queryFilter={{
                                unit_id: location.state.unit_unit_id,
                                no_ref: location.state.kredit_no_ref,
                            }}
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
                    </>
                )}
            </Formik>
        </div>
    )
}

export default EditKasKeluar

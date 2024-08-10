import React, { useEffect, useMemo, useRef, useState } from 'react'
import SelectUnitKelas from '../../../component/ActionButton/SelectUnitKelas'
import useRequest from '../../../customHooks/useRequest'
import {
    deleteKredit,
    generateCreditNoRef,
    getAllAccountBiayaMasuk,
    getAllAktivaAccountCostPay,
    getAllUnitByUser,
    getDebitNotSubmitted,
    getKreditNotSubmitted,
    postKreditNotSubmitted,
    putDebitSubmitted,
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
import { debitPaymentSchema, kreditPaymentSchema } from '../../../utils/schema'

const breadCrumbItems = [
    {
        name: 'Kas Keluar',
        linkTo: '/admin/kas-keluar',
    },
    {
        name: 'Edit Kas',
        // linkTo:'/admin/kas-keluar'
    },
]
function EditKasMasuk() {
    const navigate = useNavigate()
    const location = useLocation()
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
    const { sendData: sendDataDebitSubmitted } = useRequest()
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
            getAllAccountBiayaMasuk(
                { unit_unit_id: location.state.unit_unit_id },
                dataUser.token
            )
        )
    }, [location.state.unit_unit_id])

    const fetchDataDebit = () => {
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

    const onSubmitEditHandler = async (formBody, { resetForm }) => {
        const newFormBody = {
            ...formBody,
        }
        alertConfirmation(alertType.update, async () => {
            sendDataDebitSubmitted(
                () =>
                    putDebitSubmitted(
                        location.state.debit_id,
                        newFormBody,
                        dataUser.token
                    ),
                () => {
                    setTimeout(() => navigate('/admin/page-kas-bank'), 2000)
                }
            )
        })
    }

    return (
        <div className="page-content d-flex flex-column gap-2">
            <ToastContainer />

            <div className="d-flex justify-content-between">
                <h3>
                    Edit Kas Masuk{' '}
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
                    debit_date: new Date(location.state.debit_date),
                    debit_no_ref: location.state.debit_no_ref,
                    debit_desc: location.state.debit_desc,
                    debit_value: location.state.debit_value,
                    account_cash_account: location.state.account_cash_account,
                    account_cost_account: location.state.account_cost_account,
                    pos_pos_pay_id: location.state.pos_pos_pay_id,
                    debit_tax: location.state.debit_tax,
                    debit_information: location.state.debit_information,
                    unit_unit_id: location.state.unit_unit_id,
                }}
                onSubmit={onSubmitEditHandler}
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
                            isEdit={true}
                            dataUnit={dataUnit.data}
                            dataAkunKas={dataAkunKas}
                            value={values}
                            total={dataDebitNotSubmit.data?.total}
                            error={errors}
                            no_ref={location.state.debit_no_ref}
                            onQueryFilterChange={onQueryFilterChange}
                            setFieldValue={setFieldValue}
                            type={'debit'}
                            queryFilter={{
                                unit_id: location.state.unit_unit_id,
                                no_ref: location.state.debit_no_ref,
                            }}
                            handleChange={handleChange}
                        />
                        <FormTambah
                            dataAkunBiaya={dataAkunBiaya.data}
                            value={values}
                            error={errors}
                            type={'debit'}
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

export default EditKasMasuk

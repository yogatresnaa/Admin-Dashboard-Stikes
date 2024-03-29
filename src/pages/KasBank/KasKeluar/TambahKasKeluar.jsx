import React, { useEffect, useMemo, useRef, useState } from 'react'
import SelectUnitKelas from '../../../component/ActionButton/SelectUnitKelas'
import useRequest from '../../../customHooks/useRequest'
import {
    getAllAccountBiaya,
    getAllAktivaAccountCostPay,
    getAllKelas,
    getAllUnitByUser,
} from '../../../utils/http'
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
    const { data: dataAkunBiaya, getData: getDataAkunBiaya } = useRequest()
    const {
        data: dataAkunKas,
        setData: setDataAkunKas,
        getData: getDataAkunKas,
    } = useRequest()
    // const { data: dataProdi, setData: setDataProdi, getData: getDataProdi } = useRequest();

    const dataUser = useSelector(({ authState }) => authState.data)
    const [queryFilter, setQueryFilter] = useState({
        unit_id: '',
    })

    useEffect(() => {
        // const query = queryString.stringify(queryFilter);
        getDataUnit(() => getAllUnitByUser(dataUser.token))
        getDataAkunKas(() =>
            getAllAktivaAccountCostPay(
                { unit_unit_id: queryFilter.unit_id },
                dataUser.token
            )
        )
    }, [])

    useEffect(() => {
        getDataAkunBiaya(() =>
            getAllAccountBiaya(
                { unit_unit_id: queryFilter.unit_id },
                dataUser.token
            )
        )
    }, [queryFilter.unit_id])

    const onQueryFilterChange = (e) => {
        setQueryFilter((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div className="page-content d-flex flex-column gap-2">
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
                    user_user_id: '',
                    account_cash_account: '',
                    account_cost_account: '',
                    pos_pos_pay_id: '',
                    kredit_tax: '',
                    kredit_information: '',
                    unit_unit_id: '',
                }}
                onSubmit={() => {}}
                // validationSchema={schema}
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
                            error={errors}
                            onQueryFilterChange={onQueryFilterChange}
                            setFieldValue={setFieldValue}
                            queryFilter={queryFilter}
                            handleChange={handleChange}
                        />
                        <FormTambah
                            dataAkunBiaya={dataAkunBiaya.data}
                            value={values}
                            error={errors}
                            setFieldValue={setFieldValue}
                            handleChange={handleChange}
                        />
                        <TabelTambah />
                    </>
                )}
            </Formik>
        </div>
    )
}

export default TambahKasKeluar

import React, { useEffect, useMemo, useState, useRef } from 'react'
import TableAkunBiaya from './components/TablePaymentType'
import SearchInput from '../../../component/ActionButton/SearchInput'
import SelectProdi from '../../../component/ActionButton/SelectProdi'
import SelectUnitKelas from '../../../component/ActionButton/SelectUnitKelas'
import AddAction from '../../../component/ActionButton/AcctionAddButoon'
import { Button } from 'reactstrap'
import {
    getAllPosPay,
    getAllPaymentType,
    putPaymentType,
    postPaymentType,
    deletePaymentType,
    getAllTahunAjaran,
    getAllUnitByUser,
} from '../../../utils/http'
import { ToastContainer } from 'react-toastify'

import useRequest from '../../../customHooks/useRequest'
import queryString from 'query-string'
import { useSelector } from 'react-redux'
import useTable from '../../../customHooks/useTable'
import ModalForm from './components/FormModal'
import { paymentTypeInitialValues } from '../../../utils/initialValues'
import { paymentTypeSchema } from '../../../utils/schema'
import { paymentTypeModel } from '../../../models/models'
import { alertConfirmation } from '../../../component/Alert/swalConfirmation'
import { alertType } from '../../../utils/CONSTANT'
import SelectUnit from '../../../component/ActionButton/SelectUnit'

function PageJenisBayar() {
    const {
        data: dataPaymentType,
        setData: setDataPaymentType,
        sendData: sendDataPaymentType,
        setDataDetail: setDataDetailPaymentType,
        dataDetail: dataDetailPaymentType,
        getData: getDataPaymentType,
        isLoading: isLoadingPaymentType,
        setIsLoading: setIsLoadingPaymentType,
        isLoadingSendData: isLoadingSendDataPaymentType,
        filterText,
        onChangeFilterText,
    } = useRequest()
    const {
        data: dataTahunAjaran,
        getData: getDataTahunAjaran,
        isLoading: isLoadinTahunAjaran,
    } = useRequest()
    const {
        data: dataPosPay,
        getData: getDataPosPay,
        isLoading: isLoadingPosPay,
    } = useRequest()

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
    } = useTable()
    const {
        data: dataUnit,
        setData: setDataUnit,
        getData: getDataUnit,
    } = useRequest()
    const [queryFilter, setQueryFilter] = useState({
        class_id: '',
        status: '',
        majors_id: '',
        unit_id: '',
    })
    const dataUser = useSelector(({ authState }) => authState.data)

    const fetchAllOptions = async () => {
        await getDataTahunAjaran(() => getAllTahunAjaran(dataUser.token))
        await getDataPosPay(() =>
            getAllPosPay({ unit_unit_id: queryFilter.unit_id }, dataUser.token)
        )
    }

    const fetchPaymentType = () => {
        getDataPaymentType(() =>
            getAllPaymentType(
                { unit_unit_id: queryFilter.unit_id },
                dataUser.token
            )
        )
    }
    useEffect(() => {
        fetchAllOptions()
        getDataUnit(() => getAllUnitByUser(dataUser.token))
        fetchPaymentType()
    }, [])

    const onCLickFilterSubmit = () => {
        const query = queryString.stringify(queryFilter)
        getDataPaymentType(() => getAllPaymentType(dataUser.token))
    }

    const onClickTambahHandler = async (row) => {
        console.log(row)

        await fetchAllOptions()
        setIsOpenModalForm(true)
        setIsEdit(false)
    }

    const onClickEditHandler = async (item) => {
        await fetchAllOptions()

        // console.log(item);
        // await getDataCode(() => getCodeAccountCost(body, dataUser.token));
        setDataDetailPaymentType(item)
        setIsEdit(true)
        setIsOpenModalForm(!isOpenModalForm)
    }

    const onSubmitTambahHandler = async (formBody, { resetForm }) => {
        const newFormBody = {
            ...formBody,
            sekolah_id: 0,
            payment_mode: 'TETAP',
            unit_unit_id: queryFilter.unit_id,
        }
        await sendDataPaymentType(
            () =>
                postPaymentType(
                    paymentTypeModel.objectToJSON(newFormBody),
                    dataUser.token
                ),
            () => {
                fetchPaymentType()
                setIsOpenModalForm(!isOpenModalForm)
            },
            null
        )
    }

    const onSubmitEditHandler = async (formBody, { resetForm }) => {
        const newFormBody = { ...formBody, unit_unit_id: queryFilter.unit_id }
        await sendDataPaymentType(
            () =>
                putPaymentType(
                    formBody.payment_id,
                    paymentTypeModel.objectToJSON(newFormBody),
                    dataUser.token
                ),
            () => {
                fetchPaymentType()
                setIsOpenModalForm(!isOpenModalForm)
            },
            null
        )
    }
    const onSubmitDeleteHandler = async (formBody) => {
        console.log(formBody)
        alertConfirmation(alertType.delete, async () => {
            await sendDataPaymentType(
                () => deletePaymentType(formBody.payment_id, dataUser.token),
                () => fetchPaymentType(),
                null
            )
        })
    }
    const onQueryFilterChange = (e) => {
        setQueryFilter((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const subHeaderComponent = useMemo(() => {
        const onClearHandler = () => {
            if (filterText) {
                onChangeFilterText('')
                setResetPaginationToggle(!resetPaginationToggle)
            }
        }

        return (
            <SearchInput
                filterText={filterText}
                setFilterText={onChangeFilterText}
            />
        )
    }, [
        filterText,
        onChangeFilterText,
        resetPaginationToggle,
        setResetPaginationToggle,
    ])

    const dataFiltered = useMemo(
        () =>
            dataPaymentType.data.filter(
                (item) =>
                    item.payment_type
                        .toString()
                        .toLowerCase()
                        .includes(filterText.toLocaleLowerCase()) ||
                    item.payment_mode
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
                        .includes(filterText.toLocaleLowerCase())
            ),
        [filterText, dataPaymentType.data]
    )

    useEffect(() => {
        fetchAllOptions()
        fetchPaymentType()
    }, [queryFilter.unit_id])
    return (
        <div className="page-content">
            <h3>
                Jenis Bayar{' '}
                <span style={{ fontSize: '0.8em', color: 'gray' }}>List</span>
            </h3>

            <div className="table-content">
                <div className="d-flex w-25 mb-3">
                    <SelectUnit
                        includeAll={false}
                        data={dataUnit.data}
                        value={queryFilter.unit_id}
                        name={'unit_id'}
                        onFilterChange={onQueryFilterChange}
                    />
                </div>
                {queryFilter.unit_id && (
                    <>
                        <AddAction onClickHandler={onClickTambahHandler} />
                        <TableAkunBiaya
                            data={
                                filterText.length > 0
                                    ? dataFiltered
                                    : dataPaymentType.data
                            }
                            onClickTambahHandler={onClickTambahHandler}
                            onClickEditHandler={onClickEditHandler}
                            onClickDeleteHandler={onSubmitDeleteHandler}
                            subHeaderComponent={subHeaderComponent}
                        />
                    </>
                )}
            </div>
            <ModalForm
                initialValues={
                    isEdit ? dataDetailPaymentType : paymentTypeInitialValues
                }
                schema={paymentTypeSchema}
                toggle={() => setIsOpenModalForm(!isOpenModalForm)}
                isOpen={isOpenModalForm}
                dataPosPay={dataPosPay.data}
                dataPaymentMode={dataPosPay.data}
                dataTahunAjaran={dataTahunAjaran.data}
                isEdit={isEdit}
                isLoadingSendData={isLoadingPaymentType}
                btnName={isEdit ? 'Edit' : 'Tambah'}
                headerName={isEdit ? 'Edit Jenis Bayar' : 'Tambah Jenis Bayar'}
                onSubmitHandler={
                    isEdit ? onSubmitEditHandler : onSubmitTambahHandler
                }
            />
        </div>
    )
}

export default PageJenisBayar

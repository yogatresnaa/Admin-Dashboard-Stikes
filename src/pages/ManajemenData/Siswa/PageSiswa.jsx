import React, { useEffect, useMemo, useRef, useState } from 'react'
import TableSiswa from './components/TableSiswa'
import AddAction from '../../../component/ActionButton/AcctionAddButoon'
import SelectProdi from '../../../component/ActionButton/SelectProdi'
import ShowDataEnteris from '../../../component/ActionButton/showEntries'
import SearchInput from '../../../component/ActionButton/SearchInput'
import _ from 'lodash'
import useRequest from '../../../customHooks/useRequest'
import {
    getAllProdi,
    putProdi,
    deleteProdi,
    postProdi,
    getAllSiswa,
    putSiswa,
    deleteSiswa,
    postSiswa,
    getAllKelas,
    getAllUnitByUser,
} from '../../../utils/http'
import './css/page-siswa.css'
import { useSelector } from 'react-redux'
import ModalForm from './components/FormModal'
import { siswaInitialValues } from '../../../utils/initialValues'
import { siswaSchema } from '../../../utils/schema'
import { ToastContainer } from 'react-toastify'
import { prodiModel, siswaModel } from '../../../models/models'
import useTable from '../../../customHooks/useTable'
import { alertConfirmation } from '../../../component/Alert/swalConfirmation'
import { alertType, statusSiswa } from '../../../utils/CONSTANT'
import SelectUnitKelas from '../../../component/ActionButton/SelectUnitKelas'
import { Button } from 'reactstrap'
import queryString from 'query-string'
import SelectStatusMahasiswa from '../../../component/ActionButton/SelectStatusMahasiswa'
import DetailModal from './components/DetailModal'
import { dateConvert, dateConvertForDb } from '../../../utils/helper'
import ReactToPrint, { useReactToPrint } from 'react-to-print'
import PrintTableSiswaComponent from './components/PrintTableSiswaTemplate'
import SelectUnit from '../../../component/ActionButton/SelectUnit'
import SearchButton from '../../../component/ActionButton/SearchButton'

function PageSiswa() {
    const {
        data: dataSiswa,
        setData: setDataSiswa,
        sendData: sendDataSiswa,
        setDataDetail: setDataDetailSiswa,
        dataDetail: dataDetailSiswa,
        getData: getDataSiswa,
        isLoading: isLoadingSiswa,
        setIsLoading: setIsLoadingSiswa,
        isLoadingSendData: isLoadingSendDataSiswa,
        filterText,
        onChangeFilterText,
    } = useRequest()
    const {
        data: dataProdi,
        setData: setDataProdi,
        getData: getDataProdi,
    } = useRequest()
    const {
        data: dataKelas,
        setData: setDataKelas,
        getData: getDataKelas,
    } = useRequest()
    const {
        data: dataUnit,
        setData: setDataUnit,
        getData: getDataUnit,
    } = useRequest()
    const {
        resetPaginationToggle,
        setResetPaginationToggle,
        setIsOpenModalEdit,
        isOpenModalForm,
        setIsOpenModalForm,
        isEdit,
        setIsEdit,
    } = useTable()

    const dataUser = useSelector(({ authState }) => authState.data)
    const [queryFilter, setQueryFilter] = useState({
        class_id: '',
        status: '',
        majors_id: '',
        unit_id: '',
    })
    const [isOpenDetailModal, setIsOpenDetailModal] = useState(false)
    const printComponent = useRef()
    useEffect(() => {
        const query = queryString.stringify(queryFilter)
        getDataSiswa(() => getAllSiswa(query, dataUser.token))
        getDataUnit(() => getAllUnitByUser(dataUser.token))
    }, [])

    const onCLickFilterSubmit = () => {
        const query = queryString.stringify(queryFilter)
        getDataSiswa(() => getAllSiswa(query, dataUser.token))
    }

    const onClickTambahHandler = () => {
        setIsOpenModalForm(!isOpenModalForm)
        setIsEdit(false)
    }
    const onClickEditHandler = (item) => {
        console.log(item)
        setDataDetailSiswa((prevState) => ({
            ...prevState,
            ...item,
            student_born_date:
                item.student_born_date == '0000-00-00'
                    ? item.student_born_date
                    : dateConvertForDb(item.student_born_date),
        }))
        setIsEdit(true)
        setIsOpenModalForm(!isOpenModalForm)
    }
    console.log('render')
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
    const handlePrint = useReactToPrint({
        content: () => printComponent.current,
    })
    const onClickDetailSiswaHandler = (dataDetail) => {
        setDataDetailSiswa(dataDetail)
        setIsOpenDetailModal(true)
    }
    const onSubmitTambahHandler = async (formBody, { resetForm }) => {
        const query = queryString.stringify(queryFilter)
        await sendDataSiswa(
            () => postSiswa(siswaModel.objectToJSON(formBody), dataUser.token),
            () => {
                getDataSiswa(() => getAllSiswa(query, dataUser.token))
                setIsOpenModalForm(!isOpenModalForm)
            },
            null
        )
    }

    const onSubmitEditHandler = async (formBody, { resetForm }) => {
        const query = queryString.stringify(queryFilter)

        await sendDataSiswa(
            () =>
                putSiswa(
                    formBody.student_id,
                    siswaModel.objectToJSON(formBody),
                    dataUser.token
                ),
            () => {
                getDataSiswa(() => getAllSiswa(query, dataUser.token))
                setIsOpenModalForm(!isOpenModalForm)
            },
            null
        )
    }
    const onSubmitDeleteHandler = async (formBody) => {
        console.log(formBody)
        const query = queryString.stringify(queryFilter)

        alertConfirmation(alertType.delete, async () => {
            await sendDataSiswa(
                () => deleteSiswa(formBody.student_id, dataUser.token),
                () => {
                    getDataSiswa(() => getAllSiswa(query, dataUser.token))
                    // setIsOpenModalForm(!isOpenModalForm)
                },
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

    console.log(dataSiswa)
    const dataFiltered = useMemo(
        () =>
            dataSiswa.data.filter(
                (item) =>
                    item.student_nis
                        .toString()
                        .toLowerCase()
                        .includes(filterText.toLocaleLowerCase()) ||
                    item.student_full_name
                        .toString()
                        .toLowerCase()
                        .includes(filterText.toLocaleLowerCase()) ||
                    item.majors_majors_name
                        .toString()
                        .toLowerCase()
                        .includes(filterText.toLocaleLowerCase())
            ),
        [filterText, dataSiswa.data]
    )

    useEffect(() => {
        getDataKelas(() =>
            getAllKelas({ unit_unit_id: queryFilter.unit_id }, dataUser.token)
        )
        getDataProdi(() =>
            getAllProdi({ unit_unit_id: queryFilter.unit_id }, dataUser.token)
        )
    }, [queryFilter.unit_id])

    return (
        <>
            <ToastContainer />
            <div className="page-content">
                <h3>
                    Siswa{' '}
                    <span style={{ fontSize: '0.8em', color: 'gray' }}>
                        List
                    </span>
                </h3>

                <div className="table-content">
                    <div className="d-flex gap-2">
                        <AddAction onClickHandler={onClickTambahHandler} />
                        <Button size="sm" color="success" onClick={handlePrint}>
                            Print
                        </Button>
                    </div>
                    <div className="d-flex flex-row gap-1 justify-content-start align-items-center mt-2">
                        <SelectUnit
                            data={dataUnit.data}
                            name={'unit_id'}
                            onFilterChange={onQueryFilterChange}
                            value={queryFilter.unit_id}
                        />

                        <SelectProdi
                            data={dataProdi.data}
                            onProdiFilterChange={onQueryFilterChange}
                            value={queryFilter.majors_id}
                        />
                        <SelectUnitKelas
                            data={dataKelas.data}
                            onProdiFilterChange={onQueryFilterChange}
                            value={queryFilter.class_id}
                        />
                        <SelectStatusMahasiswa
                            data={statusSiswa}
                            onProdiFilterChange={onQueryFilterChange}
                            value={queryFilter.status}
                        />
                        <SearchButton onClickHandler={onCLickFilterSubmit}>
                            Cari
                        </SearchButton>
                    </div>

                    <TableSiswa
                        data={
                            filterText.length > 0
                                ? dataFiltered
                                : dataSiswa.data
                        }
                        subHeaderComponent={subHeaderComponent}
                        resetPaginationToggle={resetPaginationToggle}
                        isLoading={isLoadingSiswa}
                        onClickEditHandler={onClickEditHandler}
                        onClickDetailHandler={onClickDetailSiswaHandler}
                        onClickDeleteHandler={onSubmitDeleteHandler}
                    />
                </div>
                <ModalForm
                    initialValues={
                        isEdit ? dataDetailSiswa : siswaInitialValues
                    }
                    schema={siswaSchema}
                    toggle={() => setIsOpenModalForm(!isOpenModalForm)}
                    isOpen={isOpenModalForm}
                    btnName={isEdit ? 'Edit' : 'Tambah'}
                    dataProdi={dataProdi.data}
                    dataUnit={dataUnit.data}
                    dataKelas={dataKelas.data}
                    isLoadingSendData={isLoadingSendDataSiswa}
                    headerName={isEdit ? 'Edit Siswa' : 'Tambah Siswa'}
                    onSubmitHandler={
                        isEdit ? onSubmitEditHandler : onSubmitTambahHandler
                    }
                />
                <DetailModal
                    data={dataDetailSiswa}
                    isOpen={isOpenDetailModal}
                    toggle={() => setIsOpenDetailModal(!isOpenDetailModal)}
                    headerName={'Detail'}
                />
                {/* <ModalForm
          initialValues={
            dataDetailKelas !== null ? dataDetailKelas : kelasInitialValues
          }
          schema={kelasSchema}
          toggle={() => setIsOpenModalEdit(!isOpenModalEdit)}
          isOpen={isOpenModalEdit}
          btnName="Edit"
          headerName="Edit Kelas"
          onSubmitHandler={onSubmitEditHandler}
        /> */}

                <PrintTableSiswaComponent
                    data={dataSiswa.data}
                    ref={printComponent}
                />
            </div>
        </>
    )
}

export default PageSiswa

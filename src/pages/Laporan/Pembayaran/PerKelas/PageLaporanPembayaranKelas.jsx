import React, { useEffect, useMemo, useRef, useState } from 'react'
import SelectProdi from '../../../../component/ActionButton/SelectProdi'
import SearchInput from '../../../../component/ActionButton/SearchInput'
import _ from 'lodash'
import useRequest from '../../../../customHooks/useRequest'
import {
    getAllProdi,
    getAllTahunAjaran,
    getAllSiswa,
    putSiswa,
    deleteSiswa,
    postSiswa,
    getAllKelas,
    getLaporanPembayaranPerKelas,
    getAllUnitByUser,
    getAllPaymentType,
    getDokumenLaporanPerKelas,
} from '../../../../utils/http'
// import "./css/page-laporan-pembayaran-kelas.css";
import { useSelector } from 'react-redux'
// import ModalForm from "../PerKelas/components/";
import { siswaInitialValues } from '../../../../utils/initialValues'
import { siswaSchema } from '../../../../utils/schema'
import { ToastContainer } from 'react-toastify'
import { prodiModel, siswaModel } from '../../../../models/models'
import useTable from '../../../../customHooks/useTable'
import { alertConfirmation } from '../../../../component/Alert/swalConfirmation'
import { alertType, statusSiswa } from '../../../../utils/CONSTANT'
import SelectUnitKelas from '../../../../component/ActionButton/SelectUnitKelas'
import { Button } from 'reactstrap'
import queryString from 'query-string'
import SelectStatusMahasiswa from '../../../../component/ActionButton/SelectStatusMahasiswa'
// import DetailModal from "./components/DetailModal";
import {
    dateConvert,
    dateConvertForDb,
    downloadDocument,
} from '../../../../utils/helper'
import ReactToPrint, { useReactToPrint } from 'react-to-print'
// import PrintTableSiswaComponent from "./components/PrintTableSiswaTemplate";
import SelectTahunAjaran from '../../../../component/ActionButton/SelectTahunAjaran'
import DateInput from '../../../../component/ActionButton/InputDate'
import CustomSelect from '../../../../component/Select/CustomSelect'
import SelectUnit from '../../../../component/ActionButton/SelectUnit'
import TablePembayaranPerKelas from './components/TablePembayaranPerKelas'
import SearchButton from '../../../../component/ActionButton/SearchButton'
// import TablePembayaran from './component/TablePembayaran'

function PageLaporanPembayaranKelas() {
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
        data: dataUnit,
        setData: setDataUnit,
        getData: getDataUnit,
    } = useRequest()
    const {
        data: dataPaymentType,
        setData: setDataPaymentType,
        getData: getDataPaymentType,
    } = useRequest()
    const {
        data: dataKelas,
        setData: setDataKelas,
        getData: getDataKelas,
    } = useRequest()
    const {
        data: dataProdi,
        setData: setDataProdi,
        getData: getDataProdi,
    } = useRequest()
    const {
        data: dataLaporan,
        isLoading: isLoadingLaporan,
        setData: setDataLaporan,
        getData: getDataLaporan,
    } = useRequest()
    const {
        data: dataPrintLaporan,
        isLoading: isLoadingDataPrintLaporan,
        getData: getDataPrintLaporan,
        setData: setDataPrintLaporan,
    } = useRequest(true)
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
        payment_type: '',
        majors_id: '',
        period_id: '',
        unit_id: '',
    })
    const [isOpenDetailModal, setIsOpenDetailModal] = useState(false)
    const [tahunAjaranState, setTahunAjaran] = useState('')
    const {
        data: TahunAjaran,
        setData: setDataTahunAjaran,
        getData: getDataTahunAjaran,
    } = useRequest()

    const printComponent = useRef()
    useEffect(() => {
        const query = queryString.stringify(queryFilter)
        getDataUnit(() => getAllUnitByUser(dataUser.token))

        getDataTahunAjaran(() => getAllTahunAjaran(dataUser.token))
    }, [])
    useEffect(() => {
        const selectedPeriod = TahunAjaran.data[0]
        setQueryFilter((prevState) => ({
            ...prevState,
            period_id: selectedPeriod?.period_id,
        }))
    }, [TahunAjaran.data])

    useEffect(() => {
        fetchAll()
    }, [queryFilter.unit_id])
    const fetchAll = () => {
        getDataProdi(() =>
            getAllProdi({ unit_unit_id: queryFilter.unit_id }, dataUser.token)
        )
        getDataKelas(() =>
            getAllKelas({ unit_unit_id: queryFilter.unit_id }, dataUser.token)
        )
    }
    const onPeriodChange = (e) => {
        console.log(TahunAjaran)
        const selectedPeriod = TahunAjaran.data.filter(
            (item) => item.period_id == parseInt(e.target.value, 10)
        )[0]
        setQueryFilter((prevState) => ({
            ...prevState,
            period_id: e.target.value,
        }))
        setTahunAjaran(selectedPeriod)
    }

    const onCLickFilterSubmit = () => {
        getDataLaporan(() =>
            getLaporanPembayaranPerKelas(
                {
                    ...queryFilter,
                    period_id:
                        queryFilter.period_id == ''
                            ? TahunAjaran.data[0].period_id
                            : queryFilter.period_id,
                },
                dataUser.token
            )
        )
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

    const onQueryFilterChange = (e) => {
        setQueryFilter((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onClickCetakPdfHandler = () => {
        getDataPrintLaporan(() =>
            getDokumenLaporanPerKelas(
                {
                    ...queryFilter,
                    period_id:
                        queryFilter.period_id == ''
                            ? TahunAjaran.data[0].period_id
                            : queryFilter.period_id,
                },
                dataUser.token
            )
        )
    }
    useEffect(() => {
        if (dataPrintLaporan?.data?.data)
            downloadDocument(
                dataPrintLaporan.data.data,
                `Laporan Pembayaran ${dataPaymentType.data.filter((item) => queryFilter.payment_type == item.pos_pos_id)[0]?.pos_pay_name}_T.A ${tahunAjaranState.period_start ?? TahunAjaran.data[0].period_start}/${tahunAjaranState.period_end ?? TahunAjaran.data[0].period_end}_${queryFilter.class_id == '' ? 'Semua' : `Kelas ${dataKelas.data?.filter((item) => item.class_id == queryFilter.class_id)[0].class_name}`}`
            )
        setDataPrintLaporan(null)
    }, [dataPrintLaporan?.data])
    useEffect(() => {
        if (queryFilter.unit_id !== '') {
            getDataPaymentType(() =>
                getAllPaymentType(
                    {
                        unit_unit_id: queryFilter.unit_id,
                        period_period_id: queryFilter.period_id,
                    },
                    dataUser.token
                )
            )
        }
    }, [queryFilter.period_id, queryFilter.unit_id])
    console.log(dataSiswa)
    const dataFiltered = useMemo(
        () =>
            dataLaporan.data.filter(
                (item) =>
                    item.student_nis
                        .toString()
                        .toLowerCase()
                        .includes(filterText.toLocaleLowerCase()) ||
                    item.student_full_name
                        .toString()
                        .toLowerCase()
                        .includes(filterText.toLocaleLowerCase())
            ),
        [filterText, dataLaporan.data]
    )
    return (
        <>
            <ToastContainer />
            <div className="page-content">
                <h3>
                    Laporan Per Kelas{' '}
                    <span style={{ fontSize: '0.8em', color: 'gray' }}></span>
                </h3>

                <div className="table-content">
                    <div className="sub-content">
                        <div className="d-flex flex-row gap-1 justify-content-start align-items-center mt-2">
                            <SelectUnit
                                data={dataUnit.data}
                                includeAll={false}
                                onFilterChange={onQueryFilterChange}
                                value={queryFilter.unit_id}
                                name={'unit_id'}
                            />
                            <SelectTahunAjaran
                                data={TahunAjaran.data}
                                includeAll={false}
                                onChange={onPeriodChange}
                                value={tahunAjaranState?.period_id ?? ''}
                            />
                            {/* <SelectProdi
                                data={dataProdi.data}
                                onProdiFilterChange={onQueryFilterChange}
                                value={queryFilter.unit_id}
                                name={'majors_id'}
                            /> */}

                            <SelectUnitKelas
                                data={dataKelas.data}
                                onProdiFilterChange={onQueryFilterChange}
                                value={queryFilter.class_id}
                                name={'class_id'}
                            />
                            <CustomSelect
                                data={dataPaymentType.data}
                                labelName={'Pembayaran'}
                                optionName={'pos_pay_name'}
                                name={'payment_type'}
                                optionValue={'pos_pos_id'}
                                onChange={onQueryFilterChange}
                                value={queryFilter.payment_type}
                            />
                            <SearchButton onClickHandler={onCLickFilterSubmit}>
                                Cari
                            </SearchButton>
                        </div>
                    </div>

                    <div className="sub-content">
                        <h6
                            className="p-2 w-100 bg-black text-white"
                            style={{ borderRadius: '5px' }}
                        >
                            Laporan Pembayaran
                        </h6>
                        <TablePembayaranPerKelas
                            data={
                                filterText.length > 0
                                    ? dataFiltered
                                    : dataLaporan.data
                            }
                            subHeaderComponent={subHeaderComponent}
                            resetPaginationToggle={resetPaginationToggle}
                            isLoading={isLoadingLaporan}
                        />
                        <div className="d-flex justify-content-between">
                            <div></div>
                            <Button
                                size="sm"
                                color="danger"
                                disabled={dataLaporan?.data?.length < 1}
                                onClick={onClickCetakPdfHandler}
                            >
                                Cetak PDF
                            </Button>
                        </div>
                    </div>
                </div>

                {/* <PrintTableSiswaComponent data={dataSiswa.data} ref={printComponent} /> */}
            </div>
        </>
    )
}

export default PageLaporanPembayaranKelas

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
    getLaporanPembayaranPerTanggal,
    getDokumenLaporanPerTanggal,
    getDokumenLaporanExcelPerKelas,
    getDokumenLaporanExcelPerTanggal,
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
    downloadExcelDocument,
    rupiahConvert,
} from '../../../../utils/helper'
import ReactToPrint, { useReactToPrint } from 'react-to-print'
// import PrintTableSiswaComponent from "./components/PrintTableSiswaTemplate";
import SelectTahunAjaran from '../../../../component/ActionButton/SelectTahunAjaran'
import DateInput from '../../../../component/ActionButton/InputDate'
import CustomSelect from '../../../../component/Select/CustomSelect'
import SelectUnit from '../../../../component/ActionButton/SelectUnit'
import SelectDate from '../../../../component/ActionButton/SelectDate'
import moment from 'moment'
import TablePembayaranPerTanggal from './component/TablePembayaran'
import SearchButton from '../../../../component/ActionButton/SearchButton'
import ButtonWithLoader from '../../../../component/ActionButton/ButtonWithLoader'
// import TablePembayaran from './component/TablePembayaran'

function PageLaporanPembayaranPerTanggal() {
    const {
        data: dataSiswa,

        filterText,
        onChangeFilterText,
    } = useRequest()

    const {
        data: dataUnit,
        setData: setDataUnit,
        getData: getDataUnit,
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
        setData: setDataLaporan,
        isLoading: isLoadingLaporan,
        getData: getDataLaporan,
    } = useRequest()
    const {
        data: dataPrintLaporan,
        isLoadingGenerate: isLoadingDataPrintLaporan,
        getData: getDataPrintLaporan,
        setData: setDataPrintLaporan,
    } = useRequest(true)
    const {
        data: dataPrintLaporanExcel,
        isLoadingGenerate: isLoadingDataPrintLaporanExcel,
        getData: getDataPrintLaporanExcel,
        setData: setDataPrintLaporanExcel,
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
        tanggal_awal: new Date(),
        tanggal_akhir: new Date(),
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
            getLaporanPembayaranPerTanggal(
                {
                    ...queryFilter,
                    tanggal_awal: moment(queryFilter.tanggal_awal).format(
                        'YYYY-MM-DD'
                    ),
                    tanggal_akhir: moment(queryFilter.tanggal_akhirl).format(
                        'YYYY-MM-DD'
                    ),
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
            getDokumenLaporanPerTanggal(
                {
                    ...queryFilter,
                    tanggal_awal: moment(queryFilter.tanggal_awal).format(
                        'YYYY-MM-DD'
                    ),
                    tanggal_akhir: moment(queryFilter.tanggal_akhirl).format(
                        'YYYY-MM-DD'
                    ),
                    period_id:
                        queryFilter.period_id == ''
                            ? TahunAjaran.data[0].period_id
                            : queryFilter.period_id,
                },
                dataUser.token
            )
        )
    }
    const onClickCetakExcelHandler = () => {
        getDataPrintLaporanExcel(() =>
            getDokumenLaporanExcelPerTanggal(
                {
                    ...queryFilter,
                    tanggal_awal: moment(queryFilter.tanggal_awal).format(
                        'YYYY-MM-DD'
                    ),
                    tanggal_akhir: moment(queryFilter.tanggal_akhirl).format(
                        'YYYY-MM-DD'
                    ),
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
        if (dataPrintLaporanExcel?.data?.data)
            downloadExcelDocument(
                dataPrintLaporanExcel.data.data,
                `Laporan Pembayaran Per Tanggal ${moment(
                    queryFilter.tanggal_awal
                ).format('YYYY-MM-DD')}-${moment(
                    queryFilter.tanggal_akhir
                ).format(
                    'YYYY-MM-DD'
                )}_T.A ${tahunAjaranState.period_start ?? TahunAjaran.data[0].period_start}/${tahunAjaranState.period_end ?? TahunAjaran.data[0].period_end}_${queryFilter.class_id == '' ? 'Semua' : `Kelas ${dataKelas.data?.filter((item) => item.class_id == queryFilter.class_id)[0].class_name}`}`
            )
        setDataPrintLaporanExcel(null)
    }, [dataPrintLaporanExcel?.data])

    useEffect(() => {
        if (dataPrintLaporan?.data?.data)
            downloadDocument(
                dataPrintLaporan.data.data,
                `Laporan Pembayaran Per Tanggal ${moment(
                    queryFilter.tanggal_awal
                ).format('YYYY-MM-DD')}-${moment(
                    queryFilter.tanggal_akhir
                ).format(
                    'YYYY-MM-DD'
                )}_T.A ${tahunAjaranState.period_start ?? TahunAjaran.data[0].period_start}/${tahunAjaranState.period_end ?? TahunAjaran.data[0].period_end}_${queryFilter.class_id == '' ? 'Semua' : `Kelas ${dataKelas.data?.filter((item) => item.class_id == queryFilter.class_id)[0].class_name}`}`
            )
        setDataPrintLaporan(null)
    }, [dataPrintLaporan?.data])
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
    return (
        <>
            <ToastContainer />
            <div className="page-content">
                <h3>
                    Laporan Per Tanggal{' '}
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
                            <SelectDate
                                disabled={isEdit}
                                title="Awal"
                                noGutter
                                date={queryFilter.tanggal_awal || new Date()}
                                onDateChange={(e) =>
                                    setQueryFilter((prevState) => ({
                                        ...prevState,
                                        tanggal_awal: e,
                                    }))
                                }
                            />
                            <SelectDate
                                disabled={isEdit}
                                title="Akhir"
                                noGutter
                                date={queryFilter.tanggal_akhir || new Date()}
                                onDateChange={(e) =>
                                    setQueryFilter((prevState) => ({
                                        ...prevState,
                                        tanggal_akhir: e,
                                    }))
                                }
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
                        {dataLaporan.data?.map((item, index) => (
                            <div
                                className="mb-1 border-bottom border-4 p-2 pb-4"
                                key={index}
                            >
                                <h3>
                                    {item?.pos_pay_name} T.A{' '}
                                    {item?.period_start}/{item?.period_end}
                                </h3>
                                <TablePembayaranPerTanggal
                                    data={item?.payment}
                                    subHeaderComponent={subHeaderComponent}
                                    resetPaginationToggle={
                                        resetPaginationToggle
                                    }
                                    isLoading={isLoadingLaporan}
                                />
                                <div className="d-flex justify-content-between">
                                    <span className="flex-1 fw-bold">
                                        Total:
                                    </span>
                                    <span
                                        className="flex-1 fw-bold"
                                        style={{ marginLeft: '4rem' }}
                                    >
                                        {rupiahConvert(item.total)}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div className="d-flex justify-content-between">
                            <ButtonWithLoader
                                size="sm"
                                isLoading={isLoadingDataPrintLaporanExcel}
                                color="success"
                                // disabled={dataLaporan?.data?.length < 1}
                                text={'Export Excel'}
                                onClick={onClickCetakExcelHandler}
                            />
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

export default PageLaporanPembayaranPerTanggal

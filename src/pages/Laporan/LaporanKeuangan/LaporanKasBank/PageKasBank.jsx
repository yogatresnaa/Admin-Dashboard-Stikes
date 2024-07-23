import React, { useEffect, useMemo, useRef, useState } from 'react'
import SearchInput from '../../../../component/ActionButton/SearchInput'
import _ from 'lodash'
import useRequest from '../../../../customHooks/useRequest'
import {
    getAllProdi,
    getAllTahunAjaran,
    getAllKelas,
    getAllUnitByUser,
    getDokumenLaporanPerTanggal,
    getLaporanKasBank,
    getDokumenLaporanKasBank,
    getDokumenLaporanKasBankPerAnggaran,
} from '../../../../utils/http'
// import "./css/page-laporan-pembayaran-kelas.css";
import { useSelector } from 'react-redux'
// import ModalForm from "../PerKelas/components/";
import { ToastContainer } from 'react-toastify'
import useTable from '../../../../customHooks/useTable'
import { Button } from 'reactstrap'
import queryString from 'query-string'
// import DetailModal from "./components/DetailModal";
import { downloadDocument } from '../../../../utils/helper'
// import PrintTableSiswaComponent from "./components/PrintTableSiswaTemplate";
import SelectTahunAjaran from '../../../../component/ActionButton/SelectTahunAjaran'
import SelectUnit from '../../../../component/ActionButton/SelectUnit'
import SelectDate from '../../../../component/ActionButton/SelectDate'
import moment from 'moment'
import TableKasBank from './component/TableKasbank'
import FooterTable from '../../Components/FooterTable'
import ButtonWithLoader from '../../../../component/ActionButton/ButtonWithLoader'
// import TablePembayaran from './component/TablePembayaran'

function PageLaporanKasBank() {
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
    const [titleDokumen, setTitleDokumen] = useState('')
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
            getLaporanKasBank(
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
        setTitleDokumen(
            `Laporan Kas Bank Per Tanggal ${moment(
                queryFilter.tanggal_awal
            ).format('YYYY-MM-DD')}-${moment(queryFilter.tanggal_akhir).format(
                'YYYY-MM-DD'
            )}_T.A ${tahunAjaranState.period_start ?? TahunAjaran.data[0].period_start}/${tahunAjaranState.period_end ?? TahunAjaran.data[0].period_end}_${queryFilter.class_id == '' ? 'Semua' : `Kelas ${dataKelas.data?.filter((item) => item.class_id == queryFilter.class_id)[0].class_name}`}`
        )
        getDataPrintLaporan(() =>
            getDokumenLaporanKasBank(
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
    const onClickCetakPdfPerAnggaranHandler = () => {
        setTitleDokumen(
            `Laporan Per anggaran Kas Bank Per Tanggal ${moment(
                queryFilter.tanggal_awal
            ).format('YYYY-MM-DD')}-${moment(queryFilter.tanggal_akhir).format(
                'YYYY-MM-DD'
            )}_T.A ${tahunAjaranState.period_start ?? TahunAjaran.data[0].period_start}/${tahunAjaranState.period_end ?? TahunAjaran.data[0].period_end}_${queryFilter.class_id == '' ? 'Semua' : `Kelas ${dataKelas.data?.filter((item) => item.class_id == queryFilter.class_id)[0].class_name}`}`
        )
        getDataPrintLaporan(() =>
            getDokumenLaporanKasBankPerAnggaran(
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
        if (dataPrintLaporan?.data?.data)
            downloadDocument(dataPrintLaporan.data.data, titleDokumen)
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
                    Laporan Kas Bank{' '}
                    <span style={{ fontSize: '0.8em', color: 'gray' }}></span>
                </h3>

                <div className="table-content">
                    <div className="sub-content">
                        <div className="d-flex flex-row gap-1 justify-content-start align-items-center mt-2">
                            <SelectUnit
                                data={dataUnit.data}
                                includeAll
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
                            <Button
                                size="md"
                                className="align-self-end w-auto"
                                onClick={onCLickFilterSubmit}
                            >
                                Cari
                            </Button>
                        </div>
                    </div>

                    <div className="sub-content">
                        <h6
                            className="p-2 w-100 bg-black text-white"
                            style={{ borderRadius: '5px' }}
                        >
                            Laporan Kas Bank
                        </h6>

                        <TableKasBank
                            data={dataLaporan?.data?.data_payment}
                            subHeaderComponent={subHeaderComponent}
                            resetPaginationToggle={resetPaginationToggle}
                            isLoading={isLoadingLaporan}
                        />
                        <div className="my-3">
                            <FooterTable
                                title={'Subtotal'}
                                color={'#d8d5e5'}
                                valueMasuk={dataLaporan?.data?.sub_total_masuk}
                                valueKeluar={
                                    dataLaporan?.data?.sub_total_keluar
                                }
                            />
                            <FooterTable
                                title={'Saldo Awal'}
                                color={'#dfccc4'}
                                valueMasuk={dataLaporan?.data?.saldo_awal_debit}
                                valueKeluar={
                                    dataLaporan?.data?.saldo_awal_kredit
                                }
                            />

                            <FooterTable
                                title={'Total(Sub Total +Saldo Awal)'}
                                color={'#fefbc8'}
                                valueMasuk={dataLaporan?.data?.total_masuk}
                                valueKeluar={dataLaporan?.data?.total_keluar}
                            />
                            <FooterTable
                                title={'SaldoA Akhir'}
                                color={'#feaac2'}
                                valueMasuk={dataLaporan?.data?.saldo_akhir}
                                valueKeluar={'-'}
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <ButtonWithLoader
                                isLoading={isLoadingDataPrintLaporan}
                                text={' Cetak PDF Per Anggaran'}
                                disabled={
                                    isLoadingDataPrintLaporan ||
                                    dataLaporan?.data?.length < 1
                                }
                                color="danger"
                                size="sm"
                                onClick={onClickCetakPdfPerAnggaranHandler}
                                style={{
                                    alignSelf: 'flex-end',
                                    marginRight: '1rem',
                                }}
                            />
                            <ButtonWithLoader
                                isLoading={isLoadingDataPrintLaporan}
                                text={'Cetak PDF Rekap Laporan'}
                                disabled={
                                    isLoadingDataPrintLaporan ||
                                    dataLaporan?.data?.length < 1
                                }
                                color="danger"
                                size="sm"
                                onClick={onClickCetakPdfHandler}
                                style={{
                                    alignSelf: 'flex-end',
                                    marginRight: '1rem',
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* <PrintTableSiswaComponent data={dataSiswa.data} ref={printComponent} /> */}
            </div>
        </>
    )
}

export default PageLaporanKasBank

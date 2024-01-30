import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from 'reactstrap'
import ItemImageSiswa from './components/ImageSiswa'
import PembayaranBulanan from './components/PembayaranBulanan'
import PembayaranBebas from './components/PembayaranBebas'
import SelectTahunAjaran from '../../../component/ActionButton/SelectTahunAjaran'
import SearchInput from '../../../component/ActionButton/SearchInput'
import useRequest from '../../../customHooks/useRequest'
import {
    getAllSiswa,
    getAllTahunAjaran,
    getPaymentTransactionByStudent,
} from '../../../utils/http'
import { useSelector } from 'react-redux'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import queryString from 'query-string'
import InformasiSantri from './components/InfoSantri'
import TransaksiPembayaran from './components/TransaksiPembayaran'
import HistoryPembayaran from './components/HistoryPembayaran'
import TagihanPembayaran from './components/TagihanPembayaran'
import Kalkulator from './components/Kalkulator'
import NoRefrensi from './components/cetakBuktiPembayaran'
import CetakButton from './components/ButtonCetak'
import ModalSiswa from './components/ModalSiswa'
import useTable from '../../../customHooks/useTable'

function PagePembayaranSiswa() {
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
        data: dataPaymentTransaction,
        setData: setDataPaymentTransaction,
        sendData: sendDataPaymentTransaction,

        getData: getDataPaymentTransaction,
        isLoading: isLoadingPaymentTransaction,
        setIsLoading: setIsLoadingPaymentTransaction,
        isLoadingSendData: isLoadingSendPaymentTransaction,
    } = useRequest()

    const {
        resetPaginationToggle,
        setResetPaginationToggle,
        setIsOpenModalEdit,
        isOpenModalForm: isOpenModalSiswa,
        setIsOpenModalForm: setIsOpenModalSiswa,
        isEdit,
        setIsEdit,
    } = useTable()

    const toggleModalSiswa = (e) => {
        setIsOpenModalSiswa(!isOpenModalSiswa)
    }

    const [selectedSiswa, setSelectedSiswa] = useState(null)
    const [tahunAjaranState, setTahunAjaran] = useState('')
    const {
        data: TahunAjaran,
        setData: setDataTahunAjaran,
        getData: getDataTahunAjaran,
    } = useRequest()

    //   const onCLickFilterSubmit = () => {
    //   const query = queryString.stringify(queryFilter);
    //   getDataSiswa(() => getAllSiswa(query, dataUser.token));
    // };

    const dataUser = useSelector(({ authState }) => authState.data)
    const [queryFilter, setQueryFilter] = useState({
        class_id: '',
        status: '',
        majors_id: '',
    })
    useEffect(() => {
        const query = queryString.stringify(queryFilter)
        console.log('a')
        getDataTahunAjaran(() => getAllTahunAjaran(dataUser.token))
        getDataSiswa(() => getAllSiswa({}, dataUser.token))
    }, [])
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

    const onClickSiswaHandler = (data) => {
        getDataPaymentTransaction(() =>
            getPaymentTransactionByStudent(
                data.student_id,
                {
                    period_start: TahunAjaran.data[0].period_start,
                    period_end: TahunAjaran.data[0].period_end,
                },
                dataUser.token
            )
        )

        setIsOpenModalSiswa(!isOpenModalSiswa)
    }
    useEffect(() => {
        console.log(dataPaymentTransaction)
        if (
            TahunAjaran.data.length > 0 &&
            dataPaymentTransaction.data.student_id
        ) {
            if (tahunAjaranState == '') {
                console.log(TahunAjaran)
                setTahunAjaran(TahunAjaran.data[0])
                setSelectedSiswa({
                    ...dataPaymentTransaction.data,
                    period: `${TahunAjaran?.data[0]?.period_start}/${TahunAjaran?.data[0]?.period_end}`,
                })
            } else {
                console.log()
                setSelectedSiswa({
                    ...dataPaymentTransaction.data,
                    period: `${tahunAjaranState.period_start}/${tahunAjaranState.period_end}`,
                })
            }
        }
        console.log(dataPaymentTransaction)
    }, [
        TahunAjaran,
        TahunAjaran.data,
        dataPaymentTransaction,
        tahunAjaranState,
    ])

    const onPeriodChange = (e) => {
        console.log(TahunAjaran)
        const selectedPeriod = TahunAjaran.data.filter(
            (item) => item.period_id == parseInt(e.target.value, 10)
        )[0]

        setTahunAjaran(selectedPeriod)
    }
    console.log(tahunAjaranState)
    const onClickSearchHandler = () => {
        setSelectedSiswa((prevState) => ({
            ...prevState,
            period: `${tahunAjaranState.period_start}/${tahunAjaranState.period_end}`,
        }))
    }

    console.log(selectedSiswa)
    return (
        <div className="page-content">
            <h3>
                Pembayaran Siswa{' '}
                <span style={{ fontSize: '0.8em', color: 'gray' }}>List</span>
            </h3>

            <div className="table-content">
                <div className="pembayaran-siswa">
                    <h6 className="filter-data">
                        Filter Data Pembayaran SIswa
                    </h6>
                    <div className="d-flex flex-row gap-5 justify-content-start align-items-end mt-2 thn-ajrn">
                        <SelectTahunAjaran
                            data={TahunAjaran.data}
                            onChange={onPeriodChange}
                            value={tahunAjaranState?.period_id ?? ''}
                        />
                        <SearchInput
                            style={{ margin: 0 }}
                            filterText={filterText}
                            setFilterText={onChangeFilterText}
                        />

                        <Button size="sm" onClick={toggleModalSiswa}>
                            Data Siswa
                        </Button>
                    </div>
                </div>
                {selectedSiswa && (
                    <>
                        <div className="info-santri">
                            <h6>Informasi Siswa</h6>
                            <InformasiSantri dataValue={selectedSiswa} />
                            <ItemImageSiswa />
                        </div>

                        <div className="jenis-bayar">
                            <h6>Jenis Pembayaran</h6>
                            <Tabs
                                defaultActiveKey="home"
                                transition={false}
                                id="noanim-tab-example"
                                className="mb-3"
                            >
                                <Tab eventKey="bulanan" title="Bulanan">
                                    <PembayaranBulanan />
                                </Tab>
                                <Tab eventKey="bebas" title="Bebas">
                                    <PembayaranBebas />
                                </Tab>
                            </Tabs>
                        </div>

                        <div className="Jenis-Pembayaran">
                            <div className="transaksi-historiPembayaran">
                                <div className="pembayaran-history">
                                    <Tabs
                                        defaultActiveKey="profile"
                                        id="uncontrolled-tab-example"
                                        className="mb-3"
                                    >
                                        <Tab
                                            eventKey="Transaksi"
                                            title="Transaksi Pembayaran"
                                        >
                                            <div>
                                                <TransaksiPembayaran />
                                            </div>
                                        </Tab>
                                        <Tab
                                            eventKey="History"
                                            title="History Pembayaran"
                                        >
                                            <HistoryPembayaran />
                                        </Tab>

                                        <Tab
                                            eventKey="Tagihan"
                                            title="Tagihan Pembayaran"
                                        >
                                            <TagihanPembayaran />
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                            <div className="kalkulator">
                                <h6>Kalkulator</h6>
                                <div className="wrapping">
                                    <p
                                        style={{
                                            width: '150px',
                                            padding: '5px',
                                        }}
                                        className="total"
                                    >
                                        Total <Kalkulator />
                                    </p>
                                    <p
                                        style={{
                                            width: '150px',
                                            padding: '5px',
                                        }}
                                        className="dibayar"
                                    >
                                        Dibayar
                                        <Kalkulator />
                                    </p>
                                    <p
                                        style={{
                                            width: '300px',
                                            padding: '5px',
                                        }}
                                        className="kembalian"
                                    >
                                        Kembalian
                                        <Kalkulator />
                                    </p>
                                </div>

                                <div className="bukti-pembayaran">
                                    <h6>Cetak Bukti Pembayaran</h6>
                                    <NoRefrensi />
                                    <CetakButton />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <ModalSiswa
                dataSiswa={dataSiswa.data}
                subHeaderComponent={subHeaderComponent}
                isOpenModal={isOpenModalSiswa}
                toggleModal={toggleModalSiswa}
                onClickSiswaHandler={onClickSiswaHandler}
                isLoading={isLoadingSiswa}
            />
        </div>
    )
}

export default PagePembayaranSiswa

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from 'reactstrap'
import { ToastContainer } from 'react-toastify'

import ItemImageSiswa from './components/ImageSiswa'
import PembayaranBulanan from './components/PembayaranBulanan'
import PembayaranBebas from './components/PembayaranBebas'
import SelectTahunAjaran from '../../../component/ActionButton/SelectTahunAjaran'
import SearchInput from '../../../component/ActionButton/SearchInput'
import useRequest from '../../../customHooks/useRequest'
import {
    deleteDetailFreePaymentRateByPaymentId,
    deletePaymentTransactionById,
    getAllKelas,
    getAllSiswa,
    getAllTahunAjaran,
    getDetailFreePaymentRateByPaymentId,
    getPaymentTransactionByStudent,
    putDiscountFreePaymentTransactionById,
    putFreePaymentTransactionById,
    putPaymentTransactionById,
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
import ModalPembayaranBulanan from './components/ModalPembayaranBulanan'
import ModalDiscount from './components/ModalDiscount'
import ModalPembayaranBebas from './components/ModalPembayaranBebas'
import ModalDetailPembayaran from './components/ModalDetailPembayaran'
import { alertConfirmation } from '../../../component/Alert/swalConfirmation'
import { alertType } from '../../../utils/CONSTANT'

const pembayaranBulananInitialValues = {
    payment_rate_bill: '',
    tanggal_pembayaran: '',
}
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
        setFilterText,
        onChangeFilterText,
    } = useRequest()
    const {
        data: dataKelas,
        getData: getDataKelas,
        isLoading: isLoadingKelas,
        setIsLoading: setIsLoadingKelas,
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
        data: dataDetailFreePaymentTransaction,
        dataDetail: selecteddataDetailFreePaymentTransaction,
        setDataDetail: setSelecteDataDetailFreePaymentTransaction,
        setData: setDataDetailFreePaymentTransaction,
        sendData: sendDataDetailFreePaymentTransaction,
        getData: getDataDetailFreePaymentTransaction,
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

    const {
        isOpenModalForm: isOpenModalPembayaran,
        setIsOpenModalForm: setIsOpenModaPembayaran,
    } = useTable()
    const {
        isOpenModalForm: isOpenModalDetailPembayaran,
        setIsOpenModalForm: setIsOpenModalDetailPembayaran,
    } = useTable()

    const {
        isOpenModalForm: isOpenModalDiscount,
        setIsOpenModalForm: setIsOpenModalDiscount,
    } = useTable()
    const {
        isOpenModalForm: isOpenModalPembayaranBebas,
        setIsOpenModalForm: setIsOpenModalPembayaranBebas,
    } = useTable()

    const {
        isOpenModalForm: isOpenModalBayar,
        setIsOpenModalForm: setIsOpenModalBayar,
    } = useTable()

    const toggleModalSiswa = (e) => {
        setIsOpenModalSiswa(!isOpenModalSiswa)
    }

    const [tahunAjaranState, setTahunAjaran] = useState('')
    const [kelas, setKelas] = useState('')
    const [dataDetailPembayaran, setDataDetailPembayaran] = useState({})
    const [dataDiscount, setDataDiscount] = useState({})
    const [filterTextModal, setFilterTextModal] = useState('')
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
        getDataKelas(() => getAllKelas(dataUser.token))
    }, [])

    const onChangeFilterTextModal = (e) => {
        setFilterTextModal(e.target.value)
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
                filterText={filterTextModal}
                setFilterText={onChangeFilterTextModal}
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
        setFilterText(data.student_nis)

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
                setDataDetailSiswa({
                    ...dataPaymentTransaction.data,
                    period: `${TahunAjaran?.data[0]?.period_start}/${TahunAjaran?.data[0]?.period_end}`,
                })
            } else {
                console.log()
                setDataDetailSiswa({
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
    const onClickSearchHandler = () => {
        const getSiswa = dataSiswa.data.filter((item) =>
            item.student_nis
                .toString()
                .toLowerCase()
                .includes(filterTextModal.toLocaleLowerCase())
        )[0]
        getDataPaymentTransaction(() =>
            getPaymentTransactionByStudent(
                getSiswa.student_id,
                {
                    period_start: TahunAjaran.data[0].period_start,
                    period_end: TahunAjaran.data[0].period_end,
                },
                dataUser.token
            )
        )
        setDataDetailSiswa((prevState) => ({
            ...prevState,
            period: `${tahunAjaranState.period_start}/${tahunAjaranState.period_end}`,
        }))
    }

    const onChangeKelasHandler = (e) => {
        setKelas(e.target.value)
    }
    const newDataSiswa = dataSiswa.data.filter(
        (item) =>
            item.student_nis
                .toString()
                .toLowerCase()
                .includes(filterTextModal.toLocaleLowerCase()) &&
            item.class_class_id == kelas
    )
    const onClickItemPembayaranHandler = (data) => {
        setDataDetailPembayaran(data)
        setIsOpenModaPembayaran(!isOpenModalPembayaran)
    }
    useEffect(() => {
        // if (dataDetailPembayaran) {
        //     setIsOpenModaPembayaran(!isOpenModalPembayaran)
        // }
    }, [dataDetailPembayaran, isOpenModalPembayaran, setIsOpenModaPembayaran])
    const onClickSubmitButtonModal = (type, id) => () => {
        switch (type) {
            case 'submit':
                onCLickSubmitPembayaranBulananHandler(id)
                break
            case 'delete':
                onCLickDeletePembayaranBulananHandler(id)
                break
            default:
                return
        }
    }
    const onCLickSubmitPembayaranBulananHandler = async (id) => {
        const formData = { student_student_id: dataDetailSiswa?.student_id }

        await sendDataPaymentTransaction(
            () => putPaymentTransactionById(id, formData, dataUser.token),
            () => {
                getDataPaymentTransaction(() =>
                    getPaymentTransactionByStudent(
                        dataDetailSiswa.student_id,
                        {
                            period_start: tahunAjaranState.period_start,
                            period_end: tahunAjaranState.period_end,
                        },
                        dataUser.token
                    )
                )
                setIsOpenModaPembayaran(!isOpenModalPembayaran)
            },
            null
        )
    }
    const onCLickDeletePembayaranBulananHandler = async (id) => {
        const formData = { student_student_id: dataDetailSiswa?.student_id }

        await sendDataPaymentTransaction(
            () => deletePaymentTransactionById(id, formData, dataUser.token),
            () => {
                getDataPaymentTransaction(() =>
                    getPaymentTransactionByStudent(
                        dataDetailSiswa.student_id,
                        {
                            period_start: tahunAjaranState.period_start,
                            period_end: tahunAjaranState.period_end,
                        },
                        dataUser.token
                    )
                )
                setIsOpenModaPembayaran(!isOpenModalPembayaran)
            },
            null
        )
    }
    const onClickDiscountHandler = (data) => {
        setDataDetailPembayaran(data)
        setIsOpenModalDiscount(!isOpenModalDiscount)
    }

    const onSubmitDiscountModal = async (formBody, { resetForm }) => {
        await sendDataPaymentTransaction(
            () =>
                putDiscountFreePaymentTransactionById(
                    formBody.detail_payment_rate_id,
                    formBody,
                    dataUser.token
                ),
            () => {
                getDataPaymentTransaction(() =>
                    getPaymentTransactionByStudent(
                        dataDetailSiswa.student_id,
                        {
                            period_start: tahunAjaranState.period_start,
                            period_end: tahunAjaranState.period_end,
                        },
                        dataUser.token
                    )
                )
                setIsOpenModalDiscount(!isOpenModalDiscount)
            },
            null
        )
    }
    const onClickBayarHandler = (data) => {
        setDataDetailPembayaran(data)
        setIsOpenModalPembayaranBebas(!isOpenModalPembayaranBebas)
    }
    const onSubmitBayarModal = async (formBody, { resetForm }) => {
        console.log(formBody)
        await sendDataPaymentTransaction(
            () =>
                putFreePaymentTransactionById(
                    formBody.detail_payment_rate_id,
                    formBody,
                    dataUser.token
                ),
            () => {
                getDataPaymentTransaction(() =>
                    getPaymentTransactionByStudent(
                        dataDetailSiswa.student_id,
                        {
                            period_start: tahunAjaranState.period_start,
                            period_end: tahunAjaranState.period_end,
                        },
                        dataUser.token
                    )
                )
                setIsOpenModalPembayaranBebas(!isOpenModalPembayaranBebas)
            },
            null
        )
    }

    const onClickItemDetailPembayaranHandler = async (id) => {
        setSelecteDataDetailFreePaymentTransaction(id)

        await getDataDetailFreePaymentTransaction(() =>
            getDetailFreePaymentRateByPaymentId(id, dataUser.token)
        )
        setIsOpenModalDetailPembayaran(true)
    }
    const onDeleteDetailPembayaranHandler = async (id) => {
        const formBody = {
            ...dataDetailSiswa,
            detail_payment_rate_id: selecteddataDetailFreePaymentTransaction,
        }
        alertConfirmation(alertType.delete, async () => {
            await sendDataDetailFreePaymentTransaction(
                () =>
                    deleteDetailFreePaymentRateByPaymentId(
                        id,
                        formBody,
                        dataUser.token
                    ),
                async () => {
                    await getDataDetailFreePaymentTransaction(() =>
                        getDetailFreePaymentRateByPaymentId(
                            selecteddataDetailFreePaymentTransaction,
                            dataUser.token
                        )
                    )
                    await getDataPaymentTransaction(() =>
                        getPaymentTransactionByStudent(
                            dataDetailSiswa.student_id,
                            {
                                period_start: tahunAjaranState.period_start,
                                period_end: tahunAjaranState.period_end,
                            },
                            dataUser.token
                        )
                    )
                },
                null
            )
        })
    }
    const onClickRefreshHandler = async () => {
        await getDataPaymentTransaction(() =>
            getPaymentTransactionByStudent(
                dataDetailSiswa.student_id,
                {
                    period_start: tahunAjaranState.period_start,
                    period_end: tahunAjaranState.period_end,
                },
                dataUser.token
            )
        )
    }
    return (
        <div className="page-content">
            <ToastContainer />
            <h3>
                Pembayaran Siswa
                <span style={{ fontSize: '0.8em', color: 'gray' }}>List</span>
            </h3>

            <div className="table-content">
                <div className="pembayaran-siswa">
                    <h6 className="filter-data">
                        Filter Data Pembayaran SIswa
                    </h6>
                    <div className="d-flex flex-row gap-3 justify-content-start align-items-end mt-2 thn-ajrn">
                        <SelectTahunAjaran
                            data={TahunAjaran.data}
                            onChange={onPeriodChange}
                            value={tahunAjaranState?.period_id ?? ''}
                        />
                        <div className="d-flex gap-1 justify-content-between">
                            <SearchInput
                                style={{ margin: 0 }}
                                filterText={filterText}
                                setFilterText={onChangeFilterText}
                            />

                            <Button
                                size="sm"
                                color="success"
                                disabled={!kelas && filterText === ''}
                                onClick={onClickSearchHandler}
                            >
                                Cari
                            </Button>
                        </div>

                        <Button size="sm" onClick={toggleModalSiswa}>
                            Data Siswa
                        </Button>
                    </div>
                </div>
                {dataDetailSiswa && (
                    <>
                        <div className="info-santri">
                            <h6>Informasi Siswa</h6>
                            <InformasiSantri dataValue={dataDetailSiswa} />
                            <ItemImageSiswa />
                        </div>

                        <div className="jenis-bayar">
                            <h6>Jenis Pembayaran</h6>
                            <Tabs
                                defaultActiveKey="bulanan"
                                transition={false}
                                id="noanim-tab-example"
                                className="mb-3"
                            >
                                <Tab eventKey="bulanan" title="Bulanan">
                                    <PembayaranBulanan
                                        data={dataDetailSiswa}
                                        onClickHandler={
                                            onClickItemPembayaranHandler
                                        }
                                    />
                                </Tab>
                                <Tab eventKey="bebas" title="Bebas">
                                    <PembayaranBebas
                                        data={dataDetailSiswa}
                                        onClickDiscountHandler={
                                            onClickDiscountHandler
                                        }
                                        onClickBayarHandler={
                                            onClickBayarHandler
                                        }
                                        onClickRefreshHandler={
                                            onClickRefreshHandler
                                        }
                                        onClickHandler={
                                            onClickItemPembayaranHandler
                                        }
                                        onClickItemDetailHandler={
                                            onClickItemDetailPembayaranHandler
                                        }
                                    />
                                </Tab>
                            </Tabs>
                        </div>

                        <div className="Jenis-Pembayaran">
                            <div className="transaksi-historiPembayaran">
                                <div className="pembayaran-history">
                                    <Tabs
                                        defaultActiveKey="Transaksi"
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
            <ModalPembayaranBulanan
                data={dataDetailPembayaran}
                headerName={'Data Bayar'}
                onSubmit={onClickSubmitButtonModal}
                initialValues={pembayaranBulananInitialValues}
                isOpenModal={isOpenModalPembayaran}
                toggleModal={() =>
                    setIsOpenModaPembayaran(!isOpenModalPembayaran)
                }
            />
            <ModalDiscount
                data={dataDetailPembayaran}
                isOpenModal={isOpenModalDiscount}
                onSubmit={onSubmitDiscountModal}
                toggleModal={() => setIsOpenModalDiscount(!isOpenModalDiscount)}
            />
            <ModalPembayaranBebas
                data={dataDetailPembayaran}
                isOpenModal={isOpenModalPembayaranBebas}
                onSubmitHandler={onSubmitBayarModal}
                toggleModal={() =>
                    setIsOpenModalPembayaranBebas(!isOpenModalPembayaranBebas)
                }
            />
            <ModalDetailPembayaran
                isOpenModal={isOpenModalDetailPembayaran}
                data={dataDetailFreePaymentTransaction.data}
                toggleModal={() =>
                    setIsOpenModalDetailPembayaran(!isOpenModalDetailPembayaran)
                }
                onCLickItemHandler={onClickItemDetailPembayaranHandler}
                onClickDeleteDetail={onDeleteDetailPembayaranHandler}
            />

            <ModalSiswa
                dataSiswa={
                    kelas || filterTextModal !== ''
                        ? newDataSiswa
                        : dataSiswa.data
                }
                subHeaderComponent={subHeaderComponent}
                isOpenModal={isOpenModalSiswa}
                toggleModal={toggleModalSiswa}
                dataKelas={dataKelas.data}
                onChangeKelas={onChangeKelasHandler}
                valueKelas={kelas}
                onClickSiswaHandler={onClickSiswaHandler}
                isLoading={isLoadingSiswa}
            />
        </div>
    )
}

export default PagePembayaranSiswa

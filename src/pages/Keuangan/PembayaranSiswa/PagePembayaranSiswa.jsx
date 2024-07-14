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
    getAllAktivaAccountCostPay,
    getAllKelas,
    getAllReferenceNumber,
    getAllSiswa,
    getAllTahunAjaran,
    getAllUnitByUser,
    getDetailFreePaymentRateByPaymentId,
    getDokumenKwitansiPembayaran,
    getDokumenRincianPembayaran,
    getDokumenTagihanPembayaran,
    getHistoryPaymentTransactionByStudent,
    getPaymentTransactionByStudent,
    getPaymentTransactionNotSubmittedByStudent,
    getReferenceCode,
    getTagihanPaymentTransactionByStudent,
    postSubmitPayment,
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
import AkunKas from './components/AkunKas'
import NoRef from './components/NoRefrensi'
import { downloadDocument } from '../../../utils/helper'
import ButtonWithLoader from '../../../component/ActionButton/ButtonWithLoader'
import SelectUnit from '../../../component/ActionButton/SelectUnit'
import { useFetcher } from 'react-router-dom'
import SelectBulan from '../../../component/ActionButton/SelectBulan'
import moment from 'moment'
import SelectDate from '../../../component/ActionButton/SelectDate'

const pembayaranBulananInitialValues = {
    payment_rate_bill: '',
    tanggal_pembayaran: new Date(),
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
    const { data: dataHistory, getData: getDataHistory } = useRequest()
    const { data: dataTagihan, getData: getDataTagihan } = useRequest()
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
        data: dataUnit,
        setData: setDataUnit,
        getData: getDataUnit,
    } = useRequest()
    const {
        data: dataReferenceNumber,
        setData: setDataataReferenceNumber,
        getData: getDataReferenceNumber,
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
        data: dataAkunkas,
        // dataDetail: selecteddataDetailFreePaymentTransaction,
        // setDataDetail: setSelecteDataDetailFreePaymentTransaction,
        // setData: setDataDetailFreePaymentTransaction,
        // sendData: sendDataDetailFreePaymentTransaction,
        getData: getDataAkunKas,
    } = useRequest()
    const {
        isLoading: isLoadingDataPaymentNotSubmit,
        data: dataPaymentNotSubmit,
        getData: getDataPaymentNotSubmit,
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
    const [paymentRateVia, setPaymentRateVia] = useState('')
    const [kelas, setKelas] = useState('')
    const [dataDetailPembayaran, setDataDetailPembayaran] = useState({})
    const [dataDiscount, setDataDiscount] = useState({})
    const [filterTextModal, setFilterTextModal] = useState('')
    const [dateBayarBulanan, setDateBayarBulanan] = useState(new Date())
    const [selectedNoReferensi, setSelectNoReferensi] = useState('')
    const {
        data: TahunAjaran,
        setData: setDataTahunAjaran,
        getData: getDataTahunAjaran,
    } = useRequest()
    const {
        data: dataCode,
        setData: setDataCode,
        getData: getDataCode,
    } = useRequest()
    const [paymentDate, setPaymentDate] = useState(new Date())
    const {
        data: dataDokumenTagihanPembayaran,
        setData: setDataDokumentagihanPembayaran,
        sendData: sendDataDokumentagihanPembayaran,
        isLoadingGenerate: isLoadngDokumenTagihanPembayaran,
        getData: getDataDokumentagihanPembayaran,
    } = useRequest(true)
    const {
        data: dataDokumenRincianPembayaran,
        isLoadingGenerate: isLoadngDokumenRincianPembayaran,
        getData: getDataDokumenRincianPembayaran,
        setData: setDataDokumenRincianPembayaran,
    } = useRequest(true)
    const {
        data: dataKwitansiPembayaran,
        isLoadingGenerate: isLoadingDokumenKwitansi,
        getData: getDataKwitansi,
        setData: setDataKwitansi,
    } = useRequest(true)
    // const {
    //     data: dataDokumenRincianPembayaran,
    //     isLoadingGenerate: isLoadngDokumenRincianPembayaran,
    //     getData: getDataDokumenRincianPembayaran,
    //     setData: setDataDokumenRincianPembayaran,
    // } = useRequest(true)

    //   const onCLickFilterSubmit = () => {
    //   const query = queryString.stringify(queryFilter);
    //   getDataSiswa(() => getAllSiswa(query, dataUser.token));
    // };

    const dataUser = useSelector(({ authState }) => authState.data)
    const [queryFilter, setQueryFilter] = useState({
        class_id: '',
        status: '',
        majors_id: '',
        unit_id: '',
    })

    useEffect(() => {
        getDataUnit(() => getAllUnitByUser(dataUser.token))
        getDataTahunAjaran(() => getAllTahunAjaran(dataUser.token))
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

    const onClickSiswaHandler = async (data) => {
        getDataPaymentTransaction(() =>
            getPaymentTransactionByStudent(
                data.student_id,
                {
                    period_start: TahunAjaran.data.filter(
                        (item) => item.period_status == 1
                    )[0]?.period_start,
                    period_end: TahunAjaran.data.filter(
                        (item) => item.period_status == 1
                    )[0]?.period_end,
                },
                dataUser.token
            )
        )
        console.log(data)
        await getDataCode(() =>
            getReferenceCode(
                {
                    ref_code: generateNoReferensi(data),
                    student_id: data.student_id,
                },
                dataUser.token
            )
        )
        getDataReferenceNumber(() =>
            getAllReferenceNumber(
                {
                    id: data.student_id,
                    payment_date: moment(paymentDate).format('YYYY-MM-DD'),
                },
                dataUser.token
            )
        )
        getDataPaymentNotSubmit(() =>
            getPaymentTransactionNotSubmittedByStudent(
                data.student_id,
                dataUser.token
            )
        )

        getDataHistory(() =>
            getHistoryPaymentTransactionByStudent(
                data.student_id,
                dataUser.token
            )
        )
        getDataTagihan(() =>
            getTagihanPaymentTransactionByStudent(
                data.student_id,
                dataUser.token
            )
        )

        setFilterText(data.student_nis)

        setIsOpenModalSiswa(!isOpenModalSiswa)
    }
    console.log(dataTagihan)
    useEffect(() => {
        console.log(dataPaymentTransaction)
        if (
            TahunAjaran.data.length > 0 &&
            dataPaymentTransaction.data.student_id
        ) {
            if (tahunAjaranState == '' || tahunAjaranState == undefined) {
                const tahuAjaranAktif = TahunAjaran.data.filter(
                    (item) => item.period_status == 1
                )[0]
                console.log(tahuAjaranAktif)
                setTahunAjaran(tahuAjaranAktif)
                setDataDetailSiswa({
                    ...dataPaymentTransaction.data,
                    period: `${tahuAjaranAktif?.period_start}/${tahuAjaranAktif?.period_end}`,
                })
            } else {
                console.log(tahunAjaranState)
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
                .includes(filterText.toLocaleLowerCase())
        )[0]
        getDataPaymentTransaction(() =>
            getPaymentTransactionByStudent(
                getSiswa.student_id,
                {
                    period_start: tahunAjaranState.period_start,
                    period_end: tahunAjaranState.period_end,
                },
                dataUser.token
            )
        )
        getDataCode(() =>
            getReferenceCode({
                ref_code: generateNoReferensi(getSiswa),
                student_id: getSiswa.student_id,
            })
        )
        getDataPaymentNotSubmit(() =>
            getPaymentTransactionNotSubmittedByStudent(
                getSiswa.student_id,
                dataUser.token
            )
        )
        getDataHistory(() =>
            getHistoryPaymentTransactionByStudent(
                getSiswa.student_id,
                dataUser.token
            )
        )
        getDataReferenceNumber(() =>
            getAllReferenceNumber(
                {
                    id: dataDetailSiswa.student_id,
                    payment_date: moment(paymentDate).format('YYYY-MM-DD'),
                },
                dataUser.token
            )
        )
        getDataTagihan(() =>
            getTagihanPaymentTransactionByStudent(
                getSiswa.student_id,
                dataUser.token
            )
        )
        setDataDetailSiswa((prevState) => ({
            ...prevState,
            period: `${tahunAjaranState.period_start}/${tahunAjaranState.period_end}`,
        }))
    }
    console.log(dataDetailSiswa)
    const onChangeKelasHandler = (e) => {
        setKelas(e.target.value)
    }
    const newDataSiswa = dataSiswa.data.filter(
        (item) =>
            (item.student_nis
                .toString()
                .toLowerCase()
                .includes(filterTextModal.toLocaleLowerCase()) ||
                item.student_full_name
                    .toString()
                    .toLowerCase()
                    .includes(filterTextModal.toLocaleLowerCase())) &&
            (kelas !== '' ? item.class_class_id == kelas : true)
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
        const formData = {
            student_student_id: dataDetailSiswa?.student_id,
            payment_rate_via: paymentRateVia,
            payment_rate_date_pay: dateBayarBulanan,
            payment_rate_number_pay: dataCode?.data?.code,
        }

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
                fetchDataPembayaran()
                setIsOpenModaPembayaran(!isOpenModalPembayaran)
            },
            null
        )
    }
    const onCLickDeletePembayaranBulananHandler = async (id) => {
        const formData = {
            student_student_id: dataDetailSiswa?.student_id,
        }

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
                fetchDataPembayaran()

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
                fetchDataPembayaran()
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
        formBody.payment_rate_via = paymentRateVia
        formBody.payment_rate_bebas_pay_number = dataCode?.data?.code
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
                fetchDataPembayaran()
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
                    fetchDataPembayaran()
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
        fetchDataPembayaran()
    }

    const fetchDataPembayaran = () => {
        getDataPaymentNotSubmit(() =>
            getPaymentTransactionNotSubmittedByStudent(
                dataDetailSiswa.student_id,
                dataUser.token
            )
        )
        getDataHistory(() =>
            getHistoryPaymentTransactionByStudent(
                dataDetailSiswa.student_id,
                dataUser.token
            )
        )
        getDataTagihan(() =>
            getTagihanPaymentTransactionByStudent(
                dataDetailSiswa.student_id,
                dataUser.token
            )
        )
        getDataReferenceNumber(() =>
            getAllReferenceNumber(
                {
                    id: dataDetailSiswa.student_id,
                    payment_date: moment(paymentDate).format('YYYY-MM-DD'),
                },
                dataUser.token
            )
        )
    }
    const generateNoReferensi = (data = null) => {
        return `KWT${data.unit_unit_name || dataDetailSiswa.unit_unit_name}${
            data.student_nis || dataDetailSiswa.student_nis
        }${new Date().getDate()}${
            (new Date().getMonth() + 1).toString().length == 1
                ? `0${new Date().getMonth() + 1}`
                : new Date().getMonth() + 1
        }${new Date().getFullYear().toString().substring(2)}`
    }

    const onChangeAkunKas = (e) => {
        setPaymentRateVia(e.target.value)
    }
    // useEffect(() => {
    //     if (
    //         dataDokumenRincianPembayaran?.data?.data &&
    //         dataDetailSiswa?.student_full_name
    //     ) {

    //     }
    // }, [dataDetailSiswa?.student_full_name, dataDokumenRincianPembayaran])
    const onClickCetakTagihanPembayaranHandler = async () => {
        await getDataDokumentagihanPembayaran(() =>
            getDokumenTagihanPembayaran(
                dataDetailSiswa.student_id,
                dataUser.token
            )
        )
    }
    const onClickCetakRincianPembayaranHandler = async () => {
        console.log(tahunAjaranState)
        await getDataDokumenRincianPembayaran(() =>
            getDokumenRincianPembayaran(
                dataDetailSiswa.student_id,
                {
                    period_start: tahunAjaranState.period_start,
                    period_end: tahunAjaranState.period_end,
                },
                dataUser.token
            )
        )
    }

    const onClickCetakKwitansiHandler = async () => {
        await getDataKwitansi(() =>
            getDokumenKwitansiPembayaran(
                {
                    student_id: dataDetailSiswa.student_id,
                    no_referensi: selectedNoReferensi,
                    period_start: tahunAjaranState.period_start,
                    period_end: tahunAjaranState.period_end,
                },
                dataUser.token
            )
        )
    }
    useEffect(() => {
        if (dataDokumenRincianPembayaran?.data?.data && dataDetailSiswa)
            downloadDocument(
                dataDokumenRincianPembayaran.data.data,
                `Rincian Bayar ${dataDetailSiswa.student_full_name}-${tahunAjaranState.period_start}/${tahunAjaranState.period_end}.pdf`
            )
        setDataDokumenRincianPembayaran(null)
    }, [dataDokumenRincianPembayaran?.data, dataDetailSiswa])
    useEffect(() => {
        if (dataKwitansiPembayaran?.data?.data && dataDetailSiswa)
            downloadDocument(
                dataKwitansiPembayaran.data.data,
                `Kwitansi Bayar ${dataDetailSiswa.student_full_name}-${tahunAjaranState.period_start}/${tahunAjaranState.period_end}.pdf`
            )
        setDataKwitansi(null)
    }, [dataKwitansiPembayaran?.data, dataDetailSiswa])
    useEffect(() => {
        if (dataDokumenTagihanPembayaran?.data?.data && dataDetailSiswa)
            downloadDocument(
                dataDokumenTagihanPembayaran.data.data,
                `Tagihan Bayar ${dataDetailSiswa.student_full_name}.pdf`
            )
        setDataDokumentagihanPembayaran(null)
    }, [dataDokumenTagihanPembayaran?.data, dataDetailSiswa])

    useEffect(() => {
        const query = queryString.stringify(queryFilter)

        getDataSiswa(() => getAllSiswa(query, dataUser.token))
        getDataKelas(() =>
            getAllKelas({ unit_unit_id: queryFilter.unit_id }, dataUser.token)
        )

        getDataAkunKas(() =>
            getAllAktivaAccountCostPay(
                { unit_unit_id: queryFilter.unit_id },
                dataUser.token
            )
        )
    }, [queryFilter.unit_id])
    const onClickSubmitBayarHandler = () => {
        alertConfirmation(
            alertType.add,
            async () => {
                console.log(dataPaymentNotSubmit.data)
                const formBody = {
                    total: dataPaymentNotSubmit.data?.total,
                    data_payment: dataPaymentNotSubmit.data?.data_payment.map(
                        (item) => ({
                            payment_rate_number_pay:
                                item.payment_rate_number_pay,
                            data_payment: dataPaymentNotSubmit.data,
                            detail_payment_rate_id:
                                item.payment_rate_bebas_pay_id ||
                                item.detail_payment_rate_id,

                            payment_type: item.payment_type,
                        })
                    ),
                    student_id: dataDetailSiswa.student_id,
                    period_start: tahunAjaranState.period_start,
                    period_end: tahunAjaranState.period_end,
                }
                await sendDataPaymentTransaction(
                    () => postSubmitPayment(formBody, dataUser.token),
                    () => {
                        fetchDataPembayaran()
                        getDataCode(() =>
                            getReferenceCode(
                                {
                                    ref_code:
                                        generateNoReferensi(dataDetailSiswa),
                                    student_id: dataDetailSiswa.student_id,
                                },
                                dataUser.token
                            )
                        )
                    }
                )
            },
            null
        )
    }
    const onDatePaymentChange = (date) => {
        setPaymentDate(date)
        getDataReferenceNumber(() =>
            getAllReferenceNumber(
                {
                    id: dataDetailSiswa.student_id,
                    payment_date: moment(date).format('YYYY-MM-DD'),
                },
                dataUser.token
            )
        )
    }

    const onChangeSelectReferensi = (e) => {
        setSelectNoReferensi(e.target.value)
    }

    return (
        <div className="page-content">
            <ToastContainer />
            <h3>
                Pembayaran Siswa
                <span style={{ fontSize: '0.8em', color: 'gray' }}> List</span>
            </h3>
            <div className="table-content">
                <div className="d-flex w-25 mb-3">
                    <SelectUnit
                        data={dataUnit.data}
                        name={'unit_id'}
                        onFilterChange={onQueryFilterChange}
                        value={queryFilter.unit_id}
                    />
                </div>
            </div>
            {queryFilter.unit_id && (
                <>
                    <div className="table-content">
                        <div className="pembayaran-siswa">
                            <h6 className="filter-data">
                                Filter Data Pembayaran SIswa
                            </h6>

                            {queryFilter.unit_id && <></>}
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
                                </div>
                                <ButtonWithLoader
                                    size="sm"
                                    style={{ width: '100px' }}
                                    color="success"
                                    isLoading={isLoadingPaymentTransaction}
                                    onClick={onClickSearchHandler}
                                    text={'Cari'}
                                    disabled={!kelas && filterText === ''}
                                />
                                <Button size="sm" onClick={toggleModalSiswa}>
                                    Data Siswa
                                </Button>
                            </div>
                        </div>
                        {dataDetailSiswa && (
                            <>
                                <div className="info-santri">
                                    <h6>Informasi Siswa</h6>
                                    <InformasiSantri
                                        dataValue={dataDetailSiswa}
                                    />
                                    <ItemImageSiswa />
                                </div>

                                <div className="jenis-bayar">
                                    <h6>Jenis Pembayaran</h6>
                                    <div className="no-refrensi">
                                        <p style={{ fontSize: '0.7rem' }}>
                                            <b>No. Referensi </b>{' '}
                                            <NoRef
                                                text={dataCode?.data?.code}
                                            />
                                        </p>
                                        <p style={{ fontSize: '0.7rem' }}>
                                            <b>Akun Kas * </b>{' '}
                                            <AkunKas
                                                data={dataAkunkas}
                                                onChangeHandler={
                                                    onChangeAkunKas
                                                }
                                                value={paymentRateVia}
                                            />
                                        </p>
                                    </div>
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
                                                        <TransaksiPembayaran
                                                            isLoading={
                                                                isLoadingPaymentTransaction
                                                            }
                                                            data={
                                                                dataPaymentNotSubmit.data
                                                            }
                                                            onClickSubmitHandler={
                                                                onClickSubmitBayarHandler
                                                            }
                                                        />
                                                    </div>
                                                </Tab>
                                                <Tab
                                                    eventKey="History"
                                                    title="History Pembayaran"
                                                >
                                                    <HistoryPembayaran
                                                        data={dataHistory.data}
                                                    />
                                                </Tab>

                                                <Tab
                                                    eventKey="Tagihan"
                                                    title="Tagihan Pembayaran"
                                                >
                                                    <TagihanPembayaran
                                                        isLoading={
                                                            isLoadngDokumenTagihanPembayaran
                                                        }
                                                        data={dataTagihan.data}
                                                        onClickCetakTagihanPembayaranHandler={
                                                            onClickCetakTagihanPembayaranHandler
                                                        }
                                                    />
                                                </Tab>
                                            </Tabs>
                                        </div>
                                    </div>
                                    <div className="kalkulator">
                                        <div className="bukti-pembayaran">
                                            <h6>Cetak Bukti Pembayaran</h6>
                                            <SelectDate
                                                date={paymentDate}
                                                onDateChange={
                                                    onDatePaymentChange
                                                }
                                            />
                                            <NoRefrensi
                                                value={selectedNoReferensi}
                                                onChangeHandler={
                                                    onChangeSelectReferensi
                                                }
                                                data={dataReferenceNumber.data}
                                                onClickHandler={() => {}}
                                            />
                                            <CetakButton
                                                isLoading={
                                                    isLoadngDokumenRincianPembayaran
                                                }
                                                isDisabledKwitansi={
                                                    selectedNoReferensi == ''
                                                }
                                                isLoadingKwitansi={
                                                    isLoadingDokumenKwitansi
                                                }
                                                onClickCetakKwitansiHandler={
                                                    onClickCetakKwitansiHandler
                                                }
                                                onClickCetakSemuaHandler={
                                                    onClickCetakRincianPembayaranHandler
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
            <ModalPembayaranBulanan
                data={dataDetailPembayaran}
                headerName={'Data Bayar'}
                dateDate={dateBayarBulanan}
                onChangeDate={setDateBayarBulanan}
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
                dataKelas={dataKelas?.data}
                onChangeKelas={onChangeKelasHandler}
                valueKelas={kelas}
                onClickSiswaHandler={onClickSiswaHandler}
                isLoading={isLoadingSiswa}
            />
        </div>
    )
}

export default PagePembayaranSiswa

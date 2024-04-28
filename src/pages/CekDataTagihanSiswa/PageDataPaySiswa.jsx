import React, { useEffect, useMemo, useRef, useState } from 'react'
import InformasiSiswa from './component/InformasiSiswa'
import TagihanBulanan from './component/TagihanBulanan'
import TagihanLainnya from './component/TagihanLainnya'
import HeaderTagihanSiswa from './component/HeaderTagihan'
import SelectTahunAjaran from '../../component/ActionButton/SelectTahunAjaran'
import SearchInput from '../../component/ActionButton/SearchInput'
import useRequest from '../../customHooks/useRequest'
import { useSelector } from 'react-redux'
import ButtonWithLoader from '../../component/ActionButton/ButtonWithLoader'
import { Button } from 'reactstrap'
import useTable from '../../customHooks/useTable'
import queryString from 'query-string'

import {
    getTagihanPaymentTransactionByStudent,
    getHistoryPaymentTransactionByStudent,
    getAllTahunAjaran,
    getAllUnitByUser,
    getPaymentTransactionByStudent,
    getAllSiswa,
} from '../../utils/http'
import ItemImageSiswa from '../Keuangan/PembayaranSiswa/components/ImageSiswa'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import SelectUnit from '../../component/ActionButton/SelectUnit'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import PembayaranBulanan from './component/PembayaranBulanan'
import PembayaranBebas from './component/PembayaranBebas'

function PageDataTagihanSiswa() {
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
        resetPaginationToggle,
        setResetPaginationToggle,
        setIsOpenModalEdit,
        isOpenModalForm: isOpenModalSiswa,
        setIsOpenModalForm: setIsOpenModalSiswa,
        isEdit,
        setIsEdit,
    } = useTable()

    const { data: dataHistory, getData: getDataHistory } = useRequest()
    const { data: dataTagihan, getData: getDataTagihan } = useRequest()
    const [kelas, setKelas] = useState('')
    const [tahunAjaranState, setTahunAjaran] = useState('')
    const {
        data: TahunAjaran,
        setData: setDataTahunAjaran,
        getData: getDataTahunAjaran,
    } = useRequest()

    const dataUser = useSelector(({ authState }) => authState.data)
    const [queryFilter, setQueryFilter] = useState({
        class_id: '',
        status: '',
        majors_id: '',
        unit_id: '',
    })
    const {
        data: dataUnit,
        setData: setDataUnit,
        getData: getDataUnit,
    } = useRequest()
    useEffect(() => {
        getDataUnit(() => getAllUnitByUser(dataUser.token))
        getDataTahunAjaran(() => getAllTahunAjaran(dataUser.token))
    }, [])

    const onPeriodChange = (e) => {
        console.log(TahunAjaran)
        const selectedPeriod = TahunAjaran.data.filter(
            (item) => item.period_id == parseInt(e.target.value, 10)
        )[0]

        setTahunAjaran(selectedPeriod)
    }

    const {
        data: dataPaymentTransaction,
        setData: setDataPaymentTransaction,
        sendData: sendDataPaymentTransaction,

        getData: getDataPaymentTransaction,
        isLoading: isLoadingPaymentTransaction,
        setIsLoading: setIsLoadingPaymentTransaction,
        isLoadingSendData: isLoadingSendPaymentTransaction,
    } = useRequest()

    //  getDataTagihan(() =>
    //      getTagihanPaymentTransactionByStudent(
    //          data.student_id,
    //          dataUser.token
    //      )
    //  )

    const onClickSearchHandler = () => {
        console.log('aaa')

        const getSiswa = dataSiswa.data.filter((item) =>
            item.student_nis
                .toString()
                .toLowerCase()
                .includes(filterText.toLocaleLowerCase())
        )[0]
        if (getSiswa) {
            getDataPaymentTransaction(() =>
                getPaymentTransactionByStudent(
                    getSiswa.student_id,
                    {
                        period_start: tahunAjaranState
                            ? tahunAjaranState.period_start
                            : TahunAjaran.data[0].period_start,
                        period_end: tahunAjaranState
                            ? tahunAjaranState.period_end
                            : TahunAjaran.data[0].period_end,
                    },
                    dataUser.token
                )
            )
            setDataDetailSiswa({
                ...getSiswa,
                period: `${tahunAjaranState.period_start}/${tahunAjaranState.period_end}`,
            })

            getDataTagihan(() =>
                getTagihanPaymentTransactionByStudent(
                    getSiswa.student_id,
                    dataUser.token
                )
            )
        } else {
            toast.error('Data Tidak Ditemukan', {
                theme: 'colored',
            })
            setDataDetailSiswa({})
        }
    }

    useEffect(() => {
        const query = queryString.stringify(queryFilter)
        getDataSiswa(() => getAllSiswa(query, dataUser.token))
    }, [])

    const onQueryFilterChange = (e) => {
        setQueryFilter((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    useEffect(() => {
        setDataDetailSiswa((prevState) => ({
            ...prevState,
            ...dataPaymentTransaction.data,
        }))
    }, [dataPaymentTransaction, setDataDetailSiswa])
    console.log(dataDetailSiswa)
    return (
        <div>
            <ToastContainer />

            <HeaderTagihanSiswa />
            <div>
                <div className="data-pembayaran-siswa">
                    <h3>
                        Cek Data Tagihan Siswa
                        <span style={{ fontSize: '0.8em', color: 'gray' }}>
                            {' '}
                        </span>
                    </h3>
                    <div>
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
                            <div>
                                <div className="pembayaran-siswa">
                                    {queryFilter.unit_id && <></>}
                                    <div className="d-flex flex-row gap-3 justify-content-start align-items-end mt-2 thn-ajrn flex-1 w-100">
                                        <SelectTahunAjaran
                                            data={TahunAjaran.data}
                                            onChange={onPeriodChange}
                                            value={
                                                tahunAjaranState?.period_id ??
                                                ''
                                            }
                                        />
                                        <div className="d-flex flex-1 gap-1 justify-content-between">
                                            <SearchInput
                                                style={{
                                                    margin: 0,
                                                    width: '100%',
                                                }}
                                                filterText={filterText}
                                                setFilterText={
                                                    onChangeFilterText
                                                }
                                            />
                                        </div>
                                        <ButtonWithLoader
                                            size="sm"
                                            style={{ width: '300px' }}
                                            color="success"
                                            isLoading={
                                                isLoadingPaymentTransaction
                                            }
                                            onClick={onClickSearchHandler}
                                            text={'Cari'}
                                            disabled={filterText === ''}
                                        />
                                        {/* <Button
                                            size="sm"
                                            onClick={toggleModalSiswa}
                                        >
                                            Data Siswa
                                        </Button> */}
                                    </div>
                                </div>
                            </div>

                            {dataDetailSiswa?.free_type && (
                                <div className="data-tagihan-info-siswa-smk">
                                    <div className="data-siswa-smk">
                                        <h6>Informasi Siswa</h6>
                                        <InformasiSiswa
                                            dataValue={dataDetailSiswa}
                                        />
                                        {/* <ItemImageSiswa /> */}
                                    </div>
                                    <div className="tagihan-lainnya">
                                        <Tabs
                                            defaultActiveKey="bulanan"
                                            transition={false}
                                            id="noanim-tab-example"
                                            className="mb-3"
                                        >
                                            <Tab
                                                eventKey="bulanan"
                                                title="Bulanan"
                                            >
                                                <PembayaranBulanan
                                                    data={dataDetailSiswa}
                                                    onClickHandler={() => {}}
                                                />
                                            </Tab>
                                            <Tab eventKey="bebas" title="Bebas">
                                                <PembayaranBebas
                                                    data={dataDetailSiswa}
                                                    onClickDiscountHandler={() => {}}
                                                    onClickBayarHandler={() => {}}
                                                    onClickRefreshHandler={() => {}}
                                                    onClickHandler={() => {}}
                                                    onClickItemDetailHandler={() => {}}
                                                />
                                            </Tab>
                                        </Tabs>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PageDataTagihanSiswa

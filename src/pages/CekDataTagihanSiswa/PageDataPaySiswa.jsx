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
import {
    getTagihanPaymentTransactionByStudent,
    getHistoryPaymentTransactionByStudent,
    getAllTahunAjaran,
} from '../../utils/http'
import ItemImageSiswa from '../Keuangan/PembayaranSiswa/components/ImageSiswa'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

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

    useEffect(() => {
        //  getDataUnit(() => getAllUnitByUser(dataUser.token))
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
        const getSiswa = dataSiswa.data.filter((item) =>
            item.student_nis
                .toString()
                .toLowerCase()
                .includes(filterText.toLocaleLowerCase())
        )[0]
        // getDataPaymentTransaction(() =>
        //     getPaymentTransactionByStudent(
        //         getSiswa.student_id,
        //         {
        //             period_start: tahunAjaranState.period_start,
        //             period_end: tahunAjaranState.period_end,
        //         },
        //         dataUser.token
        //     )
        // // )
        // getDataCode(() =>
        //     getReferenceCode({
        //         ref_code: generateNoReferensi(getSiswa),
        //         student_id: getSiswa.student_id,
        //     })
        // )
        // getDataPaymentNotSubmit(() =>
        //     getPaymentTransactionNotSubmittedByStudent(
        //         getSiswa.student_id,
        //         dataUser.token
        //     )
        // )
        // getDataHistory(() =>
        //     getHistoryPaymentTransactionByStudent(
        //         getSiswa.student_id,
        //         dataUser.token
        //     )
        // )
        // getDataTagihan(() =>
        //     getTagihanPaymentTransactionByStudent(
        //         getSiswa.student_id,
        //         dataUser.token
        //     )
        // )
        // setDataDetailSiswa((prevState) => ({
        //     ...prevState,
        //     period: `${tahunAjaranState.period_start}/${tahunAjaranState.period_end}`,
        // }))
    }

    const toggleModalSiswa = (e) => {
        setIsOpenModalSiswa(!isOpenModalSiswa)
    }

    return (
        <div>
            <HeaderTagihanSiswa />
            <div className="table-content">
                <div className="data-pembayaran-siswa">
                    <h4>Cek Data Pembayar Siswa</h4>
                    <div className="d-flex flex-row gap-3  align-items-end mt-2 thn-ajrn">
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

                <div className="data-tagihan-info-siswa-smk">
                    <div className="data-siswa-smk">
                        <h6>Informasi Siswa</h6>
                        <InformasiSiswa dataValue={dataDetailSiswa} />
                        {/* <ItemImageSiswa /> */}
                    </div>
                    <div className="tagihan-lainnya">
                        <Tabs
                            defaultActiveKey="home"
                            transition={false}
                            id="noanim-tab-example"
                            className="mb-3"
                        >
                            <Tab
                                eventKey="TagihanBulanan"
                                title="TagihanBulanan"
                            >
                                <TagihanBulanan />
                            </Tab>

                            <Tab
                                eventKey="TagihanLainnya"
                                title="TagihanLainnya"
                            >
                                <TagihanLainnya />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageDataTagihanSiswa

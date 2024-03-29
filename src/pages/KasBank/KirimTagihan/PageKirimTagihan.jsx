import React, { useEffect, useMemo, useRef, useState } from 'react'
// import TableSiswa from "./components/TableSiswa";

import SelectProdi from '../../../component/ActionButton/SelectProdi'
import SearchInput from '../../../component/ActionButton/SearchInput'
import TableKirimTagihan from './components/TableKirimTagihan'

import { FaSquareWhatsapp } from 'react-icons/fa6'

import _ from 'lodash'
import useRequest from '../../../customHooks/useRequest'
import {
    getAllProdi,
    putProdi,
    getAllTahunAjaran,
    deleteProdi,
    postProdi,
    getAllSiswa,
    putSiswa,
    deleteSiswa,
    postSiswa,
    getAllKelas,
    getAllUnitByUser,
    getTagihanPaymentTransactionAllStudent,
    postSendWhatsapp,
} from '../../../utils/http'
// import "./css/page-laporan-pembayaran-kelas.css";
import { useSelector } from 'react-redux'
// import ModalForm from "./components/FormModal";
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
// import DetailModal from "./components/DetailModal";
import { dateConvert, dateConvertForDb } from '../../../utils/helper'
import ReactToPrint, { useReactToPrint } from 'react-to-print'
// import PrintTableSiswaComponent from "./components/PrintTableSiswaTemplate";
import SelectTahunAjaran from '../../../component/ActionButton/SelectTahunAjaran'
import { FaWhatsapp } from 'react-icons/fa6'
import SelectUnit from '../../../component/ActionButton/SelectUnit'
function PageKirimTagihan() {
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
        resetPaginationToggle,
        setResetPaginationToggle,
        setIsOpenModalEdit,
        isOpenModalForm,
        setIsOpenModalForm,
        isEdit,
        setIsEdit,
    } = useTable()

    const dataUser = useSelector(({ authState }) => authState.data)

    const {
        data: TahunAjaran,
        setData: setDataTahunAjaran,
        getData: getDataTahunAjaran,
    } = useRequest()
    const {
        data: dataUnit,
        setData: setDataUnit,
        getData: getDataUnit,
    } = useRequest()
    const [queryFilter, setQueryFilter] = useState({
        class_id: '',
        period_id: '',
        unit_id: '',
        majors_id: '',
    })
    const [isSubmit, setIsSubmit] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState([])
    const printComponent = useRef()
    useEffect(() => {
        getDataTahunAjaran(() => getAllTahunAjaran(dataUser.token))

        getDataUnit(() => getAllUnitByUser(dataUser.token))
    }, [])

    const onPeriodChange = (e) => {
        setQueryFilter((prevState) => ({
            ...prevState,
            period_id: e.target.value,
        }))
    }

    const onCLickFilterSubmit = async () => {
        // const query = queryString.stringify(queryFilter)
        await getDataSiswa(() =>
            getTagihanPaymentTransactionAllStudent(queryFilter, dataUser.token)
        )
        setIsSubmit(true)
    }

    const onQueryFilterChange = (e) => {
        setQueryFilter((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    useEffect(() => {
        if (queryFilter.unit_id) {
            getDataProdi(() =>
                getAllProdi({ unit_id: queryFilter.unit_id }, dataUser.token)
            )
            getDataKelas(() =>
                getAllKelas({ unit_id: queryFilter.unit_id }, dataUser.token)
            )
        }
    }, [queryFilter])
    const onSelectableChange = ({ selectedRows }) =>
        setSelectedStudent(selectedRows)
    const onSubmitKirimTagihan = () => {
        const body = { students: selectedStudent }
        alertConfirmation('Mengirim Tagihan', () =>
            sendDataSiswa(() => postSendWhatsapp(body, dataUser.token))
        )
    }

    return (
        <>
            <ToastContainer />
            <div className="page-content">
                <h3>
                    Kirim Tagihan{' '}
                    <span style={{ fontSize: '0.8em', color: 'gray' }}>
                        List
                    </span>
                </h3>

                <div className="table-content">
                    <div className="d-flex flex-row gap-1 justify-content-start align-items-center mt-2">
                        <SelectTahunAjaran
                            data={TahunAjaran.data}
                            onChange={onPeriodChange}
                            value={queryFilter?.period_id ?? ''}
                        />
                        <SelectUnit
                            data={dataUnit.data}
                            name={'unit_id'}
                            onFilterChange={onQueryFilterChange}
                            value={queryFilter.unit_id}
                        />
                        {/* <SelectProdi
                            data={dataProdi.data}
                            name={'majors_id'}
                            onProdiFilterChange={onQueryFilterChange}
                            value={queryFilter.majors_id}
                        /> */}
                        <SelectUnitKelas
                            data={dataKelas.data}
                            name={'class_id'}
                            onProdiFilterChange={onQueryFilterChange}
                            value={queryFilter.class_id}
                        />

                        <Button
                            size="sm"
                            className="align-self-end text-bg-dark"
                            onClick={onCLickFilterSubmit}
                            color="dark"
                            disabled={
                                !queryFilter.class_id ||
                                !queryFilter.unit_id ||
                                !queryFilter.period_id
                            }
                        >
                            Cari
                        </Button>
                        <Button
                            size="sm"
                            className="align-self-end d-flex align-items-center"
                            onClick={onSubmitKirimTagihan}
                            color="success"
                            disabled={selectedStudent.length < 1}
                        >
                            <FaWhatsapp
                                style={{ width: '30px', height: '20px' }}
                            />
                            Kirim Tagihan
                        </Button>
                    </div>
                    {isSubmit && (
                        <div className="table-kirim-tagihan">
                            <TableKirimTagihan
                                data={dataSiswa.data}
                                onSelectableChange={onSelectableChange}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default PageKirimTagihan

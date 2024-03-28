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
    const [queryFilter, setQueryFilter] = useState({
        class_id: '',
        period_id: '',
        majors_id: '',
    })
    const [isOpenDetailModal, setIsOpenDetailModal] = useState(false)
    const printComponent = useRef()
    useEffect(() => {
        const query = queryString.stringify(queryFilter)
        getDataSiswa(() => getAllSiswa(query, dataUser.token))
        getDataProdi(() => getAllProdi(dataUser.token))
        getDataKelas(() => getAllKelas(dataUser.token))
        getDataTahunAjaran(() => getAllTahunAjaran(dataUser.token))
    }, [])

    const onPeriodChange = (e) => {
        console.log(TahunAjaran)
        const selectedPeriod = TahunAjaran.data.filter(
            (item) => item.period_id == parseInt(e.target.value, 10)
        )[0]
    }

    const onCLickFilterSubmit = () => {
        const query = queryString.stringify(queryFilter)
        getDataSiswa(() => getAllSiswa(query, dataUser.token))
    }
    const onSearchClickHandler = () => {}

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

                        <Button
                            size="sm"
                            className="align-self-end text-bg-dark"
                            onClick={onCLickFilterSubmit}
                            color="dark"
                        >
                            Cari
                        </Button>
                        <Button
                            size="sm"
                            className="align-self-end d-flex align-items-center"
                            onClick={onCLickFilterSubmit}
                            color="success"
                        >
                            <FaWhatsapp
                                style={{ width: '30px', height: '20px' }}
                            />
                            Kirim Tagihan
                        </Button>
                    </div>

                    <div className="table-kirim-tagihan">
                        <TableKirimTagihan />
                    </div>

                    {/* <TableSiswa
            data={filterText.length > 0 ? dataFiltered : dataSiswa.data}
            subHeaderComponent={subHeaderComponent}
            resetPaginationToggle={resetPaginationToggle}
            isLoading={isLoadingSiswa}
            onClickEditHandler={onClickEditHandler}
            onClickDetailHandler={onClickDetailSiswaHandler}
            onClickDeleteHandler={onSubmitDeleteHandler}
          /> */}
                </div>
                {/* <ModalForm
          initialValues={isEdit ? dataDetailSiswa : siswaInitialValues}
          schema={siswaSchema}
          toggle={() => setIsOpenModalForm(!isOpenModalForm)}
          isOpen={isOpenModalForm}
          btnName={isEdit ? "Edit" : "Tambah"}
          dataProdi={dataProdi.data}
          dataKelas={dataKelas.data}
          isLoadingSendData={isLoadingSendDataSiswa}
          headerName={isEdit ? "Edit Siswa" : "Tambah Siswa"}
          onSubmitHandler={isEdit ? onSubmitEditHandler : onSubmitTambahHandler}
        />
        <DetailModal
          data={dataDetailSiswa}
          isOpen={isOpenDetailModal}
          toggle={() => setIsOpenDetailModal(!isOpenDetailModal)}
          headerName={"Detail"}
        /> */}
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

                {/* <PrintTableSiswaComponent data={dataSiswa.data} ref={printComponent} /> */}
            </div>
        </>
    )
}

export default PageKirimTagihan
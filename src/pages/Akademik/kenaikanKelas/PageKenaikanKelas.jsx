import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import TableKenaikanKelas from './component/TableKenaikanKelas'
import SelectUnit from '../../../component/ActionButton/SelectUnit'
import { Button, Col, Row } from 'reactstrap'
import SelectTahunAjaran from '../../../component/ActionButton/SelectTahunAjaran'
import SelectUnitKelas from '../../../component/ActionButton/SelectUnitKelas'
import useRequest from '../../../customHooks/useRequest'
import {
    getAllProdi,
    getAllTahunAjaran,
    putProdi,
    deleteProdi,
    postProdi,
    getAllSiswa,
    putSiswa,
    deleteSiswa,
    postSiswa,
    getAllKelas,
    putSiswaKenaikanKelas,
    getTagihanPaymentTransactionAllStudent,
    getAllUnitByUser,
} from '../../../utils/http'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

function PageKenaikanKelas() {
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
        data: dataProdi,
        setData: setDataProdi,
        getData: getDataProdi,
    } = useRequest()

    const { data: dataKelas, getData: getDataKelas } = useRequest()
    const { data: dataKelasTujuan, getData: getDataKelasTujuan } = useRequest()
    const { data: dataKenaikanKelas, sendData: sendDataKenaikanKelas } =
        useRequest()

    const dataUser = useSelector(({ authState }) => authState.data)

    const {
        data: TahunAjaran,
        setData: setDataTahunAjaran,
        getData: getDataTahunAjaran,
    } = useRequest()

    const [queryFilter, setQueryFilter] = useState({
        class_id: '',
        status: '',
        majors_id: '',
        unit_id: '',
        class_id_tujuan: '',
        unit_id_tujuan: '',
    })

    const [isSubmit, setIsSubmit] = useState(false)
    const [toggleCleared, setToggleCleared] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState([])

    useEffect(() => {
        getDataUnit(() => getAllUnitByUser(dataUser.token))
        // getDataKelas(() =>
        //     getAllKelas({ unit_unit_id: queryFilter.unit_id }, dataUser.token)
        // )

        getDataTahunAjaran(() => getAllTahunAjaran(dataUser.token))
    }, [])

    useEffect(() => {
        if (queryFilter.unit_id) {
            getDataProdi(() =>
                getAllProdi({ unit_id: queryFilter.unit_id }, dataUser.token)
            )
            // getDataKelas(() =>
            //     getAllKelas({ unit_id: queryFilter.unit_id }, dataUser.token)
            // )
        }
    }, [queryFilter])

    const onPeriodChange = (e) => {
        setQueryFilter((prevState) => ({
            ...prevState,
            period_id: e.target.value,
        }))
    }

    const onSelectableChange = ({ selectedRows }) => {
        setSelectedStudent(selectedRows)
    }

    const onCLickFilterSubmit = async () => {
        await getDataSiswa(() =>
            getTagihanPaymentTransactionAllStudent(queryFilter, dataUser.token)
        )
        setIsSubmit(true)
    }

    const onCLickSubmitKenaikanKelas = async () =>
        await sendDataKenaikanKelas(
            () =>
                putSiswaKenaikanKelas(
                    {
                        ids: selectedStudent.map((item) => item.student_id),
                        class_id: queryFilter.class_id_tujuan,
                        unit_id: queryFilter.unit_id_tujuan,
                    },
                    dataUser.token
                ),
            () => {
                onCLickFilterSubmit()
                setSelectedStudent([])
                setToggleCleared(!toggleCleared)
            }
        )

    const onQueryFilterChange = (e) => {
        setQueryFilter((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    useEffect(() => {
        getDataKelas(() =>
            getAllKelas({ unit_unit_id: queryFilter.unit_id }, dataUser.token)
        )
    }, [queryFilter.unit_id])
    useEffect(() => {
        getDataKelasTujuan(() =>
            getAllKelas(
                { unit_unit_id: queryFilter.unit_id_tujuan },
                dataUser.token
            )
        )
    }, [queryFilter.unit_id_tujuan])

    return (
        <div className="page-content">
            <h3>
                Kenaikan Kelas{' '}
                <span style={{ fontSize: '0.8em', color: 'gray' }}>List</span>
            </h3>
            <div
                className="kenaikan-kelas"
                style={{
                    display: 'flex',
                    gap: '50px',
                }}
            >
                <div
                    className="table-content"
                    style={{
                        width: '70%',
                    }}
                >
                    <div className="d-flex flex-row gap-1 justify-content-start align-items-center mt-2">
                        {/* <SelectTahunAjaran
                            data={TahunAjaran.data}
                            onChange={onPeriodChange}
                            value={queryFilter?.period_id ?? ''}
                        /> */}

                        <SelectUnit
                            data={dataUnit.data}
                            name={'unit_id'}
                            onFilterChange={onQueryFilterChange}
                            value={queryFilter.unit_id}
                            includeAll={false}
                        />
                        <SelectUnitKelas
                            data={dataKelas.data}
                            name={'class_id'}
                            firstValue={'-'}
                            onProdiFilterChange={onQueryFilterChange}
                            value={queryFilter.class_id}
                        />

                        <Button
                            size="sm"
                            className="align-self-end text-bg-dark"
                            onClick={onCLickFilterSubmit}
                            color="dark"
                            disabled={
                                !queryFilter.class_id || !queryFilter.unit_id
                            }
                        >
                            Cari
                        </Button>
                    </div>
                    {isSubmit && (
                        <div className="table-kirim-tagihan">
                            <TableKenaikanKelas
                                data={dataSiswa.data}
                                clearSelectedRows={toggleCleared}
                                onSelectableChange={onSelectableChange}
                            />
                        </div>
                    )}
                </div>
                <div
                    className="pindah-kenaikan"
                    style={{
                        width: '30%',
                        borderTop: '1px solid grey',
                        padding: '10px',
                    }}
                >
                    <SelectUnit
                        data={dataUnit.data}
                        name={'unit_id_tujuan'}
                        onFilterChange={onQueryFilterChange}
                        value={queryFilter.unit_id_tujuan}
                    />
                    <SelectUnitKelas
                        data={dataKelasTujuan.data}
                        firstValue={'-'}
                        onProdiFilterChange={onQueryFilterChange}
                        name={'class_id_tujuan'}
                        value={queryFilter.class_id_tujuan}
                    />
                    <Button
                        style={{
                            marginTop: '50px',
                            width: '100%',
                            maxHeight: '200px',
                        }}
                        onClick={onCLickSubmitKenaikanKelas}
                    >
                        Proses Pindah/Naik Kelas
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PageKenaikanKelas

import React, { useEffect, useState } from 'react'
import DateInput from '../../../../component/ActionButton/InputDate'
import SelectUnitKelas from '../../../../component/ActionButton/SelectUnitKelas'
import { ToastContainer } from 'react-toastify'
import { FaFileExcel, FaFilePdf } from 'react-icons/fa6'

import { Button } from 'reactstrap'
import { useSelector } from 'react-redux'

import useRequest from '../../../../customHooks/useRequest'
import { getAllKelas } from '../../../../utils/http'

import TableJurnalUmum from './component/TabelJurnalUmum'

function JurnalUmum() {
    const {
        data: dataKelas,
        setData: setDataKelas,
        getData: getDataKelas,
    } = useRequest()

    const dataUser = useSelector(({ authState }) => authState.data)
    const [queryFilter, setQueryFilter] = useState({
        class_id: '',
        status: '',
        majors_id: '',
    })

    useEffect(() => {
        getDataKelas(() => getAllKelas(dataUser.token))
    }, [])

    const onQueryFilterChange = (e) => {
        setQueryFilter((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <>
            <ToastContainer />
            <div className="page-content">
                <h3>
                    Laporan Jurnal Umum{' '}
                    <span style={{ fontSize: '0.8em', color: 'gray' }}>
                        List
                    </span>
                </h3>

                <div className="table-content">
                    <div className="sub-content">
                        <div className="d-flex flex-row gap-1 justify-content-start align-items-center mt-2">
                            <SelectUnitKelas
                                data={dataKelas.data}
                                onProdiFilterChange={onQueryFilterChange}
                                value={queryFilter.class_id}
                            />

                            <span
                                style={{ fontSize: '0.8rem', width: '300px' }}
                            >
                                Tanggal Awal
                                <DateInput />
                            </span>
                            <span
                                style={{ fontSize: '0.8rem', width: '300px' }}
                            >
                                Tanggal Akhir
                                <DateInput />
                            </span>

                            <Button size="sm" className="align-self-end">
                                Filter
                            </Button>
                        </div>
                    </div>

                    <div className="sub-content">
                        <h6
                            style={{
                                fontSize: '20px',
                                color: 'white',
                                marginBottom: '30px',
                                backgroundColor: 'lightblue',
                                padding: '10px',
                                marginTop: '-10px',
                                borderRadius: '2px',
                            }}
                        >
                            Laporan Per tanggal XXXXXX
                        </h6>
                        <TableJurnalUmum />

                        <div className="button-cetak">
                            <div className="button1">
                                <Button
                                    color="success"
                                    size="sm"
                                    className="align-self-end"
                                >
                                    <FaFileExcel /> Excel Per jenis Anggaran
                                </Button>{' '}
                                <Button
                                    color="info"
                                    size="sm"
                                    className="align-self-end"
                                >
                                    <span style={{ color: 'white' }}>
                                        <FaFilePdf />
                                        PDF Per jenis Anggaran
                                    </span>
                                </Button>
                            </div>

                            <div className="button1">
                                <Button
                                    color="success"
                                    size="sm"
                                    className="align-self-end"
                                >
                                    <FaFileExcel /> Excel Rekap Laporan
                                </Button>{' '}
                                <Button
                                    color="info"
                                    size="sm"
                                    className="align-self-end"
                                >
                                    <span style={{ color: 'white' }}>
                                        <FaFilePdf />
                                        PDF Rekap Laporan
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JurnalUmum

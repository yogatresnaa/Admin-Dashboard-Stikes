import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import TableKenaikanKelas from './component/TableKenaikanKelas'
import SelectUnit from '../../../component/ActionButton/SelectUnit'
import { Button, Col, Row } from 'reactstrap'
import SelectUnitKelas from '../../../component/ActionButton/SelectUnitKelas'
import useRequest from '../../../customHooks/useRequest'
import {
    getAllProdi,
    putProdi,
    deleteProdi,
    postProdi,
    getAllSiswa,
    putSiswa,
    deleteSiswa,
    postSiswa,
    getAllKelas,
    putStatusSiswa,
    getAllUnitByUser,
} from '../../../utils/http'
import { useSelector } from 'react-redux'

function PageKenaikanKelas() {
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

    const dataUser = useSelector(({ authState }) => authState.data)
    const [queryFilter, setQueryFilter] = useState({
        class_id: '',
        status: '',
        majors_id: '',
        unit_id: '',
    })

    useEffect(() => {
        getDataUnit(() => getAllUnitByUser(dataUser.token))
        getDataKelas(() =>
            getAllKelas({ unit_unit_id: queryFilter.unit_id }, dataUser.token)
        )
    }, [])

    const onQueryFilterChange = (e) => {
        setQueryFilter((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

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
                        <SelectUnit
                            data={dataUnit.data}
                            onFilterChange={onQueryFilterChange}
                            value={queryFilter.unit_id}
                        />
                        <SelectUnitKelas
                            data={dataKelas.data}
                            onProdiFilterChange={onQueryFilterChange}
                            value={queryFilter.class_id}
                        />
                    </div>
                    <TableKenaikanKelas />
                </div>
                <div className="table-content" style={{ width: '30%' }}>
                    <SelectUnit
                        data={dataUnit.data}
                        onFilterChange={onQueryFilterChange}
                        value={queryFilter.unit_id}
                    />
                    <SelectUnitKelas
                        data={dataKelas.data}
                        onProdiFilterChange={onQueryFilterChange}
                        value={queryFilter.class_id}
                    />
                    <Button
                        style={{
                            marginTop: '50px',
                            width: '100%',
                        }}
                    >
                        Proses Pindah/Naik Kelas
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PageKenaikanKelas

import React, { useEffect, useMemo, useState } from 'react'
import TableSiswa from './components/TableSiswa'
import useTable from '../../../customHooks/useTable'
import useRequest from '../../../customHooks/useRequest'
import AddAction from '../../../component/ActionButton/AcctionAddButoon'
import ShowDataEnteris from '../../../component/ActionButton/showEntries'
import SearchInput from '../../../component/ActionButton/SearchInput'
import SelectBasicExample from '../../../component/ActionButton/SelectProdi'
import SelectUnitKelas from '../../../component/ActionButton/SelectUnitKelas'
import SelectStatusMahasiswa from '../../../component/ActionButton/SelectStatusMahasiswa'
import MenuBarPageMahasiswa from '../../../component/ActionButton/MenuBarPageMahasiswa'

function PageSiswa() {
    const {
        data: dataKelas,
        setData: setDataKelas,
        sendData: sendDataKelas,
        setDataDetail: setDataDetailKelas,
        dataDetail: dataDetailKelas,
        getData: getDataKelas,
        isLoading: isLoadingKelas,
        setIsLoading: setIsLoadingKelas,
        filterText,
        onChangeFilterText,
    } = useRequest()

    const {
        setIsOpenModalTambah,
        isOpenModalEdit,
        isOpenModalTambah,
        resetPaginationToggle,
        setResetPaginationToggle,
        setIsOpenModalEdit,
        isOpenModalForm,
        setIsOpenModalForm,
        isEdit,
        setIsEdit,
    } = useTable()

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

    return (
        <>
            <div className="page-siswa">
                <h3>
                    Mahasiswa{' '}
                    <span style={{ fontSize: '0.8em', color: 'gray' }}>
                        List
                    </span>
                </h3>
                <div className="table-siswa">
                    <div className="menu-bar">
                        {/* <AddAction /> */}
                        <MenuBarPageMahasiswa />
                    </div>
                    <div className="select">
                        <SelectUnitKelas />
                        <SelectStatusMahasiswa />
                        <SelectBasicExample />
                    </div>
                    <div className="search-siswa">
                        <ShowDataEnteris />
                    </div>
                    <TableSiswa
                        data={
                            filterText.length > 0
                                ? dataKelas.filter
                                : dataKelas.data
                        }
                        subHeaderComponent={subHeaderComponent}
                        resetPaginationToggle={resetPaginationToggle}
                        isLoading={isLoadingKelas}
                    />
                </div>
            </div>
        </>
    )
}

export default PageSiswa

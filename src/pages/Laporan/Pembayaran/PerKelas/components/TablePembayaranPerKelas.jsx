import React from 'react'
import DataTable from 'react-data-table-component'
import Button from 'react-bootstrap/Button'
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa'
import { Tooltip } from 'react-tooltip'
import { rupiahConvert } from '../../../../../utils/helper'
function TablePembayaranPerKelas({
    data,
    subHeaderComponent,
    resetPaginationToggle,
    isLoading,
    onClickEditHandler,
    onClickDeleteHandler,
}) {
    const renderActionButton = (row) => <div className="d-flex gap-1"></div>
    const columns = [
        {
            name: 'NO',
            selector: (row, index) => index + 1,
            sortable: true,
            width: '80px',
        },
        {
            name: 'NIS',
            selector: (row) => row.student_nis,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Nama',
            selector: (row) => row.student_full_name,
            sortable: true,
        },

        {
            name: 'Tagihan',
            selector: (row) => rupiahConvert(row.total_tagihan),
            sortable: true,
        },
        {
            name: 'Sudah Dibayar',
            selector: (row) => rupiahConvert(row.sudah_dibayar),
            sortable: true,
        },
        {
            name: 'Sisa',
            selector: (row) => rupiahConvert(row.sisa_tagihan),
            sortable: true,
        },
        {
            name: 'keterangan',
            selector: (row) =>
                row.total_tagihan - row.sisa_tagihan == 0
                    ? 'LUNAS'
                    : 'BELUM LUNAS',
            sortable: true,
        },
    ]

    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                pagination
                subHeader
                subHeaderComponent={subHeaderComponent}
                paginationResetDefaultPage={resetPaginationToggle}
                progressPending={isLoading}
            />
            <Tooltip id="my-tooltip" />
        </div>
    )
}

export default TablePembayaranPerKelas

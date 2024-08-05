import React from 'react'
import DataTable from 'react-data-table-component'
import { rupiahConvert } from '../../../../utils/helper'
import { statusPembayaran } from '../../../../utils/CONSTANT'

function TableKenaikanKelas({ data, onSelectableChange }) {
    const renderStatus = (row) => (
        <div className="d-flex align-items-center justify-content-center">
            <div
                className={`status ${row.total_tagihan == 0 ? 'not-active' : 'active'} `}
            >
                {statusPembayaran[row.total_tagihan]}
            </div>
        </div>
    )
    const columns = [
        {
            name: 'No',
            selector: (row, index) => index + 1,
            sortable: true,
            width: '65px',
        },

        {
            name: 'NIS',
            selector: (row) => row.student_nis,
            sortable: true,
        },

        {
            name: 'Nama',
            selector: (row) => row.student_full_name,
            sortable: true,
            width: '200px',
        },

        {
            name: 'Kelas',
            selector: (row) => row.class_class_name,
            sortable: true,
        },

        {
            name: 'Pemabayaran',
            cell: (row) => renderStatus(row),
            sortable: true,
            width: '200px',
        },

        {
            name: 'Kekurangan',
            selector: (row) => rupiahConvert(row.total_tagihan),
            sortable: true,
            width: '150px',
        },
    ]

    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                selectableRows
                onSelectedRowsChange={onSelectableChange}
                pagination
            />
        </div>
    )
}

export default TableKenaikanKelas

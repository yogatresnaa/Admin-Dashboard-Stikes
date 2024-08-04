import React from 'react'
import DataTable from 'react-data-table-component'
import { KenaikanKelas } from '../../../../utils/dumyDataTransaksi'
import { rupiahConvert } from '../../../../utils/helper'

function TableKenaikanKelas({ data, onSelectableChange }) {
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
        },

        {
            name: 'Kelas',
            selector: (row) => row.class_class_name,
            sortable: true,
        },

        {
            name: 'Status Pemabayaran',
            // selector: (row) => row.student_parent_phone,
            // sortable: true,
        },

        {
            name: 'Kekurangan',
            selector: (row) => rupiahConvert(row.total_tagihan),
            sortable: true,
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

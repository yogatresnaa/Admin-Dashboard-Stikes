import React from 'react'
import DataTable from 'react-data-table-component'
import { KirimTagihan } from '../../../../utils/dumyDataTransaksi'
import { rupiahConvert } from '../../../../utils/helper'

function TableKirimTagihan({ data, onSelectableChange }) {
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
            name: 'Wa Orang Tua',
            selector: (row) => row.student_parent_phone,
            sortable: true,
        },

        {
            name: 'Total Tagihan',
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

export default TableKirimTagihan

import React from 'react'
import DataTable from 'react-data-table-component'
import { KenaikanKelas } from '../../../../utils/dumyDataTransaksi'

function TableKenaikanKelas() {
    const columns = [
        {
            name: 'NO',
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: 'Nis',
            selector: (row) => row.nis,
            sortable: true,
        },
        {
            name: 'Nama',
            selector: (row) => row.Nama,
            sortable: true,
        },

        {
            name: 'Kelas',
            selector: (row) => row.kelas,
            sortable: true,
        },
        {
            name: 'Status Pembayaran',
            selector: (row) => row.StatusPembayaran,
            sortable: true,
        },
        {
            name: 'Kekurangan',
            selector: (row) => row.Kekurangan,
            sortable: true,
        },
    ]

    return (
        <div>
            <DataTable
                columns={columns}
                data={KenaikanKelas}
                selectableRows
                pagination
            />
        </div>
    )
}

export default TableKenaikanKelas

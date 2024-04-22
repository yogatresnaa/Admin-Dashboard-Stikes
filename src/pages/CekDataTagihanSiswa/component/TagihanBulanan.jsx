import React from 'react'
import DataTable from 'react-data-table-component'
import Button from 'react-bootstrap/Button'
import { dataTagihanBulanan } from '../../../utils/dumyDataTransaksi'

function TagihanBulanan() {
    const columns = [
        {
            name: 'No',
            selector: (row, index) => index + 1,
            sortable: true,
            width: '80px',
        },
        {
            name: 'Nama Pemabyaran',
            selector: (row) => row.NamaPembayaran,
            sortable: true,
        },
        {
            name: 'Total tagihan',
            selector: (row) => row.TotalTagihan,
            sortable: true,
        },

        {
            name: 'Sudah dibayar',
            selector: (row) => row.SudahDibyar,
            sortable: true,
        },
        {
            name: 'Kekurangan',
            selector: (row) => row.Kekurangan,
            sortable: true,
        },

        {
            name: 'Status',
            // cell: (row) => renderActionButton(row),
            width: '100px',
        },
    ]
    return (
        <div>
            <DataTable columns={columns} data={dataTagihanBulanan} />
        </div>
    )
}

export default TagihanBulanan

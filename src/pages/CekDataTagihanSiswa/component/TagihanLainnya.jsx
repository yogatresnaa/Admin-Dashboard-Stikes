import React from 'react'
import DataTable from 'react-data-table-component'
import { dataTagihanLainnya } from '../../../utils/dumyDataTransaksi'

function TagihanLainnya() {
    const columns = [
        {
            name: 'No',
            selector: (row, index) => index + 1,
            sortable: true,
            width: '80px',
        },
        {
            name: 'Jenis Pembayaran',
            selector: (row) => row.JenisPembayaran,
            sortable: true,
        },
        {
            name: 'Total tagihan',
            selector: (row) => row.TotalTagihan,
            sortable: true,
        },

        {
            name: 'Dibayar',
            selector: (row) => row.Dibyar,
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
            <DataTable columns={columns} data={dataTagihanLainnya} />
        </div>
    )
}

export default TagihanLainnya

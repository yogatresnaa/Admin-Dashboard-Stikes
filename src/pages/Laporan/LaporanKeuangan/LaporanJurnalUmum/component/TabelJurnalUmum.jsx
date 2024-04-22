import React from 'react'
import DataTable from 'react-data-table-component'
import { JurnalUmum1 } from '../../../../../utils/dumyDataTransaksi'

function TableJurnalUmum() {
    const columns = [
        {
            name: 'Akun',
            selector: (row) => row.Akun,
            sortable: true,
            width: '100px',
        },
        {
            name: 'Tanggal',
            selector: (row) => row.Tanggal,
            sortable: true,
            width: '100px',
        },
        {
            name: 'Kode Akun',
            selector: (row) => row.KodeAkun,
            sortable: true,
            width: '120px',
        },

        {
            name: 'Keterangan',
            selector: (row) => row.Keterangan,
            sortable: true,
            width: '250px',
        },
        {
            name: 'NIS',
            selector: (row) => row.NIS,
            sortable: true,
        },

        {
            name: 'Nama Siswa',
            selector: (row) => row.NamaSiswa,
            sortable: true,
        },

        {
            name: 'Kelas',
            selector: (row) => row.Kelas,
            sortable: true,
        },

        {
            name: 'Penerimaan',
            selector: (row) => row.Penerimaan,
            sortable: true,
        },

        {
            name: 'Pengeluaran',
            selector: (row) => row.Pengeluaran,
            sortable: true,
        },
    ]
    return (
        <div>
            <DataTable columns={columns} data={JurnalUmum1} pagination />
        </div>
    )
}

export default TableJurnalUmum

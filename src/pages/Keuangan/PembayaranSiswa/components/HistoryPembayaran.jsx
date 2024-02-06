import React from 'react'
import DataTable from 'react-data-table-component'
import { historyPembayaran } from '../../../../utils/dumyDataTransaksi'

function HistoryPembayaran() {
    const customStyles = {
        header: {
            style: {
                minHeight: '100px',
            },
        },
        headRow: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
            },
        },
        headCells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderBottomtWidth: '1px',
                    minHeight: '50px',
                    backgroundColor: '#F8EDFF',
                },
            },
        },
        cells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                },
            },
        },
    }

    const columns = [
        {
            name: 'Tanggal',
            selector: (row) => row.Tanggal,
            sortable: true,
            width: '200px',
        },
        {
            name: 'No. Ref',
            selector: (row) => row.NoRef,
            sortable: true,
            width: '200px',
        },

        {
            name: 'Pembayaran',
            selector: (row) => row.Pembayaran,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Nominal',
            selector: (row) => row.Nominal,
            sortable: true,
            width: '200px',
        },

        {
            name: 'Bayar Via',
            selector: (row) => row.BayarVia,
            sortable: true,
            width: '200px',
        },
    ]
    return (
        <div style={{ maxWidth: '800px', width: '100%' }}>
            <DataTable
                title="History Pembayaran"
                columns={columns}
                customStyles={customStyles}
                data={historyPembayaran}
            />
        </div>
    )
}

export default HistoryPembayaran

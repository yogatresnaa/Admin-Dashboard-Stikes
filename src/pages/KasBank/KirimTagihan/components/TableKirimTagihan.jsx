import React from 'react';
import DataTable from 'react-data-table-component';
import { KirimTagihan } from '../../../../utils/dumyDataTransaksi';

function TableKirimTagihan() {
    const columns = [
        {
                name: 'No',
                selector: (row, index) => index + 1,
                sortable: true,
                width: '65px',
        },

        {
                name: 'NIS',
                selector: (row) => row.NIS,
                sortable: true,
        },

        {
                name: 'Nama',
                selector: (row) => row.Nama,
                sortable: true,
        },

        {
                name: 'Kelas',
                selector: (row) => row.Kelas,
                sortable: true,
        },

        {
                name: 'Wa Orang Tua',
                selector: (row) => row.WaOrtu,
                sortable: true,
        },

        {
                name: 'Total Tagihan',
                selector: (row) => row.TotalTagihan,
                sortable: true,
        }
    ]



    return(
        <div>
            <DataTable columns={columns} data={KirimTagihan}  selectableRows pagination  />
        </div>
    )
}

export default TableKirimTagihan
import React from 'react'
import DataTable from 'react-data-table-component'
import Button from 'react-bootstrap/Button'
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa'
import { Tooltip } from 'react-tooltip'
import {
    dateConvert,
    dateConvertForDb,
    rupiahConvert,
} from '../../../../../utils/helper'
import moment from 'moment'
function TableKasTunai({
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
            name: 'Tanggal',
            selector: (row) => moment(row.date_pay).format('YYYY-MM-DD'),
            width: '150px',
            sortable: true,
        },
        {
            name: 'Kode Akun',
            selector: (row) => row.account_code,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Keterangan',
            selector: (row) => row.account_description,
            sortable: true,
            width: '120px',
        },
        {
            name: 'NIS',
            selector: (row) => row.student_nis ?? '-',
            sortable: true,
            width: '120px',
        },
        {
            name: 'Nama',
            selector: (row) => row.student_full_name ?? '-',
            sortable: true,
        },
        {
            name: 'Kelas',
            selector: (row) => row.class_name ?? '-',
            sortable: true,
        },

        {
            name: 'Penerimaan',
            selector: (row) => rupiahConvert(parseInt(row?.total, 10) || '-'),
            sortable: true,
        },
        {
            name: 'Pengeluaran',
            selector: (row) =>
                rupiahConvert(parseInt(row?.total_keluar, 10) || '-'),
            sortable: true,
        },
        {
            name: 'Keterangan',
            selector: (row) =>
                row.payment_rate_bebas_pay_desc ?? row.month_name,
            sortable: true,
        },
        // {
        //     name: 'Sisa',
        //     selector: (row) => rupiahConvert(row.sisa_tagihan),
        //     sortable: true,
        // },
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

export default TableKasTunai

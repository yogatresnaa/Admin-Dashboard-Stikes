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
function TablePembayaranPerTanggal({
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
            selector: (row) =>
                row.payment_rate_date_pay
                    ? moment(row.payment_rate_date_pay).format('YYYY-MM-DD')
                    : moment(row.payment_rate_bebas_pay_created_at).format(
                          'YYYY-MM-DD'
                      ),
            width: '150px',
            sortable: true,
        },
        {
            name: 'NIS',
            selector: (row) => row.student_nis,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Nama',
            selector: (row) => row.student_full_name,
            sortable: true,
        },

        {
            name: 'nominal',
            selector: (row) =>
                rupiahConvert(
                    row.payment_rate_bebas_pay_bill ||
                        parseInt(row.payment_rate_bill, 10)
                ),
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

export default TablePembayaranPerTanggal

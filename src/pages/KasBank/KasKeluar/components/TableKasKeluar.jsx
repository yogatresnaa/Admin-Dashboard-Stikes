import React from 'react'
import { dateConvert, rupiahConvert } from '../../../../utils/helper'
import { FaPrint, FaRegEdit, FaRegTrashAlt, FaTrash } from 'react-icons/fa'
import { Button } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { Tooltip } from 'react-tooltip'

export default function TableKasKeluar({
    data,
    onClickDeleteHandler,
    onCLickEditHandler,
    subHeaderComponent,
    resetPaginationToggle,
    onClickPrintHandler,
    isLoading,
}) {
    const renderActionButton = (row) => (
        <div className="d-flex gap-1">
            <Button
                color="warning"
                size="sm"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Ubah"
                className="text-white"
                onClick={() => {
                    console.log('ubah')
                    onCLickEditHandler(row)
                }}
                id={row.ID}
            >
                <FaRegEdit />
            </Button>
            <Button
                variant="info"
                className="text-white"
                color="danger"
                size="sm"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Hapus"
                onClick={() => {
                    onClickDeleteHandler(row.kredit_id)
                }}
                id={row.ID}
            >
                <FaRegTrashAlt />
            </Button>
            <Button
                variant="light"
                className="text-black"
                color="light"
                size="sm"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Print"
                onClick={() => onClickPrintHandler(row.kredit_id)}
                id={row.ID}
            >
                <FaPrint />
            </Button>
        </div>
    )
    const columns = [
        {
            name: 'NO',
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: 'No. Ref',
            selector: (row) => row.kredit_no_ref,
            sortable: true,
        },
        {
            name: 'Kas',
            selector: (row) => `[${row.account_cash_account_desc}]`,
            sortable: true,
        },
        {
            name: 'Tanggal',
            selector: (row) => dateConvert(row.kredit_date),
            sortable: true,
        },
        {
            name: 'Kode Akun',
            selector: (row) =>
                `${row.account_cost_account_code}-${row.account_cost_account_desc}`,
            sortable: true,
        },
        {
            name: 'Keterangan',
            selector: (row) => row.kredit_information,
            sortable: true,
        },
        {
            name: 'Nominal (Rp. )',
            selector: (row) => rupiahConvert(parseInt(row.kredit_value)),
            sortable: true,
        },
        {
            name: 'Pajak (%)',
            selector: (row) => `${row.kredit_tax}`,
            sortable: true,
        },
        {
            name: 'Total',
            selector: (row) => `${rupiahConvert(parseInt(row.kredit_value))}`,
            sortable: true,
        },

        {
            name: 'Aksi',
            cell: (row) => renderActionButton(row),
            width: '200px',
        },
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

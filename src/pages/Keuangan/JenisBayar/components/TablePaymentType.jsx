import React from 'react'
import DataTable from 'react-data-table-component'
import { dataAkunBiaya } from '../../../../utils/dumyDataTransaksi'
import { Button } from 'reactstrap'
import { Tooltip } from 'react-tooltip'
import { Link } from 'react-router-dom'
import { FaRegEdit, FaRegTrashAlt, FaRegPlusSquare } from 'react-icons/fa'
import { accountCategory, accountType } from '../../../../utils/CONSTANT'
import { upperCaseFirstChar } from '../../../../utils/helper'

function TablePaymentType({
    data,
    subHeaderComponent,
    resetPaginationToggle,
    isLoading,
    onClickTambahHandler,
    onClickEditHandler,
    onClickDeleteHandler,
}) {
    // const [AkunBiaya, setdataPostBayar] = React.useState(dataAkunBiaya);

    console.log(data)
    const renderActionButton = (row) => (
        <div className="d-flex gap-1">
            <Button
                variant="warning"
                className="text-white"
                color="warning"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Ubah"
                size="sm"
                onClick={() => {
                    onClickEditHandler(row)
                }}
                id={row.ID}
            >
                <FaRegEdit />
            </Button>

            <Button
                className="text-white"
                color="danger"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Hapus"
                size="sm"
                onClick={() => {
                    onClickDeleteHandler(row)
                }}
                id={row.ID}
            >
                <FaRegTrashAlt />
            </Button>
        </div>
    )

    const renderPaymentSetting = (row) => (
        <Link
            to={`/admin/tarif-tagihan/${row.payment_id}`}
            state={{ data: row }}
            className="d-flex gap-1"
        >
            <Button
                color="primary"
                className="text-white"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Ubah"
                size="sm"
                onClick={() => {
                    console.log()
                }}
                id={row.ID}
            >
                <span style={{ fontSize: '11px' }}>
                    {' '}
                    Setting Tarif Pembayaran
                </span>
            </Button>
        </Link>
    )
    const columns = [
        {
            name: 'NO',
            selector: (row, index) => index + 1,
            sortable: true,
            width: '80px',
        },

        {
            name: 'POS',
            selector: (row) => row.pos_pay_name,
            sortable: true,
            width: '250px',
        },
        {
            name: 'Nama Pembayaran',
            width: '300px',
            selector: (row) =>
                `${row.pos_pay_name} - T.A ${row.period_start}/${row.period_end}`,
            sortable: true,
        },

        {
            name: 'Tipe',
            cell: (row) => upperCaseFirstChar(row.payment_type),

            selector: (row) => row.payment_type,
            width: '150px',
            sortable: true,
        },
        {
            name: 'Tahun',
            selector: (row) => `${row.period_start}/${row.period_end}`,
            width: '150px',
            sortable: true,
        },
        {
            name: 'Tarif Pembayaran',
            cell: (row) => renderPaymentSetting(row),
            width: '250px',
        },

        {
            name: 'Aksi',
            cell: (row) => renderActionButton(row),
            width: '200px',
        },
    ]

    return (
        <>
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
        </>
    )
}

export default TablePaymentType

import React from 'react'
import DataTable from 'react-data-table-component'
import { pembayaran1 } from '../../../utils/dumyDataTransaksi'
import { Button } from 'reactstrap'
import { dateConvert, rupiahConvert } from '../../../utils/helper'
import { MdOutlineDiscount } from 'react-icons/md'
import { GrFormAdd } from 'react-icons/gr'
function PembayaranBebas({
    data,
    onClickHandler,
    onClickItemDetailHandler,
    onClickDiscountHandler,
    onClickRefreshHandler,
    onClickBayarHandler,
}) {
    const customStyles = {
        header: {
            style: {
                minHeight: '100px',
            },
        },
        headRow: {
            style: {
                fontSize: '11px',

                borderTopStyle: 'solid',
                borderTopWidth: '1px',
            },
        },
        headCells: {
            style: {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderBottomtWidth: '1px',
                minHeight: '50px',
                backgroundColor: '#F8EDFF',
            },
        },
        cells: {
            style: {
                color: '#202124',
                fontSize: '11px',
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
            },
        },
    }
    const conditionalRowStyles = [
        {
            when: (row) => row.payment_rate_status == 0,
            style: {
                backgroundColor: '#f2dede',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: (row) => row.payment_rate_status == 1,

            style: {
                backgroundColor: '#dff0d8',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
    ]

    const renderDiscountComponent = (value, data, status) => (
        <div className="d-flex justify-content-between flex-1 align-items-center">
            <p>{value}</p>{' '}
            {status == 0 && (
                <Button
                    size="sm"
                    color="warning"
                    onClick={() => onClickDiscountHandler(data)}
                >
                    <GrFormAdd size={20} color="white" />
                    <MdOutlineDiscount color="white" />
                </Button>
            )}
        </div>
    )
    const renderButtonComponent = (data, status) => (
        <div className="d-flex justify-content-between flex-1 align-items-center">
            <Button
                size="sm"
                disabled={status === 1}
                color="success"
                onClick={() => onClickBayarHandler(data)}
            >
                <GrFormAdd size={20} color="white" />
                Bayar
            </Button>
        </div>
    )
    const renderStatus = (value) => (
        <p
            onClick={() =>
                onClickItemDetailHandler(value.detail_payment_rate_id)
            }
            style={{
                backgroundColor:
                    value.payment_rate_status == 0 ? 'orange' : 'green',
                padding: '2px 4px',
                cursor: 'pointer',
                borderRadius: '4px',
                color: 'white',
                fontSize: '0.6rem',
            }}
            className="d-flex justify-content-center"
        >
            {value.payment_rate_status == 0 ? 'Belum Lunas' : 'Lunas'}
        </p>
    )
    const columns = [
        {
            name: 'No',
            selector: (row, index) => index + 1,
            sortable: true,
            width: '70px',
            border: 'solid',
            color: 'black',
        },
        {
            name: 'Jenis Pembayaran',
            selector: (row) =>
                `${row.pos_pay_name}-T.A ${row.period_start}/${row.period_end}`,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Tagihan',
            selector: (row) => rupiahConvert(row.payment_rate_bill ?? 0),
            sortable: true,
            width: '200px',
        },
        {
            name: 'Diskon',
            cell: (row) =>
                renderDiscountComponent(
                    rupiahConvert(row.payment_rate_discount ?? 0),
                    row,
                    row.payment_rate_status
                ),
            sortable: true,
            width: '200px',
        },
        {
            name: 'Tagihan-Diskon',
            selector: (row) => rupiahConvert(row.sisa_tagihan_diskon ?? 0),
            sortable: true,
            width: '200px',
        },
        {
            name: 'Dibayar',
            selector: (row) => rupiahConvert(row.payment_rate_total_pay ?? 0),
            sortable: true,
            width: '300px',
        },
        {
            name: 'Sisa',
            selector: (row) => rupiahConvert(row.sisa_tagihan ?? 0),
            sortable: true,
            width: '300px',
        },
        {
            name: 'Status',
            cell: (row) => renderStatus(row),
            sortable: true,
            width: '300px',
        },
        {
            name: 'Bayar',
            cell: (row) => renderButtonComponent(row, row.payment_rate_status),
            sortable: true,
            width: '300px',
        },
    ]
    return (
        <div>
            <Button className="mb-2" size="sm" onClick={onClickRefreshHandler}>
                Refresh
            </Button>
            <DataTable
                columns={columns}
                customStyles={customStyles}
                data={
                    data?.free_type[0]?.payment_rate_bill ? data?.free_type : []
                }
                conditionalRowStyles={conditionalRowStyles}
            />
        </div>
    )
}

export default PembayaranBebas

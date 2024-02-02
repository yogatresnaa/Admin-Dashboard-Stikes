import React from 'react'
import DataTable from 'react-data-table-component'
import { pembayaran1 } from '../../../../utils/dumyDataTransaksi'
import { dateConvert } from '../../../../utils/helper'

function PembayaranBulanan({ data, onClickHandler }) {
    let arrColumns = []
    console.log
    const renderMonthColumn = (monthName, type) => ({
        name: monthName,
        cell: (row) => (
            <div
                onClick={() =>
                    onClickHandler(
                        row.monthly_payment.filter(
                            (item) => item.month_name === monthName
                        )[0]
                    )
                }
            >
                {
                    row.monthly_payment.filter(
                        (item) => item.month_name === monthName
                    )[0].payment_rate_bill
                }
                <br />
                {row.monthly_payment.filter(
                    (item) => item.month_name === monthName
                )[0].payment_rate_status == 1 &&
                    `${dateConvert(
                        row.monthly_payment.filter(
                            (item) => item.month_name === monthName
                        )[0].payment_rate_date_pay
                    )}`}
                <br />{' '}
                {row.monthly_payment.filter(
                    (item) => item.month_name === monthName
                )[0].payment_rate_status == 1 && `[${type}]`}
            </div>
        ),
        sortable: true,
        width: '200px',
        conditionalCellStyles: [
            {
                when: (row) =>
                    row.monthly_payment.filter(
                        (item) => item.month_name === monthName
                    )[0].payment_rate_status == 0,
                style: {
                    backgroundColor: '#f2dede',
                    color: 'black',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                },
            },
            {
                when: (row) =>
                    row.monthly_payment.filter(
                        (item) => item.month_name === monthName
                    )[0].payment_rate_status == 1,
                style: {
                    backgroundColor: '#dff0d8',
                    color: 'black',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                },
            },
        ],
    })

    for (let i = 0; i < data.monthly_type.length; i++) {
        arrColumns.push(
            {
                name: 'No',
                selector: (row, index) => index + 1,
                sortable: true,
                width: '70px',
            },
            {
                name: 'Nama Pembayran',
                selector: (row) =>
                    `${row?.pos_pay_name} - T.A ${row.period_start}/${row.period_end}`,
                sortable: true,
                width: '200px',
            },
            {
                name: 'Sisa Tagihan',
                selector: (row) => row.SisaTagihan,
                sortable: true,
                width: '200px',
            },
            ...data.monthly_type[0].monthly_payment.map((item) => ({
                name: item.month_name,
                selector: (row) => item.payment_rate_bill,
                sortable: true,
                width: '200px',
            }))
        )
    }
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
                '&:last-of-type': {
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
            name: 'No',
            selector: (row, index) => index + 1,
            sortable: true,
            width: '70px',
        },
        {
            name: 'Nama Pembayran',
            selector: (row) =>
                `${row?.pos_pay_name} - T.A ${row.period_start}/${row.period_end}`,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Sisa Tagihan',
            selector: (row) => row.sisa_tagihan,
            sortable: true,
            width: '200px',
        },
        // ...data.monthly_type[0].monthly_payment.map((item) => ({
        //     name: item.month_name,
        //     selector: (row) => row.payment_rate_bill,
        //     sortable: true,
        //     width: '200px',
        // })),
        renderMonthColumn('Juli', data.pos_pay_name),
        renderMonthColumn('Agustus', data.pos_pay_name),
        renderMonthColumn('September', data.pos_pay_name),
        renderMonthColumn('Oktober', data.pos_pay_name),
        renderMonthColumn('November', data.pos_pay_name),
        renderMonthColumn('Desember', data.pos_pay_name),
        renderMonthColumn('Januari', data.pos_pay_name),
        renderMonthColumn('Februari', data.pos_pay_name),
        renderMonthColumn('Maret', data.pos_pay_name),
        renderMonthColumn('April', data.pos_pay_name),
        renderMonthColumn('Mei', data.pos_pay_name),
        renderMonthColumn('Juni', data.pos_pay_name),
    ]
    return (
        <div>
            <DataTable
                columns={columns}
                customStyles={customStyles}
                data={data?.monthly_type}
                dense
            />
        </div>
    )
}

export default PembayaranBulanan

import React from 'react'
import DataTable from 'react-data-table-component'
import { pembayaran1 } from '../../../../utils/dumyDataTransaksi'
import { Button } from 'reactstrap'
import { dateConvert, rupiahConvert } from '../../../../utils/helper'

function PembayaranBulanan({ data, onClickHandler }) {
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
                {rupiahConvert(
                    row?.monthly_payment.filter(
                        (item) => item.month_name === monthName
                    )[0]?.payment_rate_bill ?? 0
                )}
                <br />
                <span style={{ fontSize: '0.7rem', color: 'grey' }}>
                    {row.monthly_payment.filter(
                        (item) => item.month_name === monthName
                    )[0]?.payment_rate_number_pay !== null &&
                        `(${dateConvert(
                            row.monthly_payment.filter(
                                (item) => item.month_name === monthName
                            )[0].payment_rate_date_pay
                        )})`}
                </span>
                <br />
                <span style={{ fontSize: '0.8rem', color: 'grey' }}>
                    {row.monthly_payment.filter(
                        (item) => item.month_name === monthName
                    )[0]?.payment_rate_number_pay &&
                        `[${
                            row?.monthly_payment.filter(
                                (item) => item.month_name === monthName
                            )[0]?.payment_rate_via_name ?? ''
                        }]`}
                </span>
            </div>
        ),
        sortable: true,
        width: '150px',
        conditionalCellStyles: [
            {
                when: (row) =>
                    row.monthly_payment.filter(
                        (item) => item.month_name === monthName
                    )[0]?.payment_rate_status == 0 ||
                    row.monthly_payment.filter(
                        (item) => item.month_name === monthName
                    )[0]?.is_submit_payment == 0,
                style: {
                    backgroundColor: '#f2dede',
                    color: 'black',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                    cursor: 'pointer',
                },
            },
            {
                when: (row) =>
                    row.monthly_payment.filter(
                        (item) => item.month_name === monthName
                    )[0]?.payment_rate_status == 1 ||
                    row.monthly_payment.filter(
                        (item) => item.month_name === monthName
                    )[0]?.payment_rate_number_pay !== null,
                style: {
                    backgroundColor: '#dff0d8',
                    color: 'black',
                    '&:hover': {
                        color: 'pointer',
                    },
                    cursor: 'pointer',
                },
            },
        ],
    })

    const customStyles = {
        header: {
            style: {
                minHeight: '100px',
            },
        },
        headRow: {
            style: {
                borderTopStyle: 'solid',
                fontSize: '11px',

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
                fontSize: '11px',

                borderRightStyle: 'solid',
                borderRightWidth: '1px',
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
            name: 'Nama Pembayaran',
            selector: (row) =>
                `${row?.pos_pay_name} - T.A ${row.period_start}/${row.period_end}`,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Sisa Tagihan',
            selector: (row) => rupiahConvert(row.sisa_tagihan),
            sortable: true,
            width: '200px',
        },
        // ...data.monthly_type[0].monthly_payment.map((item) => ({
        //     name: item.month_name,
        //     selector: (row) => row.payment_rate_bill,
        //     sortable: true,
        //     width: '200px',
        // })),
        renderMonthColumn('Juli'),
        renderMonthColumn('Agustus'),
        renderMonthColumn('September'),
        renderMonthColumn('Oktober'),
        renderMonthColumn('November'),
        renderMonthColumn('Desember'),
        renderMonthColumn('Januari'),
        renderMonthColumn('Februari'),
        renderMonthColumn('Maret'),
        renderMonthColumn('April'),
        renderMonthColumn('Mei'),
        renderMonthColumn('Juni'),
    ]
    return (
        <div>
            <DataTable
                columns={columns}
                customStyles={customStyles}
                data={data?.monthly_type.filter(
                    (item) => item?.monthly_payment?.length > 0
                )}
                dense
            />
        </div>
    )
}

export default PembayaranBulanan

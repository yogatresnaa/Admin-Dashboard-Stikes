/* eslint-disable react/jsx-key */
import React from 'react'
import DataTable from 'react-data-table-component'
import Button from 'react-bootstrap/Button'
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa'
import { Tooltip } from 'react-tooltip'

import './style.css'
import {
    dateConvert,
    dateConvertForDb,
    rupiahConvert,
} from '../../../../../utils/helper'
import moment from 'moment'
function TablenRekapPembayaran({
    data,
    subHeaderComponent,
    resetPaginationToggle,
    isLoading,
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
        <div className="overflow-auto">
            <table cellPadding="0" cellSpacing="0">
                <thead>
                    <tr>
                        <td></td>
                        <td></td>
                        {data?.headers?.map((item) => {
                            return item.detail.monthly != null ? (
                                <td colSpan={item.detail?.monthly?.length}>
                                    {item.pos_pay_name} {item.period_start}/
                                    {item.period_end}
                                </td>
                            ) : (
                                <td></td>
                            )
                        })}
                    </tr>
                    <tr>
                        <td>Kelas</td>
                        <td>Nama</td>
                        {data?.headers?.map((item, index) =>
                            item?.detail?.monthly == null ? (
                                <td
                                    key={index}
                                >{`${item.pos_pay_name} - T.A ${item.period_start}/${item.period_end}`}</td>
                            ) : (
                                item?.detail?.monthly?.map((month, idx) => (
                                    <td key={`${index}-${idx}`}>
                                        {month.month_name}
                                    </td>
                                ))
                            )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {/* {data?.headers?.map((item, index) => */}
                    {/* // di map dari headers, dan di cari dari payment_type apakah
                    ada yang sama payment_id nya. kalo untuk month kasih && month id */}
                    {data?.students?.map((itemStudent) => (
                        <tr>
                            <td>{itemStudent.class_class_name}</td>
                            <td>{itemStudent.student_full_name}</td>

                            {data?.headers?.map((item, index) =>
                                item?.detail?.monthly == null ? (
                                    itemStudent.payment_type?.filter(
                                        (itemPayment) =>
                                            item.payment_payment_id ==
                                            itemPayment.payment_id
                                    )[0]?.payment_rate_bebas_pay_remaining ==
                                    0 ? (
                                        <td> Lunas</td>
                                    ) : (
                                        <td>
                                            {rupiahConvert(
                                                itemStudent.payment_type?.filter(
                                                    (itemPayment) =>
                                                        item.payment_payment_id ==
                                                        itemPayment.payment_id
                                                )[0]
                                                    ?.payment_rate_bebas_pay_remaining ??
                                                    '-'
                                            )}
                                        </td>
                                    )
                                ) : (
                                    item?.detail?.monthly?.map((month, idx) =>
                                        itemStudent.payment_type?.filter(
                                            (itemPayment) =>
                                                item.payment_payment_id ==
                                                    itemPayment.payment_id &&
                                                itemPayment.month_id ==
                                                    month.month_id
                                        )[0]?.payment_rate_status == 1 ? (
                                            <td
                                                style={{
                                                    color: 'green',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {' '}
                                                Lunas
                                            </td>
                                        ) : (
                                            <td
                                                style={{
                                                    color: 'red',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {itemStudent.payment_type?.filter(
                                                    (itemPayment) =>
                                                        item.payment_payment_id ==
                                                        itemPayment.payment_id
                                                )[0]?.payment_rate_bill
                                                    ? rupiahConvert(
                                                          parseInt(
                                                              itemStudent.payment_type?.filter(
                                                                  (
                                                                      itemPayment
                                                                  ) =>
                                                                      item.payment_payment_id ==
                                                                      itemPayment.payment_id
                                                              )[0]
                                                                  ?.payment_rate_bill ??
                                                                  0,
                                                              10
                                                          ) ?? 0
                                                      )
                                                    : '-'}
                                            </td>
                                        )
                                    )
                                )
                            )}
                        </tr>
                    ))}
                    {/* )} */}
                </tbody>
            </table>
            {/* <DataTable
                columns={columns}
                data={data}
                pagination
                subHeader
                subHeaderComponent={subHeaderComponent}
                paginationResetDefaultPage={resetPaginationToggle}
                progressPending={isLoading}
            /> */}
            <Tooltip id="my-tooltip" />
        </div>
    )
}

export default TablenRekapPembayaran

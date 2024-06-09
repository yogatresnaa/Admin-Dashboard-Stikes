import React from 'react'
import DataTable from 'react-data-table-component'
import { historyPembayaran } from '../../../../utils/dumyDataTransaksi'
import { dateConvert, rupiahConvert } from '../../../../utils/helper'

function HistoryPembayaran({ data }) {
    console.log(data)
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                maxHeight: '300px',
                overflow: 'scroll',
            }}
        >
            <table className="history-pembayaran-table">
                <thead>
                    <th>Tanggal</th>
                    <th>No. Ref</th>
                    <th>Pembayaran</th>
                    <th>Nominal</th>
                    <th>Bayar Via</th>
                </thead>
                <tbody>
                    {data.monthly_type?.map((item) =>
                        item.monthly_payment.map((itemDetail) => (
                            <tr key={itemDetail.detail_payment_rate_id}>
                                <td>
                                    {dateConvert(
                                        itemDetail.payment_rate_date_pay
                                    )}
                                </td>
                                <td>{itemDetail.payment_rate_number_pay}</td>

                                <td>
                                    {item.pos_pay_name}-{item.period_start}/
                                    {item.period_end} ({itemDetail.month_name})
                                </td>

                                <td>
                                    {rupiahConvert(
                                        itemDetail.payment_rate_bill
                                    )}
                                </td>
                                <td>{itemDetail.payment_rate_via_name}</td>
                            </tr>
                        ))
                    )}
                    {data.free_type?.map((item) =>
                        item.detail_payment.map((itemDetail) => (
                            <tr key={itemDetail.detail_payment_rate_id}>
                                <td>
                                    {dateConvert(
                                        itemDetail.payment_rate_bebas_pay_updated_at
                                    )}
                                </td>
                                <td>
                                    {itemDetail.payment_rate_bebas_pay_number}
                                </td>

                                <td>
                                    {item.pos_pay_name}-{item.period_start}/
                                    {item.period_end} ({item.payment_type})
                                </td>

                                <td>
                                    {rupiahConvert(
                                        itemDetail.payment_rate_bebas_pay_bill
                                    )}
                                </td>

                                <td>{itemDetail.payment_rate_via_name}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default HistoryPembayaran

import React from 'react'
import DetailPembayaranFooter from './DetailPembayaranFooter'
import { dateConvert, rupiahConvert } from '../../../../utils/helper'
import { FaTrashAlt } from 'react-icons/fa'

export default function DetailPembayaranBody({ data, onClickDeleteDetail }) {
    console.log(data)
    return (
        <tbody className="body-table">
            {data?.pembayaran_detail?.map((item, index) => (
                <tr key={item.payment_rate_bebas_pay_id}>
                    <td>{index + 1}</td>
                    <td>
                        {dateConvert(item.payment_rate_bebas_pay_created_at)}
                    </td>
                    <td>
                        {rupiahConvert(
                            parseInt(item.payment_rate_bebas_pay_bill, 10)
                        )}
                    </td>
                    <td>{item.payment_rate_bebas_pay_desc}</td>
                    <td
                        onClick={() =>
                            onClickDeleteDetail(item.payment_rate_bebas_pay_id)
                        }
                    >
                        <div style={{ cursor: 'pointer' }}>
                            <FaTrashAlt color="red" />
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

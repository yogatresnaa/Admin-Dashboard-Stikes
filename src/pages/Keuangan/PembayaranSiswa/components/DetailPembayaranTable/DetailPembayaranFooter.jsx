import React from 'react'
import { rupiahConvert } from '../../../../../utils/helper'

export default function DetailPembayaranFooter({ data }) {
    console.log(data)
    return (
        <tfoot>
            <tr>
                <td colSpan={2}>Total Sudah Bayar</td>
                <td>{rupiahConvert(data?.total_pembayaran)}</td>
                <td>Tunggakan: </td>
                <td>{rupiahConvert(data?.sisa_pembayaran)} </td>
            </tr>
        </tfoot>
    )
}

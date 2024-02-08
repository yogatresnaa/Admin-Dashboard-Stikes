import React from 'react'

export default function DetailPembayaranFooter({ data }) {
    return (
        <tfoot>
            <tr>
                <td colSpan={2}>Total Sudah Bayar</td>
                <td>Rp. 350.000</td>
                <td>Tunggakan: </td>
                <td>0</td>
            </tr>
        </tfoot>
    )
}

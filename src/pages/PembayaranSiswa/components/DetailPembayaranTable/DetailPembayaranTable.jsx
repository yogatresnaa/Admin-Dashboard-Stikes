import React from 'react'
import DetailPembayaranHeader from './DetailPembayaranHeader'
import DetailPembayaranBody from './DetailPembayaranBody'
import DetailPembayaranFooter from './DetailPembayaranFooter'

export default function DetailPembayaranTable({ data, onClickDeleteDetail }) {
    return (
        <table className="detail-pembayaran-table">
            <DetailPembayaranHeader />
            <DetailPembayaranBody
                data={data}
                onClickDeleteDetail={onClickDeleteDetail}
            />
            <DetailPembayaranFooter data={data} />
        </table>
    )
}

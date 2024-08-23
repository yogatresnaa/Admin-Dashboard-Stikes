import React from 'react'
import DataTable from 'react-data-table-component'
import { tagihanPembayaran } from '../../../utils/dumyDataTransaksi'
import { dateConvert, rupiahConvert } from '../../../utils/helper'
import { Button } from 'reactstrap'
import ButtonWithLoader from '../../../component/ActionButton/ButtonWithLoader'

function TagihanPembayaran({
    isLoading,
    data,
    onClickCetakTagihanPembayaranHandler,
}) {
    console.log(data)
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
            }}
        >
            <ButtonWithLoader
                isLoading={isLoading}
                text={' Cetak Tagihan'}
                disabled={isLoading}
                color="danger"
                size="sm"
                onClick={onClickCetakTagihanPembayaranHandler}
                style={{ alignSelf: 'flex-end', marginRight: '1rem' }}
            />

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
                        <th>Rincian Tagihan</th>
                        <th>Nominal</th>
                    </thead>
                    <tbody>
                        {data.monthly_type?.map((item) =>
                            item.monthly_payment.map((itemDetail) => (
                                <tr key={itemDetail.detail_payment_rate_id}>
                                    <td>
                                        {item.pos_pay_name}-{item.period_start}/
                                        {item.period_end} (
                                        {itemDetail.month_name})
                                    </td>
                                    <td>
                                        {rupiahConvert(
                                            itemDetail?.payment_rate_bill
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                        {data.free_type?.map((item) =>
                            item.detail_payment.map((itemDetail) => (
                                <tr key={itemDetail.detail_payment_rate_id}>
                                    <td>
                                        {item.pos_pay_name}-{item.period_start}/
                                        {item.period_end} ({item.payment_type})
                                    </td>

                                    <td>
                                        {rupiahConvert(
                                            itemDetail?.payment_rate_bill
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-between">
                <p style={{ flex: 2, fontSize: '0.8rem' }}>Total</p>
                <p style={{ flex: 1, fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {data.total_tagihan && rupiahConvert(data.total_tagihan)}
                </p>
            </div>
        </div>
    )
}

export default TagihanPembayaran

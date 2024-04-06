import React from 'react'
import DataTable from 'react-data-table-component'
import { transaksiPembayaran } from '../../../../utils/dumyDataTransaksi'
import { rupiahConvert } from '../../../../utils/helper'
import ButtonWithLoader from '../../../../component/ActionButton/ButtonWithLoader'

function TransaksiPembayaran({ data, isLoading, onClickSubmitHandler }) {
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
                        <th>No.</th>
                        <th>No. Ref</th>
                        <th>Deskripsi</th>
                        <th>Nominal</th>
                    </thead>
                    <tbody>
                        {data.data_payment?.map((item, index) => (
                            <tr key={item.detail_payment_rate_id}>
                                <td style={{ fontSize: '0.7rem' }}>
                                    {index + 1}
                                </td>
                                <td>
                                    {item.payment_rate_number_pay ||
                                        item.payment_rate_bebas_pay_number}
                                </td>
                                <td>
                                    {item.pos_pay_name} {item.unit_name}-
                                    {item.period_start}/{item.period_end} (
                                    {item.month_name || item.payment_type})
                                </td>
                                <td>
                                    {rupiahConvert(
                                        item?.payment_rate_bill ||
                                            item.payment_rate_bebas_pay_bill
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div
                className="d-flex justify-content-between align-items-center px-4 py-2"
                style={{ backgroundColor: '#bcffc0', borderRadius: '5px' }}
            >
                <p style={{ flex: 2, fontSize: '0.8rem', margin: 0 }}>Total</p>
                <p
                    style={{
                        flex: 1,
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        textAlign: 'end',
                        margin: 0,
                    }}
                >
                    {data.total && rupiahConvert(data.total)}
                </p>
            </div>
            {data?.data_payment?.length > 0 && (
                <ButtonWithLoader
                    isLoading={isLoading}
                    text={'Simpan Transaksi'}
                    disabled={isLoading}
                    color="success"
                    size="sm"
                    onClick={onClickSubmitHandler}
                    style={{
                        alignSelf: 'flex-end',
                        marginRight: '0.6rem',
                        marginBottom: '0.6rem',
                    }}
                />
            )}
        </div>
    )
}

export default TransaksiPembayaran

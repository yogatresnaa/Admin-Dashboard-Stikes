import React from 'react'
import { dateConvert, rupiahConvert } from '../../../utils/helper'
import { FaTrash } from 'react-icons/fa'
import { Button, Input } from 'reactstrap'

export default function TabelTambah({
    data,
    onClickDeleteHandler,
    onClickSubmit,
    type,
}) {
    console.log(data)
    return (
        <div>
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
                        <th>Tanggal</th>
                        <th>Kode Akun</th>
                        <th>Keterangan</th>
                        <th>Nominal(Rp.)</th>
                        <th>Pajak</th>
                        {/* <th>Unit POS</th> */}
                        <th>Total(Rp.)</th>
                        <th>Aksi</th>
                    </thead>
                    <tbody>
                        {data?.result?.map((item, index) => (
                            <tr key={item[`${type}_id`]}>
                                <td>{index + 1}</td>
                                <td>{dateConvert(item[`${type}_date`])}</td>
                                <td>
                                    {item?.account_cost_account_code} -
                                    {item?.account_cost_account_desc}
                                </td>
                                <td>{item[`${type}_information`]}</td>
                                <td>
                                    {rupiahConvert(
                                        parseInt(item[`${type}_value`])
                                    )}
                                </td>
                                <td>{item[`${type}_tax`]} %</td>
                                <td>{rupiahConvert(item.total)}</td>
                                <td>
                                    <div
                                        style={{ cursor: 'pointer' }}
                                        onClick={() =>
                                            onClickDeleteHandler(
                                                item[`${type}_id`]
                                            )
                                        }
                                    >
                                        <FaTrash color="red" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Subtotal</td>
                            <td>Pajak %</td>
                            <td>Grand Total</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                {rupiahConvert(
                                    parseInt(data?.total_value) || 0
                                )}
                            </td>
                            <td>{data?.total_tax || 0} %</td>
                            <td>{rupiahConvert(parseInt(data?.total) || 0)}</td>
                        </tr>
                    </tfoot>
                </table>
                <div className="d-flex justify-content-end">
                    <Button
                        size="sm"
                        className="mt-2 justify-content-end"
                        color="success"
                        onClick={() =>
                            onClickSubmit(
                                data?.result?.map((item) => item[`${type}_id`])
                            )
                        }
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}

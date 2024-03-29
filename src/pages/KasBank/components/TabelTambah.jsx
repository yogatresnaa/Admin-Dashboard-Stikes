import React from 'react'
import { dateConvert, rupiahConvert } from '../../../utils/helper'

export default function TabelTambah({ data }) {
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
                        <th>Unit POS</th>
                        <th>Total(Rp.)</th>
                        <th>Aksi</th>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    )
}

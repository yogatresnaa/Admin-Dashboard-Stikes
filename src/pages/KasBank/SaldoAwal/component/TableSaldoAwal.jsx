import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { saldoAwal } from '../../../../utils/dumyDataTransaksi'
import { currencyFormatter, rupiahConvert } from '../../../../utils/helper'
import { Button } from 'reactstrap'

function TableSaldoAwal({ data, setDataSaldo, onCLickEnterHandler }) {
    const [doubleClickItem, setDoubleClickItem] = useState(null)

    const onSubmitHandler = () => {}
    const onDoubleClickHandler = (selectedItem, type) => {
        setDataSaldo((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                data: prevState.data.data.map((item) =>
                    item.cash_account_id == selectedItem.cash_account_id
                        ? {
                              ...item,
                              [type]: {
                                  ...item[type],
                                  onClick: true,
                              },
                          }
                        : item
                ),
            },
        }))
        console.log(type)
    }
    const renderDebit = (row) => {
        if (row.debit?.onClick) {
            return (
                <input
                    style={{ border: 'none', width: '100%' }}
                    value={
                        row.debit.value !== 0
                            ? row.debit.value
                            : row.cash_account_debit
                    }
                    defaultValue={row.cash_account_debit}
                    onKeyDown={(e) => {
                        onCLickEnterHandler(e, 'debit', row)
                    }}
                    onChange={(e) =>
                        setDataSaldo((prevState) => ({
                            ...prevState,
                            data: {
                                ...prevState.data,
                                data: prevState.data.data.map((item) =>
                                    item.cash_account_id == row.cash_account_id
                                        ? {
                                              ...item,
                                              debit: {
                                                  ...item.debit,
                                                  value: e.target.value,
                                              },
                                          }
                                        : item
                                ),
                            },
                        }))
                    }
                ></input>
            )
        }
        return (
            <div
                style={{ cursor: 'pointer' }}
                onDoubleClick={() => onDoubleClickHandler(row, 'debit')}
            >
                {rupiahConvert(row?.cash_account_debit)}
            </div>
        )
    }
    const renderKredit = (row) => {
        if (row.kredit?.onClick) {
            return (
                <input
                    style={{ border: 'none', width: '100%' }}
                    value={
                        row.kredit.value !== 0
                            ? row.kredit.value
                            : row.cash_account_kredit
                    }
                    defaultValue={row.cash_account_kredit}
                    onKeyDown={(e) => {
                        onCLickEnterHandler(e, 'kredit', row)
                    }}
                    onChange={(e) =>
                        setDataSaldo((prevState) => ({
                            ...prevState,
                            data: {
                                ...prevState.data,
                                data: prevState.data.data.map((item) =>
                                    item.cash_account_id == row.cash_account_id
                                        ? {
                                              ...item,
                                              kredit: {
                                                  ...item.kredit,
                                                  value: e.target.value,
                                              },
                                          }
                                        : item
                                ),
                            },
                        }))
                    }
                ></input>
            )
        }
        return (
            <div
                style={{ cursor: 'pointer' }}
                onDoubleClick={() => onDoubleClickHandler(row, 'kredit')}
            >
                {rupiahConvert(row?.cash_account_kredit)}
            </div>
        )
    }
    const columns = [
        {
            name: 'No',
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: 'Kode Akun',
            selector: (row) => row.account_code,
            sortable: true,
        },
        {
            name: 'Keterangan',
            selector: (row) => row.account_description,
            sortable: true,
        },

        {
            name: 'Debit',
            cell: (row) => renderDebit(row),
            sortable: true,
        },
        {
            name: 'Kredit',
            cell: (row) => renderKredit(row),
            sortable: true,
        },
    ]
    return (
        <div>
            <DataTable columns={columns} data={data.data} pagination />
            <div className="w-100 justify-content-end d-flex">
                <div className="flex-3">Total</div>
                <div className="flex-1">
                    <strong>{rupiahConvert(data.total_debit)}</strong>
                </div>
                <div className="flex-1">
                    <strong>{rupiahConvert(data.total_kredit)}</strong>
                </div>
            </div>
            <div
                className={`w-100 mt-3 justify-content-end align-items-center text-white py-2 px-3 d-flex ${data.total_debit - data.total_kredit == 0 ? 'bg-success' : 'bg-danger'}`}
            >
                <div className="flex-3">
                    Saldo Awal{' '}
                    {data.total_debit - data.total_kredit == 0
                        ? `(Benar, saldo awal sudah 0 (nol))`
                        : 'Salah saldo tidak balance'}
                </div>
                <p className="flex-1 m-0">
                    <strong>
                        {rupiahConvert(data.total_debit - data.total_kredit)}
                    </strong>
                </p>
                <div className="flex-1">
                    <strong></strong>
                </div>
            </div>
        </div>
    )
}

export default TableSaldoAwal

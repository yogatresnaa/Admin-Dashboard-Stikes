import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { saldoAwal } from '../../../../utils/dumyDataTransaksi'
import { currencyFormatter, rupiahConvert } from '../../../../utils/helper'
import { Button } from 'reactstrap'

function TableSaldoAwal({ data }) {
    const [doubleClickItem, setDoubleClickItem] = useState(null)
    const [stateValue, setStateValue] = useState({
        debit: {
            value: 0,
            onClick: false,
        },
        kredit: {
            value: 0,
            onClick: false,
        },
    })

    const onSubmitHandler = () => {}
    const onDoubleClickHandler = (item, type) => {
        setStateValue((prevState) => ({
            ...prevState,
            [type]: {
                ...prevState[type],
                onClick: true,
            },
        }))
        console.log(type)
    }
    const renderDebit = (row) => {
        if (stateValue.debit.onClick) {
            return (
                <input
                    style={{ border: 'none', width: '100%' }}
                    value={
                        stateValue.debit.value !== 0
                            ? stateValue.debit.value
                            : row.cash_account_debit
                    }
                    onChange={(e) =>
                        setStateValue((prevState) => ({
                            ...prevState,
                            debit: {
                                ...prevState.debit,
                                value: currencyFormatter(e.target.value),
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
                {currencyFormatter(row?.cash_account_debit.toString())}
            </div>
        )
    }
    const renderKredit = (row) => {
        if (stateValue.kredit.onClick) {
            return (
                <input
                    style={{ border: 'none', width: '100%' }}
                    value={
                        stateValue.kredit.value !== 0
                            ? stateValue.kredit.value
                            : row.cash_account_kredit
                    }
                    onChange={(e) =>
                        setStateValue((prevState) => ({
                            ...prevState,
                            kredit: {
                                ...prevState.kredit,
                                value: currencyFormatter(e.target.value),
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
                {currencyFormatter(row?.cash_account_kredit.toString())}
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
            <DataTable columns={columns} data={data} pagination />
            <div className="w-100 justify-content-end d-flex">
                <Button
                    size="sm"
                    variant="filled"
                    className="flex bg-black w-25 rounded-3  justify-content-center align-items-center"
                >
                    Simpan
                </Button>
            </div>
        </div>
    )
}

export default TableSaldoAwal

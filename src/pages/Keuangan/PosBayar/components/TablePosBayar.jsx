import React from 'react'
import DataTable from 'react-data-table-component'
import { dataAkunBiaya } from '../../../../utils/dumyDataTransaksi'
import Button from 'react-bootstrap/Button'
import { Tooltip } from 'react-tooltip'
import { FaRegEdit, FaRegTrashAlt, FaRegPlusSquare } from 'react-icons/fa'
import { accountCategory, accountType } from '../../../../utils/CONSTANT'

function TableAkunBiaya({
    data,
    subHeaderComponent,
    resetPaginationToggle,
    isLoading,
    onClickTambahHandler,
    onClickEditHandler,
    onClickDeleteHandler,
}) {
    // const [AkunBiaya, setdataPostBayar] = React.useState(dataAkunBiaya);

    console.log(data)
    const renderActionButton = (row) => (
        <div className="d-flex gap-1">
            <Button
                variant="warning"
                className="text-white"
                color="danger"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Ubah"
                size="sm"
                onClick={() => {
                    onClickEditHandler(row)
                }}
                id={row.ID}
            >
                <FaRegEdit />
            </Button>

            <Button
                variant="danger"
                className="text-white"
                color="danger"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Hapus"
                size="sm"
                onClick={() => {
                    onClickDeleteHandler(row)
                }}
                id={row.ID}
            >
                <FaRegTrashAlt />
            </Button>
        </div>
    )
    const columns = [
        {
            name: 'NO',
            selector: (row, index) => index + 1,
            sortable: true,
            width: '80px',
        },
        {
            name: 'Kode Akun',
            selector: (row) => row.account_code_description,
            sortable: true,
            width: '250px',
        },
        {
            name: 'Akun Piutang',
            width: '250px',
            selector: (row) => row.account_code_credit_description,
            sortable: true,
        },

        {
            name: 'Nama POS',
            selector: (row) => row.pos_pay_name,
            width: '150px',
            sortable: true,
        },
        {
            name: 'Keterangan',
            selector: (row) => row.pos_pay_description,
            width: '150px',
            sortable: true,
        },

        {
            name: 'Aksi',
            cell: (row) => renderActionButton(row),
            width: '200px',
        },
    ]

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                pagination
                subHeader
                subHeaderComponent={subHeaderComponent}
                paginationResetDefaultPage={resetPaginationToggle}
                progressPending={isLoading}
            />
            <Tooltip id="my-tooltip" />
        </>
    )
}

export default TableAkunBiaya

import React from 'react'
import DataTable from 'react-data-table-component'
import { dataPosBayar } from '../../../utils/dumyDataTransaksi'
import Button from 'react-bootstrap/Button'
import { Tooltip } from 'react-tooltip'
import { FaRegEdit } from 'react-icons/fa'

function TablePosABayar({
    data,
    subHeaderComponent,
    resetPaginationToggle,
    isLoading,
    onClickEditHandler,
    onClickDeleteHandler,
}) {
    const [dataPostBayar, setdataPostBayar] = React.useState(dataPosBayar)
    const renderActionButton = (row) => (
        <div className="d-flex gap-1">
            <Button
                color="warning"
                size="sm"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Ubah"
                onClick={() => {
                    onClickEditHandler(row)
                }}
                id={row.ID}
            >
                <FaRegEdit />
            </Button>
        </div>
    )
    const columns = [
        {
            name: 'NO',
            selector: (row, index) => index + 1,
            sortable: true,
            width: '100px',
        },
        {
            name: 'Kode AKun',
            selector: (row) => row.KodeAkun,
        },
        {
            name: 'Akun Piutang',
            selector: (row) => row.AkunPiutang,
        },
        {
            name: 'Nama Pos',
            selector: (row) => row.NamaPos,
            width: '150px',
        },
        {
            name: 'Keterangan',
            selector: (row) => row.Keterangan,
            width: '250px',
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
                data={dataPostBayar}
                subHeaderComponent={subHeaderComponent}
                pagination
            />
            <Tooltip id="my-tooltip" />
        </>
    )
}

export default TablePosABayar

import React from 'react'
import DataTable from 'react-data-table-component'
import { dataAkunBiaya } from '../../../utils/dumyDataTransaksi'
import Button from 'react-bootstrap/Button'
import { Tooltip } from 'react-tooltip'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'

function TableAkunBiaya({
    data,
    subHeaderComponent,
    resetPaginationToggle,
    isLoading,
    onClickEditHandler,
    onClickDeleteHandler,
}) {
    const [AkunBiaya, setdataPostBayar] = React.useState(dataAkunBiaya)
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

            <Button
                variant="info"
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
            width: '100px',
        },
        {
            name: 'Kode Akun',
            selector: (row) => row.KodeAkun,
        },
        {
            name: 'Keterangan',
            selector: (row) => row.Keterangan,
        },
        {
            name: 'Jenis Akun',
            selector: (row) => row.JenisAkun,
            width: '150px',
        },
        {
            name: 'Kategori',
            selector: (row) => row.Kategori,
            width: '250px',
        },

        {
            name: 'Unit Sekolah',
            selector: (row) => row.UnitSekolah,
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
                data={AkunBiaya}
                subHeaderComponent={subHeaderComponent}
                pagination
            />
            <Tooltip id="my-tooltip" />
        </>
    )
}

export default TableAkunBiaya

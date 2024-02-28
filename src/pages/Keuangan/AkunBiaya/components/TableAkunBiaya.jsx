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
                color="success"
                variant="success"
                size="sm"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Tambah"
                onClick={() => {
                    onClickTambahHandler(row)
                }}
                id={row.ID}
            >
                <FaRegPlusSquare />
            </Button>
            {row.account_type > 0 && (
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
            )}
            {row.account_type > 1 && (
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
            )}
        </div>
    )
    const columns = [
        {
            name: 'No. ',
            cell: (row, index) => index + 1,
            sortable: true,
            selector: (row, index) => index + 1,

            width: '80px',
        },
        {
            name: 'Kode Akun',
            selector: (row) => row.account_code,

            cell: (row) => (
                <p
                    style={
                        row.account_type == 0 || row.account_type == 1
                            ? { fontWeight: 'bold' }
                            : {}
                    }
                >
                    {row.account_code}
                </p>
            ),
            sortable: true,
        },
        {
            name: 'Keterangan',
            width: '200px',
            selector: (row) => row.account_description,

            cell: (row) => (
                <p
                    style={
                        row.account_type == 0 || row.account_type == 1
                            ? { fontWeight: 'bold' }
                            : {}
                    }
                >
                    {row.account_description}
                </p>
            ),
            sortable: true,
        },
        {
            name: 'Jenis Akun',
            selector: (row) => accountType[row.account_type],
            cell: (row) => (
                <p
                    style={
                        row.account_type == 0 || row.account_type == 1
                            ? { fontWeight: 'bold' }
                            : {}
                    }
                >
                    {accountType[row.account_type]}
                </p>
            ),
            width: '150px',
            sortable: true,
        },
        {
            name: 'Kategori',
            selector: (row) => accountCategory[row.account_category],
            width: '150px',
            sortable: true,
        },

        {
            name: 'Unit Sekolah',
            selector: (row) => row.UnitSekolah,
            width: '120px',
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

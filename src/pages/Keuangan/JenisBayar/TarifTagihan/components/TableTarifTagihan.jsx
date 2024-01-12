import React from 'react'
import DataTable from 'react-data-table-component'
import { Button } from 'reactstrap'
import { Tooltip } from 'react-tooltip'
import { Link, createSearchParams } from 'react-router-dom'
import { FaRegEdit, FaRegTrashAlt, FaRegPlusSquare } from 'react-icons/fa'
import { accountCategory, accountType } from '../../../../../utils/CONSTANT'
import { upperCaseFirstChar } from '../../../../../utils/helper'

function TableTarifTagihan({
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
            <Link
                style={{ textDecoration: 'none' }}
                state={{ data: row }}
                to={{
                    pathname: `/admin/tarif-tagihan/${row.payment_payment_id}/edit`,
                    search: createSearchParams({
                        type: 'edit-siswa',
                    }).toString(),
                }}
            >
                <Button
                    variant="warning"
                    className="text-white"
                    color="warning"
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
            </Link>

            <Button
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
            name: 'NIS',
            selector: (row) => row.pos_pay_name,
            sortable: true,
            width: '250px',
        },
        {
            name: 'Nama Siswa ',
            width: '300px',
            selector: (row) =>
                `${row.pos_pay_name} - T.A ${row.period_start}/${row.period_end}`,
            sortable: true,
        },

        {
            name: 'Kelas',
            cell: (row) => upperCaseFirstChar(row.payment_type),

            selector: (row) => row.payment_type,
            width: '150px',
            sortable: true,
        },
        {
            name: 'Nominal',
            selector: (row) => `${row.period_start}/${row.period_end}`,
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

export default TableTarifTagihan

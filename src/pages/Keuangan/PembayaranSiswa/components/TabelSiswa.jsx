import React from 'react'
import DataTable from 'react-data-table-component'
import { dataAkunBiaya } from '../../../../utils/dumyDataTransaksi'
import { Button } from 'reactstrap'
import { Tooltip } from 'react-tooltip'
import { Link } from 'react-router-dom'
import { FaRegEdit, FaRegTrashAlt, FaRegPlusSquare } from 'react-icons/fa'
import { accountCategory, accountType } from '../../../../utils/CONSTANT'
import { upperCaseFirstChar } from '../../../../utils/helper'

function TableSiswa({
    data,
    subHeaderComponent,
    resetPaginationToggle,
    isLoading,
    onClickSiswaHandler,
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
                color="warning"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Pilih"
                size="sm"
                onClick={() => {
                    onClickSiswaHandler(row)
                }}
                id={row.ID}
            >
                Pilih
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
            selector: (row) => row.student_nis,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Nama',
            selector: (row) => row.student_full_name,
            sortable: true,
            width: '220px',
        },

        // {
        //   name: "Unit Sekolah",
        //   cell: (row) => upperCaseFirstChar(row.payment_type),

        //   selector: (row) => row.payment_type,
        //   width: "150px",
        //   sortable: true,
        // },

        {
            name: 'Kelas',
            selector: (row) => `${row.class_class_name}`,
            width: '150px',
            sortable: true,
        },
        {
            name: 'Prodi',
            selector: (row) => `${row.majors_majors_name}`,
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

export default TableSiswa

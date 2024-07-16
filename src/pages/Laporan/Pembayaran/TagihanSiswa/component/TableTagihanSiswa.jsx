import React from 'react'
import DataTable from 'react-data-table-component'
import Button from 'react-bootstrap/Button'
import { FaRegTrashAlt, FaRegEdit, FaInfo, FaPrint } from 'react-icons/fa'
import { Tooltip } from 'react-tooltip'
import {
    dateConvert,
    dateConvertForDb,
    rupiahConvert,
} from '../../../../../utils/helper'
import moment from 'moment'
function TableTagihanSiswa({
    data,
    subHeaderComponent,
    resetPaginationToggle,
    isLoading,
    onClickPrintHandler,
    onClickDeleteHandler,
    onClickDetailHandler,
}) {
    const renderActionButton = (row) => (
        <div className="d-flex gap-1">
            <Button
                size="sm"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Detail"
                onClick={() => {
                    onClickDetailHandler(row)
                }}
            >
                <FaInfo /> Detail
            </Button>
            <Button
                variant="danger"
                className="text-white"
                color="danger"
                size="sm"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Detail"
                onClick={() => {
                    onClickPrintHandler(row)
                }}
            >
                <FaPrint /> Cetak
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
            width: '120px',
        },
        {
            name: 'Nama',
            selector: (row) => row.student_full_name,
            sortable: true,
        },
        {
            name: 'Kelas',
            selector: (row) => row.class_class_name,
            sortable: true,
        },

        {
            name: 'Total Tagihan',
            selector: (row) => rupiahConvert(row.total_tagihan),
            sortable: true,
        },

        {
            name: 'Aksi',
            cell: (row) => renderActionButton(row),
            width: '200px',
        },
    ]

    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                pagination
                subHeader
                selectableRows
                subHeaderComponent={subHeaderComponent}
                paginationResetDefaultPage={resetPaginationToggle}
                progressPending={isLoading}
            />
            <Tooltip id="my-tooltip" />
        </div>
    )
}

export default TableTagihanSiswa

import React from 'react'
import Button from 'react-bootstrap/Button'
import DataTable from 'react-data-table-component'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { FaUnlockAlt, FaRegEdit, FaPrint } from 'react-icons/fa'
import { FaRegEye } from 'react-icons/fa6'

function TableSiswa({
    data,
    subHeaderComponent,
    onClickResetPassword,
    onClickSeeData,
    onClickStatus,
    onClickCetak,
    resetPaginationToggle,
    isLoading,
    onClickEditHandler,
    onClickDeleteHandler,
}) {
    const ActionButton = (row) => (
        <div className="d-flex gap-1">
            <OverlayTrigger
                overlay={
                    <Tooltip id="tooltip-disabled">Reset Password</Tooltip>
                }
            >
                <span className="d-inline-block">
                    <Button
                        color="secondary"
                        size="sm"
                        variant="success"
                        onClick={() => {
                            onClickResetPassword(row)
                        }}
                        id={row.ID}
                    >
                        <FaUnlockAlt />
                    </Button>
                </span>
            </OverlayTrigger>

            <OverlayTrigger
                overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}
            >
                <span className="d-inline-block">
                    <Button
                        color="secondary"
                        size="sm"
                        onClick={() => {
                            onClickEditHandler(row)
                        }}
                        id={row.ID}
                    >
                        <FaRegEdit />
                    </Button>
                </span>
            </OverlayTrigger>

            <OverlayTrigger
                overlay={<Tooltip id="tooltip-disabled">Cetak</Tooltip>}
            >
                <span className="d-inline-block">
                    <Button
                        color="secondary"
                        className="text-white"
                        size="sm"
                        variant="info"
                        onClick={() => {
                            onClickCetak(row)
                        }}
                        id={row.ID}
                    >
                        <FaPrint />
                    </Button>
                </span>
            </OverlayTrigger>

            <OverlayTrigger
                overlay={<Tooltip id="tooltip-disabled">Lihat</Tooltip>}
            >
                <span className="d-inline-block">
                    <Button
                        color="secondary"
                        variant="dark"
                        size="sm"
                        onClick={() => {
                            onClickSeeData(row)
                        }}
                        id={row.ID}
                    >
                        <FaRegEye />
                    </Button>
                </span>
            </OverlayTrigger>
        </div>
    )

    // ----------------
    const statusActionButton = (row) => (
        <div className="d-flex gap-1">
            <Button
                color="secondary"
                size="sm"
                onClick={() => {
                    onClickStatus(row)
                }}
                id={row.ID}
            >
                Aktif
            </Button>
        </div>
    )
    const columns = [
        {
            name: 'NO',
            selector: (row) => row.no,
        },
        {
            name: 'NIS',
            selector: (row) => row.NIS,
        },
        {
            name: 'Nama',
            selector: (row) => row.name,
        },
        {
            name: 'Unit Sekolah',
            selector: (row) => row.UnitSekolah,
        },
        {
            name: 'ID Kelas',
            selector: (row) => row.IdKelas,
        },
        {
            name: 'WA Ortu',
            selector: (row) => row.WaOrtu,
        },

        {
            name: 'Status',
            cell: (row) => statusActionButton(row),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '200px',
        },
        {
            name: 'Aksi',
            cell: (row) => ActionButton(row),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '250px',
        },
    ]

    // const data = [
    //   {
    //     id: 1,
    //     no: '1',
    //     NIS: '1122',
    //     name: 'aa',
    //     IdKelas: 'llx',
    //     WaOrtu: '1222443',
    //   },
    //   {
    //     id: 2,
    //     no: '2',
    //     NIS: '1122',
    //     name: 'vv',
    //     IdKelas: 'llx',
    //     UnitSekolah: 'Unit 2',
    //     WaOrtu: '1222443',
    //   },
    //   {
    //     id: 3,
    //     no: '3',
    //     NIS: '1122',
    //     name: 'dd',
    //     IdKelas: 'llx',
    //     UnitSekolah: 'Unit 3',
    //     WaOrtu: '1222443',
    //   },
    //   {
    //     id: 4,
    //     no: '4',
    //     NIS: '1122',
    //     name: 'cv',
    //     IdKelas: 'llx',
    //     UnitSekolah: 'Unit 4',
    //     WaOrtu: '1222443',
    //   },

    //   {
    //     id: 5,
    //     no: '5',
    //     NIS: '1122',
    //     name: 'cc',
    //     IdKelas: 'llx',
    //     UnitSekolah: 'Unit 5',
    //     WaOrtu: '1222443',
    //   },

    //   {
    //     id: 6,
    //     no: '6',
    //     NIS: '1122',
    //     name: 'ss',
    //     IdKelas: 'llx',
    //     UnitSekolah: 'Unit 6',
    //     WaOrtu: '1222443',
    //   },
    //   {
    //     id: 7,
    //     no: '7',
    //     NIS: '1122',
    //     name: 's',
    //     IdKelas: 'llx',
    //     UnitSekolah: 'Unit 7',
    //     WaOrtu: '1222443',
    //   },
    //   {
    //     id: 8,
    //     no: '8',
    //     NIS: '1122',
    //     name: 'xc',
    //     IdKelas: 'llx',
    //     UnitSekolah: 'Unit 8',
    //     WaOrtu: '1222443',
    //   },
    //   {
    //     id: 9,
    //     no: '9',
    //     NIS: '1122',
    //     name: 'xs',
    //     IdKelas: 'llx',
    //     UnitSekolah: 'Unit 9',
    //     WaOrtu: '1222443',
    //   },

    //   {
    //     id: 10,
    //     no: '10',
    //     NIS: '1122',
    //     name: 'dd',
    //     IdKelas: 'llx',
    //     UnitSekolah: 'Unit 10',
    //     WaOrtu: '1222443',
    //   },
    //   {
    //     id: 11,
    //     no: '11',
    //     NIS: '1122',
    //     name: 'cc',
    //     IdKelas: 'llx',
    //     UnitSekolah: 'Unit 11',
    //     WaOrtu: '1222443',
    //   },
    //   {
    //     id: 12,
    //     no: '12',
    //     NIS: '1122',
    //     name: 'f',
    //     IdKelas: 'llx',
    //     UnitSekolah: 'Unit 12',
    //     WaOrtu: '1222443',
    //   },
    // ];

    return (
        <>
            <div>
                <DataTable
                    columns={columns}
                    data={data}
                    selectableRows
                    subHeaderComponent={subHeaderComponent}
                    pagination
                />
                ;
            </div>
        </>
    )
}

export default TableSiswa

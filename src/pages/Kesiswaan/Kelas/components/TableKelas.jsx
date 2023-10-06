import React from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

function TableKelas({ data, 
  subHeaderComponent,
  resetPaginationToggle,
  isLoading }) {
  const renderActionButton = (row) => (
    <div className="d-flex gap-1">
      <Button
        color="warning"
        size="sm"
        onClick={() => {
          onClickEditHandler(row);
        }}
        id={row.ID}
      >
        <FaRegEdit />
      </Button>
      <Button
        variant="info"
        className="text-white"
        color="danger"
        size="sm"
        onClick={() => {
          onClickDeleteHandler(row);
        }}
        id={row.ID}
      >
        <FaRegTrashAlt />
      </Button>
    </div>
  );
  const columns = [
    {
      name: "NO",
      selector: (row, index) => index + 1,
    },
    {
      name: "Nama Kelas",
      selector: (row) => row.nama,
    },
    {
      name: "ID Kelas",
      selector: (row) => row.id_kelas,
    },
    {
      name: "ID Prodi",
      selector: (row) => row.id_program_studi,
    },
    {
      name: "Nama Prodi",
      selector: (row) => row.nama_prodi,
    },

    {
      name: "Aksi",
      cell: (row) => renderActionButton(row),
      ignoreRowClick: true,
      allowOverflow: true,

      width: "200px",
    },
  ];
  /*
  const data = [
    {
      id: 1,
      no: '1',
      name: 'Prodi 1',
      IdKelas: 'llx',
      UnitSekolah: 'Unit 1',
      IdUnit: 'xx1',
    },
    {
      id: 2,
      no: '2',
      name: 'prodi 2',
      IdKelas: 'llx',
      UnitSekolah: 'Unit 2',
      IdUnit: 'xx1',
    },
    {
      id: 3,
      no: '3',
      name: 'prodi 3',
      IdKelas: 'llx',
      UnitSekolah: 'Unit 3',
      IdUnit: 'xx1',
    },
    {
      id: 4,
      no: '4',
      name: 'prodi 4',
      IdKelas: 'llx',
      UnitSekolah: 'Unit 4',
      IdUnit: 'xx1',
    },

    {
      id: 5,
      no: '5',
      name: 'prodi 5',
      IdKelas: 'llx',
      UnitSekolah: 'Unit 5',
      IdUnit: 'xx1',
    },

    {
      id: 6,
      no: '6',
      name: 'prodi 6',
      IdKelas: 'llx',
      UnitSekolah: 'Unit 6',
      IdUnit: 'xx1',
    },
    {
      id: 7,
      no: '7',
      name: 'prodi 7',
      IdKelas: 'llx',
      UnitSekolah: 'Unit 7',
      IdUnit: 'xx1',
    },
    {
      id: 8,
      no: '8',
      name: 'prodi 8',
      IdKelas: 'llx',
      UnitSekolah: 'Unit 8',
      IdUnit: 'xx1',
    },
    {
      id: 9,
      no: '9',
      name: 'prodi 9',
      IdKelas: 'llx',
      UnitSekolah: 'Unit 9',
      IdUnit: 'xx1',
    },

    {
      id: 10,
      no: '10',
      name: 'prodi 10',
      IdKelas: 'llx',
      UnitSekolah: 'Unit 10',
      IdUnit: 'xx1',
    },
    {
      id: 11,
      no: '11',
      name: 'prodi 11',
      IdKelas: 'llx',
      UnitSekolah: 'Unit 11',
      IdUnit: 'xx1',
    },
    {
      id: 12,
      no: '12',
      name: 'prodi 12',
      IdKelas: 'llx',
      UnitSekolah: 'Unit 12',
      IdUnit: 'xx1',
    },
  ];
  */
  return (
    <>
      <div>
        <DataTable
          columns={columns}
          data={data}
          pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
      
          paginationResetDefaultPage={resetPaginationToggle}
          progressPending={isLoading}
          
        />
        ;
      </div>
    </>
  );
}

export default TableKelas;

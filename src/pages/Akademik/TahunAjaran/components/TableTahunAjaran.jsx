import React from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { Tooltip } from 'react-tooltip'
function TableTahunAjaran({
  data,
  subHeaderComponent,
  resetPaginationToggle,
  isLoading,
  onClickEditHandler,
  onClickDeleteHandler,
}) {
  console.log(data)
  const renderActionButton = (row) => (
    <div className="d-flex gap-1">
      <Button
        color="warning"
        size="sm"
        data-tooltip-id="my-tooltip" data-tooltip-content="Ubah"
        onClick={() => {
          console.log("ubah");
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
        data-tooltip-id="my-tooltip" data-tooltip-content="Hapus"
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
  const renderStatus = (row) => (
    <div className="d-flex align-items-center justify-content-center">
      <div className={`status ${row.period_status==0 ? "not-active":"active"} `} >
        {row.period_status==1?"Aktif":"Tidak Aktif"}
      </div>
    </div>
  );
  const columns = [
    {
      name: "NO",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "ID Periode",
      selector: (row) => row.period_id,
      sortable: true,
      omit: true,
    },
    {
      name: "Tahun Ajaran",
      selector: (row) => `${row.period_start}/${row.period_end}`,
      sortable: true,
    },

    {
      name: "Status",
      cell: (row) => renderStatus(row),
      sortable: true,
      
    },

    {
      name: "Aksi",
      cell: (row) => renderActionButton(row),

     
    },
  ];

  return (
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
      <Tooltip id="my-tooltip" />
    </div>
  );
}

export default TableTahunAjaran;

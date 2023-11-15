import React from 'react';
import {Button} from 'reactstrap';
import DataTable from 'react-data-table-component';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FaUnlockAlt, FaRegEdit, FaPrint } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa6';
import { Tooltip } from 'react-tooltip'
import { statusSiswa } from '../../../../../utils/CONSTANT';
function TableSiswa({
  data,
  subHeaderComponent,
  resetPaginationToggle,
  isLoading,
  onClickEditHandler,
  onClickDetailHandler,
  onClickDeleteHandler,


}) {
  const renderActionButton = (row) => (
    <div className='d-flex gap-1'>
    
          {/* <Button
            color="danger"
            size='sm'
            variant='danger'
            data-tooltip-id="my-tooltip" data-tooltip-content="Reset Password"
            onClick={() => {
              onClickDetailHandler(row);
            }}
            id={row.ID}>
            <FaUnlockAlt />
          </Button> */}
          <Button
            color="info"
            size='sm'
            variant='danger'
            data-tooltip-id="my-tooltip" data-tooltip-content="Lihat"
            onClick={() => {
              onClickDetailHandler(row);
            }}
            id={row.ID}>
            <FaRegEye color='white' />
          </Button>
          <Button
            color="warning"
            size='sm'
            variant='danger'
            data-tooltip-id="my-tooltip" data-tooltip-content="Edit"
            onClick={() => {
              onClickEditHandler(row);
            }}
            id={row.ID}>
            <FaRegEdit color='white' />
          </Button>
          {/* <Button
            color="success"
            size='sm'
            variant='danger'
            data-tooltip-id="my-tooltip" data-tooltip-content="Print"
            onClick={() => {
              onClickDetailShowHandler(row);
            }}
            id={row.ID}>
            <FaPrint color='white' />
          </Button> */}
    
  
    </div>
  );

  const renderStatus = (row) => (
    <div className="d-flex align-items-center justify-content-center">
      <div className={`status ${row.period_status==0 ? "not-active":"active"} `} >
        {statusSiswa[row.student_status]}
      </div>
    </div>
  );
  // const renderActionButton = (row) => (
  //   <div className='d-flex gap-1'>
  //     <Button
  //       color="warning"
  //       size="sm"
  //       data-tooltip-id="my-tooltip" data-tooltip-content="Ubah"

  //       onClick={() => {
  //        console.log('ubah')
  //         onClickEditHandler(row);
  //       }}
  //       id={row.ID}>
  //       <FaRegEdit />
  //     </Button>
  //     <Button
  //       variant="info"
  //       className="text-white"
  //       color="danger"
  //       size="sm"
  //       data-tooltip-id="my-tooltip" data-tooltip-content="Hapus"

  //       onClick={() => {
  //         onClickDeleteHandler(row);
  //       }}
  //       id={row.ID}>
  //       {/* <FaRegTrashAlt /> */}
  //     </Button>
  //   </div>
  // );
  const columns = [
    {
      name: 'NO',
      selector: (row, index) => index + 1,
      sortable: true,
      width:'70px'
    },
    {
      name: "NIS",
      selector: (row) => row.student_nis,
      sortable: true,
    },
    {
      name: "Nama",
      selector: (row) => row.student_full_name,
      sortable: true,
      
      wrap:true,
    },
   
    {
      name: "Prodi",
      selector: (row) => row.majors_majors_name,
      sortable: true,
      width:'150px',
      wrap:true,
    },
   
    {
      name: "Kelas",
      selector: (row) => row.class_class_name,
      sortable: true,
      wrap:true,
    },
   
    {
      name: "Status",
      cell: (row) => renderStatus(row),
      sortable: true,
      width:"auto"
    },
   
  
    {
      name: 'Aksi',
      cell: (row) => renderActionButton(row),
  
      width: "200px",
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



export default TableSiswa;

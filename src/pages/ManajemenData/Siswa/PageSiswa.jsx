import React, { useEffect, useMemo, useState } from "react";
import TableSiswa from "./components/TableSiswa";
import AddAction from "../../../component/ActionButton/AcctionAddButoon";
import SelectProdi from "../../../component/ActionButton/SelectProdi";
import ShowDataEnteris from "../../../component/ActionButton/showEntries";
import SearchInput from "../../../component/ActionButton/SearchInput";

import useRequest from "../../../customHooks/useRequest";
import {
  getAllProdi,
  putProdi,
  deleteProdi,
  postProdi,
  getAllSiswa,
  putSiswa,
  deleteSiswa,
  postSiswa,
  getAllKelas,
} from "../../../utils/http";
import "./css/page-siswa.css";
import { useSelector } from "react-redux";
import ModalForm from "./components/FormModal";
import { siswaInitialValues } from "../../../utils/initialValues";
import { siswaSchema } from "../../../utils/schema";
import { ToastContainer } from "react-toastify";
import { prodiModel, siswaModel } from "../../../models/models";
import useTable from "../../../customHooks/useTable";
import { alertConfirmation } from "../../../component/Alert/swalConfirmation";
import { alertType, statusSiswa } from "../../../utils/CONSTANT";
import SelectUnitKelas from "../../../component/ActionButton/SelectUnitKelas";
import { Button } from "reactstrap";
import queryString from "query-string";
import SelectStatusMahasiswa from "../../../component/ActionButton/SelectStatusMahasiswa";
import DetailModal from "./components/DetailModal";

function PageSiswa() {
  const {
    data: dataSiswa,
    setData: setDataSiswa,
    sendData: sendDataSiswa,
    setDataDetail: setDataDetailSiswa,
    dataDetail: dataDetailSiswa,
    getData: getDataSiswa,
    isLoading: isLoadingSiswa,
    setIsLoading: setIsLoadingSiswa,
    isLoadingSendData:isLoadingSendDataSiswa,
    filterText,
    onChangeFilterText,
  } = useRequest();
  const {
    data: dataProdi,
    setData: setDataProdi,
   getData:getDataProdi
  } = useRequest();
  const {
    data: dataKelas,
    setData: setDataKelas,
   getData:getDataKelas
  } = useRequest();
  const {

    resetPaginationToggle,
    setResetPaginationToggle,
    setIsOpenModalEdit,
    isOpenModalForm,
    setIsOpenModalForm,
    isEdit,
    setIsEdit,
  } = useTable();

  const dataUser = useSelector(({ authState }) => authState.data);
const [queryFilter,setQueryFilter]=useState({
  class_id:'',
  status:'',
  majors_id:''
})
  const [isOpenDetailModal,setIsOpenDetailModal]=useState(false)


  useEffect(() => {
    const query=queryString.stringify(queryFilter);
    getDataSiswa(() => getAllSiswa(query,dataUser.token));
    getDataProdi(() => getAllProdi(dataUser.token));
    getDataKelas(() => getAllKelas(dataUser.token));
  }, []);

const onCLickFilterSubmit=()=>{
   const query=queryString.stringify(queryFilter);
    getDataSiswa(() => getAllSiswa(query,dataUser.token));
}

  

  const onClickTambahHandler=()=>{
    setIsOpenModalForm(!isOpenModalForm);
    setIsEdit(false)
  }
  const onClickEditHandler = (item) => {
    console.log(item);
    setDataDetailSiswa(item);
    setIsEdit(true)
    setIsOpenModalForm(!isOpenModalForm);
  };
  console.log('render')
  const subHeaderComponent = useMemo(() => {
    const onClearHandler = () => {
      if (filterText) {
        onChangeFilterText("");
        setResetPaginationToggle(!resetPaginationToggle);
      }
    };

    return (
      <SearchInput filterText={filterText} setFilterText={onChangeFilterText} />
    );
  }, [
    filterText,
    onChangeFilterText,
    resetPaginationToggle,
    setResetPaginationToggle,
  ]);


  const onClickDetailSiswaHandler=(dataDetail)=>{
    setDataDetailSiswa(dataDetail)
    setIsOpenDetailModal(true)

  }
  const onSubmitTambahHandler = async (formBody, { resetForm }) => {
    console.log(formBody);
    await sendDataSiswa(
      () => postSiswa(siswaModel.objectToJSON(formBody), dataUser.token),
      () => getDataSiswa(()=>getAllSiswa(dataUser.token)),
      null

    );
    setIsOpenModalForm(!setIsOpenModalForm);
  };

  const onSubmitEditHandler = async (formBody, { resetForm }) => {
    console.log(formBody);
    await sendDataSiswa(
      () =>
        putSiswa(
          formBody.majors_id,
          siswaModel.objectToJSON(formBody),
          dataUser.token
        ),
        () => getDataSiswa(()=>getAllSiswa(dataUser.token)),null
    );
    setIsOpenModalForm(!isOpenModalForm);
  };
  const onSubmitDeleteHandler = async (formBody) => {
    console.log(formBody);
    alertConfirmation(alertType.delete, async () => {
      await sendDataSiswa(
        () => deleteSiswa(formBody.majors_id, dataUser.token),
        () => getDataSiswa(()=>getAllSiswa(dataUser.token)),
        null
      );
    });
  };

  const onQueryFilterChange=(e)=>{
setQueryFilter((prevState)=>({...prevState,[e.target.name]:e.target.value}))
}
const dataFiltered = useMemo(()=>dataSiswa.data.filter((item) =>(
  item.student_nis.toString().toLowerCase().includes(filterText.toLocaleLowerCase())||
  item.student_full_name.toString().toLowerCase().includes(filterText.toLocaleLowerCase())||
  item.majors_majors_name.toString().toLowerCase().includes(filterText.toLocaleLowerCase()))),[filterText,dataSiswa.data]
);
  return (
    <>
      <ToastContainer />
      <div className="page-content">
        <h3>
          Siswa <span style={{ fontSize: "0.8em", color: "gray" }}>List</span>
        </h3>

        <div className="table-content">
          <div>

          <AddAction onClickHandler={ onClickTambahHandler} />
          </div>
          <div className="d-flex flex-row gap-1 justify-content-start align-items-center mt-2">
            <SelectProdi data={dataProdi.data} onProdiFilterChange={onQueryFilterChange} value={queryFilter.majors_id}/>
            <SelectUnitKelas data={dataKelas.data} onProdiFilterChange={onQueryFilterChange} value={queryFilter.class_id}/>
            <SelectStatusMahasiswa data={statusSiswa} onProdiFilterChange={onQueryFilterChange} value={queryFilter.status}/>
            <Button size="sm" onClick={onCLickFilterSubmit}>Cari</Button>

          </div>

          <TableSiswa
            data={filterText.length > 0 ? dataFiltered : dataSiswa.data}
            subHeaderComponent={subHeaderComponent}
            resetPaginationToggle={resetPaginationToggle}
            isLoading={isLoadingSiswa}
            onClickEditHandler={onClickEditHandler}
            onClickDetailHandler={onClickDetailSiswaHandler}

            onClickDeleteHandler={onSubmitDeleteHandler}
          />
        </div>
        <ModalForm
          initialValues={isEdit?dataDetailSiswa:siswaInitialValues}
          schema={siswaSchema}
          toggle={() => setIsOpenModalForm(!isOpenModalForm)}
          isOpen={isOpenModalForm}
          btnName={isEdit?"Edit":"Tambah"}
          isLoadingSendData={isLoadingSendDataSiswa}
          headerName={isEdit?"Edit Siswa":"Tambah Siswa"}
          onSubmitHandler={isEdit?onSubmitEditHandler:onSubmitTambahHandler}
        />
        <DetailModal data={dataDetailSiswa} isOpen={isOpenDetailModal} toggle={()=>setIsOpenDetailModal(!isOpenDetailModal)} headerName={"Detail"} />
        {/* <ModalForm
          initialValues={
            dataDetailKelas !== null ? dataDetailKelas : kelasInitialValues
          }
          schema={kelasSchema}
          toggle={() => setIsOpenModalEdit(!isOpenModalEdit)}
          isOpen={isOpenModalEdit}
          btnName="Edit"
          headerName="Edit Kelas"
          onSubmitHandler={onSubmitEditHandler}
        /> */}
      </div>
    </>
  );
}

export default PageSiswa;

import React, { useEffect, useMemo, useState } from "react";
import TableTahunAjaran from "./components/TableTahunAjaran";
import AddAction from "../../../component/ActionButton/AcctionAddButoon";
import SelectProdi from "../../../component/ActionButton/SelectProdi";
import ShowDataEnteris from "../../../component/ActionButton/showEntries";
import SearchInput from "../../../component/ActionButton/SearchInput";

import useRequest from "../../../customHooks/useRequest";
import {
  deleteTahunAjaran,
  getAllTahunAjaran,
  postTahunAjaran,
  putTahunAjaran,
} from "../../../utils/http";
import "./css/pageTahunAjaran.css";
import { useSelector } from "react-redux";
import ModalForm from "./components/FormModal";
import { tahunAjaranInitialValues } from "../../../utils/initialValues";
import { tahunAjaranSchema } from "../../../utils/schema";
import { ToastContainer } from "react-toastify";
import { tahunAjaranModel } from "../../../models/models";
import useTable from "../../../customHooks/useTable";
import { alertConfirmation } from "../../../component/Alert/swalConfirmation";
import { alertType } from "../../../utils/CONSTANT";

function PageTahunAjaran() {
  const {
    data: dataTahunAjaran,
    setData: setDataTahunAjaran,
    sendData: sendDataTahunAjaran,
    setDataDetail: setDataDetailTahunAjaran,
    dataDetail: dataDetailTahunAjaran,
    getData: getDataTahunAjaran,
    isLoading: isLoadingTahunAjaran,
    setIsLoading: setIsLoadingTahunAjaran,
    isLoadingSendData: isLoadingSendDataTahunAjaran,
    filterText,
    onChangeFilterText,
  } = useRequest();
  const {
    setIsOpenModalTambah,
    isOpenModalEdit,
    isOpenModalTambah,
    resetPaginationToggle,
    setResetPaginationToggle,
    setIsOpenModalEdit,
    isOpenModalForm,
    setIsOpenModalForm,
    isEdit,
    setIsEdit,
  } = useTable();

  const dataUser = useSelector(({ authState }) => authState.data);

  useEffect(() => {
    console.log('a');
    getDataTahunAjaran(() => getAllTahunAjaran(dataUser.token));
  }, []);


  useEffect(() => {
    console.log(filterText);

    if (filterText !== "") {
      setDataTahunAjaran((prevState) => ({
        ...prevState,
        filter: prevState.data.filter((item) => {
          if (
            item.period_start
              .toString()
              .toLowerCase()
              .includes(filterText.toString().toLowerCase())
          )
            return true;
          if (
            item.period_end
              .toString()
              .toLowerCase()
              .includes(filterText.toString().toLowerCase())
          )
            return true;
          return false;
        }),
      }));
    }
  }, [filterText]);

  const onClickTambahHandler=()=>{
    setIsOpenModalForm(!isOpenModalForm);
    setIsEdit(false)
  }
  const onClickEditHandler = (item) => {
    console.log(item);
    setDataDetailTahunAjaran(item);
    setIsEdit(true)
    setIsOpenModalForm(!isOpenModalForm);
  };
  

  const onSubmitTambahHandler = async (formBody, { resetForm }) => {
    console.log(formBody);
    await sendDataTahunAjaran(
      () => postTahunAjaran(tahunAjaranModel.objectToJSON(formBody), dataUser.token),
      () => getDataTahunAjaran(()=>getAllTahunAjaran(dataUser.token)),
      null

    );
    setIsOpenModalForm(!setIsOpenModalForm);
  };

  const onSubmitEditHandler = async (formBody, { resetForm }) => {
    console.log(formBody);
    await sendDataTahunAjaran(
      () =>
        putTahunAjaran(
          formBody.period_id,
          tahunAjaranModel.objectToJSON(formBody),
          dataUser.token
        ),
        () => getDataTahunAjaran(()=>getAllTahunAjaran(dataUser.token)),null
    );
    setIsOpenModalForm(!isOpenModalForm);
  };
  const onSubmitDeleteHandler = async (formBody) => {
    console.log(formBody);
    alertConfirmation(alertType.delete, async () => {
      await sendDataTahunAjaran(
        () => deleteTahunAjaran(formBody.period_id, dataUser.token),
        () => getDataTahunAjaran(()=>getAllTahunAjaran(dataUser.token)),
        null
      );
    });
  };


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

  return (
    <>
      <ToastContainer />
      <div className="page-content">
        <h3>
          Tahun Ajaran <span style={{ fontSize: "0.8em", color: "gray" }}>List</span>
        </h3>

        <div className="table-content">
          <AddAction onClickHandler={ onClickTambahHandler} />

          <TableTahunAjaran
            data={filterText.length > 0 ? dataTahunAjaran.filter : dataTahunAjaran.data}
            subHeaderComponent={subHeaderComponent}
            resetPaginationToggle={resetPaginationToggle}
            isLoading={isLoadingTahunAjaran}
            onClickEditHandler={onClickEditHandler}
            onClickDeleteHandler={onSubmitDeleteHandler}
          />
        </div>
        <ModalForm
          initialValues={isEdit?dataDetailTahunAjaran:tahunAjaranInitialValues}
          schema={tahunAjaranSchema}
          toggle={() => setIsOpenModalForm(!isOpenModalForm)}
          isOpen={isOpenModalForm}
          isLoadingSendData={isLoadingSendDataTahunAjaran}
          btnName={isEdit?"Edit":"Tambah"}
          headerName={isEdit?"Edit Tahun Ajaran":"Tambah Tahun Ajaran"}
          onSubmitHandler={isEdit?onSubmitEditHandler:onSubmitTambahHandler}
        />
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

export default PageTahunAjaran;

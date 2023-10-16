import React, { useEffect, useMemo, useState } from "react";
import TableKelas from "./components/TableKelas";
import AddAction from "../../../component/ActionButton/AcctionAddButoon";
import SelectProdi from "../../../component/ActionButton/SelectProdi";
import ShowDataEnteris from "../../../component/ActionButton/showEntries";
import SearchInput from "../../../component/ActionButton/SearchInput";

import useRequest from "../../../customHooks/useRequest";
import {
  deleteKelas,
  getAllKelas,
  postKelas,
  putKelas,
} from "../../../utils/http";
import "./css/pageKelas.css";
import { useSelector } from "react-redux";
import ModalForm from "./components/FormModal";
import { kelasInitialValues } from "../../../utils/initialValues";
import { kelasSchema } from "../../../utils/schema";
import { ToastContainer } from "react-toastify";
import { kelasModel } from "../../../models/models";
import useTable from "../../../customHooks/useTable";
import { alertConfirmation } from "../../../component/Alert/swalConfirmation";
import { alertType } from "../../../utils/CONSTANT";

function PageKelas() {
  const {
    data: dataKelas,
    setData: setDataKelas,
    sendData: sendDataKelas,
    setDataDetail: setDataDetailKelas,
    dataDetail: dataDetailKelas,
    getData: getDataKelas,
    isLoading: isLoadingKelas,
    setIsLoading: setIsLoadingKelas,
    isLoadingSendData:isLoadingSendDataKelas,
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
    getDataKelas(() => getAllKelas(dataUser.token));
  }, []);


  useEffect(() => {
    console.log(filterText);

    if (filterText !== "") {
      setDataKelas((prevState) => ({
        ...prevState,
        filter: prevState.data.filter((item) => {
          if (
            item.class_name
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
    setDataDetailKelas(item);
    setIsEdit(true)
    setIsOpenModalForm(!isOpenModalForm);
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

  const onSubmitTambahHandler = async (formBody, { resetForm }) => {
    console.log(formBody);
    await sendDataKelas(
      () => postKelas(kelasModel.objectToJSON(formBody), dataUser.token),
      () => getDataKelas(()=>getAllKelas(dataUser.token)),
      null

    );
    setIsOpenModalForm(!setIsOpenModalForm);
  };

  const onSubmitEditHandler = async (formBody, { resetForm }) => {
    console.log(formBody);
    await sendDataKelas(
      () =>
        putKelas(
          formBody.class_id,
          kelasModel.objectToJSON(formBody),
          dataUser.token
        ),
        () => getDataKelas(()=>getAllKelas(dataUser.token)),null
    );
    setIsOpenModalForm(!isOpenModalForm);
  };
  const onSubmitDeleteHandler = async (formBody) => {
    console.log(formBody);
    alertConfirmation(alertType.delete, async () => {
      await sendDataKelas(
        () => deleteKelas(formBody.class_id, dataUser.token),
        () => getDataKelas(()=>getAllKelas(dataUser.token)),
        null
      );
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="page-content">
        <h3>
          Kelas <span style={{ fontSize: "0.8em", color: "gray" }}>List</span>
        </h3>

        <div className="table-content">
          <AddAction onClickHandler={ onClickTambahHandler} />

          <TableKelas
            data={filterText.length > 0 ? dataKelas.filter : dataKelas.data}
            subHeaderComponent={subHeaderComponent}
            resetPaginationToggle={resetPaginationToggle}
            isLoading={isLoadingKelas}
            onClickEditHandler={onClickEditHandler}
            onClickDeleteHandler={onSubmitDeleteHandler}
          />
        </div>
        <ModalForm
          initialValues={isEdit?dataDetailKelas:kelasInitialValues}
          schema={kelasSchema}
          toggle={() => setIsOpenModalForm(!isOpenModalForm)}
          isOpen={isOpenModalForm}
          btnName={isEdit?"Edit":"Tambah"}
          isLoadingSendData={isLoadingSendDataKelas}
          headerName={isEdit?"Edit Kelas":"Tambah Kelas"}
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

export default PageKelas;

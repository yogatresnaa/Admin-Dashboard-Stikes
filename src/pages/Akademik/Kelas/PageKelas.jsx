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

  const onClickEditHandler = (item) => {
    console.log(item);
    setDataDetailKelas(item);
    setIsOpenModalEdit(!isOpenModalEdit);
  };
  const subHeaderComponent = useMemo(() => {
    const onClearHandler = () => {
      if (filterText) {
        setFilterText("");
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
      () => getAllKelas(dataUser.token)
    );
    setIsOpenModalTambah(!isOpenModalTambah);
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
      () => getAllKelas(dataUser.token)
    );
    setIsOpenModalEdit(!isOpenModalEdit);
  };
  const onSubmitDeleteHandler = async (formBody) => {
    console.log(formBody);
    alertConfirmation(alertType.delete, async () => {
      await sendDataKelas(
        () => deleteKelas(formBody.class_id, dataUser.token),
        () => getAllKelas(dataUser.token)
      );
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="page-kelas">
        <h3>
          Kelas <span style={{ fontSize: "0.8em", color: "gray" }}>List</span>
        </h3>

        <div className="table-kelas">
          <AddAction onClickHandler={() => setIsOpenModalTambah(true)} />

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
          initialValues={kelasInitialValues}
          kelasSchema={kelasSchema}
          toggle={() => setIsOpenModalTambah(!isOpenModalTambah)}
          isOpen={isOpenModalTambah}
          btnName="Tambah"
          headerName="Tambah Kelas"
          onSubmitHandler={onSubmitTambahHandler}
        />
        <ModalForm
          initialValues={
            dataDetailKelas !== null ? dataDetailKelas : kelasInitialValues
          }
          kelasSchema={kelasSchema}
          toggle={() => setIsOpenModalEdit(!isOpenModalEdit)}
          isOpen={isOpenModalEdit}
          btnName="Edit"
          headerName="Edit Kelas"
          onSubmitHandler={onSubmitEditHandler}
        />
      </div>
    </>
  );
}

export default PageKelas;

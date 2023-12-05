import React, { useEffect, useMemo, useState, useRef } from "react";
import TableAkunBiaya from "./components/TablePosBayar";
import SearchInput from "../../../component/ActionButton/SearchInput";
import SelectProdi from "../../../component/ActionButton/SelectProdi";
import SelectUnitKelas from "../../../component/ActionButton/SelectUnitKelas";
import AddAction from "../../../component/ActionButton/AcctionAddButoon";
import { Button } from "reactstrap";
import {
  getAllProdi,
  getAllKelas,
  getAllAlumni,
  getAllAccountCost,
  getCodeAccountCost,
  postAccountCost,
  putAccountCost,
  deleteAccountCost,
  getAllPosPay,
  getAllPiutang,
  getAllAccountCostPay,
  postPosPay,
  deletePosPay,
  putPosPay,
} from "../../../utils/http";
import { ToastContainer } from "react-toastify";

import useRequest from "../../../customHooks/useRequest";
import queryString from "query-string";
import { useSelector } from "react-redux";
import useTable from "../../../customHooks/useTable";
import ModalForm from "./components/FormModal";
import { accountCostInitialValues, posPayInitialValues } from "../../../utils/initialValues";
import { accountCostSchema, posPaySchema } from "../../../utils/schema";
import { accountCostModel, posPayModel } from "../../../models/models";
import { alertConfirmation } from "../../../component/Alert/swalConfirmation";
import { alertType } from "../../../utils/CONSTANT";

function PagePosPay() {
  const {
    data: dataPosPay,
    setData: setDataPosPay,
    sendData: sendDataPosPay,
    setDataDetail: setDataDetailPosPay,
    dataDetail: dataDetailPosPay,
    getData: getDataPosPay,
    isLoading: isLoadingPosPay,
    setIsLoading: setIsLoadingPosPay,
    isLoadingSendData: isLoadingSendDataPosPay,
    filterText,
    onChangeFilterText,
  } = useRequest();
  const {
    data: dataPiutang,
    getData: getDataPiutang,
    isLoading: isLoadingPiutang,
  } = useRequest();
  const {
    data: dataAccountCost,
    getData: getDataAccountCost,
    isLoading: isLoadingAccountCost,
  } = useRequest();
  const {
    data: dataCode,
    setData: setDataCode,
    getData: getDataCode,
  } = useRequest();
  const {
    data: dataProdi,
    setData: setDataProdi,
    getData: getDataProdi,
  } = useRequest();
  const {
    data: dataKelas,
    setData: setDataKelas,
    getData: getDataKelas,
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
  const [queryFilter, setQueryFilter] = useState({
    class_id: "",
    status: "",
    majors_id: "",
  });

  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [accountType, setAccountType] = useState(0);
  //  const printComponent = useRef();

  useEffect(() => {
    const query = queryString.stringify(queryFilter);
    getDataPosPay(() => getAllPosPay(dataUser.token));
    getDataProdi(() => getAllProdi(dataUser.token));
    getDataKelas(() => getAllKelas(dataUser.token));
  }, []);

  const onCLickFilterSubmit = () => {
    const query = queryString.stringify(queryFilter);
    getDataPosPay(() => getAllPosPay(dataUser.token));
  };

  const onClickTambahHandler = async (row) => {
    console.log(row);
    // const body = {
    //   account_code: row.account_code,
    //   account_type: row.account_type + 1,
    // };
    setAccountType(row.account_type);

    await getDataPiutang(() => getAllPiutang(dataUser.token));
    await getDataAccountCost(() => getAllAccountCostPay(dataUser.token));
    setIsOpenModalForm(true);
    setIsEdit(false);
  };

  const onClickEditHandler = async (item) => {
    // const body = {
    //   account_code: item.account_code,
    //   account_type: item.account_type + 1,
    // };
    setAccountType(item.account_type);

    await getDataPiutang(() => getAllPiutang(dataUser.token));
    await getDataAccountCost(() => getAllAccountCostPay(dataUser.token));
    // console.log(item);
    // await getDataCode(() => getCodeAccountCost(body, dataUser.token));
    setDataDetailPosPay(item);
    setIsEdit(true);
    setIsOpenModalForm(!isOpenModalForm);
  };
  useEffect(() => {
    // console.log(dataCode)
    // if(dataCode.data.code){
    //   setIsOpenModalForm(true);
    //   setIsEdit(false);
    // }
  }, [dataCode, isOpenModalForm, setIsEdit, setIsOpenModalForm]);
  //   const onClickEditHandler = (item) => {
  //     console.log(item);
  //     setDataDetailAlumni((prevState) => ({
  //       ...prevState,
  //       ...item,
  //       student_born_date: item.student_born_date == '0000-00-00' ? item.student_born_date : dateConvertForDb(item.student_born_date),
  //     }));
  //     setIsEdit(true);
  //     setIsOpenModalForm(!isOpenModalForm);
  //   };
  const onSubmitTambahHandler = async (formBody, { resetForm }) => {
    const newFormBody = {
      ...formBody,
      sekolah_id: 0,
    };
    await sendDataPosPay(
      () =>
        postPosPay(
          posPayModel.objectToJSON(newFormBody),
          dataUser.token
        ),
      () => {
        getDataPosPay(() => getAllPosPay(dataUser.token));
        setIsOpenModalForm(!isOpenModalForm);
      },
      null
    );
  };

  const onSubmitEditHandler = async (formBody, { resetForm }) => {
   
    await sendDataPosPay(
      () =>
        putPosPay(
          formBody.pos_pay_id,
          posPayModel.objectToJSON(formBody),
          dataUser.token
        ),
      () => {
        getDataPosPay(() => getAllPosPay(dataUser.token));
        setIsOpenModalForm(!isOpenModalForm);
      },
      null
    );
  };
  const onSubmitDeleteHandler = async (formBody) => {
    console.log(formBody);
    alertConfirmation(alertType.delete, async () => {
      await sendDataPosPay(
        () => deletePosPay(formBody.pos_pay_id, dataUser.token),
        () => getDataPosPay(() => getAllPosPay(dataUser.token)),
        null
      );
    });
  };
  const onQueryFilterChange = (e) => {
    setQueryFilter((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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

  const dataFiltered = useMemo(
    () =>
      dataPosPay.data.filter(
        (item) =>
          item.account_account_code
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase()) ||
          item.pos_pay_description
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase())
      ),
    [filterText, dataPosPay.data]
  );
  return (
    <div className="page-content">
      <ToastContainer />
      <h3>
        Pos Bayar <span style={{ fontSize: "0.8em", color: "gray" }}>List</span>
      </h3>

      <div className="table-content">
        <AddAction onClickHandler={onClickTambahHandler} />
        <TableAkunBiaya
          data={filterText.length > 0 ? dataFiltered : dataPosPay.data}
          onClickTambahHandler={onClickTambahHandler}
          onClickEditHandler={onClickEditHandler}
          onClickDeleteHandler={onSubmitDeleteHandler}
          subHeaderComponent={subHeaderComponent}
        />
      </div>
      <ModalForm
        initialValues={isEdit ? dataDetailPosPay:posPayInitialValues}
        schema={posPaySchema}
        toggle={() => setIsOpenModalForm(!isOpenModalForm)}
        isOpen={isOpenModalForm}
        dataAccountCost={dataAccountCost.data}
        dataPiutang={dataPiutang.data}
        isLoadingSendData={isLoadingSendDataPosPay}
        btnName={isEdit ? "Edit" : "Tambah"}
        headerName={isEdit ? "Edit Tahun Ajaran" : "Tambah Tahun Ajaran"}
        onSubmitHandler={isEdit ? onSubmitEditHandler : onSubmitTambahHandler}
      />
    </div>
  );
}

export default PagePosPay;

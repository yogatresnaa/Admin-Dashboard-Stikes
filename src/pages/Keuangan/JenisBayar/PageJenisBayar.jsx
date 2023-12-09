import React, { useEffect, useMemo, useState, useRef } from "react";
import TableAkunBiaya from "./components/TablePaymentType";
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
  getAllPaymentType,
  putPaymentType,
  postPaymentType,
  deletePaymentType,
  getAllTahunAjaran,
} from "../../../utils/http";
import { ToastContainer } from "react-toastify";

import useRequest from "../../../customHooks/useRequest";
import queryString from "query-string";
import { useSelector } from "react-redux";
import useTable from "../../../customHooks/useTable";
import ModalForm from "./components/FormModal";
import { accountCostInitialValues, paymentTypeInitialValues, posPayInitialValues } from "../../../utils/initialValues";
import { accountCostSchema, paymentTypeSchema, posPaySchema } from "../../../utils/schema";
import { accountCostModel, paymentTypeModel, posPayModel } from "../../../models/models";
import { alertConfirmation } from "../../../component/Alert/swalConfirmation";
import { alertType } from "../../../utils/CONSTANT";

function PageJenisBayar() {
  const {
    data: dataPaymentType,
    setData: setDataPaymentType,
    sendData: sendDataPaymentType,
    setDataDetail: setDataDetailPaymentType,
    dataDetail: dataDetailPaymentType,
    getData: getDataPaymentType,
    isLoading: isLoadingPaymentType,
    setIsLoading: setIsLoadingPaymentType,
    isLoadingSendData: isLoadingSendDataPaymentType,
    filterText,
    onChangeFilterText,
  } = useRequest();
  const {
    data: dataTahunAjaran,
    getData: getDataTahunAjaran,
    isLoading: isLoadinTahunAjaran,
  } = useRequest();
  const {
    data: dataPosPay,
    getData: getDataPosPay,
    isLoading: isLoadingPosPay,
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


  const fetchAllOptions = async () => {
    await getDataPaymentType(() => getAllPaymentType(dataUser.token));
    await getDataTahunAjaran(() => getAllTahunAjaran(dataUser.token));

  }
  useEffect(() => {
    fetchAllOptions();
    getDataPosPay(() => getAllPosPay(dataUser.token));
  }, []);

  const onCLickFilterSubmit = () => {
    const query = queryString.stringify(queryFilter);
    getDataPaymentType(() => getAllPaymentType(dataUser.token));
  };

  const onClickTambahHandler = async (row) => {
    console.log(row);


    await fetchAllOptions();
    setIsOpenModalForm(true);
    setIsEdit(false);
  };

  const onClickEditHandler = async (item) => {

    await fetchAllOptions();

    // console.log(item);
    // await getDataCode(() => getCodeAccountCost(body, dataUser.token));
    setDataDetailPaymentType(item);
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
      payment_mode: 'TETAP'
    };
    await sendDataPaymentType(
      () =>
        postPaymentType(
          paymentTypeModel.objectToJSON(newFormBody),
          dataUser.token
        ),
      () => {
        getDataPaymentType(() => getAllPaymentType(dataUser.token));
        setIsOpenModalForm(!isOpenModalForm);
      },
      null
    );
  };

  const onSubmitEditHandler = async (formBody, { resetForm }) => {

    await sendDataPaymentType(
      () =>
        putPaymentType(
          formBody.payment_id,
          paymentTypeModel.objectToJSON(formBody),
          dataUser.token
        ),
      () => {
        getDataPaymentType(() => getAllPaymentType(dataUser.token));
        setIsOpenModalForm(!isOpenModalForm);
      },
      null
    );
  };
  const onSubmitDeleteHandler = async (formBody) => {
    console.log(formBody);
    alertConfirmation(alertType.delete, async () => {
      await sendDataPaymentType(
        () => deletePaymentType(formBody.payment_id, dataUser.token),
        () => getDataPaymentType(() => getAllPaymentType(dataUser.token)),
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
      dataPaymentType.data.filter(
        (item) =>
          item.payment_type
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase()) ||
          item.payment_mode
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase()) ||
          item.period_start
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase()) ||
          item.period_end
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase()) ||
          item.pos_pay_name
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase())

      ),
    [filterText, dataPaymentType.data]
  );
  return (
    <div className="page-content">
      <ToastContainer />
      <h3>
        Jenis Bayar <span style={{ fontSize: "0.8em", color: "gray" }}>List</span>
      </h3>

      <div className="table-content">
        <AddAction onClickHandler={onClickTambahHandler} />
        <TableAkunBiaya
          data={filterText.length > 0 ? dataFiltered : dataPaymentType.data}
          onClickTambahHandler={onClickTambahHandler}
          onClickEditHandler={onClickEditHandler}
          onClickDeleteHandler={onSubmitDeleteHandler}
          subHeaderComponent={subHeaderComponent}
        />
      </div>
      <ModalForm
        initialValues={isEdit ? dataDetailPaymentType : paymentTypeInitialValues}
        schema={paymentTypeSchema}
        toggle={() => setIsOpenModalForm(!isOpenModalForm)}
        isOpen={isOpenModalForm}
        dataPosPay={dataPosPay.data}
        dataPaymentMode={dataPosPay.data}
        dataTahunAjaran={dataTahunAjaran.data}
        isEdit={isEdit}
        isLoadingSendData={isLoadingPaymentType}
        btnName={isEdit ? "Edit" : "Tambah"}
        headerName={isEdit ? "Edit Jenis Bayar" : "Tambah Jenis Bayar"}
        onSubmitHandler={isEdit ? onSubmitEditHandler : onSubmitTambahHandler}
      />
    </div>
  );
}

export default PageJenisBayar;

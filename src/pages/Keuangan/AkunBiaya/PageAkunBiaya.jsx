import React, { useEffect, useMemo, useState, useRef } from "react";
import TableAkunBiaya from "./components/TableAkunBiaya";
import SearchInput from "../../../component/ActionButton/SearchInput";
import SelectProdi from "../../../component/ActionButton/SelectProdi";
import SelectUnitKelas from "../../../component/ActionButton/SelectUnitKelas";
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
} from "../../../utils/http";
import { ToastContainer } from 'react-toastify';

import useRequest from "../../../customHooks/useRequest";
import queryString from "query-string";
import { useSelector } from "react-redux";
import useTable from "../../../customHooks/useTable";
import ModalForm from "./components/FormModal";
import { accountCostInitialValues } from "../../../utils/initialValues";
import { accountCostSchema } from "../../../utils/schema";
import { accountCostModel } from "../../../models/models";
import { alertConfirmation } from "../../../component/Alert/swalConfirmation";
import { alertType } from "../../../utils/CONSTANT";

function PageAkunBiaya() {
  const {
    data: dataAccountCost,
    setData: setDataAccountCost,
    sendData: sendDataAccountCost,
    setDataDetail: setDataDetailAccountCost,
    dataDetail: dataDetailAccountCost,
    getData: getDataAccountCost,
    isLoading: isLoadingSiswa,
    setIsLoading: setIsLoadingAlumni,
    isLoadingSendData: isLoadingSendDataAccountCost,
    filterText,
    onChangeFilterText,
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
    getDataAccountCost(() => getAllAccountCost(dataUser.token));
    getDataProdi(() => getAllProdi(dataUser.token));
    getDataKelas(() => getAllKelas(dataUser.token));
  }, []);

  const onCLickFilterSubmit = () => {
    const query = queryString.stringify(queryFilter);
    getDataAccountCost(() => getAllAccountCost(dataUser.token));
  };

  const onClickTambahHandler = async (row) => {
    console.log(row);
    const body = {
      account_code: row.account_code,
      account_type: row.account_type + 1,
    };
    setAccountType(row.account_type);

    await getDataCode(() => getCodeAccountCost(body, dataUser.token));
    setIsOpenModalForm(true);
    setIsEdit(false);
  };

  const onClickEditHandler = async (item) => {
    const body = {
      account_code: item.account_code,
      account_type: item.account_type + 1,
    };
    setAccountType(item.account_type);

    console.log(item);
    await getDataCode(() => getCodeAccountCost(body, dataUser.token));
    setDataDetailAccountCost(item);
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
      account_note: 0,
      account_majors_id: 0,
      sekolah_id: 0,
      account_type:formBody.account_type+1,
    };
    await sendDataAccountCost(
      () =>
        postAccountCost(
          accountCostModel.objectToJSON(newFormBody),
          dataUser.token
        ),
      () => {
        getDataAccountCost(() => getAllAccountCost(dataUser.token));
        setIsOpenModalForm(!isOpenModalForm);
      },
      null
    );
  };

  const onSubmitEditHandler = async (formBody, { resetForm }) => {
    const newFormBody = {
      ...formBody,
      
    };
    await sendDataAccountCost(
      () =>
        putAccountCost(
          formBody.account_id,
          accountCostModel.objectToJSON(formBody),
          dataUser.token
        ),
      () => {
        getDataAccountCost(() => getAllAccountCost(dataUser.token));
        setIsOpenModalForm(!isOpenModalForm);
      },
      null
    );
  };
  const onSubmitDeleteHandler = async (formBody) => {
    console.log(formBody);
    alertConfirmation(alertType.delete, async () => {
      await sendDataAccountCost(
        () => deleteAccountCost(formBody.account_id, dataUser.token),
        () => getDataAccountCost(() => getAllAccountCost(dataUser.token)),
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
      dataAccountCost.data.filter(
        (item) =>
          item.account_code
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase()) ||
          item.account_description
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase())
      ),
    [filterText, dataAccountCost.data]
  );
  return (
    <div className="page-content">
       <ToastContainer />
      <h3>
        Akun Biaya{" "}
        <span style={{ fontSize: "0.8em", color: "gray" }}>List</span>
      </h3>

      <div className="table-content">
        <TableAkunBiaya
          data={filterText.length > 0 ? dataFiltered : dataAccountCost.data}
          onClickTambahHandler={onClickTambahHandler}
          onClickEditHandler={onClickEditHandler}
          onClickDeleteHandler={onSubmitDeleteHandler}
          subHeaderComponent={subHeaderComponent}
        />
      </div>
      <ModalForm
        initialValues={
          isEdit
            ? {
                ...dataDetailAccountCost,
                account_code: dataCode.data.code,
                account_type: accountType,
              }
            : {
                ...accountCostInitialValues,
                account_code: dataCode.data.code,
                account_type: accountType,
              }
        }
        schema={accountCostSchema}
        toggle={() => setIsOpenModalForm(!isOpenModalForm)}
        isOpen={isOpenModalForm}
        isLoadingSendData={isLoadingSendDataAccountCost}
        btnName={isEdit ? "Edit" : "Tambah"}
        headerName={isEdit ? "Edit Tahun Ajaran" : "Tambah Tahun Ajaran"}
        onSubmitHandler={isEdit ? onSubmitEditHandler : onSubmitTambahHandler}
      />
    </div>
  );
}

export default PageAkunBiaya;

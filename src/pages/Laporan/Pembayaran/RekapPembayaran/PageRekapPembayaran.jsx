import React, { useEffect, useMemo, useRef, useState } from "react";
import SelectProdi from "../../../../component/ActionButton/SelectProdi";
import SearchInput from "../../../../component/ActionButton/SearchInput";
import _ from 'lodash'
import useRequest from "../../../../customHooks/useRequest";
import {
  getAllProdi,
  putProdi,
  deleteProdi,
  postProdi,
  getAllTahunAjaran,
  getAllSiswa,
  putSiswa,
  deleteSiswa,
  postSiswa,
  getAllKelas,
} from "../../../../utils/http";
// import "./css/page-laporan-pembayaran-kelas.css";
import { useSelector } from "react-redux";
// import ModalForm from "../PerKelas/components/";
import { siswaInitialValues } from "../../../../utils/initialValues";
import { siswaSchema } from "../../../../utils/schema";
import { ToastContainer } from "react-toastify";
import { prodiModel, siswaModel } from "../../../../models/models";
import useTable from "../../../../customHooks/useTable";
import { alertConfirmation } from "../../../../component/Alert/swalConfirmation";
import { alertType, statusSiswa } from "../../../../utils/CONSTANT";
import SelectUnitKelas from "../../../../component/ActionButton/SelectUnitKelas";
import { Button } from "reactstrap";
import queryString from "query-string";
import SelectStatusMahasiswa from "../../../../component/ActionButton/SelectStatusMahasiswa";
// import DetailModal from "./components/DetailModal";
import { dateConvert, dateConvertForDb } from "../../../../utils/helper";
import ReactToPrint, { useReactToPrint } from "react-to-print";
// import PrintTableSiswaComponent from "./components/PrintTableSiswaTemplate";
import SelectTahunAjaran from "../../../../component/ActionButton/SelectTahunAjaran";


function PageRekapPembayaran() {
  const {
    data: dataSiswa,
    setData: setDataSiswa,
    sendData: sendDataSiswa,
    setDataDetail: setDataDetailSiswa,
    dataDetail: dataDetailSiswa,
    getData: getDataSiswa,
    isLoading: isLoadingSiswa,
    setIsLoading: setIsLoadingSiswa,
    isLoadingSendData: isLoadingSendDataSiswa,
    filterText,
    onChangeFilterText,
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
  const [tahunAjaranState, setTahunAjaran] = useState('');
  const {
        data: TahunAjaran,
        setData: setDataTahunAjaran,
        getData: getDataTahunAjaran,
    } = useRequest();

  const printComponent = useRef();
  useEffect(() => {
    const query = queryString.stringify(queryFilter);
    getDataSiswa(() => getAllSiswa(query, dataUser.token));
    getDataProdi(() => getAllProdi(dataUser.token));
    getDataKelas(() => getAllKelas(dataUser.token));
    getDataTahunAjaran(() => getAllTahunAjaran(dataUser.token))
  }, []);

    const onPeriodChange = (e) => {
        console.log(TahunAjaran)
        const selectedPeriod = TahunAjaran.data.filter(
            (item) => item.period_id == parseInt(e.target.value, 10)
        )[0]

        setTahunAjaran(selectedPeriod)
    }

  const onCLickFilterSubmit = () => {
    const query = queryString.stringify(queryFilter);
    getDataSiswa(() => getAllSiswa(query, dataUser.token));
  };

  const onClickTambahHandler = () => {
    setIsOpenModalForm(!isOpenModalForm);
    setIsEdit(false);
  };
  const onClickEditHandler = (item) => {
    console.log(item);
    setDataDetailSiswa((prevState) => ({
      ...prevState,
      ...item,
      student_born_date:
        item.student_born_date == "0000-00-00"
          ? item.student_born_date
          : dateConvertForDb(item.student_born_date),
    }));
    setIsEdit(true);
    setIsOpenModalForm(!isOpenModalForm);
  };
  console.log("render");
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
  const handlePrint = useReactToPrint({
    content: () => printComponent.current
  });
  const onClickDetailSiswaHandler = (dataDetail) => {
    setDataDetailSiswa(dataDetail);
    setIsOpenDetailModal(true);
  };
  const onSubmitTambahHandler = async (formBody, { resetForm }) => {
    const query = queryString.stringify(queryFilter);
    await sendDataSiswa(
      () => postSiswa(siswaModel.objectToJSON(formBody), dataUser.token),
      () => {
        getDataSiswa(() => getAllSiswa(query, dataUser.token));
        setIsOpenModalForm(!isOpenModalForm);
      },
      null
    );
  };

  const onSubmitEditHandler = async (formBody, { resetForm }) => {
    console.log(formBody);
    const query = queryString.stringify(queryFilter);

    await sendDataSiswa(
      () =>
        putSiswa(
          formBody.student_id,
          siswaModel.objectToJSON(formBody),
          dataUser.token
        ),
      () => {
        getDataSiswa(() => getAllSiswa(query, dataUser.token));
        setIsOpenModalForm(!isOpenModalForm);
      },
      null
    );
  };
  const onSubmitDeleteHandler = async (formBody) => {
    console.log(formBody);
    const query = queryString.stringify(queryFilter);

    alertConfirmation(alertType.delete, async () => {
      await sendDataSiswa(
        () => deleteSiswa(formBody.student_id, dataUser.token),
        () => {
          getDataSiswa(() => getAllSiswa(query, dataUser.token));
          setIsOpenModalForm(!isOpenModalForm);
        },
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


 
  console.log(dataSiswa);
  const dataFiltered = useMemo(
    () =>
      dataSiswa.data.filter(
        (item) =>
          item.student_nis
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase()) ||
          item.student_full_name
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase()) ||
          item.majors_majors_name
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase())
      ),
    [filterText, dataSiswa.data]
  );

  return (
    <>
      <ToastContainer />
      <div className="page-content">
        <h3>
          Rekapitulasi <span style={{ fontSize: "0.8em", color: "gray" }}>List</span>
        </h3>

        <div className="table-content">
          <div className="d-flex flex-row gap-1 justify-content-start align-items-center mt-2">
            <SelectTahunAjaran
              data={TahunAjaran.data}
              onChange={onPeriodChange}
              value={tahunAjaranState?.period_id ?? ''}
            />
            <SelectProdi data={dataProdi.data} onProdiFilterChange={onQueryFilterChange} value={queryFilter.majors_id} />
            <SelectUnitKelas
              data={dataKelas.data}
              onProdiFilterChange={onQueryFilterChange}
              value={queryFilter.class_id}
            />
           
            <Button size="sm" className="align-self-end" onClick={onCLickFilterSubmit}>
              Filter
            </Button>
          </div>

          {/* <TableSiswa
            data={filterText.length > 0 ? dataFiltered : dataSiswa.data}
            subHeaderComponent={subHeaderComponent}
            resetPaginationToggle={resetPaginationToggle}
            isLoading={isLoadingSiswa}
            onClickEditHandler={onClickEditHandler}
            onClickDetailHandler={onClickDetailSiswaHandler}
            onClickDeleteHandler={onSubmitDeleteHandler}
          /> */}
        </div>
        {/* <ModalForm
          initialValues={isEdit ? dataDetailSiswa : siswaInitialValues}
          schema={siswaSchema}
          toggle={() => setIsOpenModalForm(!isOpenModalForm)}
          isOpen={isOpenModalForm}
          btnName={isEdit ? "Edit" : "Tambah"}
          dataProdi={dataProdi.data}
          dataKelas={dataKelas.data}
          isLoadingSendData={isLoadingSendDataSiswa}
          headerName={isEdit ? "Edit Siswa" : "Tambah Siswa"}
          onSubmitHandler={isEdit ? onSubmitEditHandler : onSubmitTambahHandler}
        /> */}
        {/* <DetailModal
          data={dataDetailSiswa}
          isOpen={isOpenDetailModal}
          toggle={() => setIsOpenDetailModal(!isOpenDetailModal)}
          headerName={"Detail"}
        /> */}
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
       
        {/* <PrintTableSiswaComponent data={dataSiswa.data} ref={printComponent} /> */}
      </div>
    </>
  );
}

export default PageRekapPembayaran;

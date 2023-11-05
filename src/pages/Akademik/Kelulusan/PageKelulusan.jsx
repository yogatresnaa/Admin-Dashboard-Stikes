import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import TableSiswa from "./components/TableSiswa";
import AddAction from "../../../component/ActionButton/AcctionAddButoon";
import SelectProdi from "../../../component/ActionButton/SelectProdi";
import ShowDataEnteris from "../../../component/ActionButton/showEntries";
import SearchInput from "../../../component/ActionButton/SearchInput";
import _ from "lodash";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
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
  putStatusSiswa,
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
import { Button, Col, Row } from "reactstrap";
import queryString from "query-string";
import SelectStatusMahasiswa from "../../../component/ActionButton/SelectStatusMahasiswa";
import DetailModal from "./components/DetailModal";
import { dateConvert, dateConvertForDb } from "../../../utils/helper";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import PrintTableSiswaComponent from "./components/PrintTableSiswaTemplate";

function PageKelulusan() {
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
  const [selectedItems, setSelectedItems] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const printComponent = useRef();
  useEffect(() => {
    const query = queryString.stringify(queryFilter);
    getDataSiswa(() => getAllSiswa(query, dataUser.token));
    getDataProdi(() => getAllProdi(dataUser.token));
    getDataKelas(() => getAllKelas(dataUser.token));
  }, []);

  const onCLickFilterSubmit = () => {
    const query = queryString.stringify(queryFilter);
    getDataSiswa(() => getAllSiswa(query, dataUser.token));
  };

  const onClickTambahHandler = () => {
    setIsOpenModalForm(!isOpenModalForm);
    setIsEdit(false);
  };
  const onClickEditHandler = (item) => {
    // console.log(item);
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
  // console.log("render");
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
    content: () => printComponent.current,
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
    // console.log(formBody);
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
    // console.log(formBody);
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

  const onSelectableChange = ({ selectedRows }) => {
    
    setSelectedItems(selectedRows);
  };
  const onSubmitStatusChangeHandler = useCallback(async(e, type) => {
    const idChange = selectedItems.map((item) => (item.student_id));
    
    const arrIdToString=`(${idChange.join(',').toString()})`
    // console.log(arrIdToString)
    const status = type === "graduate" ? 2 : 1;
    await sendDataSiswa(()=>putStatusSiswa(arrIdToString,{student_status:status},dataUser.token))
    const updatedData = dataSiswa.data
      .filter((item) => selectedItems.some((itemCompare) => itemCompare.student_id == item.student_id))
      .map((item) => {
        return {
          ...item,
          student_status: status,
        };
      });
    const unUpdatedData = dataSiswa.data.filter(
      (item) =>
        !updatedData.some(
          (itemCompare) => item.student_id == itemCompare.student_id
        )
    );
   
    setDataSiswa((prevState) => ({...prevState,data:[...updatedData, ...unUpdatedData]}))
    setSelectedItems([])
    setToggleCleared(!toggleCleared)
   
  }, [dataSiswa.data, dataUser.token, selectedItems, sendDataSiswa, setDataSiswa, toggleCleared]);

  console.log(toggleCleared);
  const dataFiltered = useMemo(
    () =>
      dataSiswa.data?.filter(
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
  const dataUngraduate = useMemo(
    () => dataSiswa.data?.filter((item) => item.student_status < 2),
    [dataSiswa.data]
  );

  // console.log(dataSiswa.data)
  const dataGraduate = useMemo(
    () => dataSiswa.data?.filter((item) => item.student_status == 2),
    [dataSiswa.data]
  );

  return (
    <>
      <ToastContainer />
      <div className="page-content">
        <h3>
          Kelulusan{" "}
          <span style={{ fontSize: "0.8em", color: "gray" }}>List</span>
        </h3>

        <div className="table-content">
          <div className="d-flex flex-row gap-1 justify-content-start align-items-center mt-2">
            <SelectProdi
              data={dataProdi.data}
              onProdiFilterChange={onQueryFilterChange}
              value={queryFilter.majors_id}
            />
            <SelectUnitKelas
              data={dataKelas.data}
              onProdiFilterChange={onQueryFilterChange}
              value={queryFilter.class_id}
            />
            <SelectStatusMahasiswa
              data={statusSiswa}
              onProdiFilterChange={onQueryFilterChange}
              value={queryFilter.status}
            />
           <Button size="sm" className="align-self-end" onClick={onCLickFilterSubmit}>
              Cari
            </Button>
          </div>
          <Row className="mt-4">
            <Col>
              <h3>Data Siswa</h3>
              <TableSiswa
                data={dataUngraduate}
                subHeaderComponent={subHeaderComponent}
                resetPaginationToggle={resetPaginationToggle}
                isLoading={isLoadingSiswa}
                onSelectableChange={onSelectableChange}
                onClickEditHandler={onClickEditHandler}
                clearSelectedRows={toggleCleared}
                onClickDetailHandler={onClickDetailSiswaHandler}
                onClickDeleteHandler={onSubmitDeleteHandler}
              />
            </Col>
            <Col className="d-flex justify-content-center mt-5">
              <div className="d-flex flex-column gap-2 p-2 w-75">
                <Button
                  className="d-flex justify-content-around align-items-center"
                  color="primary"
                  disabled={selectedItems.length==0}
                  onClick={(e)=>onSubmitStatusChangeHandler(e,'graduate')}
                >
                  <MdNavigateNext color="white" size={30} />
                  Proses Lulus
                </Button>
                <Button
                  className="d-flex justify-content-around align-items-center"
                  color="danger"
                  disabled={selectedItems.length==0}
                  onClick={(e)=>onSubmitStatusChangeHandler(e,'ungraduate')}

                >
                  <MdNavigateBefore color="white" size={30} />
                  Batal Lulus
                </Button>
              </div>
            </Col>
            <Col>
              <h3>Data Kelulusan</h3>
              <TableSiswa
                data={dataGraduate}
                subHeaderComponent={subHeaderComponent}
                resetPaginationToggle={resetPaginationToggle}
                isLoading={isLoadingSiswa}
                onSelectableChange={onSelectableChange}
                clearSelectedRows={toggleCleared}
                onClickEditHandler={onClickEditHandler}
                onClickDetailHandler={onClickDetailSiswaHandler}
                onClickDeleteHandler={onSubmitDeleteHandler}
              />
            </Col>
          </Row>
        </div>
        <ModalForm
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
        />
        <DetailModal
          data={dataDetailSiswa}
          isOpen={isOpenDetailModal}
          toggle={() => setIsOpenDetailModal(!isOpenDetailModal)}
          headerName={"Detail"}
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

        {/* <PrintTableSiswaComponent data={dataSiswa.data} ref={printComponent} /> */}
      </div>
    </>
  );
}

export default PageKelulusan;

// import React, { useEffect, useMemo, useState } from "react";
// import TableKelas from "./components/TableKelas";
// import AddAction from "../../../component/ActionButton/AcctionAddButoon";
// import SelectProdi from "../../../component/ActionButton/SelectProdi";
// import ShowDataEnteris from "../../../component/ActionButton/showEntries";
// import SearchInput from "../../../component/ActionButton/SearchInput";
// import useRequest from "../../../customHooks/useRequest";
// import { getAllKelas } from "../../../utils/http";
// import { useSelector } from "react-redux";
// import ModalForm from "./components/FormModal";
// import { kelasInitialValues } from "../../../utils/initialValues";
// import { kelasSchema } from "../../../utils/schema";

// function PageKelas() {
//   const {
//     data: dataKelas,
//     setData: setDataKelas,
//     getData: getDataKelas,
//     isLoading: isLoadingKelas,
//     setIsLoading: setIsLoadingKelas,
//     resetPaginationToggle,
//     filterText,
//     setResetPaginationToggle,
//     onChangeFilterText,
//   } = useRequest({ isFetch: true });
//   const dataUser = useSelector(({ authState }) => authState.data);

//   const [isOpenModalTambah, setIsOpenModalTambah] = useState(false);
//   useEffect(() => {
//     getDataKelas(() => getAllKelas(dataUser.token));
//   }, []);

//   const subHeaderComponent = useMemo(() => {
//     const onClearHandler = () => {
//       if (filterText) {
//         setFilterText("");
//         setResetPaginationToggle(!resetPaginationToggle);
//       }
//     };

//     return (
//       <SearchInput filterText={filterText} setFilterText={onChangeFilterText} />
//     );
//   });
//   return (
//     <div className="page-kelas">
//       <h3>
//         Kelas <span style={{ fontSize: "0.8em", color: "gray" }}>List</span>
//       </h3>

//       <div className="table-kelas">
//         <AddAction onClickHandler={()=>setIsOpenModalTambah(true)} />
//         <SelectProdi />
//         <div className="search">
//           <ShowDataEnteris />
//         </div>

//         <TableKelas
//           data={filterText.length > 0 ? dataKelas.filter : dataKelas.data}
//           subHeaderComponent={subHeaderComponent}
//           resetPaginationToggle={resetPaginationToggle}
//           isLoading={isLoadingKelas}
//         />
//       </div>
//       <ModalForm
//         initialValues={kelasInitialValues}
//         kelasSchema={kelasSchema}
//         toggle={()=>setIsOpenModalTambah(!isOpenModalTambah)}
//         isOpen={isOpenModalTambah}
//         btnName="Tambah"
//         headerName="Tambah Kelas"
//         onSubmitHandler={()=>{}}
//       />
//     </div>
//   );
// }

// export default PageKelas;

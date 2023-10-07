import React, { useEffect, useMemo } from "react";
import TableKelas from "./components/TableKelas";
import AddAction from "../../../component/ActionButton/AcctionAddButoon";
import SelectProdi from "../../../component/ActionButton/SelectProdi";
import ShowDataEnteris from "../../../component/ActionButton/showEntries";
import SearchInput from "../../../component/ActionButton/SearchInput";
import useRequest from "../../../customHooks/useRequest";
import { getAllKelas } from "../../../utils/http";
import { useSelector } from "react-redux";

function PageKelas() {
  const {
    data: dataKelas,
    setData: setDataKelas,
    getData: getDataKelas,
    isLoading: isLoadingKelas,
    setIsLoading: setIsLoadingKelas,
    resetPaginationToggle,
    filterText,
    setResetPaginationToggle,
    onChangeFilterText
  } = useRequest({ isFetch: true });
  const dataUser = useSelector(({ authState }) => authState.data);

  useEffect(() => {
    getDataKelas(() => getAllKelas(dataUser.token));
  }, []);

  const subHeaderComponent=useMemo(()=>{
    const onClearHandler = () => {
      if (filterText) {
        setFilterText('');
        setResetPaginationToggle(!resetPaginationToggle);
      }
    };

    return (
      <SearchInput filterText={filterText} setFilterText={onChangeFilterText} />
    )
  })
  return (
 
      <div className="page-kelas">
        <h3>Kelas <span style={{fontSize:"0.8em",color:'gray'}}>List</span></h3>

        <div className="table-kelas">
          <AddAction />
          <SelectProdi />
          <div className="search">
            <ShowDataEnteris />
         
          </div>

          <TableKelas
            data={filterText.length>0?
              dataKelas.filter:dataKelas.data}
            subHeaderComponent={subHeaderComponent}
            resetPaginationToggle={resetPaginationToggle}
            isLoading={isLoadingKelas}
          />
          
        </div>
      </div>

  );
}

export default PageKelas;

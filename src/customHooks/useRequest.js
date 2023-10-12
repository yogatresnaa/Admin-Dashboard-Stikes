import { useCallback, useEffect, useState } from "react";
import { requestWrapper } from "../utils/helper";
import { toast } from "react-toastify";
import { functionType } from "../utils/CONSTANT";

export default function useRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ data: [], filter: [] });
  const [dataDetail, setDataDetail] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [isOpenModalTambah, setIsOpenModalTambah] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);

  const onChangeFilterText = (e) => {
    setFilterText(e.target.value);
  };

  useEffect(() => {
    console.log(filterText);

    if (filterText !== "") {
      setData((prevState) => ({
        ...prevState,
        filter: prevState.data.filter((item) => {
          if (
            item.nama
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

  const getData = async (fn) => {
    requestWrapper(
      async () => {
        const response = await fn();
        setData((prevState) => ({ ...prevState, data: response.data.data }));
        return response;
      },
      functionType.GET,
      toast,
      null
    );
  };
  const sendData = async (fn) => {
    requestWrapper(
      async () => {
        const response = await fn();
    
        // setData((prevState) => ({ ...prevState, data: response.data.data }));
        return response;
      },
      getData(),
      functionType.POST,
      toast,
      null
    );
  };

  const onClickEditHandler=(item)=>{
    setDataDetail(item);
   setIsOpenModalEdit(!isOpenModalEdit)
  }

  return {
    isLoading,
    setIsLoading,
    sendData,
    getData,
    data,
    setData,
    resetPaginationToggle,
    filterText,
    dataDetail,
    setDataDetail,
    onChangeFilterText,
    onClickEditHandler,
    isOpenModalTambah,
    setIsOpenModalTambah,
    isOpenModalEdit,
    setIsOpenModalEdit,
    setResetPaginationToggle,
  };
}

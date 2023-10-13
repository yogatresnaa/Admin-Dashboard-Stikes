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
   await requestWrapper(
      async () => {
        const response = await fn();
        setData((prevState) => ({ ...prevState, data: response.data.data }));
        return response;
      },
      null,
      functionType.GET,
      toast,
      null
    );
  };
  const sendData = async (fn,cb) => {
   await requestWrapper(
      async () => {
        const response = await fn();
    
        // setData((prevState) => ({ ...prevState, data: response.data.data }));
        return response;
      },
      ()=>getData(cb),
      functionType.POST,
      toast,
      null
    );
  };

 

  return {
    isLoading,
    setIsLoading,
    sendData,
    getData,
    data,
    setData,
    filterText,
    dataDetail,
    setDataDetail,
    onChangeFilterText,
    
  };
}

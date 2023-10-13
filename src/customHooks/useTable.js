import { useCallback, useEffect, useState } from "react";
import { requestWrapper } from "../utils/helper";
import { toast } from "react-toastify";
import { functionType } from "../utils/CONSTANT";

export default function useTable() {
 
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [isOpenModalTambah, setIsOpenModalTambah] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);

 

  return {
   
    resetPaginationToggle,
    isOpenModalTambah,
    setIsOpenModalTambah,
    isOpenModalEdit,
    setIsOpenModalEdit,
    setResetPaginationToggle,
  };
}

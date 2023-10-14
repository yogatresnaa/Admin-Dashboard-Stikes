import { useCallback, useEffect, useState } from "react";
import { requestWrapper } from "../utils/helper";
import { toast } from "react-toastify";
import { functionType } from "../utils/CONSTANT";

export default function useTable() {
 
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [isOpenModalTambah, setIsOpenModalTambah] = useState(false);
  const [isOpenModalForm, setIsOpenModalForm] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

 

  return {
   
    resetPaginationToggle,
    isOpenModalTambah,
    setIsOpenModalTambah,
    isOpenModalEdit,
    isEdit,
    setIsOpenModalForm,
    isOpenModalForm,
    setIsEdit,
    setIsOpenModalEdit,
    setResetPaginationToggle,
  };
}

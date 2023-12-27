import React from "react";
import { Button, Form, FormGroup } from "reactstrap";
import FormComponent from "../../../../../../component/Form/FormComponent";
import Loader from "../../../../../../component/Loader/Loader";
import { payType } from "../../../../../../utils/CONSTANT";
import { payMode } from "../../../../../../utils/CONSTANT";
import CustomSelect from "../../../../../../component/Select/CustomSelect";
import ErrorComponent from "../../../../../../component/Form/ErrorComponent";
import HorizontalFormComponent from "../../../../../../component/Form/HorizontalFormComponent";
export default function FormInputTarifBulan({
  handleSubmit,
  values,
  errors,
  handleChange,
  btnName,
  dataKelas,
  setFieldValue,
  onEnterClickHandler,
  dataDetailPaymentRate,
  isEdit,
  isLoadingSendData,
}) {

  console.log(values)
  return (
    <>
      <HorizontalFormComponent
        id="payment_name"
        onEnterClickHandler={onEnterClickHandler}
        name="payment_name"
        text="Tarif Bulanan (Rp.)"
        placeholder={'Masukkan Nilai dan tekan enter'}
        type="text"
        onChangeHandler={setFieldValue}
        error={errors}
        handler={handleChange("fixed_rate")}
        value={values.fixed_rate}
      />


    </>
  );
}

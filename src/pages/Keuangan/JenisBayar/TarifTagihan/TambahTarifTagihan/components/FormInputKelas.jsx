import React from "react";
import { Button, Form, FormGroup } from "reactstrap";
import FormComponent from "../../../../../../component/Form/FormComponent";
import Loader from "../../../../../../component/Loader/Loader";
import { payType } from "../../../../../../utils/CONSTANT";
import { payMode } from "../../../../../../utils/CONSTANT";
import CustomSelect from "../../../../../../component/Select/CustomSelect";
import ErrorComponent from "../../../../../../component/Form/ErrorComponent";
import HorizontalFormComponent from "../../../../../../component/Form/HorizontalFormComponent";
export default function FormInputKelas({
  handleSubmit,
  values,
  errors,
  handleChange,
  locationState,
  btnName,
  type,
  dataKelas,
  dataSiswa,
  setFieldValue,
  onChangeClassAndFetchHandler,
  dataDetailPaymentRate,
  isEdit,
  isLoadingSendData,
}) {

  return (
    <>
      <HorizontalFormComponent
        id="payment_name"
        name="payment_name"
        text="Jenis Bayar"
        disabled={true}
        type="text"
        error={errors}
        handler={handleChange("payment_name")}
        value={`${values.pos_pay_name}-T.A ${values.period_start}/${values.period_end}`}
      />
      <HorizontalFormComponent
        id="period"
        name="period"
        text="Tahun Ajaran"
        disabled={true}
        type="text"
        error={errors}
        handler={handleChange("period")}
        value={`${values.period_start}/${values.period_end}`}
      />
      <HorizontalFormComponent
        id="payment_type"
        name="payment_type"
        text="Tipe Bayar"
        disabled={true}
        type="text"
        error={errors}
        handler={handleChange("payment_type")}
        value={values.payment_type}
      />
      {locationState.data.payment_type.toLowerCase().includes('bulanan') &&
        <FormGroup>

          <CustomSelect
            data={dataKelas}
            isVertical={false}
            includeAll={false}
            withLabel
            isDisabled={type.includes('edit')}
            name={'class_id'}
            value={values.class_class_id}
            onChange={type.includes('siswa') ? (e) => { onChangeClassAndFetchHandler(setFieldValue, e.target.value) } : handleChange("class_class_id")}
            labelName={'Kelas'}
            optionName={'class_name'}
            optionValue={'class_id'}
          />
          <ErrorComponent
            text={errors.class_class_id}
            error={errors.class_class_id}
          />
        </FormGroup>
      }
      {type.includes('siswa') &&
        <FormGroup>
          <CustomSelect
            data={dataSiswa}
            isVertical={false}
            includeAll={false}
            isDisabled={type.includes('edit')}
            withLabel
            name={'class_id'}
            value={values.student_student_id}
            onChange={handleChange("student_student_id")}
            labelName={'Siswa'}
            optionName={'student_full_name'}
            optionValue={'student_id'}
          />
          <ErrorComponent
            text={errors.student_student_id}
            error={errors.student_student_id}
          />
        </FormGroup>
      }
    </>
  );
}

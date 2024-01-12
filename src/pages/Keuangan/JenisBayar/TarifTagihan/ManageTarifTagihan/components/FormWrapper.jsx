import { Form, Formik } from "formik";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import FormComponent from "../../../../component/Form/FormComponent";
import FormInput from "./FormInputKelas";

export default function FormWrapper({

  dataKelas,
  dataDetailPaymentRate,
  isEdit,
  initialValues,
  onSubmitHandler,
  schema,
  btnName,
  isLoadingSendData,

}) {
  return (
    <>
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        validationSchema={schema}
      >
        {({
          handleChange,
          handleSubmit,

          setFieldValue,
          handleReset,
          values,
          errors,
        }) => (

          <FormInput
            btnName={btnName}
            errors={errors}
            dataKelas={dataKelas}
            dataDetailPaymentRate={dataDetailPaymentRate}
            isEdit={isEdit}
            values={values}
            isLoadingSendData={isLoadingSendData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />

        )}
      </Formik>
    </>
  );
}

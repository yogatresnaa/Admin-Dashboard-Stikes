import { Form, Formik } from "formik";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import FormComponent from "../../../../component/Form/FormComponent";
import FormInput from "./FormInput";

export default function ModalForm({
  isOpen,
  toggle,
  initialValues,
  onSubmitHandler,
  kelasSchema,
  btnName,
  headerName,
 
}) {
  return (
    <>
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        validationSchema={kelasSchema}
      >
        {({
          handleChange,
          handleSubmit,

          setFieldValue,
          handleReset,
          values,
          errors,
        }) => (
          <Modal
            isOpen={isOpen}
            toggle={() => {
              toggle()
              handleReset();
            }}
            onClosed={()=>handleReset()}
          >
            <ModalHeader toggle={toggle}>{headerName}</ModalHeader>
            <ModalBody>
              <FormInput
                btnName={btnName}
                errors={errors}
                values={values}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </ModalBody>
          </Modal>
        )}
      </Formik>
    </>
  );
}

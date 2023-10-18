import React from "react";
import { Button, Form } from "reactstrap";
import FormComponent from "../../../../component/Form/FormComponent";
import Loader from "../../../../component/Loader/Loader";

export default function FormInput({
  handleSubmit,
  values,
  errors,
  handleChange,
  btnName,
  isLoadingSendData,
}) {
  return (
    <Form
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSubmit();
        }
      }}
    >
      <FormComponent
        id="majors_name"
        name="majors_name"
        text="Nama Program Studi"
        placeholder="Masukkan Nama Program Studi"
        type="text"
        error={errors}
        handler={handleChange("majors_name")}
        value={values.majors_name}
      />
      <FormComponent
        id="majors_short_name"
        name="majors_short_name"
        text="Nama Pendek Program Studi"
        placeholder="Masukkan Nama Pendek Program Studi"
        type="text"
        error={errors}
        handler={handleChange("majors_short_name")}
        value={values.majors_short_name}
      />

      {isLoadingSendData ? (
        <Loader />
      ) : (
        <Button color="primary" className="button-login" onClick={handleSubmit}>
          {btnName}
        </Button>
      )}
    </Form>
  );
}

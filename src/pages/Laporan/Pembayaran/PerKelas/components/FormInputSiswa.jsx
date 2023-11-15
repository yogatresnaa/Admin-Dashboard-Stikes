import React from "react";
import { Button, Form } from "reactstrap";
import FormComponent from "../../../../../component/Form/FormComponent";
import Loader from "../../../../../component/Loader/Loader";

export default function FormInputSiswa({
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
        id="student_full_name"
        name="student_full_name"
        text="Nama Siswa"
        placeholder="Masukkan Nama Siswa"
        type="text"
        error={errors}
        handler={handleChange("student_full_name")}
        value={values.student_full_name}
      />
      <FormComponent
        id="student_born_place"
        name="student_born_place"
        text="Tempat Lahir"
        placeholder="Masukkan Tempat Lahir"
        type="text"
        error={errors}
        handler={handleChange("student_born_place")}
        value={values.student_born_place}
      />
      <FormComponent
        id="student_born_date"
        name="student_born_date"
        text="Tanggal Lahir"
        placeholder="Masukkan Tanggal Lahir"
        type="date"
        error={errors}
        handler={handleChange("student_born_date")}
        value={values.student_born_date}
      />
         <FormComponent
        id="student_hobby"
        name="student_hobby"
        text="Hobi"
        placeholder="Masukkan Hobi"
        type="text"
        error={errors}
        handler={handleChange("student_hobby")}
        value={values.student_hobby}
      />
         <FormComponent
        id="student_phone"
        name="student_phone"
        text="Nomor Handphone"
        placeholder="Masukkan Nomor Handphone"
        type="text"
        error={errors}
        handler={handleChange("student_phone")}
        value={values.student_phone}
      />
         <FormComponent
        id="student_address"
        name="student_address"
        text="Alamat"
        placeholder="Masukkan Alamat"
        type="textarea"
        error={errors}
        handler={handleChange("student_address")}
        value={values.student_address}
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

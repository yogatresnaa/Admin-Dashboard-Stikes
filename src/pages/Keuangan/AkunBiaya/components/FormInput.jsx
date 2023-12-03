import React from "react";
import { Button, Form, FormGroup } from "reactstrap";
import FormComponent from "../../../../component/Form/FormComponent";
import Loader from "../../../../component/Loader/Loader";
import { categoryArray } from "../../../../utils/CONSTANT";
import CustomSelect from "../../../../component/Select/CustomSelect";
import ErrorComponent from "../../../../component/Form/ErrorComponent";
export default function FormInput({
  handleSubmit,
  values,
  errors,
  handleChange,
  btnName,

  isLoadingSendData,
}) {
  console.log(values);
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
        id="account_code"
        name="account_code"
        text="Kode Akun"
        disabled={true}
        type="text"
        error={errors}
        handler={handleChange("account_code")}
        value={values.account_code}
      />
      <FormComponent
        id="account_description"
        name="account_description"
        text="Keterangan"
        placeholder="Masukkan keterangan"
        type="text"
        error={errors}
        handler={handleChange("account_description")}
        value={values.account_description}
      />
      {values.account_type > 0 && (
        <FormGroup>
         
          <CustomSelect
            data={categoryArray}
            labelName="Kategori"
            onChange={handleChange("account_category")}
            value={values.account_category}
            name="account_category"
            optionValue='id'
            optionName='name'
          />
          <ErrorComponent
            text={errors.account_category}
            error={errors.account_category}
          />
        </FormGroup>
      )}

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

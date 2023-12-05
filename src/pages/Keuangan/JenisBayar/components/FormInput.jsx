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
  dataAccountCost,
  dataPiutang,

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
      <FormGroup>
        <CustomSelect
          data={dataAccountCost}
          labelName="Kode Akun"
          optionName="account_code"
          optionValue={"account_code"}
          optionNameOptional="account_description"
          onChange={handleChange("account_account_code")}
          value={values.account_account_code==null?'':values.account_account_code}
          name="account_account_code"
        />
        <ErrorComponent
          text={errors.account_account_code}
          error={errors.account_account_code}
        />
      </FormGroup>
      <FormGroup>
        <CustomSelect
          data={dataPiutang}
          labelName="Akun Piutang"
          optionName="account_code"
          optionValue={"account_code"}
          optionNameOptional="account_description"
          onChange={handleChange("account_account_credit")}
          value={values.account_account_credit}
          name="account_account_credit"
        />
        <ErrorComponent
          text={errors.account_account_credit}
          error={errors.account_account_credit}
        />
      </FormGroup>
      <FormComponent
        id="pos_pay_name"
        name="pos_pay_name"
        text="Nama POS"
        placeholder="Nama POS"
        type="text"
        error={errors}
        handler={handleChange("pos_pay_name")}
        value={values.pos_pay_name}
      />
     
      <FormComponent
        id="pos_pay_description"
        name="pos_pay_description"
        text="Keterangan"
        placeholder="Masukkan keterangan"
        type="text"
        error={errors}
        handler={handleChange("pos_pay_description")}
        value={values.pos_pay_description}
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

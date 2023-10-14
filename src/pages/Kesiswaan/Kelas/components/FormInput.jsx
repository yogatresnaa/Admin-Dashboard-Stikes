import React from "react";
import { Button, Form } from "reactstrap";
import FormComponent from "../../../../component/Form/FormComponent";


export default function FormInput({handleSubmit,values,errors,handleChange,btnName}){
return(
    <Form
    onSubmit={handleSubmit}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    }}
  >
  
    <FormComponent
      id="class_name"
      name="class_name"
      text="Nama Kelas"
      placeholder="Masukkan kelas"
      type="text"
      error={errors}
      handler={handleChange("class_name")}
      value={values.class_name}
    />
 

    <Button
      color="primary"
      className="button-login"
      onClick={handleSubmit}
    >
      {btnName}
    </Button>
  </Form>
)
}
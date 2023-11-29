import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
export default function CustomSelect({ data,value,onChange,name,labelName }) {
  return (
    <FormGroup>
      <Label for={name}>{labelName}</Label>
      <Input type="select" value={value} onChange={onChange} name={name} id={name}>
        <option value={""}>Belum Dipilih</option>

        {data.map((item) => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </Input>
    </FormGroup>
  );
}

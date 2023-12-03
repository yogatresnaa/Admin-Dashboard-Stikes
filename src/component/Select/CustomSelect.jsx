import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
export default function CustomSelect({ data,value,onChange,name,labelName,optionName,optionValue,optionNameOptional='' }) {
  return (
    <FormGroup>
      <Label for={name}>{labelName}</Label>
      <Input type="select" value={value} onChange={onChange} name={name} id={name}>
        <option value={""}>Belum Dipilih</option>

        {data.map((item) => (
          <option key={item[optionValue]} value={item[optionValue]}>{optionNameOptional==''?item[optionName]:`${item[optionName]} - ${item[optionNameOptional]}`}</option>
        ))}
      </Input>
    </FormGroup>
  );
}

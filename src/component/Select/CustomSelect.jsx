import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
export default function CustomSelect({ isVertical = true, includeAll = false, withLabel = true, data, value, onChange, name, labelName, optionName, optionValue, optionNameOptional = '', symbol = '-' }) {
  return (
    <>
      {
        withLabel ?
          <div className={`${isVertical ? 'd-flex flex-column' : 'd-flex flex-row gap-4 '}`} style={{ marginBottom: 0 }}>
            < Label for={name} className={`${isVertical ? '' : 'label-form flex-1 text-start align-self-center m-0'}`} > {labelName}</Label >
            <Input type="select" className={`${isVertical ? '' : 'flex-2 '}`} value={value} onChange={onChange} name={name} id={name}>
              <option value={""}>{includeAll ? 'Semua' : 'Belum Dipilih'}</option>

              {data.map((item) => (
                <option key={item[optionValue]} value={item[optionValue]}>{optionNameOptional == '' ? item[optionName] : `${item[optionName]} ${symbol} ${item[optionNameOptional]}`}</option>
              ))}
            </Input>
          </div >
          :
          <div className={`${isVertical ? 'd-flex flex-column' : 'd-flex flex-row'}`}>


            <Input type="select" value={value} onChange={onChange} name={name} id={name}>
              <option value={""}>{includeAll ? 'Semua' : 'Belum Dipilih'}</option>
              {data.map((item) => (
                <option key={item[optionValue]} value={item[optionValue]}>{optionNameOptional == '' ? item[optionName] : `${item[optionName]} ${symbol} ${item[optionNameOptional]}`}</option>
              ))}
            </Input>
          </div >

      }
    </>
  );
}

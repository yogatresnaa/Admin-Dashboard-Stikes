import React from 'react'
import { monthArray } from '../../../../../../utils/CONSTANT'
import { Input } from 'reactstrap'
import ErrorComponent from '../../../../../../component/Form/ErrorComponent'
export default function FormInputMonthPayment({ values, handleChange, errors, setFieldValue }) {
  return (
    <>
      {
        monthArray.map(item => (
          <div key={item.month_id} className='d-flex flex-column'>
            <div className='d-flex gap-4' >
              <span className='label-form flex-1 text-start align-self-center justify-content-between d-flex'>{item.month_name} <span className='text-end'>Rp.</span></span>
              <Input id={`month_payment_${item.month_name.toLowerCase()}`} className='flex-3'
                name={`month_payment_${item.month_name.toLowerCase()}`}
                value={values[`month`][`month_${item.month_name?.toLowerCase()}`]?.payment ?? 0}
                onChange={(e) => {
                  setFieldValue(`month.month_${item.month_name.toLowerCase()}.payment`, e.target.value)
                }}
                placeholder="Masukkan Jumlah (Rp.)"
                type="text" />
            </div>
            <ErrorComponent error={errors.month?.[`month_${item.month_name.toLowerCase()}`].payment} text={errors.month?.[`month_${item.month_name.toLowerCase()}`].payment} />
          </div>
        ))
      }
    </>
  )

}



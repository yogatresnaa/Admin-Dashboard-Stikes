import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import FormComponent from '../../../../../../component/Form/FormComponent'
import Loader from '../../../../../../component/Loader/Loader'
import { monthArray, payType } from '../../../../../../utils/CONSTANT'
import { payMode } from '../../../../../../utils/CONSTANT'
import CustomSelect from '../../../../../../component/Select/CustomSelect'
import ErrorComponent from '../../../../../../component/Form/ErrorComponent'
import HorizontalFormComponent from '../../../../../../component/Form/HorizontalFormComponent'
export default function FormEditBulananKelas({
    values,
    errors,
    handleChange,
    type,
    dataKelas,
    dataSiswa,
    monthSelectHandler,
    setFieldValue,
    onChangeClassAndFetchHandler,
}) {
    return (
        <>
            <FormGroup>
                <HorizontalFormComponent
                    id="payment_old"
                    name="payment_old"
                    text="Tarif Lama"
                    type="text"
                    placeholder={'Masukkan Nominal'}
                    error={errors}
                    handler={handleChange('payment_old')}
                    value={values?.payment_old}
                />
            </FormGroup>
            <FormGroup>
                <HorizontalFormComponent
                    id="payment_new"
                    name="payment_new"
                    text="Tarif Baru"
                    type="text"
                    placeholder={'Masukkan Nominal'}
                    error={errors}
                    handler={handleChange('payment_new')}
                    value={values?.payment_new}
                />
            </FormGroup>
            <FormGroup>
                <div className="d-flex gap-5 ">
                    <p className="label-form text-start align-align-self-baseline">
                        Untuk Bulan
                    </p>
                    <div className="d-flex flex-column flex-auto">
                        {monthArray.map((item) => (
                            <FormGroup check key={item.month_id}>
                                <Input
                                    value={item.month_name}
                                    type="checkbox"
                                    onChange={(e) => {
                                        if (e.target.checked)
                                            setFieldValue(
                                                `month.month_change.month_${e.target.value.toLowerCase()}`,
                                                item.month_id
                                            )
                                        else
                                            delete values.month[
                                                `month_${e.target.value}`
                                            ]
                                    }}
                                />
                                <Label style={{ fontSize: '0.8rem' }} check>
                                    {item.month_name}
                                </Label>
                            </FormGroup>
                        ))}
                    </div>
                </div>
                <ErrorComponent text={errors.month} error={errors.month} />
            </FormGroup>
            <ol style={{ fontSize: '0.7rem' }}>
                <li>
                    Tarif yang diubah adalah tarif dengan tarif lama sesuai
                    inputan dan bulan yang dipilih
                </li>
                <li>Tarif yang sudah dibayar tidak akan berubah</li>
            </ol>
        </>
    )
}

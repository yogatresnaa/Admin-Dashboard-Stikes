import React from 'react'
import { Button, Form, FormGroup } from 'reactstrap'
import FormComponent from '../../../../component/Form/FormComponent'
import Loader from '../../../../component/Loader/Loader'
import { payType } from '../../../../utils/CONSTANT'
import { payMode } from '../../../../utils/CONSTANT'
import CustomSelect from '../../../../component/Select/CustomSelect'
import ErrorComponent from '../../../../component/Form/ErrorComponent'
export default function FormInput({
    handleSubmit,
    values,
    errors,
    handleChange,
    btnName,
    dataAccountCost,
    dataTahunAjaran,
    isEdit,
    dataPosPay,
    isLoadingSendData,
}) {
    console.log(values)
    return (
        <Form
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSubmit()
                }
            }}
        >
            <FormGroup>
                <CustomSelect
                    data={dataPosPay}
                    labelName="POS"
                    optionNameOptional={'unit_name'}
                    symbol="-"
                    optionName="pos_pay_name"
                    optionValue={'pos_pay_id'}
                    onChange={handleChange('pos_pos_id')}
                    value={values.pos_pos_id == null ? '' : values.pos_pos_id}
                    name="pos_pos_id"
                />
                <ErrorComponent
                    text={errors.pos_pos_id}
                    error={errors.pos_pos_id}
                />
            </FormGroup>
            <FormGroup>
                <CustomSelect
                    data={dataTahunAjaran}
                    labelName="Tahun Ajaran"
                    isForm={true}
                    optionName="period_start"
                    optionValue={'period_id'}
                    symbol="/"
                    optionNameOptional="period_end"
                    onChange={handleChange('period_period_id')}
                    value={values.period_period_id}
                    name="period_period_id"
                />
                <ErrorComponent
                    text={errors.period_period_id}
                    error={errors.period_period_id}
                />
            </FormGroup>
            <FormGroup>
                <CustomSelect
                    data={payType}
                    labelName="Tipe Bayar"
                    optionName="name"
                    optionValue={'id'}
                    onChange={handleChange('payment_type')}
                    value={values.payment_type}
                    name="payment_type"
                />
                <ErrorComponent
                    text={errors.payment_type}
                    error={errors.payment_type}
                />
            </FormGroup>

            {isEdit && (
                <FormGroup>
                    <CustomSelect
                        data={payMode}
                        labelName="Model Bayar"
                        optionName="name"
                        optionValue={'id'}
                        onChange={handleChange('payment_mode')}
                        value={values.payment_mode}
                        name="payment_mode"
                    />
                    <ErrorComponent
                        text={errors.payment_mode}
                        error={errors.payment_mode}
                    />
                </FormGroup>
            )}

            {isLoadingSendData ? (
                <Loader />
            ) : (
                <Button
                    color="primary"
                    className="button-login"
                    onClick={handleSubmit}
                >
                    {btnName}
                </Button>
            )}
        </Form>
    )
}

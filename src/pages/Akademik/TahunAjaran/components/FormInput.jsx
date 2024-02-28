import React from 'react'
import { Button, Form, Input, Label } from 'reactstrap'
import FormComponent from '../../../../component/Form/FormComponent'
import DatePicker from 'react-datepicker'
import { FormGroup } from 'reactstrap'
import ErrorComponent from '../../../../component/Form/ErrorComponent'
import Loader from '../../../../component/Loader/Loader'

export default function FormInput({
    handleSubmit,
    values,
    errors,
    handleChange,
    btnName,
    setFieldValue,
    isLoadingSendData,
}) {
    console.log(values.period_status)
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
                <Label for="period_start" className="d-block">
                    Periode Mulai
                </Label>
                <div className="d-flex w-100%">
                    <DatePicker
                        wrapperClassName="flex-grow-1"
                        selected={
                            (values.period_start &&
                                new Date(values.period_start.toString())) ||
                            null
                        }
                        onChange={(value) =>
                            setFieldValue(
                                'period_start',
                                new Date(value).getFullYear()
                            )
                        }
                        className="form-control form-control-solid w-500px"
                        showYearPicker
                        dateFormat="yyyy"
                    />
                </div>
                <ErrorComponent
                    text={errors.period_start}
                    error={errors.period_start}
                />
            </FormGroup>

            <FormGroup>
                <Label for="period_end" className="d-block">
                    Periode Akhir
                </Label>
                <div className="d-flex w-100%">
                    <DatePicker
                        wrapperClassName="flex-grow-1"
                        selected={
                            (values.period_end &&
                                new Date(values.period_end.toString())) ||
                            null
                        }
                        onChange={(value) =>
                            setFieldValue(
                                'period_end',
                                new Date(value).getFullYear()
                            )
                        }
                        className="form-control form-control-solid w-500px"
                        showYearPicker
                        dateFormat="yyyy"
                    />
                </div>
                <ErrorComponent
                    text={errors.period_end}
                    error={errors.period_end}
                />
            </FormGroup>

            <FormGroup>
                <Label for="period_status">Periode Akhir</Label>
                <Input
                    type="select"
                    value={values.period_status}
                    onChange={handleChange('period_status')}
                >
                    <option value="0">Tidak Aktif</option>
                    <option value="1">Aktif</option>
                </Input>

                <ErrorComponent
                    text={errors.period_status}
                    error={errors.period_status}
                />
            </FormGroup>

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

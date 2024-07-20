import React from 'react'
import { Button, Input } from 'reactstrap'
import FormComponent from '../../../component/Form/FormComponent'
import SelectUnit from '../../../component/ActionButton/SelectUnit'
import SelectDate from '../../../component/ActionButton/SelectDate'
import SelectAkunKas from '../../../component/ActionButton/SelectAkunKas'
import { Formik } from 'formik'
import ErrorComponent from '../../../component/Form/ErrorComponent'
const initialValues = {}
export default function FormFilter({
    dataUnit,
    dataAkunKas,
    total,
    onSubmit,
    value,
    no_ref,
    error,
    onQueryFilterChange,
    setFieldValue,
    handleChange,
    queryFilter,
    type,
    isEdit = false,
}) {
    console.log(value)
    return (
        <div className=" table-content d-flex flex-row gap-5">
            <div className="flex-1 d-flex flex-column">
                <SelectUnit
                    data={dataUnit}
                    disabled={isEdit}
                    value={queryFilter.unit_id}
                    onFilterChange={onQueryFilterChange}
                />
                <FormComponent
                    name={`${type}_no_ref`}
                    id={`${type}_no_ref`}
                    value={queryFilter.unit_id ? no_ref : ''}
                    error={error}
                    disabled
                    text={'No Ref'}
                />
                <FormComponent
                    name={`${type}_information`}
                    error={error}
                    value={value[`${type}_information`]}
                    text={'Keterangan'}
                    id={`${type}information`}
                    handler={handleChange(`${type}_information`)}
                />
            </div>
            <div className="flex-1 d-flex flex-column">
                <div>
                    <SelectDate
                        disabled={isEdit}
                        date={value[`${type}_date`]}
                        onDateChange={(e) => {
                            setFieldValue(`${type}_date`, e)
                        }}
                    />
                    {error[`${type}_date`] && (
                        <ErrorComponent
                            text={error[`${type}_date`]}
                            error={error[`${type}_date`]}
                        />
                    )}
                </div>
                <div>
                    <SelectAkunKas
                        data={dataAkunKas}
                        value={value.account_cash_account}
                        onChangeHandler={handleChange('account_cash_account')}
                    />
                    {error.account_cash_account && (
                        <ErrorComponent
                            text={error.account_cash_account}
                            error={error.account_cash_account}
                        />
                    )}
                </div>
                <FormComponent
                    name={'total'}
                    value={total ?? 0}
                    error={{}}
                    text={'Total'}
                    disabled
                />
            </div>
        </div>
    )
}

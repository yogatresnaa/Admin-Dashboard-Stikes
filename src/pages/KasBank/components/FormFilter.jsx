import React from 'react'
import { Button, Input } from 'reactstrap'
import FormComponent from '../../../component/Form/FormComponent'
import SelectUnit from '../../../component/ActionButton/SelectUnit'
import SelectDate from '../../../component/ActionButton/SelectDate'
import SelectAkunKas from '../../../component/ActionButton/SelectAkunKas'
import { Formik } from 'formik'
const initialValues = {}
export default function FormFilter({
    dataUnit,
    dataAkunKas,
    onSubmit,
    value,
    error,
    onQueryFilterChange,
    setFieldValue,
    handleChange,
    queryFilter,
}) {
    console.log(dataAkunKas)
    return (
        <div className=" table-content d-flex flex-row gap-5">
            <div className="flex-1 d-flex flex-column">
                <SelectUnit
                    data={dataUnit}
                    value={queryFilter.unit_id}
                    onFilterChange={onQueryFilterChange}
                />
                <FormComponent
                    name={'kredit_no_ref'}
                    id={'kredit_no_ref'}
                    value={value.kredit_no_ref}
                    error={error}
                    disabled
                    text={'No Ref'}
                    handler={handleChange('kredit_no_ref')}
                />
                <FormComponent
                    name={'kredit_information'}
                    error={error}
                    text={'Keterangan'}
                    id={'kredit_information'}
                    handler={handleChange('kredit_information')}
                />
            </div>
            <div className="flex-1 d-flex flex-column">
                <SelectDate
                    date={value.kredit_date}
                    onDateChange={(e) => setFieldValue('kredit_date', e)}
                />
                <SelectAkunKas
                    data={dataAkunKas}
                    value={value.account_cash_account}
                    onChangeHandler={handleChange('account_cash_account')}
                />
                <FormComponent
                    name={'no_ref'}
                    error={{}}
                    text={'Total'}
                    disabled
                />
            </div>
        </div>
    )
}

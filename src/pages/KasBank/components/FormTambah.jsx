import React from 'react'
import { Button, Input } from 'reactstrap'
import FormComponent from '../../../component/Form/FormComponent'
import SelectUnit from '../../../component/ActionButton/SelectUnit'
import SelectDate from '../../../component/ActionButton/SelectDate'
import CustomSelection from '../../../component/ActionButton/CustomSelection'
export default function FormTambah({
    dataAkunBiaya,
    onSubmit,
    value,
    error,
    setFieldValue,
    handleChange,
}) {
    return (
        <div className="table-content d-flex flex-row gap-5">
            <div className="flex-1 d-flex flex-row  align-items-baseline gap-1 justify-content-between">
                <CustomSelection
                    defaultName={'belum dipilih'}
                    data={dataAkunBiaya}
                    title={'Kode Akun'}
                    label1={'account_code'}
                    labelValue={'account_code'}
                    label2={'account_description'}
                    value={value.account_cost_account}
                    onChangeHandler={handleChange('account_cost_account')}
                />
                <FormComponent
                    name={'kredit_desc'}
                    id={'kredit_desc'}
                    error={error}
                    value={value.kredit_desc}
                    text={'Uraian'}
                    handler={handleChange('kredit_desc')}
                />
                <FormComponent
                    name={'kredit_value'}
                    id={'kredit_value'}
                    error={error}
                    value={value.kredit_value}
                    text={'Nominal'}
                    handler={handleChange('kredit_value')}
                />
                <FormComponent
                    name={'kredit_tax'}
                    error={error}
                    value={value.kredit_tax}
                    text={'Pajak (%)'}
                    handler={handleChange('kredit_tax')}
                />
                {/* <CustomSelection
                    defaultName={'belum dipilih'}
                    data={dataUnit}
                    title={'Unit POS'}
                /> */}
                <Button
                    size="sm"
                    style={{ height: '40px', alignSelf: 'center' }}
                >
                    Submit
                </Button>
            </div>
        </div>
    )
}

import React from 'react'
import { Button, Input } from 'reactstrap'
import FormComponent from '../../../component/Form/FormComponent'
import SelectUnit from '../../../component/ActionButton/SelectUnit'
import SelectDate from '../../../component/ActionButton/SelectDate'
import CustomSelection from '../../../component/ActionButton/CustomSelection'
import ErrorComponent from '../../../component/Form/ErrorComponent'
export default function FormTambah({
    dataAkunBiaya,
    onSubmit,
    value,
    error,
    setFieldValue,
    handleChange,
    type,
}) {
    return (
        <div className="table-content d-flex flex-row gap-5">
            <div className="flex-1 d-flex flex-row  align-items-baseline gap-1 justify-content-between">
                <div>
                    <CustomSelection
                        defaultName={'belum dipilih'}
                        data={dataAkunBiaya}
                        title={'Kode Akun'}
                        label1={'account_code'}
                        labelValue={'account_id'}
                        label2={'account_description'}
                        value={value.account_cost_account}
                        onChangeHandler={handleChange('account_cost_account')}
                    />
                    {error.account_cost_account && (
                        <ErrorComponent
                            text={error.account_cost_account}
                            error={error.account_cost_account}
                        />
                    )}
                </div>
                <FormComponent
                    name={`${type}_desc`}
                    id={`${type}_desc`}
                    error={error}
                    value={value[`${type}_desc`]}
                    text={'Uraian'}
                    handler={handleChange(`${type}_desc`)}
                />
                <FormComponent
                    name={`${type}_value`}
                    id={`${type}_value`}
                    error={error}
                    value={value[`${type}_value`]}
                    text={'Nominal'}
                    handler={handleChange(`${type}_value`)}
                />
                <FormComponent
                    name={`${type}_tax`}
                    error={error}
                    value={value[`${type}_tax`]}
                    text={'Pajak (%)'}
                    disabled
                    handler={handleChange(`${type}_tax`)}
                />
                {/* <CustomSelection
                    defaultName={'belum dipilih'}
                    data={dataUnit}
                    title={'Unit POS'}
                /> */}
                <Button
                    size="sm"
                    onClick={onSubmit}
                    style={{ height: '40px', alignSelf: 'center' }}
                >
                    Tambah
                </Button>
            </div>
        </div>
    )
}

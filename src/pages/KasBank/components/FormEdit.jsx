import React from 'react'
import { Button, Input } from 'reactstrap'
import FormComponent from '../../../component/Form/FormComponent'
import SelectUnit from '../../../component/ActionButton/SelectUnit'
import SelectDate from '../../../component/ActionButton/SelectDate'
import CustomSelection from '../../../component/ActionButton/CustomSelection'
export default function FormEdit({ dataUnit }) {
    return (
        <div className="table-content d-flex flex-column gap-1">
            <FormComponent name={'keterangan'} error={{}} text={'Akun Kas'} />
            <FormComponent name={'no_ref'} error={{}} text={'No Ref'} />
            <SelectDate />
            <SelectUnit data={dataUnit} />

            <FormComponent name={'keterangan'} error={{}} text={'Keterangan'} />
            <CustomSelection
                defaultName={'belum dipilih'}
                data={dataUnit}
                title={'Kode Akun'}
            />
            <FormComponent name={'keterangan'} error={{}} text={'Nominal'} />
            <FormComponent name={'keterangan'} error={{}} text={'Pajak'} />
            <CustomSelection
                defaultName={'belum dipilih'}
                data={dataUnit}
                title={'Unit POS'}
            />
            <Button
                size="sm"
                style={{
                    height: '40px',
                    width: '100%',
                    marginTop: '1rem',
                    alignSelf: 'center',
                }}
            >
                Simpan
            </Button>
        </div>
    )
}

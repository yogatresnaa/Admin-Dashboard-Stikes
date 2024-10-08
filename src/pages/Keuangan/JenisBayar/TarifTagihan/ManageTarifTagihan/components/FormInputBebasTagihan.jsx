import React from 'react'
import { Button, Form, FormGroup } from 'reactstrap'
import FormComponent from '../../../../../../component/Form/FormComponent'
import Loader from '../../../../../../component/Loader/Loader'
import { payType } from '../../../../../../utils/CONSTANT'
import { payMode } from '../../../../../../utils/CONSTANT'
import CustomSelect from '../../../../../../component/Select/CustomSelect'
import ErrorComponent from '../../../../../../component/Form/ErrorComponent'
import HorizontalFormComponent from '../../../../../../component/Form/HorizontalFormComponent'
export default function FormInputBebasTagihan({
    values,
    errors,
    handleChange,
    type,
    dataKelas,
    dataSiswa,
    setFieldValue,
    onChangeClassAndFetchHandler,
}) {
    return (
        <>
            <FormGroup>
                <CustomSelect
                    data={dataKelas}
                    isVertical={false}
                    includeAll={false}
                    withLabel
                    name={'class_id'}
                    value={values.class_class_id}
                    onChange={
                        type.includes('siswa')
                            ? (e) => {
                                  onChangeClassAndFetchHandler(
                                      setFieldValue,
                                      e.target.value
                                  )
                              }
                            : handleChange('class_class_id')
                    }
                    labelName={'Kelas'}
                    optionName={'class_name'}
                    optionValue={'class_id'}
                />
                <ErrorComponent
                    text={errors.class_class_id}
                    error={errors.class_class_id}
                />
            </FormGroup>

            {type.includes('siswa') && (
                <FormGroup>
                    <CustomSelect
                        data={dataSiswa}
                        isVertical={false}
                        includeAll={false}
                        withLabel
                        name={'student_student_id'}
                        value={values.student_student_id}
                        onChange={handleChange('student_student_id')}
                        labelName={'Siswa'}
                        optionName={'student_full_name'}
                        optionValue={'student_id'}
                    />
                    <ErrorComponent
                        text={errors.student_student_id}
                        error={errors.student_student_id}
                    />
                </FormGroup>
            )}
            <HorizontalFormComponent
                id="payment"
                name="payment"
                text="Tarif"
                type="text"
                placeholder={'Masukkan Nominal'}
                error={errors}
                handler={handleChange('payment')}
                value={values.payment}
            />
        </>
    )
}

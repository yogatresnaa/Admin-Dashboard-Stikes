import React from 'react'
import { Button, Form, FormGroup } from 'reactstrap'
import FormComponent from '../../../../../../component/Form/FormComponent'
import Loader from '../../../../../../component/Loader/Loader'
import { payType } from '../../../../../../utils/CONSTANT'
import { payMode } from '../../../../../../utils/CONSTANT'
import CustomSelect from '../../../../../../component/Select/CustomSelect'
import ErrorComponent from '../../../../../../component/Form/ErrorComponent'
import HorizontalFormComponent from '../../../../../../component/Form/HorizontalFormComponent'
export default function FormEditBebasTagihan({
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
            {type?.includes('edit-kelas') ? (
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
                    <FormGroup>
                        <HorizontalFormComponent
                            id="payment_old"
                            name="payment_old"
                            text="Tarif lama"
                            type="text"
                            placeholder={'Masukkan Nominal'}
                            error={errors}
                            handler={handleChange('payment_old')}
                            value={values.payment_old}
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
                            value={values.payment_new}
                        />
                    </FormGroup>
                </>
            ) : (
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
                    <FormGroup>
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
                    </FormGroup>
                </>
            )}
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

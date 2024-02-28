import React from 'react'
import { Button, Form, FormGroup, Label } from 'reactstrap'
import FormComponent from '../../../../component/Form/FormComponent'
import Loader from '../../../../component/Loader/Loader'
import SelectProdi from '../../../../component/ActionButton/SelectProdi'
import SelectUnitKelas from '../../../../component/ActionButton/SelectUnitKelas'
import ErrorComponent from '../../../../component/Form/ErrorComponent'
import SelectStatusSiswa from '../../../../component/ActionButton/SelectStatusSiswa'
import { statusSiswa } from '../../../../utils/CONSTANT'
import SelectUnit from '../../../../component/ActionButton/SelectUnit'

export default function FormInputSekolah({
    handleSubmit,
    values,
    errors,
    handleChange,
    btnName,
    dataProdi,
    dataKelas,
    dataUnit,
    isLoadingSendData,
}) {
    return (
        <Form
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSubmit()
                }
            }}
        >
            <FormComponent
                id="student_nis"
                name="student_nis"
                text="NIS"
                placeholder="Masukkan NIS Siswa"
                type="text"
                error={errors}
                handler={handleChange('student_nis')}
                value={values.student_nis}
            />
            <FormComponent
                id="student_nisn"
                name="student_nisn"
                text="NISN"
                placeholder="Masukkan NISN Siswa"
                type="text"
                error={errors}
                handler={handleChange('student_nisn')}
                value={values.student_nisn}
            />
            <FormGroup>
                <SelectProdi
                    data={dataProdi}
                    onProdiFilterChange={handleChange('majors_majors_id')}
                    value={values.majors_majors_id}
                    name="majors_majors_id"
                    firstValue="Belum Dipilih"
                />
                <ErrorComponent
                    text={errors.majors_majors_id}
                    error={errors.majors_majors_id}
                />
            </FormGroup>

            <FormGroup>
                <SelectUnitKelas
                    data={dataKelas}
                    onProdiFilterChange={handleChange('class_class_id')}
                    value={values.class_class_id}
                    name="class_class_id"
                    firstValue="Belum Dipilih"
                />
                <ErrorComponent
                    text={errors.class_class_id}
                    error={errors.class_class_id}
                />
            </FormGroup>
            <FormGroup>
                <SelectUnit
                    data={dataUnit}
                    onFilterChange={handleChange('unit_unit_id')}
                    value={values.unit_unit_id}
                    name="unit_unit_id"
                    firstValue="Belum Dipilih"
                />
                <ErrorComponent
                    text={errors.unit_unit_id}
                    error={errors.unit_unit_id}
                />
            </FormGroup>
            <FormGroup>
                <SelectStatusSiswa
                    data={statusSiswa}
                    onProdiFilterChange={handleChange('student_status')}
                    value={values.student_status}
                    name="student_status"
                    firstValue="Belum Dipilih"
                />
                <ErrorComponent
                    text={errors.student_status}
                    error={errors.student_status}
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

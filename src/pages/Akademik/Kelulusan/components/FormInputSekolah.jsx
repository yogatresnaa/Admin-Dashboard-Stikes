import React from 'react'
import { Button, Form, FormGroup, Label } from 'reactstrap'
import FormComponent from '../../../../component/Form/FormComponent'
import Loader from '../../../../component/Loader/Loader'
import SelectProdi from '../../../../component/ActionButton/SelectProdi'
import SelectUnitKelas from '../../../../component/ActionButton/SelectUnitKelas'
import ErrorComponent from '../../../../component/Form/ErrorComponent'

export default function FormInputSekolah({
    handleSubmit,
    values,
    errors,
    handleChange,
    btnName,
    dataProdi,
    dataKelas,
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
                <Label for="majors_majors_id">Program Studi</Label>

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
                <Label for="class_class_id">Kelas</Label>

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

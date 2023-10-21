import * as Yup from 'yup';


export const kelasSchema=Yup.object().shape({
    class_name:Yup.string().required("Kelas Harus Diisi"),
})
export const tahunAjaranSchema=Yup.object().shape({
    period_start:Yup.string().required("Periode mulai Harus Diisi"),
    period_end:Yup.string().required("Periode Akhir Harus Diisi"),
   
})
export const prodiSchema=Yup.object().shape({
    majors_name:Yup.string().required("Nama Prodi Harus Diisi"),
    majors_short_name:Yup.string().required("Field Harus Diisi"),
   
})
export const siswaSchema=Yup.object().shape({
    student_full_name:Yup.string().required("Nama Siswa Harus Diisi"),
    student_nis:Yup.string().required("NIS Siswa Harus Diisi"),
    student_nisn:Yup.string().required("NISN Siswa Harus Diisi"),
    majors_majors_id:Yup.string().required("Prodi Harus Diisi"),
    student_born_date:Yup.string().required("Tanggal Lahir Harus Diisi"),
    student_born_place:Yup.string().required("Tempat Lahir Harus Diisi"),
    class_class_id:Yup.string().required("Kelas Harus Diisi"),
    // majors_short_name:Yup.string().required("Field Harus Diisi"),
   
})
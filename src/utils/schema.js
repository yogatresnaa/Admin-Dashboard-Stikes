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
    majors_name:Yup.string().required("Nama Prodi Harus Diisi"),
    majors_short_name:Yup.string().required("Field Harus Diisi"),
   
})
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
    student_parent_phone:Yup.string().required("Nomor Telp Orang Tua Diisi"),
    // majors_short_name:Yup.string().required("Field Harus Diisi"),
   
})
export const accountCostSchema=(isCategory)=>isCategory?Yup.object().shape({
    account_code:Yup.string().required("Kode  Harus Diisi"),
    account_description:Yup.string().required("Description Harus Diisi"),
    account_category:Yup.string().required("Kategori Harus Diisi"),
   
    // majors_short_name:Yup.string().required("Field Harus Diisi"),
   
}):Yup.object().shape({
    account_code:Yup.string().required("Kode  Harus Diisi"),
    account_description:Yup.string().required("Description Harus Diisi"),
   
    // majors_short_name:Yup.string().required("Field Harus Diisi"),
   
})

export const posPaySchema=Yup.object().shape({
    account_account_code:Yup.string().required("Kode Akun Harus Dipilih"),
    account_account_credit:Yup.string().required("Akun Piutang Harus Diisi"),
    pos_pay_name:Yup.string().required("Nama POS Harus Diisi"),
    pos_pay_description:Yup.string().required("Keterangan POS Harus Diisi"),
  

    // majors_short_name:Yup.string().required("Field Harus Diisi"),
   
})
export const paymentTypeSchema=Yup.object().shape({
  payment_type:Yup.string().required("Jenis Bayar Harus Dipilih"),
  period_period_id :Yup.string().required("Tahun Ajaran Harus Diisi"),
  pos_pos_id :Yup.string().required("POS Harus Diisi"),   
})
// export const siswaSchema=Yup.object().shape({
 
//     code:Yup.string().required("Kode Harus Diisi"),
//     // account_type:Yup.string().required("Tipe Akun Harus Diisi"),
//     account_description:Yup.string().required("Deskripsi Harus Diisi"),
//     account_note:Yup.string().required("Prodi Harus Diisi"),
//     account_category:Yup.string().required("Tanggal Lahir Harus Diisi"),
//     // account_majors_id:Yup.string().required("Tempat Lahir Harus Diisi"),
//     sekolah_id:Yup.string().required("Kelas Harus Diisi"),
//     // majors_short_name:Yup.string().required("Field Harus Diisi"),
   
// })
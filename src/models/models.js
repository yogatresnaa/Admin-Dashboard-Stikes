export const kelasModel = {
  objectToJSON: (body) => ({
    class_name: body.class_name,
  }),

};
export const tahunAjaranModel = {
  objectToJSON: (body) => ({
    period_start: body.period_start,
    period_end: body.period_end,
    period_status: parseInt(body.period_status,10),
  }),

};
export const prodiModel = {
  objectToJSON: (body) => ({
    majors_name: body.majors_name,
    majors_short_name: body.majors_short_name,
  }),

};
export const siswaModel = {
  objectToJSON: (body) => ({
    student_full_name:body.student_full_name,
    student_born_place:body.student_born_place,
    student_born_date:body.student_born_date||'0000-00-00',
    student_hobby:body.student_hobby,
    student_phone:body.student_phone,
    student_address:body.student_address,
    student_nis:body.student_nis,
    student_nisn:body.student_nisn,
    majors_majors_id:body.majors_majors_id,
    class_class_id:body.class_class_id,
  }),

};
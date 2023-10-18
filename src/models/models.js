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
    majors_name: body.majors_name,
    majors_short_name: body.majors_short_name,
  }),

};

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

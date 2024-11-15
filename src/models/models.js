export const kelasModel = {
    objectToJSON: (body) => ({
        class_name: body.class_name,
        unit_unit_id: body.unit_unit_id,
    }),
}
export const tahunAjaranModel = {
    objectToJSON: (body) => ({
        period_start: body.period_start,
        period_end: body.period_end,
        period_status: parseInt(body.period_status, 10),
    }),
}
export const prodiModel = {
    objectToJSON: (body) => ({
        majors_name: body.majors_name,
        majors_short_name: body.majors_short_name,
        unit_unit_id: body.unit_unit_id,
    }),
}
export const accountCostModel = {
    objectToJSON: (body) => ({
        account_code: body.account_code,
        account_type: body.account_type,
        account_description: body.account_description,
        account_note: body.account_note,
        account_category: body.account_category,
        account_majors_id: body.account_majors_id,
        unit_unit_id: body.unit_unit_id,
    }),
}
export const siswaModel = {
    objectToJSON: (body) => ({
        student_full_name: body.student_full_name,
        student_born_place: body.student_born_place,
        student_born_date: body.student_born_date || '0000-00-00',
        student_hobby: body.student_hobby,
        student_parent_phone: body.student_parent_phone,
        student_phone: body.student_phone,
        student_address: body.student_address,
        student_nis: body.student_nis,
        student_status: body.student_status,
        student_gender: body.student_gender,
        student_nisn: body.student_nisn,
        unit_unit_id: body.unit_unit_id,
        majors_majors_id: body.majors_majors_id,
        class_class_id: body.class_class_id,
    }),
}

export const posPayModel = {
    objectToJSON: (body) => ({
        // account_account_code: body.account_account_code,
        account_account_id: body.account_account_id,
        account_account_credit: body.account_account_credit,
        pos_pay_name: body.pos_pay_name,
        pos_pay_description: body.pos_pay_description,
    }),
}

export const paymentTypeModel = {
    objectToJSON: (body) => ({
        payment_type: body.payment_type,
        payment_mode: body.payment_mode,
        period_period_id: body.period_period_id,
        pos_pos_id: body.pos_pos_id,
        unit_unit_id: body.unit_unit_id,
    }),
}
export const monthlyPaymentRateModel = {
    objectToJSON: (body) => ({
        payment_payment_id: body.payment_id,
        payment_rate_id: body.payment_rate_id,
        student_student_id: body.student_student_id,
        class_class_id: body.class_class_id,
        month: body.month,
        unit_unit_id: body.unit_unit_id,
    }),
}
export const freePaymentRateModel = {
    objectToJSON: (body) => ({
        payment_payment_id: body.payment_id,
        payment: body.payment,
        student_student_id: body.student_student_id,
        class_class_id: body.class_class_id,
        unit_unit_id: body.unit_unit_id,
    }),
}
export const putFreePaymentRateModel = {
    objectToJSON: (body) => ({
        payment_rate_id: body.payment_rate_id,
        payment: body.payment,
    }),
}
export const putFreePaymentRateByClassModel = {
    objectToJSON: (body) => ({
        payment_payment_id: body.payment_id,
        class_class_id: body.class_class_id,
        payment_old: body.payment_old,
        payment_new: body.payment_new,
    }),
}
export const putMonthlyPaymentRateModel = {
    objectToJSON: (body) => ({
        payment_rate_id: body.payment_rate_id,
        month: JSON.stringify(body.month),
        payment_new: body.payment_new,
        payment_old: body.payment_old,
        payment_payment_id: body.payment_id,
    }),
}

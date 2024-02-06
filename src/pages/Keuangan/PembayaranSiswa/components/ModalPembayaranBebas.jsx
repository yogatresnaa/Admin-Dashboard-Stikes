import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import FormComponent from '../../../../component/Form/FormComponent'
import { Formik } from 'formik'
import { freePaymentInitialValues } from '../../../../utils/initialValues'
import { freePaymentSchema } from '../../../../utils/schema'
import * as Yup from 'yup'

export default function ModalPembayaranBebas({
    data,
    isOpenModal,
    toggleModal,
    onSubmitHandler,
}) {
    console.log(data)
    return (
        <Formik
            enableReinitialize
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{ ...data, ...freePaymentInitialValues }}
            onSubmit={onSubmitHandler}
            validationSchema={freePaymentSchema}
        >
            {({
                handleChange,
                handleSubmit,
                setFieldValue,
                handleReset,
                values,
                errors,
            }) => (
                <Modal
                    isOpen={isOpenModal}
                    toggle={() => {
                        toggleModal()
                        handleReset()
                    }}
                    onClosed={() => handleReset()}
                >
                    <ModalHeader toggle={toggleModal}>
                        Pembayaran/Cicilan
                    </ModalHeader>
                    <ModalBody>
                        <FormComponent
                            id="pay_name"
                            name="pos_pay_name"
                            placeholder="Masukkan Tanggal"
                            disabled
                            text="Nama Pembayaran"
                            type="text"
                            error={errors}
                            value={`${data.pos_pay_name} - T.A ${data.period_start}/${data.period_end}`}
                        />

                        <FormComponent
                            id="payment_rate_date_pay"
                            name="payment_rate_date_pay"
                            placeholder="Masukkan Tanggal"
                            text="Tanggal Bayar"
                            type="date"
                            error={errors}
                            handler={handleChange('payment_rate_date_pay')}
                            value={
                                values.payment_rate_date_pay ??
                                new Date().toISOString().split('T')[0]
                            }
                        />
                        <FormComponent
                            id="payment_rate_bebas_pay_bill"
                            name="payment_rate_bebas_pay_bill"
                            text="Jumlah Bayar"
                            placeholder="Masukkan Jumlah Bayar"
                            type="text"
                            error={errors}
                            handler={handleChange(
                                'payment_rate_bebas_pay_bill'
                            )}
                            value={values.payment_rate_bebas_pay_bill}
                        />
                        <FormComponent
                            id="payment_rate_bebas_pay_desc"
                            name="payment_rate_bebas_pay_desc"
                            text="Deskripsi"
                            placeholder="Masukkan Deskripsi"
                            type="textarea"
                            error={errors}
                            handler={handleChange(
                                'payment_rate_bebas_pay_desc'
                            )}
                            value={values.payment_rate_bebas_pay_desc}
                        />

                        <Button
                            color={'primary'}
                            className="d-flex w-100 justify-content-center button-login"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </ModalBody>
                </Modal>
            )}
        </Formik>
    )
}

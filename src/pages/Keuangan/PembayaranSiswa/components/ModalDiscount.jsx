import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import FormComponent from '../../../../component/Form/FormComponent'
import { Formik } from 'formik'

export default function ModalDiscount({
    data,
    isOpenModal,
    toggleModal,
    onSubmit,
}) {
    console.log(data)
    return (
        <Formik
            enableReinitialize
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={data ?? {}}
            onSubmit={onSubmit}
            // validationSchemma={schema}
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
                    <ModalHeader toggle={toggleModal}>Diskon</ModalHeader>
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
                            id="payment_rate_discount"
                            name="payment_rate_discount"
                            placeholder="Diskon (Rp.)"
                            text="Diskon"
                            type="text"
                            error={errors}
                            handler={handleChange('payment_rate_discount')}
                            value={values.payment_rate_discount}
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

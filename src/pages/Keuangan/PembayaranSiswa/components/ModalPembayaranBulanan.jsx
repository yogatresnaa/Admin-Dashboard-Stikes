import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import TableSiswa from './TabelSiswa'
import SelectTahunAjaran from '../../../../component/ActionButton/SelectTahunAjaran'
import SelectUnitKelas from '../../../../component/ActionButton/SelectUnitKelas'
import { Formik } from 'formik'
import FormComponent from '../../../../component/Form/FormComponent'

export default function ModalPembayaranBulanan({
    isOpenModal,
    toggleModal,
    data,
    headerName,
    onSubmit,
    initialValues,

    schema,
}) {
    console.log(onSubmit())
    return (
        <Formik
            enableReinitialize
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={data ?? initialValues}
            onSubmit={
                data.payment_rate_status == 0
                    ? onSubmit('submit', data.detail_payment_rate_id)
                    : onSubmit('delete', data.detail_payment_rate_id)
            }
            validationSchema={schema}
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
                    <ModalHeader toggle={toggleModal}>{headerName}</ModalHeader>
                    <ModalBody>
                        <FormComponent
                            id="payment_rate_date_pay"
                            name="payment_rate_date_pay"
                            placeholder="Masukkan Tanggal"
                            disabled
                            text="Tanggal Bayar"
                            type="text"
                            error={errors}
                            handler={handleChange('payment_rate_date_pay')}
                            value={
                                values.payment_rate_date_pay ??
                                new Date().toLocaleDateString('id')
                            }
                        />
                        <FormComponent
                            id="tanggal_"
                            name="payment_rate_bill"
                            text="Jumlah Bayar"
                            placeholder="Masukkan Jumlah Bayar"
                            type="text"
                            disabled
                            error={errors}
                            handler={handleChange('payment_rate_bill')}
                            value={values.payment_rate_bill}
                        />
                        <Button
                            color={`${
                                data.payment_rate_status == 0
                                    ? 'primary'
                                    : 'danger'
                            }`}
                            className="d-flex w-100 justify-content-center text-white"
                            onClick={handleSubmit}
                        >
                            {data.payment_rate_status == 0 ? 'Submit' : 'Hapus'}
                        </Button>
                    </ModalBody>
                </Modal>
            )}
        </Formik>
    )
}
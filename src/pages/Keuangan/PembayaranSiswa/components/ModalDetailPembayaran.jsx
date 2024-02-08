import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import FormComponent from '../../../../component/Form/FormComponent'
import { Formik } from 'formik'
import { freePaymentInitialValues } from '../../../../utils/initialValues'
import { freePaymentSchema } from '../../../../utils/schema'
import * as Yup from 'yup'
import DetailPembayaranTable from './DetailPembayaranTable/DetailPembayaranTable'

export default function ModalDetailPembayaran({
    data,
    isOpenModal,
    toggleModal,
    onClickItemHandler,
    onClickDeleteDetail,
}) {
    return (
        <Modal
            isOpen={isOpenModal}
            toggle={() => {
                toggleModal()
            }}
            size="lg"
        >
            <ModalHeader toggle={toggleModal}>
                Lihat Pembayaran/Cicilan
            </ModalHeader>
            <ModalBody>
                <DetailPembayaranTable
                    data={data}
                    onClickDeleteDetail={onClickDeleteDetail}
                />
            </ModalBody>
        </Modal>
    )
}

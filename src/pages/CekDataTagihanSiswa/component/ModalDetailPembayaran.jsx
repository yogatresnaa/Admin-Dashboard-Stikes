import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import * as Yup from 'yup'
import DetailPembayaranTable from './DetailPembayaranTable/DetailPembayaranTable'

export default function ModalDetailPembayaran({
    data,
    isOpenModal,
    toggleModal,
    onClickDeleteDetail,
}) {
    return (
        <Modal
            isOpen={isOpenModal}
            toggle={() => {
                toggleModal()
            }}
            size="lg"
            style={{ maxWidth: '900px', width: '100%' }}
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

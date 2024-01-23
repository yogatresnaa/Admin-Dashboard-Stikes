import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import TableSiswa from './TabelSiswa'

export default function ModalSiswa({
    isOpenModal,
    toggleModal,
    dataSiswa,
    subHeaderComponent,
    onClickSiswaHandler,
    isLoadingSiswa,
}) {
    return (
        <Modal
            isOpen={isOpenModal}
            toggle={toggleModal}
            size="lg"
            style={{
                maxWidth: '70vw',
                width: '100%',
                height: '100%',
                maxHeight: '70vh',
            }}
        >
            <ModalHeader toggle={toggleModal}>Cari Data Siswa </ModalHeader>
            <ModalBody>
                <TableSiswa
                    data={dataSiswa}
                    subHeaderComponent={subHeaderComponent}
                    isLoading={isLoadingSiswa}
                    onClickSiswaHandler={onClickSiswaHandler}
                />
            </ModalBody>
        </Modal>
    )
}

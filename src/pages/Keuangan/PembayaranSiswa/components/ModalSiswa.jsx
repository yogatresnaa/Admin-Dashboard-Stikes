import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import TableSiswa from './TabelSiswa'
import SelectTahunAjaran from '../../../../component/ActionButton/SelectTahunAjaran'
import SelectUnitKelas from '../../../../component/ActionButton/SelectUnitKelas'

export default function ModalSiswa({
    isOpenModal,
    toggleModal,
    dataSiswa,
    dataKelas,
    subHeaderComponent,
    onClickSiswaHandler,
    valueKelas,
    dataUnit,
    valueUnit,
    onChangeKelas,
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
                {/* <SelectUnitKelas
                    style={{ maxWidth: '200px' }}
                    data={dataUnit}
                    value={valueUnit}
                    onProdiFilterChange={onChangeKelas}
                /> */}
                <SelectUnitKelas
                    style={{ maxWidth: '200px' }}
                    data={dataKelas}
                    value={valueKelas}
                    onProdiFilterChange={onChangeKelas}
                />
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

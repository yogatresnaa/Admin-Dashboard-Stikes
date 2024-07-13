/* eslint-disable no-unreachable */
import React from 'react'
import { Modal, ModalBody, ModalHeader, Table } from 'reactstrap'
import { rupiahConvert } from '../../../../../utils/helper'

export default function DetailModal({ isOpen, toggle, headerName, data }) {
    console.log(isOpen)
    return (
        <Modal
            size="lg"
            style={{
                maxWidth: '70vw',
                width: '100%',
            }}
            centered
            isOpen={isOpen}
            toggle={() => {
                toggle()
            }}
        >
            <div className="py-4 px-2">
                <ModalHeader toggle={toggle}>{headerName}</ModalHeader>
                <ModalBody>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Rincian Tagihan</th>
                                <th>Nominal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.detail?.map((item, index) => {
                                if (item.total > 0) {
                                    return (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>
                                                {item?.pos_pay_name} T.A{' '}
                                                {item?.period_start}/
                                                {item?.period_end}
                                            </td>
                                            <td>
                                                {rupiahConvert(item?.total)}
                                            </td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Total Tagihan:</td>
                                <td></td>
                                <td>
                                    {rupiahConvert(data?.total_tagihan ?? 0)}
                                </td>
                            </tr>
                        </tfoot>
                    </Table>
                </ModalBody>
            </div>
        </Modal>
    )
}

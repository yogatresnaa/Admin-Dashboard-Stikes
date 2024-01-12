import React from 'react'
import {
    AiFillEdit,
    AiOutlinePlusCircle,
    AiOutlineRollback,
} from 'react-icons/ai'
import { Link, createSearchParams } from 'react-router-dom'
import { Col, Row, Button } from 'reactstrap'

export default function ActionButton({ onBackHandler, data }) {
    return (
        <Row md={6} noGutters className="gap-1 align-items-center">
            <Col md={1}>
                <p className="section-title">Setting Tarif</p>
            </Col>

            <Col md={2}>
                <Link
                    style={{ textDecoration: 'none' }}
                    state={{ data: data }}
                    to={{
                        pathname: `/admin/tarif-tagihan/${data.payment_id}/tambah`,
                        search: createSearchParams({
                            type: 'tambah-kelas',
                        }).toString(),
                    }}
                >
                    <Button
                        size="sm"
                        className="button-setting-tarif d-flex align-items-center text-white justify-content-center"
                        color="primary"
                    >
                        <AiOutlinePlusCircle size={15} color="white" />{' '}
                        Berdasarkan Kelas
                    </Button>
                </Link>
            </Col>
            <Col md={2}>
                <Link
                    style={{ textDecoration: 'none' }}
                    state={{ data: data }}
                    to={{
                        pathname: `/admin/tarif-tagihan/${data.payment_id}/tambah`,
                        search: createSearchParams({
                            type: 'tambah-siswa',
                        }).toString(),
                    }}
                >
                    <Button
                        size="sm"
                        className="button-setting-tarif d-flex align-items-center text-white justify-content-center "
                        color="info"
                    >
                        <AiOutlinePlusCircle size={15} color="white" />
                        Berdasarkan Siswa
                    </Button>
                </Link>
            </Col>
            <Col md={2}>
                <Link
                    style={{ textDecoration: 'none' }}
                    state={{ data: data }}
                    to={{
                        pathname: `/admin/tarif-tagihan/${data.payment_id}/edit`,
                        search: createSearchParams({
                            type: 'edit-kelas',
                        }).toString(),
                    }}
                >
                    <Button
                        size="sm"
                        className="button-setting-tarif d-flex align-items-center text-white justify-content-center "
                        color="warning"
                    >
                        <AiFillEdit size={15} color="white" /> Edit Tarif Bebas
                        per Kelas
                    </Button>
                </Link>
            </Col>
            <Col md={1}>
                <Button
                    size="sm"
                    className="button-setting-tarif d-flex align-items-center text-white justify-content-center "
                    color="secondary"
                >
                    <AiOutlineRollback
                        size={15}
                        color="white"
                        onClick={onBackHandler}
                    />{' '}
                    kembali
                </Button>
            </Col>
        </Row>
    )
}

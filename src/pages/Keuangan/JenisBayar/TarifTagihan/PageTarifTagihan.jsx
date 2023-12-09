import React from 'react'
import { useLocation } from 'react-router-dom'
import { Col, Input, Row, FormGroup, Button } from 'reactstrap';
import CustomSelect from '../../../../component/Select/CustomSelect';
import ErrorComponent from '../../../../component/Form/ErrorComponent';
import { payType } from '../../../../utils/CONSTANT';
import { AiOutlineRollback, AiOutlinePlusCircle, AiFillEdit } from "react-icons/ai";
import './styles/style.css';
export default function PageTarifTagihan() {

  const location = useLocation();
  const { data } = location.state;
  console.log(data)
  return (
    <div className="page-content">
      {/* <ToastContainer /> */}
      <h3>
        Tarif Tagihan <span style={{ fontSize: "0.8em", color: "gray" }}>Detail</span>
      </h3>

      <div className="table-content d-flex flex-column gap-3">
        <h4 style={{ fontSize: '1.1rem' }}>
          Tarif - <span style={{ fontSize: "0.9em", color: "gray" }}>{`${data.pos_pay_name} - T.A ${data.period_start}/${data.period_end}`}</span>
        </h4>
        <Row md={4} noGutters className='gap-3'>
          <Row md={1} noGutters>
            <Col md={3} className='justify-content-center align-items-center d-flex'>
              <p className='section-title'>Tahun</p>
            </Col>
            <Col md={9}>
              <Input style={{ fontSize: '0.8rem', height: '100%' }} value={`${data.period_start} / ${data.period_end}`} disabled />
            </Col>
          </Row>
          <Row md={1} noGutters>
            <Col md={3} className='justify-content-center align-items-center d-flex'>
              <p className='section-title'>Kelas</p>
            </Col>
            <Col md={9}>
              <CustomSelect
                data={payType}
                labelName="Tahun Ajaran"
                optionName="name"
                optionValue={"id"}
                symbol="/"
                withLabel={false}
                // onChange={handleChange("period_period_id")}
                value={'values.period_period_id'}
                name="period_period_id"
              />



            </Col>
          </Row>
          <Row md={1} noGutters>
            <Col md={8} className='justify-content-center align-items-center d-flex'>
              <Button color='success'>Cari / tampilkan</Button>

            </Col>
          </Row>
        </Row>
        <div style={{ borderBottom: '0.5px solid gray' }}></div>
        <Row md={6} noGutters className='gap-1 align-items-center'>
          <Col md={1} >
            <p className='section-title'>Setting Tarif</p>
          </Col>

          <Col md={2} >
            <Button size='sm' className='button-setting-tarif d-flex align-items-center text-white justify-content-center  ' color='primary'><AiOutlinePlusCircle size={15} color='white' /> Berdasarkan Kelas</Button>

          </Col>
          <Col md={2} >
            <Button size='sm' className='button-setting-tarif d-flex align-items-center text-white justify-content-center ' color='info'><AiOutlinePlusCircle size={15} color='white' />Berdasarkan Siswa</Button>
          </Col>
          <Col md={2} >
            <Button size='sm' className='button-setting-tarif d-flex align-items-center text-white justify-content-center ' color='warning'><AiFillEdit size={15} color='white' /> Edit Tarif Bebas per Kelas</Button>

          </Col>
          <Col md={1} >
            <Button size='sm' className='button-setting-tarif d-flex align-items-center text-white justify-content-center ' color='secondary'><AiOutlineRollback size={15} color='white' /> kembali</Button>

          </Col>
        </Row>

      </div>
    </div>
  )
}

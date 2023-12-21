import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Col, Input, Row, FormGroup, Button, InputGroup } from 'reactstrap';
import CustomSelect from '../../../../../component/Select/CustomSelect';
import ErrorComponent from '../../../../../component/Form/ErrorComponent';
import { payType } from '../../../../../utils/CONSTANT';
import { AiOutlineRollback, AiOutlinePlusCircle, AiFillEdit } from "react-icons/ai";
import './styles/style.css';
import useRequest from '../../../../../customHooks/useRequest';
import { useSelector } from 'react-redux';
import { getAllKelas, getAllPaymentRateByPayment } from '../../../../../utils/http';
// import TableTarifTagihan from './components/TableTarifTagihan';
import useTable from '../../../../../customHooks/useTable';
import SearchInput from '../../../../../component/ActionButton/SearchInput';
import FormComponent from '../../../../../component/Form/FormComponent';
import { Formik } from 'formik';
export default function PageAddTarifTagihan() {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <>
      <div className="page-content d-flex gap-3 flex-row ">
        <div className='flex-2 flex-column d-flex gap-5'>

          <div className="table-content d-flex flex-column gap-3 ">
            <h1 className='fs-6 text-start'>Pilih Kelas</h1>
            <div className='d-flex gap-3 flex-column'>
              <div className='d-flex gap-4'>
                <span className='label-form flex-1 text-end align-self-center'>Jenis Bayar</span>
                <Input id="exampleEmail" className='flex-2'
                  name="email"
                  placeholder="with a placeholder"
                  type="email" />

              </div>
              <div className='d-flex gap-4'>
                <span className='label-form flex-1 text-end align-self-center'>Tahun Ajaran</span>
                <Input id="exampleEmail" className='flex-2'
                  name="email"
                  placeholder="with a placeholder"
                  type="email" />

              </div>
              <div className='d-flex gap-4'>
                <span className='label-form flex-1 text-end align-self-center'>Tipe Bayar</span>
                <Input id="exampleEmail" className='flex-2'
                  name="email"
                  placeholder="with a placeholder"
                  type="email" />

              </div>
              {/* siswa */}
              <div className='d-flex gap-4'>
                <span className='label-form flex-1 text-end align-self-center'>NIS</span>
                <Input id="exampleEmail" className='flex-2'
                  name="email"
                  placeholder="with a placeholder"
                  type="email" />

              </div>
              <div className='d-flex gap-4'>
                <span className='label-form flex-1 text-end align-self-center'>Nama</span>
                <Input id="exampleEmail" className='flex-2'
                  name="email"
                  placeholder="with a placeholder"
                  type="email" />

              </div>

              <div className='d-flex gap-4'>
                <span className='label-form flex-1 text-end align-self-center'>Kelas</span>
                <Input id="exampleEmail" className='flex-2'
                  name="email"
                  placeholder="with a placeholder"
                  type="email" />

              </div>
              <div className='d-flex gap-4'>
                <span className='label-form flex-1 text-end align-self-center'>Siswa</span>
                <Input id="exampleEmail" className='flex-2'
                  name="email"
                  placeholder="with a placeholder"
                  type="email" />

              </div>

            </div>
          </div>
          <div className="table-content d-flex flex-column gap-3 ">
            <h1 className='fs-6 text-start'>Tarif Tiap Bulan Sama</h1>
            <div className='d-flex gap-5'>
              <span className='label-form flex-1 text-end align-self-center'>Tarif Bulanan (Rp.)</span>
              <Input id="exampleEmail" className='flex-2'
                name="email"
                placeholder="with a placeholder"
                type="email" />
            </div>
          </div>
        </div>
        <div className="table-content d-flex flex-column gap-3 flex-3 h-auto">
          <h1 className='fs-6 text-start'>Tarif Tiap Bulan Tidak Sama</h1>
          <div className='d-flex gap-3 flex-column'>
            <div className='d-flex gap-4'>
              <span className='label-form flex-1 text-start align-self-center'>Januari</span>
              <Input id="exampleEmail" className='flex-3'
                name="email"
                placeholder="with a placeholder"
                type="email" />

            </div>
            <div className='d-flex gap-4'>
              <span className='label-form flex-1 text-start align-self-center'>Februari</span>
              <Input id="exampleEmail" className='flex-3'
                name="email"
                placeholder="with a placeholder"
                type="email" />
            </div>
            <div className='d-flex gap-4'>
              <span className='label-form flex-1 text-start align-self-center'>Januari</span>
              <Input id="exampleEmail" className='flex-3'
                name="email"
                placeholder="with a placeholder"
                type="email" />

            </div>
            <div className='d-flex gap-4'>
              <span className='label-form flex-1 text-start align-self-center'>Januari</span>
              <Input id="exampleEmail" className='flex-3'
                name="email"
                placeholder="with a placeholder"
                type="email" />

            </div>
            <div className='d-flex gap-4'>
              <span className='label-form flex-1 text-start align-self-center'>Januari</span>
              <Input id="exampleEmail" className='flex-3'
                name="email"
                placeholder="with a placeholder"
                type="email" />

            </div>
            <div className='d-flex gap-4'>
              <span className='label-form flex-1 text-start align-self-center'>Januari</span>
              <Input id="exampleEmail" className='flex-3'
                name="email"
                placeholder="with a placeholder"
                type="email" />

            </div>
            <div className='d-flex gap-4'>
              <span className='label-form flex-1 text-start align-self-center'>Januari</span>
              <Input id="exampleEmail" className='flex-3'
                name="email"
                placeholder="with a placeholder"
                type="email" />

            </div>
            <div className='d-flex gap-4'>
              <span className='label-form flex-1 text-start align-self-center'>Januari</span>
              <Input id="exampleEmail" className='flex-3'
                name="email"
                placeholder="with a placeholder"
                type="email" />

            </div>
            <div className='d-flex gap-4'>
              <span className='label-form flex-1 text-start align-self-center'>Januari</span>
              <Input id="exampleEmail" className='flex-3'
                name="email"
                placeholder="with a placeholder"
                type="email" />

            </div>
            <div className='d-flex gap-4'>
              <span className='label-form flex-1 text-start align-self-center'>Januari</span>
              <Input id="exampleEmail" className='flex-3'
                name="email"
                placeholder="with a placeholder"
                type="email" />

            </div>
            <div className='d-flex gap-2'>
              <Button color='success'>Simpan</Button>
              <Button color='light'>Cancel</Button>
            </div>


          </div>
        </div>
      </div>
    </>
  )
}

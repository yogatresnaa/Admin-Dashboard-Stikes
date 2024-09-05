import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap'
import SelectUnit from '../../../../component/ActionButton/SelectUnit'
import useRequest from '../../../../customHooks/useRequest'
import { getAllUnitByUser, updateUnit } from '../../../../utils/http'
import { useSelector } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer } from 'react-toastify'

function SchoolInfoForm() {
    const [queryFilter, setQueryFilter] = useState({
        unit_id: '',
    })
    const {
        data: dataUnit,
        setData: setDataUnit,
        sendData: sendDataUnit,
        getData: getDataUnit,
    } = useRequest()
    const [selectedData, setSelectedData] = useState(null)
    const dataUser = useSelector(({ authState }) => authState.data)

    useEffect(() => {
        fetchData()
    }, [])
    const onQueryFilterChange = (e) => {
        setQueryFilter((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
        setSelectedData(
            dataUnit.data?.find((item) => item.unit_id == e.target.value)
        )
    }

    const fetchData = () => {
        getDataUnit(() => getAllUnitByUser(dataUser.token))
        if (queryFilter.unit_id)
            setSelectedData(
                dataUnit.data?.find(
                    (item) => item.unit_id == queryFilter.unit_id
                )
            )
    }
    const onSubmitHandler = async (formBody) => {
        const selectedUnit = dataUnit.data?.find(
            (item) => item.unit_id == queryFilter.unit_id
        )
        console.log('ss')
        await sendDataUnit(
            () => updateUnit(formBody, selectedUnit.unit_id),
            () => {}
        )
    }
    return (
        <div className="form-page">
            <ToastContainer />
            <div className="w-25">
                <SelectUnit
                    data={dataUnit.data}
                    includeAll={false}
                    onFilterChange={onQueryFilterChange}
                    value={queryFilter.unit_id}
                />
            </div>
            {queryFilter.unit_id && (
                <Formik
                    enableReinitialize
                    validateOnBlur={false}
                    validateOnChange={true}
                    initialValues={selectedData}
                    onSubmit={onSubmitHandler}
                    validationSchema={Yup.object().shape({
                        unit_name: Yup.string().required('harus diisi'),
                        unit_full_name: Yup.string().required('harus diisi'),
                        unit_address: Yup.string().required('harus diisi'),
                        unit_phone: Yup.string().required('harus diisi'),
                        unit_person: Yup.string().required('harus diisi'),
                        unit_person_nip: Yup.string().required('harus diisi'),
                        unit_kota: Yup.string().required('harus diisi'),
                        unit_person_name: Yup.string().required('harus diisi'),
                        unit_whatsapp: Yup.string().required('harus diisi'),
                    })}
                >
                    {({
                        errors,
                        handleChange,
                        setValues,
                        handleSubmit,
                        values,
                        isValid,
                    }) => (
                        <form
                            className="school-info-form"
                            onSubmit={handleSubmit}
                        >
                            <div className="form-groupi">
                                <label>Nama Unit </label>
                                <span>(SMP/SMK/UNIVERSITAS/STIKES)</span>
                                <input
                                    type="text"
                                    value={values.unit_name}
                                    onChange={handleChange}
                                    name="unit_name"
                                    placeholder="Masukkan Nama Unit (SMP/SMK/UNIVERSITAS)"
                                />
                            </div>
                            <div className="form-groupi">
                                <label>Nama Lengkap Unit</label>
                                <span>(contoh: PELITA ILMU)</span>

                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="unit_full_name"
                                    value={values.unit_full_name}
                                    placeholder="Masukkan Nama Unit"
                                />
                            </div>
                            <div className="form-groupi">
                                <label>Alamat</label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="unit_address"
                                    value={values.unit_address}
                                    placeholder="Masukkan Alamat"
                                />
                            </div>
                            <div className="form-groupi">
                                <label>Kota</label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="unit_kota"
                                    value={values.unit_kota}
                                    placeholder="Masukkan Kota"
                                />
                            </div>
                            <div className="form-groupi">
                                <label>No. Telepon</label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="unit_phone"
                                    value={values.unit_phone}
                                    placeholder="Masukkan No. Telepon"
                                    readOnly
                                />
                            </div>
                            <div className="form-groupi">
                                <label>Nama Penanggungjawab</label>
                                <span>(untuk cetak dokumen)</span>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="unit_person_name"
                                    value={values.unit_person_name}
                                />
                            </div>
                            <div className="form-groupi">
                                <label>NIP Penanggungjawab </label>
                                <span>(untuk cetak dokumen)</span>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="unit_person_nip"
                                    value={values.unit_person_nip}
                                />
                            </div>
                            <div className="form-groupi">
                                <label>Jabatan Penanggungjawab</label>
                                <span>
                                    {' '}
                                    (untuk cetak dokumen ex: Bendahara / kepala
                                    sekolah / sejenisnya)
                                </span>

                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="unit_person"
                                    value={values.unit_person}
                                    placeholder="Bendahara / kepala sekolah / sejenisnya"
                                />
                            </div>
                            <div className="form-groupi">
                                <label>Nomor Whatsapp </label>
                                <span>(untuk kirim tagihan)</span>

                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="unit_whatsapp"
                                    value={values.unit_whatsapp}
                                    placeholder="No. whatsapp"
                                />
                            </div>
                            <Button
                                size="sm"
                                color="success"
                                className="w-100"
                                type="submit"
                                disabled={!isValid}
                            >
                                Simpan
                            </Button>
                        </form>
                    )}
                </Formik>
            )}
        </div>
    )
}

export default SchoolInfoForm

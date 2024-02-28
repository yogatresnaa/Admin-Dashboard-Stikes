import React, { useEffect, useMemo, useState } from 'react'
import TableProgramStudi from './components/TableProgramStudi'
import AddAction from '../../../component/ActionButton/AcctionAddButoon'
import SelectProdi from '../../../component/ActionButton/SelectProdi'
import ShowDataEnteris from '../../../component/ActionButton/showEntries'
import SearchInput from '../../../component/ActionButton/SearchInput'

import useRequest from '../../../customHooks/useRequest'
import {
    getAllProdi,
    putProdi,
    deleteProdi,
    postProdi,
} from '../../../utils/http'
import './css/pageKelas.css'
import { useSelector } from 'react-redux'
import ModalForm from './components/FormModal'
import { prodiInitialValues } from '../../../utils/initialValues'
import { prodiSchema } from '../../../utils/schema'
import { ToastContainer } from 'react-toastify'
import { prodiModel } from '../../../models/models'
import useTable from '../../../customHooks/useTable'
import { alertConfirmation } from '../../../component/Alert/swalConfirmation'
import { alertType } from '../../../utils/CONSTANT'

function PageProgramStudi() {
    const {
        data: dataProgramStudi,
        setData: setDataProgramStudi,
        sendData: sendDataProgramStudi,
        setDataDetail: setDataDetailProgramStudi,
        dataDetail: dataDetailProgramStudi,
        getData: getDataProgramStudi,
        isLoading: isLoadingProgramStudi,
        setIsLoading: setIsLoadingProgramStudi,
        isLoadingSendData: isLoadingSendDataProgramStudi,
        filterText,
        onChangeFilterText,
    } = useRequest()
    const {
        setIsOpenModalTambah,
        isOpenModalEdit,
        isOpenModalTambah,
        resetPaginationToggle,
        setResetPaginationToggle,
        setIsOpenModalEdit,
        isOpenModalForm,
        setIsOpenModalForm,
        isEdit,
        setIsEdit,
    } = useTable()

    const dataUser = useSelector(({ authState }) => authState.data)

    useEffect(() => {
        console.log('a')
        getDataProgramStudi(() => getAllProdi(dataUser.token))
    }, [])

    useEffect(() => {
        console.log(filterText)

        if (filterText !== '') {
            setDataProgramStudi((prevState) => ({
                ...prevState,
                filter: prevState.data.filter((item) => {
                    if (
                        item.class_name
                            .toString()
                            .toLowerCase()
                            .includes(filterText.toString().toLowerCase())
                    )
                        return true
                    return false
                }),
            }))
        }
    }, [filterText])

    const onClickTambahHandler = () => {
        setIsOpenModalForm(!isOpenModalForm)
        setIsEdit(false)
    }
    const onClickEditHandler = (item) => {
        console.log(item)
        setDataDetailProgramStudi(item)
        setIsEdit(true)
        setIsOpenModalForm(!isOpenModalForm)
    }
    const subHeaderComponent = useMemo(() => {
        const onClearHandler = () => {
            if (filterText) {
                onChangeFilterText('')
                setResetPaginationToggle(!resetPaginationToggle)
            }
        }

        return (
            <SearchInput
                filterText={filterText}
                setFilterText={onChangeFilterText}
            />
        )
    }, [
        filterText,
        onChangeFilterText,
        resetPaginationToggle,
        setResetPaginationToggle,
    ])

    const onSubmitTambahHandler = async (formBody, { resetForm }) => {
        console.log(formBody)
        await sendDataProgramStudi(
            () => postProdi(prodiModel.objectToJSON(formBody), dataUser.token),
            () => getDataProgramStudi(() => getAllProdi(dataUser.token)),
            null
        )
        setIsOpenModalForm(!setIsOpenModalForm)
    }

    const onSubmitEditHandler = async (formBody, { resetForm }) => {
        console.log(formBody)
        await sendDataProgramStudi(
            () =>
                putProdi(
                    formBody.majors_id,
                    prodiModel.objectToJSON(formBody),
                    dataUser.token
                ),
            () => getDataProgramStudi(() => getAllProdi(dataUser.token)),
            null
        )
        setIsOpenModalForm(!isOpenModalForm)
    }
    const onSubmitDeleteHandler = async (formBody) => {
        console.log(formBody)
        alertConfirmation(alertType.delete, async () => {
            await sendDataProgramStudi(
                () => deleteProdi(formBody.majors_id, dataUser.token),
                () => getDataProgramStudi(() => getAllProdi(dataUser.token)),
                null
            )
        })
    }

    return (
        <>
            <ToastContainer />
            <div className="page-content">
                <h3>
                    Program Studi{' '}
                    <span style={{ fontSize: '0.8em', color: 'gray' }}>
                        List
                    </span>
                </h3>

                <div className="table-content">
                    <AddAction onClickHandler={onClickTambahHandler} />

                    <TableProgramStudi
                        data={
                            filterText.length > 0
                                ? dataProgramStudi.filter
                                : dataProgramStudi.data
                        }
                        subHeaderComponent={subHeaderComponent}
                        resetPaginationToggle={resetPaginationToggle}
                        isLoading={isLoadingProgramStudi}
                        onClickEditHandler={onClickEditHandler}
                        onClickDeleteHandler={onSubmitDeleteHandler}
                    />
                </div>
                <ModalForm
                    initialValues={
                        isEdit ? dataDetailProgramStudi : prodiInitialValues
                    }
                    schema={prodiSchema}
                    toggle={() => setIsOpenModalForm(!isOpenModalForm)}
                    isOpen={isOpenModalForm}
                    btnName={isEdit ? 'Edit' : 'Tambah'}
                    isLoadingSendData={isLoadingSendDataProgramStudi}
                    headerName={
                        isEdit ? 'Edit Program Studi' : 'Tambah Program Studi'
                    }
                    onSubmitHandler={
                        isEdit ? onSubmitEditHandler : onSubmitTambahHandler
                    }
                />
                {/* <ModalForm
          initialValues={
            dataDetailKelas !== null ? dataDetailKelas : kelasInitialValues
          }
          schema={kelasSchema}
          toggle={() => setIsOpenModalEdit(!isOpenModalEdit)}
          isOpen={isOpenModalEdit}
          btnName="Edit"
          headerName="Edit Kelas"
          onSubmitHandler={onSubmitEditHandler}
        /> */}
            </div>
        </>
    )
}

export default PageProgramStudi

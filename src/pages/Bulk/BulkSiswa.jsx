import React, { useEffect, useRef, useState } from 'react'
import ButtonWithLoader from '../../component/ActionButton/ButtonWithLoader'
import useRequest from '../../customHooks/useRequest'
import { ToastContainer } from 'react-toastify'
import { postBulkSiswa } from '../../utils/http'
import { useSelector } from 'react-redux'
import { downloadDocument } from '../../utils/helper'
import Axios from 'axios'
import { FaCoins } from 'react-icons/fa'
import { Button, FormGroup, FormText, Input, Label } from 'reactstrap'

export default function BulkSiswa() {
    const dataUser = useSelector(({ authState }) => authState.data)
    const fileInputRef = useRef(null)
    const {
        data,
        sendData: sendDataSiswa,
        isLoading: isLoadingDB,
    } = useRequest()
    const [file, setFile] = useState(null)

    const onChangeFileHandler = (e) => {
        setFile(e.target.files[0])
    }
    const onSubmitHandler = async () => {
        const formData = new FormData()
        formData.append('file', file)
        console.log(fileInputRef.current)
        sendDataSiswa(
            () => postBulkSiswa(formData, dataUser.token),
            () => {
                fileInputRef.current.value = ''
            }
        )
        // getDataDB(() => getDBBackup(dataUser.token))
    }

    return (
        <div className="page-content ">
            <ToastContainer />
            <h3>Upload Data Siswa</h3>
            <div className="d-flex gap-2  mt-3 justify-content-center align-items-end">
                <div className="m-0">
                    <Label for="exampleFile">
                        Pilih File{' '}
                        <span style={{ fontSize: '11px' }}>(.xls / .xlsx)</span>
                    </Label>
                    <Input
                        ref={fileInputRef}
                        onChange={onChangeFileHandler}
                        accept=".xls,.xlsx"
                        id="exampleFile"
                        name="file"
                        type="file"
                    />
                </div>
                <ButtonWithLoader
                    type="submit"
                    color="success"
                    onClick={onSubmitHandler}
                    isLoading={isLoadingDB}
                    disabled={file == null}
                    size={'md'}
                    text={'Submit'}
                />
            </div>
        </div>
    )
}

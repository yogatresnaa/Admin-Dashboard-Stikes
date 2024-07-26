import React, { useEffect } from 'react'
import ButtonWithLoader from '../../component/ActionButton/ButtonWithLoader'
import useRequest from '../../customHooks/useRequest'
import { ToastContainer } from 'react-toastify'
import { getDBBackup } from '../../utils/http'
import { useSelector } from 'react-redux'
import { downloadDocument } from '../../utils/helper'
import Axios from 'axios'

export default function ExportDB() {
    const dataUser = useSelector(({ authState }) => authState.data)
    const { data, getData: getDataDB, isLoading: isLoadingDB } = useRequest()

    const onClickExport = async () => {
        // getDataDB(() => getDBBackup(dataUser.token))
        try {
            const response = await getDBBackup(dataUser.token)
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'backup_db.sql')
            document.body.appendChild(link)
            link.click()
            link.parentNode.removeChild(link) // Clean up the DOM after download
        } catch (error) {
            console.error('Error downloading file:', error)
        }
    }

    return (
        <div className="page-content ">
            <ToastContainer />
            <h3>Database</h3>
            <div className="d-flex justify-content-center align-items-center">
                <ButtonWithLoader
                    style={{ marginTop: '2rem' }}
                    color={'success'}
                    isLoading={isLoadingDB}
                    size={'md'}
                    onClick={onClickExport}
                    text={'Backup Database'}
                />
            </div>
        </div>
    )
}

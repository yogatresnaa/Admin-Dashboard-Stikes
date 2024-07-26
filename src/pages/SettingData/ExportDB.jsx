import React, { useEffect } from 'react'
import ButtonWithLoader from '../../component/ActionButton/ButtonWithLoader'
import useRequest from '../../customHooks/useRequest'
import { ToastContainer } from 'react-toastify'
import { getDBBackup } from '../../utils/http'
import { useSelector } from 'react-redux'
import { downloadDocument } from '../../utils/helper'
import Axios from 'axios'
import { FaCoins } from 'react-icons/fa'

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
            <button
                onClick={onClickExport}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                }}
            >
                <FaCoins
                    style={{
                        marginRight: '10px',
                        color: 'blue',
                        width: '40px',
                        height: '40px',
                    }}
                />
                Download Backup
            </button>
            </div>
        </div>
    )
}

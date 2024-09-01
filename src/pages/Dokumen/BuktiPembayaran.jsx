import React, { useEffect } from 'react'
import useRequest from '../../customHooks/useRequest'
import { getPublicDokumenBuktiPembayaran } from '../../utils/http'
import { useSearchParams } from 'react-router-dom'
import Loader from '../../component/Loader/Loader'
import PdfViewer from '../../component/pdf-viewer/PdfViewer'

export default function TagihanPembayaran() {
    const [searchParams, setSearchParams] = useSearchParams()
    const {
        data: dataDokumenBuktiPembayaran,
        setData: setDataDokumenBuktiPembayaran,
        sendData: sendDataDokumenBuktiPembayaran,
        isLoadingGenerate: isLoadngDokumenBuktiPembayaran,
        getData: getDataDokumenBuktiPembayaran,
    } = useRequest(true)

    const getDokumen = async () => {
        await getDataDokumenBuktiPembayaran(() =>
            getPublicDokumenBuktiPembayaran({
                iv: searchParams.get('iv'),
                encryptedData: searchParams.get('encryptedData'),
            })
        )
    }
    useEffect(() => {
        getDokumen()
    }, [])

    return (
        <>
            {dataDokumenBuktiPembayaran.data?.data ? (
                <PdfViewer pdfBuffer={dataDokumenBuktiPembayaran.data.data} />
            ) : (
                <div
                    style={{ height: '100vh' }}
                    className="d-flex justify-content-center align-items-center"
                >
                    <Loader />
                </div>
            )}
        </>
    )
}

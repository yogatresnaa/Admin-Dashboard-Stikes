import React, { useEffect, useMemo } from 'react'
import useRequest from '../../customHooks/useRequest'
import { getPublicDokumenBuktiPembayaran } from '../../utils/http'
import { useSearchParams } from 'react-router-dom'
import Loader from '../../component/Loader/Loader'
import PdfViewer from '../../component/pdf-viewer/PdfViewer'

export default function TagihanPembayaran() {
    const [searchParams] = useSearchParams()
    const {
        data: dataDokumenBuktiPembayaran,
        getData: getDataDokumenBuktiPembayaran,
        isLoading,
    } = useRequest(false)

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

    const pdfBuffer = useMemo(() => {
        if (dataDokumenBuktiPembayaran?.data) {
            return new Uint8Array(
                Object.values(dataDokumenBuktiPembayaran.data)
            )
        }
        return null
    }, [dataDokumenBuktiPembayaran])
    return (
        <>
            {!isLoading && pdfBuffer ? (
                <PdfViewer pdfBuffer={pdfBuffer} />
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

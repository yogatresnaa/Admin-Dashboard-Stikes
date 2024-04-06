import React, { useEffect } from 'react'
import useRequest from '../../customHooks/useRequest'
import {
    getDokumenTagihanPembayaran,
    getPublicDokumenTagihanPembayaran,
} from '../../utils/http'
import { useSearchParams } from 'react-router-dom'
import Loader from '../../component/Loader/Loader'
import PdfViewer from '../../component/pdf-viewer/PdfViewer'

export default function TagihanPembayaran() {
    const [searchParams, setSearchParams] = useSearchParams()
    const {
        data: dataDokumenTagihanPembayaran,
        setData: setDataDokumentagihanPembayaran,
        sendData: sendDataDokumentagihanPembayaran,
        isLoadingGenerate: isLoadngDokumenTagihanPembayaran,
        getData: getDataDokumentagihanPembayaran,
    } = useRequest(true)

    const getDokumen = async () => {
        await getDataDokumentagihanPembayaran(() =>
            getPublicDokumenTagihanPembayaran({
                iv: searchParams.get('iv'),
                encryptedData: searchParams.get('encryptedData'),
            })
        )
    }
    useEffect(() => {
        getDokumen()
    }, [])

    // useEffect(() => {
    //     if (dataDokumenTagihanPembayaran?.data) {
    //         console.log(dataDokumenTagihanPembayaran.data.data)
    //         const pdfBlob = new Blob([dataDokumenTagihanPembayaran.data.data], {
    //             type: 'application/pdf',
    //         })
    //         const pdfUrl = URL.createObjectURL(pdfBlob)

    //         window.open(pdfUrl)
    //         // setDataDokumentagihanPembayaran(null)
    //     }
    // }, [dataDokumenTagihanPembayaran])
    return (
        <>
            {dataDokumenTagihanPembayaran.data?.data ? (
                <PdfViewer pdfBuffer={dataDokumenTagihanPembayaran.data.data} />
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

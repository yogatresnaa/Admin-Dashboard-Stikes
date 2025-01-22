import React, { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { Button } from 'reactstrap'
import { BiPrinter } from 'react-icons/bi'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
).toString()

const PdfViewer = ({ pdfBuffer, isTagihan = false }) => {
    const [numPages, setNumPages] = useState(null)
    const [isPrinting, setIsPrinting] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const docRef = useRef(null)

    console.log(pdfBuffer)

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
    }

    const goToPrevPage = () => setPageNumber(Math.max(1, pageNumber - 1))
    const goToNextPage = () => setPageNumber(Math.min(numPages, pageNumber + 1))

    const onClickPrintHandler = () => {
        setIsPrinting(true)
    }

    useEffect(() => {
        if (isPrinting) {
            window.print()
            setIsPrinting(false)
        }
    }, [isPrinting])
    const pdfData =
        pdfBuffer instanceof Uint8Array
            ? pdfBuffer
            : new Uint8Array(Object.values(pdfBuffer))

    return (
        <div className="bg-dark w-100 d-flex flex-column position-relative align-items-center justify-content-center">
            <nav
                style={{
                    zIndex: 99,
                    bottom: 5,
                    marginBottom: '1rem',
                    width: '100vw',
                    gap: '0.5rem',
                    background: 'transparent',
                }}
                className="d-flex align-items-center justify-content-center position-fixed"
            >
                <Button
                    style={{ display: isPrinting ? 'none' : 'block' }}
                    onClick={onClickPrintHandler}
                    color="dark"
                >
                    Print <BiPrinter size={30} />
                </Button>
            </nav>
            <div
                className="d-flex justify-content-center align-items-center"
                ref={docRef}
            >
                <Document
                    file={{
                        data: isTagihan ? pdfData : pdfBuffer.slice(0),
                    }}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={(error) =>
                        console.error('Error loading PDF:', error)
                    }
                >
                    {Array.from({ length: numPages }, (_, i) => (
                        <div key={i} style={{ margin: '1rem' }}>
                            <Page pageNumber={i + 1} />
                        </div>
                    ))}
                </Document>
            </div>
        </div>
    )
}

export default PdfViewer

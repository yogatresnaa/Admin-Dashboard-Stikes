import { Button } from 'reactstrap'
import React, { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { BiPrinter } from 'react-icons/bi'
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
).toString()
const PdfViewer = ({ pdfBuffer }) => {
    const [numPages, setNumPages] = useState(null)
    const [isPrinting, setIsPrinting] = useState(false)
    const docRef = useRef(null)
    const [pageNumber, setPageNumber] = useState(1)

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
    }
    const goToPrevPage = () =>
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1)

    const goToNextPage = () =>
        setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1)

    const onClickPrintHandler = () => {
        setIsPrinting(true)
    }
    useEffect(() => {
        if (isPrinting) {
            window.print()
            setIsPrinting(false)
        }
    }, [isPrinting])
    return (
        <div className="bg-dark w-100 d-flex flex-column position-relative align-align-items-center justify-content-center">
            <nav
                style={{
                    zIndex: 99,
                    bottom: 5,
                    marginBottom: '1rem',
                    width: '100vw',
                    gap: '0.5rem',
                    background: 'transparent    ',
                }}
                className="d-flex align-items-center justify-content-center position-fixed"
            >
                {/* <Button size="sm" onClick={goToPrevPage}>
                    Prev
                </Button>
                <Button size="sm" onClick={goToNextPage}>
                    Next
                </Button>
                <p className="m-0" style={{ fontSize: '0.6rem' }}>
                    Page {pageNumber} of {numPages}
                </p> */}
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
                    file={{ data: pdfBuffer }}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {Array.apply(null, Array(numPages))
                        .map((x, i) => i + 1)
                        .map((page, index) => (
                            <div
                                key={index}
                                style={{
                                    margin: '1rem',
                                }}
                            >
                                <Page pageNumber={page} />
                            </div>
                        ))}
                </Document>
            </div>
        </div>
    )
}

export default PdfViewer

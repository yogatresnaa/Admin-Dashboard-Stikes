import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonWithLoader from '../../../component/ActionButton/ButtonWithLoader'

function CetakButton({
    onClickCetakSemuaHandler,
    onClickCetakKwitansiHandler,
    isLoading,
    isLoadingKwitansi,
    isDisabledKwitansi,
}) {
    return (
        <div className="cetak-button">
            <ButtonWithLoader
                color="primary"
                style={{ width: '250px', margin: '10px' }}
                onClick={onClickCetakKwitansiHandler}
                isLoading={isLoadingKwitansi}
                size={'md'}
                disabled={isDisabledKwitansi}
                text={'Cetak Kwitansi'}
            />
            <ButtonWithLoader
                color="primary"
                style={{ width: '250px', margin: '10px' }}
                onClick={onClickCetakSemuaHandler}
                isLoading={isLoading}
                size={'md'}
                text={'Cetak Semua Tagihan'}
            />
        </div>
    )
}

export default CetakButton

import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonWithLoader from '../../../../component/ActionButton/ButtonWithLoader'

function CetakButton({ onClickCetakSemuaHandler, isLoading }) {
    return (
        <div className="cetak-button">
            <Button
                variant="primary"
                style={{ width: '250px', margin: '10px' }}
            >
                Cetak
            </Button>
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

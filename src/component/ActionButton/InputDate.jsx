import React from 'react'
import Form from 'react-bootstrap/Form'

function DateInput(time) {
    return (
        <div className="d-flex flex-column flex-grow-1 ">
            {/* <p style={{ fontSize: '0.8rem' }}>Tanggal</p> */}
            <Form.Control size="sm" type="date" />
        </div>
    )
}

export default DateInput

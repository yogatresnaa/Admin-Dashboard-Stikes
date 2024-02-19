import React from 'react'
import Form from 'react-bootstrap/Form'

function NoRef({ text }) {
    return (
        <>
            <div className="input-text">
                <Form.Control
                    size="sm"
                    style={{ width: '230px' }}
                    type="text"
                    disabled
                    value={text}
                />
            </div>
        </>
    )
}

export default NoRef

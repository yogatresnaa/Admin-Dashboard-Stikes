import React from 'react'
import Form from 'react-bootstrap/Form'

function PilihNoRefrensi({ data, value, onChangeHandler }) {
    return (
        <Form.Select
            aria-label="Default select example"
            value={value}
            onChange={onChangeHandler}
        >
            <option value={''}>Pilih No Referensi</option>
            {data.map((item) => (
                <option
                    key={item.payment_rate_number_pay}
                    value={item.payment_rate_number_pay}
                >
                    {item.payment_rate_number_pay}
                </option>
            ))}
        </Form.Select>
    )
}

export default PilihNoRefrensi

import React from 'react'
import Form from 'react-bootstrap/Form'

function AkunKas({ data, value, onChangeHandler }) {
    return (
        <Form.Select
            aria-label="Default select example"
            value={value}
            onChange={onChangeHandler}
        >
            <option value={null}>Pilih Akun Kas</option>
            {data?.data.map((item) => (
                <option key={item.account_id} value={item.account_id}>
                    {item?.account_code}-{item?.account_description}
                </option>
            ))}
        </Form.Select>
    )
}

export default AkunKas

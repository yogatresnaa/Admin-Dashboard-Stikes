import React from 'react'
import Form from 'react-bootstrap/Form'

function SelectAkunKas({ data, value, onChangeHandler }) {
    console.log(data)
    return (
        <div className="d-flex flex-column">
            <p className="m-0" style={{ fontSize: '0.8rem' }}>
                Akun Kas
            </p>
            <Form.Select
                aria-label="Default select example"
                value={value}
                onChange={onChangeHandler}
            >
                <option value={null}>Pilih Akun Kas</option>
                {data?.data?.map((item) => (
                    <option key={item.account_id} value={item.account_id}>
                        {item?.account_code}-{item?.account_description}
                    </option>
                ))}
            </Form.Select>
        </div>
    )
}

export default SelectAkunKas

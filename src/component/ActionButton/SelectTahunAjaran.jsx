import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FaSearch } from 'react-icons/fa'

function SelectTahunAjaran({ data, onChange, value }) {
    return (
        <div className="d-flex flex-column flex-grow-1 ">
            <p style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                Tahun Ajaran
            </p>
            <Form.Select
                size="sm"
                onChange={onChange}
                value={value}
                name="period_id"
            >
                <option value="">Semua</option>
                {data.length > 0 &&
                    data.map((item, index) => (
                        <option value={item.period_id} key={item.period_id}>
                            {item.period_start}/{item.period_end}
                        </option>
                    ))}
            </Form.Select>
        </div>
    )
}

export default SelectTahunAjaran

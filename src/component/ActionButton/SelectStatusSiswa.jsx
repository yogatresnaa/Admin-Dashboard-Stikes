import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FaSearch } from 'react-icons/fa'

function SelectStatusSiswa({
    data,
    onProdiFilterChange,
    value,
    name = null,
    firstValue = null,
}) {
    return (
        <div className="d-flex flex-column flex-grow-1">
            <p style={{ fontSize: '0.8rem' }}>Status</p>
            <Form.Select
                id={name}
                size="sm"
                onChange={onProdiFilterChange}
                value={value}
                name={name || 'student_status'}
            >
                <option value="">{firstValue ? firstValue : 'Semua'}</option>
                {data.length > 0 &&
                    data.map((item, index) => (
                        <option value={index} key={index}>
                            {item}
                        </option>
                    ))}
            </Form.Select>
        </div>
    )
}

export default SelectStatusSiswa

import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FaSearch } from 'react-icons/fa'

function SelectUnitKelas({
    data,
    onProdiFilterChange,
    value,
    name = null,
    firstValue = null,
    style = {},
}) {
    return (
        <div className="d-flex flex-column flex-grow-1" style={style}>
            <p style={{ fontSize: '0.8rem' }}>Unit Kelas</p>
            <Form.Select
                id={name}
                size="sm"
                onChange={onProdiFilterChange}
                value={value}
                name={name || 'class_id'}
            >
                <option value="">{firstValue ? firstValue : 'Semua'}</option>
                {data.length > 0 &&
                    data.map((item, index) => (
                        <option value={item.class_id} key={index}>
                            {item.class_name}
                        </option>
                    ))}
            </Form.Select>
        </div>
    )
}

export default SelectUnitKelas

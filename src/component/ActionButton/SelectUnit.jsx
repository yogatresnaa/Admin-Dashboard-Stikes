import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FaSearch } from 'react-icons/fa'
import EachUnit from './EachUnit'

function SelectUnit({
    data,
    onFilterChange,
    value,
    name = null,
    disabled = false,
    firstValue = null,
    style,
    includeAll = true,
}) {
    return (
        <div className="d-flex flex-column flex-grow-1">
            <p style={{ fontSize: '0.8rem', ...style }}>Unit</p>
            <Form.Select
                id={name}
                size="sm"
                disabled={disabled}
                onChange={onFilterChange}
                value={value}
                name={name || 'unit_id'}
            >
                {includeAll ? (
                    <option value="">
                        {firstValue ? firstValue : 'Semua'}
                    </option>
                ) : (
                    <option value="">{firstValue ? firstValue : '-'}</option>
                )}
                {/* {data.length > 0 &&
                    data.map((item, index) => (
                        <option value={item.unit_id} key={index}>
                            {item.unit_name}
                        </option>
                    ))} */}
                {data.length > 0 && (
                    <EachUnit
                        items={data}
                        render={(item, index) => (
                            <option value={item.unit_id} key={index}>
                                {item.unit_name}
                            </option>
                        )}
                    />
                )}
            </Form.Select>
        </div>
    )
}

export default SelectUnit
